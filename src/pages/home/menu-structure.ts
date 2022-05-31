import { IMenu } from "../../dto/menu/menu.dto";

export const menuList: IMenu[] = [
  {
    key: "cadasters",
    label: "Cadastros",
    submenus: [
      { key: "category", label: "Categoria", path: "/category" },
      { key: "product", label: "Produto", path: "/product" },
    ],
  }
];
