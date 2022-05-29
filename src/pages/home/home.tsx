import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { IMenu } from "../../dto/menu/menu.dto";
import "./home.css";
import { menuList } from "./menu-structure";

const { Header } = Layout;

interface Props {}

const Home: React.FC<Props> = () => {
  const buildSubMenu = (submenuList: IMenu[]) => {
    return submenuList.map((submenuItem) => {
      const { key, label, submenus, path } = submenuItem;
      if (submenus) {
        return (
          <Menu.SubMenu key={key} title={label}>
            {buildSubMenu(submenus)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={key}>
            {path ? <Link to={path}>{label}</Link> : label}
          </Menu.Item>
        );
      }
    });
  };

  const buildMenu = () => {
    return menuList.map((menuItem) => {
      const { key, label, submenus } = menuItem;
      return (
        <Menu.SubMenu key={key} title={label}>
          {submenus ? buildSubMenu(submenus) : ""}
        </Menu.SubMenu>
      );
    });
  };

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal">{buildMenu()}</Menu>
      </Header>
    </Layout>
  );
};

export default Home;
