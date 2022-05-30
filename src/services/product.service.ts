import { api } from "./api";

const ProductService = {
  findAll(search = "", take = 10, skip = 0) {
    return api.get(`product?search=${search}&take=${take}&skip=${skip}`);
  },
};

export default ProductService;
