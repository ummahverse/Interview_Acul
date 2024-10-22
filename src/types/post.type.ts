export interface CreatePost {
    caption: string;
    user_id: number;
    is_public?: boolean;
    location?: string;
}
  
export interface PostResponse {
    id: number;
    caption: string;
    user_id: number;
    is_public: boolean;
    location?: string | null;
    created_at: Date;
}
  