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


export interface PaginationResponse<T> {
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    data: T[];
}

export interface GetPostsManyResponse {
    status: boolean;
    message: string;
    data: {
        posts: PostResponse[];
        pagination: PaginationResponse<PostResponse>;
    };
}
