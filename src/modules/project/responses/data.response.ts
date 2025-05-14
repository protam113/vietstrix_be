interface Service {
  _id: string;
  title: string;
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
  service: Service[];
  brand_name: string;
  testimonial: string;
  link: string;
  user: User;
  views: number;
  client: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
