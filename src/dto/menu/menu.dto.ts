export interface IMenu {
  key: string;
  label: string;
  path?: string;
  submenus?: IMenu[];
}
