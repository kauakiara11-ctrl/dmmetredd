import { useState } from 'react';
import { CreditCard, Lock, Sparkles, Check, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

type CheckoutProps = {
  quizAttemptId: string;
  onBack: () => void;
};

export default function Checkout({ quizAttemptId, onBack }: CheckoutProps) {
  const [email, setEmail] = useState('');
  const [hasAIBump, setHasAIBump] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const basePrice = 47.0;
  const aiBumpPrice = 29.9;
  const totalPrice = hasAIBump ? basePrice + aiBumpPrice : basePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await supabase.from('conversions').insert({
        quiz_attempt_id: quizAttemptId,
        email,
        product: hasAIBump ? 'Mestre da DM + IA' : 'Mestre da DM',
        amount: totalPrice,
        has_ai_bump: hasAIBump
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
