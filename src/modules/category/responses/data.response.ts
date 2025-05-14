interface User {
  _id: string;
  name: string;
}

export interface DataResponse {
  _id: string;
  name: string;
  slug: string;
  user: User;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
