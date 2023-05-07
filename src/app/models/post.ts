import { Category } from './category';

export interface Post {
  title: string;
  slug: string;
  category: {
    categoryId: string;
    category: string;
  };
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
