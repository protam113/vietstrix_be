import { Base } from './base.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { COLLECTION_KEYS } from 'src/database/collections';
import {
  CategoryStatus,
  CategoryType,
} from 'src/modules/category/category.constant';

@Schema()
export class CategoryEntity extends Base {
  @Prop({ required: true })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  slug: string;

  @Prop({ enum: CategoryType })
  type: string;

  @Prop({ enum: CategoryStatus, default: CategoryStatus.Draft })
  status: string;

  @Prop({ type: Object })
  user: any;
}

export type CategoryDocument = CategoryEntity & Document;
export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
CategorySchema.set('collection', COLLECTION_KEYS.CATEGORY);
