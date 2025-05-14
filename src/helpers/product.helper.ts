import { BlogStatus } from 'src/modules/blog/blog.constant';

export function buildProductFilter(params: {
  startDate?: string;
  endDate?: string;
  status?: string;
  category?: string;
  price?: string;
  sortByPrice?: 'asc' | 'desc'; // Thêm tham số sắp xếp theo giá
}): Record<string, any> {
  const { startDate, endDate, status, category, price, sortByPrice } = params;
  const filter: Record<string, any> = {};

  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (status) {
    const statusArray = status.split(',');
    const validStatuses = statusArray.filter((s) =>
      Object.values(BlogStatus).includes(s as BlogStatus),
    );
    if (validStatuses.length > 0) {
      filter.status = { $in: validStatuses };
    }
  }

  if (category) {
    filter.category = category;
  }

  // Nếu có tham số sắp xếp theo giá
  let sort: Record<string, number> | undefined;
  if (sortByPrice) {
    sort = { price: sortByPrice === 'asc' ? 1 : -1 }; // 'asc' là giá rẻ nhất, 'desc' là giá cao nhất
  }

  return {
    filter,
    sort,
  };
}
