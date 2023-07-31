import "./CryptoDetails.css";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { useState } from "react";
import { Loader } from "../Loader/Loader";

import { LineChart } from "../LineChart/LineChart";

import {
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const coinData = cryptosList?.data?.coins.filter(
    (coin) => coin.uuid == coinId
  );
  const coinsStats = cryptosList?.data?.stats;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinData[0]?.price && millify(coinData[0]?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinData[0]?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        coinData[0]?.["24hVolume"] && millify(coinData[0]?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinData[0]?.marketCap && millify(coinData[0]?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinsStats?.totalMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinsStats?.totalExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Total Coins",
      value: coinsStats?.totalCoins,
      icon: <DollarOutlined />,
    },
    {
      title: "Total Market Cap",
      value: millify(coinsStats?.totalMarketCap),
      icon: <RiseOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col>
        <Title level={2} className="coin-name">
          {coinData[0].name} {`(${coinData[0].symbol})`} Price
        </Title>
        <p>
          live price in US dollars. View value statistics, market cap and
          24h volume.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((period) => (
          <Option key={period}>{period}</Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinData[0].price)}
        coinName={coinData[0].name}
      />

      <Row className="stats-container">
        <Col>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coinData[0].name} Value Statistics
            </Title>
            <p>An Overview showing the stats of {coinData[0].name}</p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An Overview showing the stats of all Cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, value, icon }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

export default CryptoDetails;
