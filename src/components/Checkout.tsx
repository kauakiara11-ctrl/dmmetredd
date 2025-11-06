import { useState } from 'react';
import { CreditCard, Lock, Sparkles, Check, ArrowLeft, QrCode, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';

type CheckoutProps = {
  quizAttemptId: string;
  onBack: () => void;
};

type PaymentMethod = 'credit-card' | 'pix';

interface PixData {
  id: string;
  brCode: string;
  qrCodeBase64: string;
  expiresAt: string;
  amount: number;
}

export default function Checkout({ quizAttemptId, onBack }: CheckoutProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [hasAIBump, setHasAIBump] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);

  const basePrice = 47.0;
  const aiBumpPrice = 29.9;
  const totalPrice = hasAIBump ? basePrice + aiBumpPrice : basePrice;

  const handleCopyPixCode = async () => {
    if (pixData?.brCode) {
      await navigator.clipboard.writeText(pixData.brCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmitCreditCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await supabase.from('conversions').insert({
        quiz_attempt_id: quizAttemptId,
        email,
        product: hasAIBump ? 'Mestre da DM + IA' : 'Mestre da DM',
        amount: totalPrice,
        has_ai_bump: hasAIBump,
        payment_method: 'credit-card'
      });

      setShowSuccess(true);

      setTimeout(() => {
        window.location.href = 'https://pay.example.com';
      }, 2000);
    } catch (error) {
      console.error('Error processing checkout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitPix = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/create-pix-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          email,
          name,
          description: hasAIBump ? 'Mestre da DM + Modo IA' : 'Mestre da DM',
          quizAttemptId,
          hasAIBump
        })
      });

      const result = await response.json();

      if (result.success && result.pixData) {
        setPixData(result.pixData);

        await supabase.from('conversions').insert({
          quiz_attempt_id: quizAttemptId,
          email,
          product: hasAIBump ? 'Mestre da DM + IA' : 'Mestre da DM',
          amount: totalPrice,
          has_ai_bump: hasAIBump,
          payment_method: 'pix',
          pix_payment_id: result.pixData.id
        });
      } else {
        throw new Error(result.error || 'Failed to create PIX payment');
      }
    } catch (error) {
      console.error('Error creating PIX payment:', error);
      alert('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="text-6xl animate-bounce-in">🎉</div>
          <h2 className="text-3xl font-bold">Pedido Confirmado!</h2>
          <p className="text-gray-400">Redirecionando para o pagamento...</p>
        </div>
      </div>
    );
  }

  if (pixData) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F5A]/20 via-transparent to-[#FF9E00]/10" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => setPixData(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 text-center space-y-6">
            <div className="flex items-center justify-center">
              <div className="bg-green-500/10 p-4 rounded-full">
                <QrCode className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">PIX Gerado com Sucesso!</h2>
              <p className="text-gray-400">Escaneie o QR Code ou copie o código abaixo</p>
            </div>

            <div className="bg-white p-6 rounded-xl inline-block">
              <img
                src={pixData.qrCodeBase64}
                alt="QR Code PIX"
                className="w-64 h-64 mx-auto"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400 font-semibold">Código PIX Copia e Cola:</p>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 break-all text-sm text-gray-300 font-mono">
                {pixData.brCode}
              </div>

              <button
                onClick={handleCopyPixCode}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Código PIX</span>
                  </>
                )}
              </button>
            </div>

            <div className="border-t border-gray-800 pt-6 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-400">Valor:</span>
                <span className="font-bold text-[#FF9E00]">R$ {pixData.amount.toFixed(2)}</span>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm">
                <p className="text-blue-400 font-semibold mb-2">⏰ Instruções:</p>
                <ul className="text-left text-gray-300 space-y-2">
                  <li>1. Abra o app do seu banco</li>
                  <li>2. Escolha pagar com PIX QR Code ou Copia e Cola</li>
                  <li>3. Escaneie o código ou cole o texto acima</li>
                  <li>4. Confirme o pagamento</li>
                  <li>5. Acesso liberado automaticamente após confirmação</li>
                </ul>
              </div>

              <div className="text-sm text-gray-500">
                Este PIX expira em: {new Date(pixData.expiresAt).toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F5A]/20 via-transparent to-[#FF9E00]/10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Finalize seu pedido 🚀
              </h1>
              <p className="text-gray-400">
                Você está a um passo de dominar a arte das mensagens
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 border border-gray-800">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    paymentMethod === 'credit-card'
                      ? 'bg-[#FF9E00] text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Cartão</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-[#FF9E00] text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>PIX</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'credit-card' ? (
              <form onSubmit={handleSubmitCreditCard} className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FF9E00]" />
                    Informações de Pagamento
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-400">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="seu@email.com"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-400">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="João Silva"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-400">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-400">
                          Validade
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-400">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-8 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-[#FF9E00]/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>{isProcessing ? 'Processando...' : `Pagar R$ ${totalPrice.toFixed(2)}`}</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>🔒 Pagamento 100% Seguro</span>
                  <span>•</span>
                  <span>✨ Acesso Imediato</span>
                  <span>•</span>
                  <span>🎯 Garantia 7 dias</span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitPix} className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#FF9E00]" />
                    Informações para PIX
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-400">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="seu@email.com"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-400">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="João Silva"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <QrCode className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-bold text-green-400 mb-1">Pagamento Instantâneo com PIX</p>
                        <p className="text-gray-300">
                          Após clicar em "Gerar PIX", você receberá um QR Code para realizar o pagamento pelo app do seu banco.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-8 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-[#FF9E00]/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  <span>{isProcessing ? 'Gerando PIX...' : `Gerar PIX - R$ ${totalPrice.toFixed(2)}`}</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>🔒 Pagamento 100% Seguro</span>
                  <span>•</span>
                  <span>✨ Acesso Imediato</span>
                  <span>•</span>
                  <span>🎯 Garantia 7 dias</span>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 sticky top-8">
              <h3 className="font-bold text-xl mb-6">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between py-4 border-b border-gray-800">
                  <div>
                    <div className="font-semibold">Pacote Mestre da DM</div>
                    <div className="text-sm text-gray-400 mt-1">Acesso completo + bônus</div>
                  </div>
                  <div className="font-bold text-[#FF9E00]">R$ 47,00</div>
                </div>

                <div className="bg-gradient-to-r from-[#6C3EF0]/20 to-[#8B5CF6]/20 border border-[#6C3EF0]/30 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAIBump}
                      onChange={(e) => setHasAIBump(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-600 text-[#6C3EF0] focus:ring-[#6C3EF0] focus:ring-offset-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-[#6C3EF0]" />
                        <span className="font-bold">Adicionar Modo IA</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">
                        Ativa a IA que analisa suas conversas e te mostra o que responder em tempo real
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#6C3EF0]">R$ 29,90</span>
                        <span className="text-xs text-gray-500">pagamento único • acesso vitalício</span>
                      </div>
                    </div>
                  </label>
                </div>

                {hasAIBump && (
                  <div className="flex items-start justify-between py-4 border-b border-gray-800 animate-slide-up">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#6C3EF0]" />
                        Modo IA (vitalício)
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Acesso permanente</div>
                    </div>
                    <div className="font-bold text-[#6C3EF0]">R$ 29,90</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-4 border-t-2 border-gray-700">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-[#FF9E00]">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Acesso imediato após o pagamento</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Garantia de 7 dias - dinheiro de volta</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Suporte prioritário incluído</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div className="text-sm">
                  <div className="font-bold text-orange-400 mb-1">Oferta por Tempo Limitado</div>
                  <p className="text-gray-300">
                    <span className="font-bold">847 pessoas</span> já garantiram acesso. Preço pode subir a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
