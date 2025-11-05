import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import AIDemo from './components/AIDemo';
import Checkout from './components/Checkout';
import { supabase } from './lib/supabase';
import { getLevelData } from './data/questions';

type Stage = 'landing' | 'quiz' | 'results' | 'ai-demo' | 'checkout';

function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [quizAttemptId, setQuizAttemptId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const handleStartQuiz = () => {
    window.scrollTo(0, 0);
    setStage('quiz');
  };

  const handleQuizComplete = async (
    finalScore: number,
    finalMaxScore: number,
    answers: Array<{ questionId: number; answerId: string; points: number }>
  ) => {
    const calculatedPercentage = Math.round((finalScore / finalMaxScore) * 100);
    const displayPercentage = Math.min(calculatedPercentage, 75);
    const levelData = getLevelData(displayPercentage);

    setScore(finalScore);
    setMaxScore(finalMaxScore);
    setPercentage(displayPercentage);

    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: userId,
          score: finalScore,
          max_score: finalMaxScore,
          percentage: displayPercentage,
          level: levelData.level,
          answers: answers,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setQuizAttemptId(data.id);
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }

    window.scrollTo(0, 0);
    setStage('results');
  };

  const handleContinueToAIDemo = () => {
    window.scrollTo(0, 0);
    setStage('ai-demo');
  };

  const handleContinueToCheckout = () => {
    window.scrollTo(0, 0);
    setStage('checkout');
  };

  const handleBackToAIDemo = () => {
    window.scrollTo(0, 0);
    setStage('ai-demo');
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStartQuiz} />}
      {stage === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {stage === 'results' && (
        <Results
          score={score}
          maxScore={maxScore}
          percentage={percentage}
          onContinue={handleContinueToAIDemo}
        />
      )}
      {stage === 'ai-demo' && <AIDemo onContinueToCheckout={handleContinueToCheckout} />}
      {stage === 'checkout' && quizAttemptId && (
        <Checkout quizAttemptId={quizAttemptId} onBack={handleBackToAIDemo} />
      )}
    </>
  );
}

export default App;
