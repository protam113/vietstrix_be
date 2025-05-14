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
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailResponse {
  status: string;
  result: {
    _id: string;
    title: string;
    slug: string;
    file: string;
    content: string;
    description: string;
    category: Category;
    views: number;
    user: User;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
