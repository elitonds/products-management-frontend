import { CreateUpdateProductDto } from "../dto/product/create-edit-product.dto";
import { api } from "./api";

const ProductService = {
  findAll(search = "", take = 10, skip = 0) {
    return api.get(`product?search=${search}&take=${take}&skip=${skip}`);
  },

  async findOne(id: any) {
    return await api.get(`product/${id}`);
  },

  async create(payload: CreateUpdateProductDto) {
    return await api.post("product", payload);
  },

  async update(id: any, payload: CreateUpdateProductDto) {
    return await api.patch(`product/${id}`, payload);
  },

  async delete(id: any) {
    return await api.delete(`product/${id}`);
  },
};

export default ProductService;
