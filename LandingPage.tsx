import { Smartphone, MessageCircle, Zap } from 'lucide-react';

type LandingPageProps = {
  onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F5A]/30 via-transparent to-[#FF9E00]/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#FF9E00] animate-pulse" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] bg-clip-text text-transparent">
                Mestre da DM
              </h1>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Nunca mais trave<br />no papo com ela 💬
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Descubra o quanto você é bom de mensagem e aprenda o jeito certo de fazer ela se interessar <span className="text-[#FF9E00] font-semibold">sem parecer carente.</span>
          </p>

          <div className="relative max-w-sm mx-auto my-8 md:my-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9E00] to-[#6C3EF0] rounded-3xl blur-xl opacity-50 animate-pulse-slow" />
            <div className="relative bg-[#1a1a1a] rounded-3xl p-6 shadow-2xl border border-gray-800">
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                  <div>
                    <div className="font-semibold">Ela 💕</div>
                    <div className="text-xs text-green-400">online</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm">você é engraçado kkk</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] rounded-2xl rounded-tr-none p-3 max-w-[85%] ml-auto">
                    <p className="text-sm text-white">É meu jeito de deixar as pessoas à vontade 😌</p>
                  </div>
                  <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[70%]">
                    <p className="text-sm">gostei disso 🔥</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF9E00] to-[#FF6B00] px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:shadow-[#FF9E00]/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Começar o Desafio Grátis</span>
            <Zap className="w-6 h-6 group-hover:animate-bounce" />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 text-sm md:text-base text-gray-400">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#FF9E00]" />
              <span>100% Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#FF9E00]" />
              <span>10 Situações Reais</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF9E00]" />
              <span>Resultado Instantâneo</span>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <p className="text-gray-500 text-sm">Baseado em +1000 conversas analisadas</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
                ⭐ "Funcionou na hora" - Lucas M.
              </div>
              <div className="bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
                ⭐ "Ela respondeu diferente" - Pedro R.
              </div>
              <div className="bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
                ⭐ "Mudou meu jogo" - Rafael S.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
