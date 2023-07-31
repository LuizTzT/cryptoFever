import HTMLReactParser from "html-react-parser";

import { Collapse, Row, Col, Avatar, Typography } from "antd";
import "./Exchanges.css";
import millify from "millify";
import { Loader } from "../Loader/Loader";

import { useGetExchangesQuery } from "../../services/cryptoExchangesApi";
import { useGetExchangeDescQuery } from "../../services/coinPaprika";

const { Text, Link, Title } = Typography;

export const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetExchangesQuery(100);
  const { data: exchangesData } = useGetExchangeDescQuery();

  const exchangesInfo = exchangesList?.data?.exchanges;
  const exchangesFiltered = exchangesData?.map((data) => ({
    name: data.name,
    description: data.description,
    link: data.links?.website,
  }));

  let exchangesInfoWithDescription;

  if (exchangesInfo && exchangesFiltered) {
    exchangesInfoWithDescription = exchangesInfo.map((data) => {
      const matchedExchange = exchangesFiltered.find(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      );
      if (matchedExchange) {
        return {
          ...data,
          description:
            matchedExchange.description || "Missing description from API data.",
          link: matchedExchange.link[0],
        };
      } else {
        return {
          ...data,
          description: "Missing description from API data.",
          link: "",
        };
      }
    });
  }

  if (isFetching) return <Loader />;

  return (
    <>
      <Title className="title-exchange-page" level={2}>
        Information about Bitcoin cryptocurrency
      </Title>

      <Row gutter={16} className="category-container">
        <Col span={9} className="exchange-category">
          <span>Exchange</span>
        </Col>
        <Col span={4} className="exchange-category">
          <span>24h Volume</span>
        </Col>
        <Col span={4} className="exchange-category">
          <span>Markets</span>
        </Col>
        <Col span={7} className="exchange-category">
          <span>Price</span>
        </Col>
      </Row>
      <Collapse>
        {exchangesInfoWithDescription?.map((exchange) => (
          <Collapse.Panel
            key={exchange.uuid}
            showArrow={false}
            header={
              <Row gutter={16}>
                <Col span={9}>
                  <Text>
                    <strong>{exchange.rank}.</strong>
                  </Text>
                  <Avatar src={exchange.iconUrl} className="exchange-image" />
                  <Text className="exchange-name">
                    <strong>{exchange.name}</strong>
                  </Text>
                </Col>
                <Col className="exchange-value" span={4}>
                  {millify(exchange["24hVolume"])}
                </Col>
                <Col className="exchange-value" span={4}>
                  {exchange.numberOfMarkets}
                </Col>
                <Col className="exchange-value" span={7}>
                  $ {parseFloat(exchange.price).toFixed(1)}
                </Col>
              </Row>
            }
          >
            {exchange.description.length > 500
              ? HTMLReactParser(
                  `${exchange.description.substring(0, 500)}...` || ""
                )
              : exchange.description}

            <Title level={4} className="exchange-site">
              {exchange.link && (
                <Link href={exchange.link} target="_blank">
                  {exchange.name}
                </Link>
              )}
            </Title>
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Exchanges;
