import { CreateUpdateCategoryDto } from "../dto/category/create-edit-category.dto";
import { api } from "./api";

const CategoryService = {
  async findAll(search = "", take = 10, skip = 0) {
    return await api.get(`category?search=${search}&take=${take}&skip=${skip}`);
  },

  async findOne(id: any) {
    return await api.get(`category/${id}`);
  },

  async create(payload: CreateUpdateCategoryDto) {
    return await api.post("category", payload);
  },

  async update(id: any, payload: CreateUpdateCategoryDto) {
    return await api.patch(`category/${id}`, payload);
  },

  async delete(id: any) {
    return await api.delete(`category/${id}`);
  },
};

export default CategoryService;
