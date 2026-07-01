/** Spring Page<PostSite> JSON */
export interface PostPage {
  content: PostSiteDto[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface PostSiteDto {
  postId: number;
  breed: string;
  gender: string;
  birthDate: string;
  colorFeatures: string;
  price: number;
  healthStatus?: string | null;
  status?: string;
  imageUrl?: string | null;
  category?: { categoryId: number; categoryName: string } | null;
  seller?: { userid: number; username?: string; loginid?: string } | null;
}

export interface CategoryDto {
  categoryId: number;
  categoryName: string;
  displayOrder: number;
}
