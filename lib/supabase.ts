import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  is_verified_customer: boolean;
  created_at: string;
  updated_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  mollie_payment_id: string | null;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  purchase_id: string;
  rating: number;
  review_text: string;
  trade_value: string | null;
  trade_category: string | null;
  screenshot_url: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};
