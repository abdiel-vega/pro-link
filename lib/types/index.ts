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
          role: Database["public"]["Enums"]["user_role"];
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
          role?: Database["public"]["Enums"]["user_role"];
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
          role?: Database["public"]["Enums"]["user_role"];
          created_at?: string;
          stripe_account_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string;
          stripe_subscription_status?: string;
          subscription_ends_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          client_id: string;
          professional_profile_id: string;
          service_id: string;
          booking_start_time: string;
          booking_end_time: string;
          status: Database["public"]["Enums"]["booking_status"];
          amount_paid_in_cents: number;
          stripe_charge_id: string;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          professional_profile_id: string;
          service_id: string;
          booking_start_time: string;
          booking_end_time: string;
          status?: Database["public"]["Enums"]["booking_status"];
          amount_paid_in_cents: number;
          stripe_charge_id?: string;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          professional_profile_id?: string;
          service_id?: string;
          booking_start_time?: string;
          booking_end_time?: string;
          status?: Database["public"]["Enums"]["booking_status"];
          amount_paid_in_cents?: number;
          stripe_charge_id?: string;
          notes?: string;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          profile_id: string;
          category_id: string;
          title: string;
          description: string;
          price_in_cents: number;
          duration_in_minutes: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          category_id: string;
          title: string;
          description?: string;
          price_in_cents: number;
          duration_in_minutes: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          category_id?: string;
          title?: string;
          description?: string;
          price_in_cents?: number;
          duration_in_minutes?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
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
      user_role: "professional" | "client";
      booking_status: "pending" | "confirmed" | "completed" | "cancelled";
    };
  };
}
