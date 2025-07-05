import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  avatar?: string;
  created_at: string;
  updated_at: string;
  has_company: boolean;
  cpf?: string;
  phone?: string;
  birth_date?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export interface Company {
  id: string;
  user_id: string;
  corporate_name: string;
  trade_name: string;
  cnpj: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export interface LoginAttempt {
  id: string;
  user_id: string;
  email: string;
  success: boolean;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
} 