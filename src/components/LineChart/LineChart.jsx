import "./LineChart.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js/auto";

import PropTypes from "prop-types";

const coinHistoryPropTypes = PropTypes.shape({
  data: PropTypes.shape({
    change: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
});

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const { Title } = Typography;

export const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    const timestampInSeconds = coinHistory?.data?.history[i].timestamp;
    const timestampInMilliseconds = timestampInSeconds * 1000;
    coinTimeStamp.push(new Date(timestampInMilliseconds).toLocaleDateString());
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#7b2cbf",
        borderColor: "#7b2cbf",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          {coinHistory?.data?.change > 0 ? (
            <Title level={5} className="price-change">
              <ArrowUpOutlined style={{ color: "green", marginRight: 5 }} />
              {coinHistory?.data?.change}%
            </Title>
          ) : (
            <Title level={5} className="price-change">
              <ArrowDownOutlined style={{ color: "red", marginRight: 5 }} />
              {coinHistory?.data?.change}%
            </Title>
          )}

          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

LineChart.propTypes = {
  coinHistory: coinHistoryPropTypes,
  currentPrice: PropTypes.string,
  coinName: PropTypes.string,
};
