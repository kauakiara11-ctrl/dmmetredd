/*
  # Create conversions table for tracking purchases

  1. New Tables
    - `conversions`
      - `id` (uuid, primary key) - Unique identifier for each conversion
      - `quiz_attempt_id` (uuid) - Reference to the quiz attempt
      - `email` (text) - Customer email
      - `product` (text) - Product purchased
      - `amount` (numeric) - Purchase amount
      - `has_ai_bump` (boolean) - Whether AI bump was purchased
      - `payment_method` (text) - Payment method used (credit-card or pix)
      - `pix_payment_id` (text) - Abacate Pay PIX payment ID (if applicable)
      - `created_at` (timestamptz) - When the conversion was created

  2. Security
    - Enable RLS on `conversions` table
    - Add policy for service role to manage all conversions
    - Public can insert conversions (for checkout)

  3. Indexes
    - Index on quiz_attempt_id for faster lookups
    - Index on pix_payment_id for payment tracking
    - Index on email for customer lookups
*/

CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_attempt_id uuid,
  email text NOT NULL,
  product text NOT NULL,
  amount numeric NOT NULL,
  has_ai_bump boolean DEFAULT false,
  payment_method text DEFAULT 'credit-card',
  pix_payment_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert conversions"
  ON conversions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage conversions"
  ON conversions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_conversions_quiz_attempt ON conversions(quiz_attempt_id);
CREATE INDEX IF NOT EXISTS idx_conversions_pix_payment ON conversions(pix_payment_id);
CREATE INDEX IF NOT EXISTS idx_conversions_email ON conversions(email);
