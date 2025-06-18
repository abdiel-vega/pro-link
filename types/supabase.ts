export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          title: string;
          bio: string;
          avatar_url: string;
          phone_number: string;
          created_at: string;
          stripe_account_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          stripe_subscription_status: string;
          subscription_ends_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          title?: string;
          bio?: string;
          avatar_url?: string;
          phone_number?: string;
          created_at?: string;
          stripe_account_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string;
          stripe_subscription_status?: string;
          subscription_ends_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          title?: string;
          bio?: string;
          avatar_url?: string;
          phone_number?: string;
          created_at?: string;
          stripe_account_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string;
          stripe_subscription_status?: string;
          subscription_ends_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          professional_profile_id: string;
          service_id: string;
          client_email: string;
          phone_number: string;
          amount_paid: number;
          stripe_charge_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          professional_profile_id: string;
          service_id: string;
          client_email: string;
          phone_number?: string;
          amount_paid: number;
          stripe_charge_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          professional_profile_id?: string;
          service_id?: string;
          client_email?: string;
          phone_number?: string;
          amount_paid?: number;
          stripe_charge_id?: string;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          description: string;
          price: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          description?: string;
          price: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          description?: string;
          price?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
