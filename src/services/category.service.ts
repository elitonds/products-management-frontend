import { api } from "./api";

const CategoryService = {
  findAll(search = "", take = 10, skip = 0) {
    return api.get(`category?search=${search}&take=${take}&skip=${skip}`);
  },
};

export default CategoryService;
