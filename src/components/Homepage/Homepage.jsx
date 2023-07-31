import "./Homepage.css";
import millify from "millify";
import { Col, Row, Statistic, Typography } from "antd";
import { Loader } from "../Loader/Loader";
const { Title } = Typography;

import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Cryptocurrencies } from "../Cryptocurrencies/Cryptocurrencies";
import { News } from "../News/News";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic className="statistics-crypto" title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            className="statistics-crypto"
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            className="statistics-crypto"
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            className="statistics-crypto"
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            className="statistics-crypto"
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <Title level={3} className="show-more">
        <Link to="/cryptocurrencies">Show More</Link>
      </Title>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
      </div>
      <News simplified />
      <Title level={3} className="show-more">
        <Link to="/news">Show More</Link>
      </Title>
    </>
  );
};

export default Homepage;
