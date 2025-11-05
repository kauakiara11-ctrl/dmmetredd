import { useState } from 'react';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';
import { questions, Question } from '../data/questions';

type QuizProps = {
  onComplete: (score: number, maxScore: number, answers: Array<{ questionId: number; answerId: string; points: number }>) => void;
};

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{ questionId: number; answerId: string; points: number }>>([]);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const selectedOption = question.options.find(opt => opt.id === selectedAnswer);

  const handleAnswerSelect = (answerId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
    setShowFeedback(true);

    const option = question.options.find(opt => opt.id === answerId);
    if (option) {
      setScore(prev => prev + option.points);
      setAnswers(prev => [...prev, {
        questionId: question.id,
        answerId,
        points: option.points
      }]);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          const finalScore = score + option.points;
          const maxScore = questions.reduce((sum, q) =>
            sum + Math.max(...q.options.map(o => o.points)), 0
          );
          onComplete(finalScore, maxScore, [...answers, {
            questionId: question.id,
            answerId,
            points: option.points
          }]);
        }
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F5A]/20 via-transparent to-[#6C3EF0]/10" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Questão {currentQuestion + 1} de {questions.length}</span>
            <span className="text-[#FF9E00] font-bold">{score} pontos</span>
          </div>

          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF9E00] to-[#6C3EF0] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9E00] to-[#FF6B00] flex items-center justify-center font-bold">
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#FF9E00] font-semibold mb-2">{question.context}</div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight">{question.question}</h2>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {question.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = option.points >= 45;
                const showResult = showFeedback && isSelected;
                const isCorrectAnswer = showFeedback && option.points >= 45;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      isCorrectAnswer
                        ? 'bg-gradient-to-r from-green-600 to-green-700 border-green-500 shadow-lg shadow-green-500/30'
                        : showResult
                        ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-500 shadow-lg shadow-red-500/30'
                        : isSelected
                        ? 'bg-gradient-to-r from-[#1C3F5A] to-[#2a5a7a] border-[#FF9E00]'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                    } border-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center font-bold text-sm">
                          {option.id}
                        </span>
                        <span className="text-base md:text-lg">{option.text}</span>
                      </div>
                      {showFeedback && (
                        <div className="flex-shrink-0">
                          {isCorrectAnswer ? (
                            <CheckCircle2 className="w-6 h-6 text-white animate-bounce-in" />
                          ) : isSelected ? (
                            <XCircle className="w-6 h-6 text-white animate-bounce-in" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && selectedOption && (
            <div className={`animate-slide-up rounded-xl p-5 border-2 ${
              selectedOption.points >= 45
                ? 'bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-500'
                : 'bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-500'
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-2xl">
                  {selectedOption.points >= 45 ? '🔥' : '❌'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#FF9E00] font-bold">+{selectedOption.points} pontos</span>
                  </div>
                  <p className="text-gray-300">{selectedOption.feedback}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showFeedback && currentQuestion === questions.length - 1 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF9E00] to-[#6C3EF0] px-6 py-3 rounded-full animate-pulse-slow">
              <Zap className="w-5 h-5" />
              <span className="font-bold">Calculando seu nível...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
