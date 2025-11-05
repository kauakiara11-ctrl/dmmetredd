export type Question = {
  id: number;
  question: string;
  context: string;
  options: Array<{
    id: string;
    text: string;
    points: number;
    feedback: string;
  }>;
};

export const questions: Question[] = [
  {
    id: 1,
    question: 'Ela posta: "às vezes cansa ser forte o tempo todo 🖤"',
    context: 'Story do Instagram',
    options: [
      {
        id: 'A',
        text: '"Se quiser desabafar, tô aqui."',
        points: 20,
        feedback: 'Muito disponível... parece carente 🤔'
      },
      {
        id: 'B',
        text: '❤️',
        points: 30,
        feedback: 'Neutro demais, sem personalidade 😐'
      },
      {
        id: 'C',
        text: '"Todo mundo cansa, mas poucos têm alguém que entende o silêncio…"',
        points: 50,
        feedback: 'Boa! Essa foi de quem entende o jogo 😏'
      }
    ]
  },
  {
    id: 2,
    question: 'Tu manda um áudio engraçado, ela responde "mds kkk"',
    context: 'WhatsApp',
    options: [
      {
        id: 'A',
        text: 'Manda outro áudio',
        points: 20,
        feedback: 'Tá se esforçando demais... respira 😅'
      },
      {
        id: 'B',
        text: '"Gostou da piada ou da voz?"',
        points: 50,
        feedback: 'Confiante e provocante, perfeito! 🔥'
      },
      {
        id: 'C',
        text: '"kkkk tu é doida"',
        points: 15,
        feedback: 'Morreu a conversa... próximo! 💀'
      }
    ]
  },
  {
    id: 3,
    question: 'Ela diz: "eu sou difícil, viu?"',
    context: 'Conversa no Direct',
    options: [
      {
        id: 'A',
        text: '"Prefiro desafio do que fácil demais 😏"',
        points: 50,
        feedback: 'Mestre! Demonstrou valor sem mendigar 👑'
      },
      {
        id: 'B',
        text: '"Ah, então desisto 😂"',
        points: 25,
        feedback: 'Arriscado, mas tem personalidade 🎲'
      },
      {
        id: 'C',
        text: '"Todo mundo fala isso"',
        points: 10,
        feedback: 'Sem graça... ela já ouviu isso 100x 😴'
      }
    ]
  },
  {
    id: 4,
    question: 'Depois de sumir 2 dias, ela reage com 🔥 no teu story',
    context: 'Instagram Story',
    options: [
      {
        id: 'A',
        text: 'Ignora',
        points: 15,
        feedback: 'Muito frio... não é jogo, é gelo 🧊'
      },
      {
        id: 'B',
        text: '"Voltou das férias?"',
        points: 50,
        feedback: 'Perfeito! Leve e com atitude 😎'
      },
      {
        id: 'C',
        text: '"Valeu 😎"',
        points: 20,
        feedback: 'Sem personalidade... morno demais 🥱'
      }
    ]
  },
  {
    id: 5,
    question: 'Ela fala: "depende do meu humor"',
    context: 'Quando tu chama pra sair',
    options: [
      {
        id: 'A',
        text: '"Espero o humor melhorar 😂"',
        points: 25,
        feedback: 'Passivo... tá esperando ela decidir tudo 😬'
      },
      {
        id: 'B',
        text: '"Então marca o dia que ele vai estar bom"',
        points: 50,
        feedback: 'Assertivo sem ser agressivo, show! 💪'
      },
      {
        id: 'C',
        text: '"Beleza, me avisa"',
        points: 10,
        feedback: 'Perdeu o controle da conversa... friendzone 👋'
      }
    ]
  },
  {
    id: 6,
    question: 'Ela comenta: "você é engraçado kkk"',
    context: 'Depois de uma troca de mensagens',
    options: [
      {
        id: 'A',
        text: '"Valeu 😂 tento"',
        points: 15,
        feedback: 'Inseguro... não diminui teu valor assim 😕'
      },
      {
        id: 'B',
        text: '"É meu jeito de deixar as pessoas à vontade 😌"',
        points: 50,
        feedback: 'Confiante e intencional, perfeito! ✨'
      },
      {
        id: 'C',
        text: '"Se eu não fosse, seria chato né?"',
        points: 20,
        feedback: 'Defensivo... não precisa justificar 🤷'
      }
    ]
  },
  {
    id: 7,
    question: 'Tu manda "boa noite" e ela visualiza mas não responde',
    context: 'WhatsApp - 22h30',
    options: [
      {
        id: 'A',
        text: 'Reage ao story no outro dia',
        points: 40,
        feedback: 'Bom movimento, mas dá pra ser mais criativo 👍'
      },
      {
        id: 'B',
        text: '"Tava difícil dormir ontem, né?"',
        points: 50,
        feedback: 'Ousado e direto, de mestre! 🎯'
      },
      {
        id: 'C',
        text: 'Finge que não viu',
        points: 20,
        feedback: 'Orgulho demais... perde oportunidades 😤'
      }
    ]
  },
  {
    id: 8,
    question: 'Ela manda: "tô com saudade dessa vibe boa"',
    context: 'Story - foto de uma festa antiga',
    options: [
      {
        id: 'A',
        text: '"Saudade é falta de planejamento 😏"',
        points: 50,
        feedback: 'Provocante e convida pra ação, craque! 🚀'
      },
      {
        id: 'B',
        text: '"Também tô"',
        points: 10,
        feedback: 'Sem iniciativa... só concordou 😑'
      },
      {
        id: 'C',
        text: '"A gente podia criar novas vibes"',
        points: 40,
        feedback: 'Bom, mas pode soar forçado demais 🤔'
      }
    ]
  },
  {
    id: 9,
    question: 'Vocês estão conversando bem, aí ela some por 6 horas',
    context: 'WhatsApp - meio da conversa',
    options: [
      {
        id: 'A',
        text: 'Manda "e aí?" depois de 2 horas',
        points: 15,
        feedback: 'Ansioso demais... ela sentiu a necessidade 😰'
      },
      {
        id: 'B',
        text: 'Continua tua vida e espera ela voltar',
        points: 50,
        feedback: 'Abundância! Não tá precisando, tá escolhendo 👑'
      },
      {
        id: 'C',
        text: 'Reage a um story dela',
        points: 30,
        feedback: 'Tá bom, mas mostra que ficou esperando 👀'
      }
    ]
  },
  {
    id: 10,
    question: 'Ela fala: "você deve falar assim com todas"',
    context: 'Depois de um elogio teu',
    options: [
      {
        id: 'A',
        text: '"Não, só com as especiais"',
        points: 25,
        feedback: 'Clichê... ela já ouviu isso antes 🙄'
      },
      {
        id: 'B',
        text: '"Se eu falasse com todas, não teria tempo pra você"',
        points: 50,
        feedback: 'Suave e exclusivo, mandou bem! 💎'
      },
      {
        id: 'C',
        text: '"Falo não, só quando é verdade"',
        points: 35,
        feedback: 'Honesto, mas faltou charme 🤷'
      }
    ]
  }
];

export const getLevelData = (percentage: number) => {
  if (percentage >= 80) {
    return {
      level: 'Mestre da DM',
      icon: '💣',
      description: 'Tu tá no topo! Domina o jogo das mensagens como poucos.',
      color: 'from-orange-500 to-red-500'
    };
  } else if (percentage >= 60) {
    return {
      level: 'Sedutor Digital',
      icon: '🔥',
      description: 'Tu manda bem! Já tem mais jogo que a maioria.',
      color: 'from-purple-500 to-pink-500'
    };
  } else if (percentage >= 40) {
    return {
      level: 'Jogador em Treino',
      icon: '💬',
      description: 'Tá no caminho certo, mas ainda dá pra lapidar.',
      color: 'from-blue-500 to-cyan-500'
    };
  } else {
    return {
      level: 'Iniciante Charmoso',
      icon: '😎',
      description: 'Começando a entender o jogo. Tem potencial!',
      color: 'from-gray-500 to-gray-600'
    };
  }
};
