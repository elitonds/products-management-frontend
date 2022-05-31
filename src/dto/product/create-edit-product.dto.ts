export interface CreateUpdateProductDto {
  code: string;
  name: string;
  price: string;
  categoryId: number;
  details?: string;
}
