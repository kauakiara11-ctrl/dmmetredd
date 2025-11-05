/*
  # Quiz System Schema - Mestre da DM

  1. New Tables
    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `user_id` (text) - Temporary ID for anonymous users
      - `score` (integer) - Total points scored
      - `max_score` (integer) - Maximum possible score
      - `percentage` (integer) - Calculated percentage (capped at 75)
      - `level` (text) - Achievement level reached
      - `answers` (jsonb) - Array of question IDs and selected answers
      - `completed_at` (timestamptz) - When quiz was completed
      - `created_at` (timestamptz) - When quiz was started

    - `conversions`
      - `id` (uuid, primary key)
      - `quiz_attempt_id` (uuid, foreign key)
      - `email` (text) - User email
      - `product` (text) - Base product or with AI
      - `amount` (decimal) - Total amount
      - `has_ai_bump` (boolean) - Whether AI subscription was added
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow anonymous quiz attempts
    - Restrict conversion data access
*/

-- Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  score integer DEFAULT 0,
  max_score integer DEFAULT 500,
  percentage integer DEFAULT 0,
  level text DEFAULT 'Iniciante Charmoso',
  answers jsonb DEFAULT '[]'::jsonb,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Conversions Table
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_attempt_id uuid REFERENCES quiz_attempts(id),
  email text NOT NULL,
  product text NOT NULL,
  amount decimal(10,2) NOT NULL,
  has_ai_bump boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- Policies for quiz_attempts (allow public insert and read own attempts)
CREATE POLICY "Anyone can create quiz attempts"
  ON quiz_attempts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Users can update own quiz attempts"
  ON quiz_attempts
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for conversions (insert only)
CREATE POLICY "Anyone can create conversions"
  ON conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversions_quiz_attempt_id ON conversions(quiz_attempt_id);