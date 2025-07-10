export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      advertisements: {
        Row: {
          advertiser_contact: string
          amount_paid: number | null
          content: string | null
          created_at: string
          display_end: string | null
          display_start: string | null
          id: string
          image_url: string | null
          payment_status: string | null
          status: string | null
          title: string
        }
        Insert: {
          advertiser_contact: string
          amount_paid?: number | null
          content?: string | null
          created_at?: string
          display_end?: string | null
          display_start?: string | null
          id?: string
          image_url?: string | null
          payment_status?: string | null
          status?: string | null
          title: string
        }
        Update: {
          advertiser_contact?: string
          amount_paid?: number | null
          content?: string | null
          created_at?: string
          display_end?: string | null
          display_start?: string | null
          id?: string
          image_url?: string | null
          payment_status?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      bicycle_bookings: {
        Row: {
          bicycle_id: string | null
          created_at: string
          customer_contact: string
          customer_name: string
          id: string
          rental_end: string
          rental_start: string
          status: string | null
          total_cost: number
        }
        Insert: {
          bicycle_id?: string | null
          created_at?: string
          customer_contact: string
          customer_name: string
          id?: string
          rental_end: string
          rental_start: string
          status?: string | null
          total_cost: number
        }
        Update: {
          bicycle_id?: string | null
          created_at?: string
          customer_contact?: string
          customer_name?: string
          id?: string
          rental_end?: string
          rental_start?: string
          status?: string | null
          total_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "bicycle_bookings_bicycle_id_fkey"
            columns: ["bicycle_id"]
            isOneToOne: false
            referencedRelation: "bicycles"
            referencedColumns: ["id"]
          },
        ]
      }
      bicycles: {
        Row: {
          created_at: string
          daily_rate: number
          description: string | null
          hourly_rate: number
          id: string
          image_url: string | null
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string
          daily_rate: number
          description?: string | null
          hourly_rate: number
          id?: string
          image_url?: string | null
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string
          daily_rate?: number
          description?: string | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      customer_inquiries: {
        Row: {
          created_at: string
          customer_contact: string
          customer_name: string
          id: string
          message: string
          response: string | null
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_contact: string
          customer_name: string
          id?: string
          message: string
          response?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_contact?: string
          customer_name?: string
          id?: string
          message?: string
          response?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      delivery_requests: {
        Row: {
          assigned_rider: string | null
          created_at: string
          customer_contact: string
          customer_name: string
          delivery_address: string | null
          delivery_fee: number | null
          id: string
          pickup_address: string | null
          service_type: string
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_rider?: string | null
          created_at?: string
          customer_contact: string
          customer_name: string
          delivery_address?: string | null
          delivery_fee?: number | null
          id?: string
          pickup_address?: string | null
          service_type: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_rider?: string | null
          created_at?: string
          customer_contact?: string
          customer_name?: string
          delivery_address?: string | null
          delivery_fee?: number | null
          id?: string
          pickup_address?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_image_url: string | null
          created_at: string
          current_attendees: number | null
          description: string | null
          event_date: string
          id: string
          max_attendees: number | null
          status: string | null
          ticket_price: number | null
          title: string
        }
        Insert: {
          banner_image_url?: string | null
          created_at?: string
          current_attendees?: number | null
          description?: string | null
          event_date: string
          id?: string
          max_attendees?: number | null
          status?: string | null
          ticket_price?: number | null
          title: string
        }
        Update: {
          banner_image_url?: string | null
          created_at?: string
          current_attendees?: number | null
          description?: string | null
          event_date?: string
          id?: string
          max_attendees?: number | null
          status?: string | null
          ticket_price?: number | null
          title?: string
        }
        Relationships: []
      }
      household_items: {
        Row: {
          available: boolean | null
          condition: string | null
          created_at: string
          id: string
          image_url: string | null
          name: string
          partner_shop_id: string | null
          price: number
        }
        Insert: {
          available?: boolean | null
          condition?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          partner_shop_id?: string | null
          price: number
        }
        Update: {
          available?: boolean | null
          condition?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          partner_shop_id?: string | null
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "household_items_partner_shop_id_fkey"
            columns: ["partner_shop_id"]
            isOneToOne: false
            referencedRelation: "partner_shops"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_contact: string
          customer_name: string
          delivery_address: string | null
          id: string
          items: Json
          payment_method: string | null
          payment_status: string | null
          status: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_contact: string
          customer_name: string
          delivery_address?: string | null
          id?: string
          items: Json
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_contact?: string
          customer_name?: string
          delivery_address?: string | null
          id?: string
          items?: Json
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      partner_shops: {
        Row: {
          active: boolean | null
          commission_rate: number | null
          contact: string
          created_at: string
          id: string
          location: string | null
          name: string
          whatsapp_link: string | null
        }
        Insert: {
          active?: boolean | null
          commission_rate?: number | null
          contact: string
          created_at?: string
          id?: string
          location?: string | null
          name: string
          whatsapp_link?: string | null
        }
        Update: {
          active?: boolean | null
          commission_rate?: number | null
          contact?: string
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          combo_items: Json | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_combo: boolean | null
          low_stock_threshold: number | null
          name: string
          price: number
          stock_quantity: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          combo_items?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_combo?: boolean | null
          low_stock_threshold?: number | null
          name: string
          price: number
          stock_quantity?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          combo_items?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_combo?: boolean | null
          low_stock_threshold?: number | null
          name?: string
          price?: number
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      rental_locations: {
        Row: {
          available: boolean | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          available?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          available?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      rental_requests: {
        Row: {
          assigned_agent: string | null
          budget: number | null
          contact: string
          created_at: string
          id: string
          name: string
          preferred_location: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_agent?: string | null
          budget?: number | null
          contact: string
          created_at?: string
          id?: string
          name: string
          preferred_location?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_agent?: string | null
          budget?: number | null
          contact?: string
          created_at?: string
          id?: string
          name?: string
          preferred_location?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rental_settings: {
        Row: {
          id: string
          search_fee: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          search_fee?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          search_fee?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
