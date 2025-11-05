import { useState } from 'react';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

type AIDemoProps = {
  onContinueToCheckout: () => void;
};

export default function AIDemo({ onContinueToCheckout }: AIDemoProps) {
  const [userMessage, setUserMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showBlockedMessage, setShowBlockedMessage] = useState(false);

  const exampleScenarios = [
    {
      context: 'Ela postou: "cansada dessa rotina 😮‍💨"',
      response: '"Rotina é overrated... quando foi a última vez que tu fez algo totalmente diferente? 🤔"'
    },
    {
      context: 'Ela respondeu seu story com "🔥"',
      response: '"Gostou da vibe ou tá querendo entrar na próxima? 😏"'
    },
    {
      context: 'Ela diz: "tô ocupada essa semana"',
      response: '"Semana que vem então. Marca o dia que tu consegue relaxar 😌"'
    }
  ];

  const handleExampleClick = (scenario: { context: string; response: string }) => {
    setUserMessage(scenario.context);
    setShowResponse(true);
    setAiResponse(scenario.response);
    setShowBlockedMessage(false);
  };

  const handleCustomAnalyze = () => {
    if (userMessage.trim()) {
      const isPresetMessage = exampleScenarios.some(s => s.context === userMessage);
      if (!isPresetMessage) {
        setShowResponse(false);
        setShowBlockedMessage(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C3EF0]/20 via-transparent to-[#FF9E00]/10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6C3EF0] to-[#FF9E00] px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Modo IA - Demonstração Gratuita</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Veja como a IA te ajuda em tempo real
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Selecione um cenário ou digite sua situação para ver a IA em ação
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-400">
                  O que ela mandou?
                </label>
                <textarea
                  value={userMessage}
                  onChange={(e) => {
                    setUserMessage(e.target.value);
                    setShowResponse(false);
                    setShowBlockedMessage(false);
                  }}
                  placeholder='Ex: "você deve falar assim com todas"'
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleCustomAnalyze}
                disabled={!userMessage.trim()}
                className="w-full bg-gradient-to-r from-[#6C3EF0] to-[#8B5CF6] px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Sparkles className="w-5 h-5" />
                <span>Analisar com IA</span>
              </button>
            </div>
          </div>

          {showBlockedMessage && (
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500 rounded-2xl p-6 animate-slide-up">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2 text-orange-400">🔒 Modo VIP Bloqueado</h3>
                  <p className="text-gray-300 mb-4">
                    A análise personalizada de conversas está disponível apenas no modo completo!
                  </p>
                  <div className="bg-black/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Desbloqueie a IA completa por:</div>
                        <div className="text-2xl font-bold text-[#FF9E00] mt-1">R$ 29,90</div>
                        <div className="text-xs text-gray-500">Pagamento único • Acesso vitalício</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onContinueToCheckout}
                    className="w-full bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                  >
                    Desbloquear IA Agora
                  </button>
                </div>
              </div>
            </div>
          )}

          {showResponse && (
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 animate-slide-up">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold mb-2 text-green-400">✨ Resposta Sugerida pela IA</div>
                  <div className="bg-gray-900/50 rounded-xl p-4 mb-4">
                    <p className="text-lg">{aiResponse}</p>
                  </div>
                  <div className="text-sm text-gray-400 space-y-2">
                    <p>💡 <span className="text-white font-semibold">Por que funciona:</span></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Demonstra confiança sem ser arrogante</li>
                      <li>• Cria curiosidade e mantém o mistério</li>
                      <li>• Não é genérico - tem personalidade</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-400">📱 Clique em um exemplo para testar</div>
            <div className="grid grid-cols-1 gap-3">
              {exampleScenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(scenario)}
                  className="text-left bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-[#FF9E00] rounded-xl p-4 transition-all duration-300"
                >
                  <div className="text-sm text-gray-300">{scenario.context}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Curtiu a IA? 🚀
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Desbloqueie a IA completa + todo o método por apenas <span className="text-[#FF9E00] font-bold">R$ 47 + R$ 29,90</span>
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#1C3F5A]/30 to-[#6C3EF0]/30 rounded-xl p-6 border border-[#6C3EF0]/30 max-w-md mx-auto">
                <div className="space-y-3 text-left text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Análise ilimitada de conversas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Sugestões personalizadas em tempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Aprende teu estilo de conversa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Acesso ao método completo incluído</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onContinueToCheckout}
                className="group w-full max-w-md mx-auto bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-8 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-[#FF9E00]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Desbloquear Acesso Completo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-500">
                🔒 Pagamento seguro • ✨ Acesso imediato • 🎯 Garantia de 7 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
