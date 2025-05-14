export interface DetailResponse {
  status: string;
  result: {
    _id: string;
    name: string;
    slug: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
