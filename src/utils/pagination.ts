export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
  totalItems?: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  totalPages: number;
  offset: number;
}

export function getPagination({ page = 1, limit = 10, totalItems }: PaginationParams): PaginationResult {
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.max(Number(limit) || 10, 1);
  const totalPages = totalItems ? Math.ceil(totalItems / limitNumber) : 0;
  const offset = (pageNumber - 1) * limitNumber;

  return { page: pageNumber, limit: limitNumber, totalPages, offset };
}