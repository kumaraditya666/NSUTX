// Minimal Database types. Regenerate with `supabase gen types` when DB is live.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface Table<Row, Insert> {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: Record<string, never>;
}

export interface Database {
  public: {
    Tables: {
      societies: Table<
        { id: string; name: string; slug: string; category: string; description: string; accent_color: string; verified: boolean; created_year: number | null },
        { id?: string; name: string; slug: string; category: string; description?: string; accent_color?: string; verified?: boolean; created_year?: number | null }
      >;
      events: Table<
        { id: string; society_id: string; title: string; starts_at: string; ends_at: string; venue: string },
        { id?: string; society_id: string; title: string; description?: string; starts_at: string; ends_at: string; venue: string }
      >;
      announcements: Table<
        { id: string; society_id: string; title: string; body: string },
        { society_id: string; title: string; body?: string; pinned?: boolean }
      >;
      opportunities: Table<
        { id: string; society_id: string; title: string },
        { society_id: string; title: string; description?: string; type?: string; deadline?: string | null; eligibility?: string | null; status?: string }
      >;
      event_registrations: Table<{ event_id: string; user_id: string }, { event_id: string; user_id: string }>;
      follows: Table<{ user_id: string; society_id: string }, { user_id: string; society_id: string; notify?: boolean }>;
      society_admins: Table<{ society_id: string; user_id: string }, { society_id: string; user_id: string }>;
      society_departments: Table<{ id: string }, { society_id: string; name: string }>;
      team_members: Table<{ id: string }, { society_id: string; name: string; role: string; department?: string }>;
      gallery_items: Table<{ id: string }, { society_id: string; title: string; year?: number | null; category?: string; kind?: string }>;
      achievements: Table<{ id: string }, { society_id: string; year: number; title: string; detail?: string }>;
      profiles: Table<{ id: string }, { id: string; email?: string }>;
      notification_prefs: Table<{ user_id: string }, { user_id: string; updates?: boolean; deadlines?: boolean; events?: boolean }>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
