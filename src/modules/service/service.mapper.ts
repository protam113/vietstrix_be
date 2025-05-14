import { ServiceDocument } from 'src/entities/service.entity';
import { DataResponse } from './responses/service.response';
import { ServiceStatus } from './service.constant';

export function toDataResponse(
  service: Partial<ServiceDocument>,
): DataResponse {
  return {
    _id: service._id?.toString() ?? '',
    title: service.title ?? '',
    file: service.file ?? '',
    slug: service.slug ?? '',
    content: service.content ?? '',
    description: service.description ?? '',
    category: {
      _id: service.category?._id?.toString() ?? '',
      name: service.category?.name ?? '',
    },
    price: service.price,
    views: service.views ?? 0,
    user: service.user ?? {},
    status: service.status as ServiceStatus,
    createdAt: service.createdAt || new Date(),
    updatedAt: service.updatedAt || new Date(),
  };
}
