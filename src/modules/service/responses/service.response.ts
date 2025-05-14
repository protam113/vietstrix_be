interface Category {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
}

export interface DataResponse {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  user: User;
  views: number;
  category: Category;
  price?: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
