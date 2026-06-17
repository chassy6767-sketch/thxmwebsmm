import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createNoopQuery() {
  const chain: any = new Proxy(function () {}, {
    get(target, prop) {
      if (prop === "then") {
        return (resolve: (value: { data: null; error: null; count: null }) => void) =>
          resolve({ data: null, error: null, count: null });
      }

      if (prop === "catch" || prop === "finally") {
        return () => chain;
      }

      return chain;
    },
    apply() {
      return chain;
    },
  });

  return chain;
}

function createNoopSupabaseClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
      signUp: async () => ({ data: { user: null, session: null }, error: null }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
      }),
    },
    from: () => createNoopQuery(),
    rpc: async () => ({ data: null, error: null }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        remove: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    channel: () => ({
      on() {
        return this;
      },
      subscribe() {
        return this;
      },
      unsubscribe() {
        return Promise.resolve();
      },
    }),
    removeChannel: async () => undefined,
  } as const;
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createNoopSupabaseClient();

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
