import { Trophy, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { getLevelData } from '../data/questions';

type ResultsProps = {
  score: number;
  maxScore: number;
  percentage: number;
  onContinue: () => void;
};

export default function Results({ score, maxScore, percentage, onContinue }: ResultsProps) {
  const levelData = getLevelData(percentage);
  const displayPercentage = Math.min(percentage, 75);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F5A]/30 via-transparent to-[#FF9E00]/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9E00] to-[#6C3EF0] rounded-full blur-2xl opacity-50 animate-pulse-slow" />
            <div className="relative text-6xl md:text-8xl animate-bounce-in">
              {levelData.icon}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Você é <span className={`bg-gradient-to-r ${levelData.color} bg-clip-text text-transparent`}>
                {levelData.level}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {levelData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl md:text-4xl font-bold text-[#FF9E00] mb-2">
                {displayPercentage}%
              </div>
              <div className="text-sm text-gray-400">Aproveitamento</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl md:text-4xl font-bold text-[#6C3EF0] mb-2">
                {score}
              </div>
              <div className="text-sm text-gray-400">Pontos Totais</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
                Top 10%
              </div>
              <div className="text-sm text-gray-400">Posição Geral</div>
            </div>
          </div>

          {displayPercentage >= 75 && (
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/50 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-lg mb-2">🔒 Modo VIP Bloqueado</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Tu tá no limite do modo gratuito! Pra ter acesso aos 25% restantes e virar um verdadeiro mestre, precisa desbloquear o conteúdo completo.
                  </p>
                  <div className="text-xs text-orange-400">
                    +150 exemplos reais • IA de análise • Templates prontos
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-[#FF9E00]" />
              <h2 className="text-2xl md:text-3xl font-bold">Desbloqueie o Modo Mestre</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left">
                <Trophy className="w-5 h-5 text-[#FF9E00] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Método Completo de Conquista</div>
                  <div className="text-sm text-gray-400">Do primeiro "oi" até marcar o encontro</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <Trophy className="w-5 h-5 text-[#FF9E00] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">+150 Exemplos de Conversas Reais</div>
                  <div className="text-sm text-gray-400">Situações testadas e aprovadas</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <Trophy className="w-5 h-5 text-[#FF9E00] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Templates de Resposta Prontos</div>
                  <div className="text-sm text-gray-400">Copy & paste adaptado pra cada situação</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <Trophy className="w-5 h-5 text-[#FF9E00] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Guia de Story Game</div>
                  <div className="text-sm text-gray-400">Como chamar atenção sem parecer desesperado</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1C3F5A]/30 to-[#6C3EF0]/30 rounded-xl p-4 mb-6 border border-[#6C3EF0]/30">
              <div className="text-sm text-gray-400 mb-1">Oferta Especial</div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 line-through text-lg">R$ 97</span>
                <span className="text-3xl font-bold text-[#FF9E00]">R$ 47</span>
                <span className="text-gray-400">pagamento único</span>
              </div>
            </div>

            <button
              onClick={onContinue}
              className="group w-full bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-8 py-4 rounded-xl text-lg font-bold shadow-2xl hover:shadow-[#FF9E00]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Testar a IA Grátis Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Acesso imediato • Garantia de 7 dias • Acesso vitalício
            </p>
          </div>

          <div className="pt-4">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <span>🔒 Pagamento 100% Seguro</span>
              <span>•</span>
              <span>✨ +847 alunos ativos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
