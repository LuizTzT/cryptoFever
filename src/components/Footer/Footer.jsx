import "./Footer.css"

import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="footer">
      <Space className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
      <Typography.Title className="footer-rights" level={5}>
        CryptoFever &copy; <br />
        All rights reserved
      </Typography.Title>
    </div>
  );
};
