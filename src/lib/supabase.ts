import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type QuizAttempt = {
  id: string;
  user_id: string;
  score: number;
  max_score: number;
  percentage: number;
  level: string;
  answers: Array<{ questionId: number; answerId: string; points: number }>;
  completed_at: string | null;
  created_at: string;
};

export type Conversion = {
  id: string;
  quiz_attempt_id: string;
  email: string;
  product: string;
  amount: number;
  has_ai_bump: boolean;
  created_at: string;
};
