export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      job_analysis_forms: {
        Row: {
          additional_comments: string | null
          alternate_position: string | null
          approved_at: string | null
          approved_by: string | null
          challenges: string | null
          created_at: string
          full_name: string
          id: string
          job_purpose: string | null
          main_duties: string | null
          office_division: string | null
          position_title: string | null
          required_competencies: Json | null
          secondary_duties: Json | null
          section_unit: string | null
          signature_url: string | null
          status: Database["public"]["Enums"]["form_status"]
          submitted_at: string | null
          tools_equipment: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_comments?: string | null
          alternate_position?: string | null
          approved_at?: string | null
          approved_by?: string | null
          challenges?: string | null
          created_at?: string
          full_name?: string
          id?: string
          job_purpose?: string | null
          main_duties?: string | null
          office_division?: string | null
          position_title?: string | null
          required_competencies?: Json | null
          secondary_duties?: Json | null
          section_unit?: string | null
          signature_url?: string | null
          status?: Database["public"]["Enums"]["form_status"]
          submitted_at?: string | null
          tools_equipment?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_comments?: string | null
          alternate_position?: string | null
          approved_at?: string | null
          approved_by?: string | null
          challenges?: string | null
          created_at?: string
          full_name?: string
          id?: string
          job_purpose?: string | null
          main_duties?: string | null
          office_division?: string | null
          position_title?: string | null
          required_competencies?: Json | null
          secondary_duties?: Json | null
          section_unit?: string | null
          signature_url?: string | null
          status?: Database["public"]["Enums"]["form_status"]
          submitted_at?: string | null
          tools_equipment?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          admin_signature_url: string | null
          alternate_contact: string | null
          alternate_date_hired: string | null
          alternate_email: string | null
          alternate_employment_status: string | null
          alternate_gender: string | null
          alternate_id_number: string | null
          alternate_name: string | null
          alternate_position: string | null
          alternate_salary_grade: string | null
          alternate_service_years: string | null
          approved_at: string | null
          approved_by: string | null
          competency_type: string | null
          created_at: string
          date_filed: string | null
          disapproval_reason: string | null
          endorsee_name: string | null
          gedsi_responses: Json | null
          id: string
          justification: string | null
          signature_url: string | null
          social_inclusion_responses: Json | null
          status: Database["public"]["Enums"]["nomination_status"]
          supervisor_id: string | null
          training_id: string
          updated_at: string
          user_id: string
          venue: string | null
        }
        Insert: {
          admin_signature_url?: string | null
          alternate_contact?: string | null
          alternate_date_hired?: string | null
          alternate_email?: string | null
          alternate_employment_status?: string | null
          alternate_gender?: string | null
          alternate_id_number?: string | null
          alternate_name?: string | null
          alternate_position?: string | null
          alternate_salary_grade?: string | null
          alternate_service_years?: string | null
          approved_at?: string | null
          approved_by?: string | null
          competency_type?: string | null
          created_at?: string
          date_filed?: string | null
          disapproval_reason?: string | null
          endorsee_name?: string | null
          gedsi_responses?: Json | null
          id?: string
          justification?: string | null
          signature_url?: string | null
          social_inclusion_responses?: Json | null
          status?: Database["public"]["Enums"]["nomination_status"]
          supervisor_id?: string | null
          training_id: string
          updated_at?: string
          user_id: string
          venue?: string | null
        }
        Update: {
          admin_signature_url?: string | null
          alternate_contact?: string | null
          alternate_date_hired?: string | null
          alternate_email?: string | null
          alternate_employment_status?: string | null
          alternate_gender?: string | null
          alternate_id_number?: string | null
          alternate_name?: string | null
          alternate_position?: string | null
          alternate_salary_grade?: string | null
          alternate_service_years?: string | null
          approved_at?: string | null
          approved_by?: string | null
          competency_type?: string | null
          created_at?: string
          date_filed?: string | null
          disapproval_reason?: string | null
          endorsee_name?: string | null
          gedsi_responses?: Json | null
          id?: string
          justification?: string | null
          signature_url?: string | null
          social_inclusion_responses?: Json | null
          status?: Database["public"]["Enums"]["nomination_status"]
          supervisor_id?: string | null
          training_id?: string
          updated_at?: string
          user_id?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nominations_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact_number: string | null
          created_at: string
          date_hired: string | null
          email: string | null
          employee_id: string | null
          employment_status: string | null
          full_name: string
          gender: string | null
          id: string
          office_division: string | null
          position_title: string | null
          salary_grade: string | null
          section_unit: string | null
          supervisor_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          contact_number?: string | null
          created_at?: string
          date_hired?: string | null
          email?: string | null
          employee_id?: string | null
          employment_status?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          office_division?: string | null
          position_title?: string | null
          salary_grade?: string | null
          section_unit?: string | null
          supervisor_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          contact_number?: string | null
          created_at?: string
          date_hired?: string | null
          email?: string | null
          employee_id?: string | null
          employment_status?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          office_division?: string | null
          position_title?: string | null
          salary_grade?: string | null
          section_unit?: string | null
          supervisor_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trainings: {
        Row: {
          competencies: string | null
          cost: string | null
          created_at: string
          description: string | null
          duration: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          level: string | null
          mode: string | null
          start_date: string | null
          target: string | null
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          competencies?: string | null
          cost?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          level?: string | null
          mode?: string | null
          start_date?: string | null
          target?: string | null
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          competencies?: string | null
          cost?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          level?: string | null
          mode?: string | null
          start_date?: string | null
          target?: string | null
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "supervisor" | "employee"
      form_status:
        | "draft"
        | "submitted"
        | "supervisor_approved"
        | "approved"
        | "rejected"
      nomination_status:
        | "pending"
        | "supervisor_approved"
        | "admin_approved"
        | "finalized"
        | "disapproved"
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
    Enums: {
      app_role: ["admin", "supervisor", "employee"],
      form_status: [
        "draft",
        "submitted",
        "supervisor_approved",
        "approved",
        "rejected",
      ],
      nomination_status: [
        "pending",
        "supervisor_approved",
        "admin_approved",
        "finalized",
        "disapproved",
      ],
    },
  },
} as const
