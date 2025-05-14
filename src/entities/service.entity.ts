import { Base } from './base.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COLLECTION_KEYS } from 'src/database/collections';
import { ServiceStatus } from 'src/modules/service/service.constant';
import { CategoryEntity } from './category.entity';

@Schema()
export class ServiceEntity extends Base {
  @Prop({ required: true })
  title: string;

  @Prop({
    unique: true,
    required: true,
  })
  slug: string;

  @Prop({ required: true })
  file: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, ref: CategoryEntity.name })
  category: CategoryEntity;

  @Prop()
  price?: number;

  @Prop({ default: 0 })
  views: number;

  @Prop({ enum: ServiceStatus, default: ServiceStatus.Draft })
  status: string;

  @Prop({ type: Object })
  user: any;
}
export type ServiceDocument = ServiceEntity & Document;
export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
ServiceSchema.set('collection', COLLECTION_KEYS.SERVICE);
