import { Spin } from "antd";
import "./Loader.css";

export const Loader = () => {
  return (
    <div>
      <Spin className="loader" size="large"/>
    </div>
  );
};

export default Loader;
