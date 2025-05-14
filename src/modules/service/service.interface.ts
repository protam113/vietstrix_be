import { Document } from 'mongoose';

export interface ContactDocument extends Document {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  link?: string;
  price?: number[];
  status: 'show' | 'hide' | 'popular';
  createdAt: Date;
  updatedAt: Date;
}
