import "./News.css";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { Loader } from "../Loader/Loader";

import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

import noImageIcon from "../../images/no-image.png";
import { useState } from "react";
import PropTypes from "prop-types";


export const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[16, 16]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option key={coin.uuid} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={24} md={12} lg={12} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <img
                  src={news?.image?.thumbnail?.contentUrl || noImageIcon}
                  alt="news"
                />
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
              </div>
              <p className="news-description">{news.description}</p>
              <div className="provider-container">
                <div>
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text className="provider-time">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};


News.propTypes = {
  simplified: PropTypes.bool,
};

export default News;
