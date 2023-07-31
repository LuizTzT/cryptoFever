import "./Navbar.css";
import { useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../../images/icon-logo.png";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">CryptoFever</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu((c) => !c)}
            icon={<MenuOutlined style={{ color: "var(--bgPrimary)" }} />}
            size="large"
          ></Button>
        </div>
        <Menu
          mode="vertical"
          theme="dark"
          id="custom-menu"
          className={`custom-menu ${activeMenu ? "show-menu" : "hide-menu"}`}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="cryptocurrencies" icon={<MoneyCollectOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="exchanges" icon={<BulbOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item key="news" icon={<FundOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
