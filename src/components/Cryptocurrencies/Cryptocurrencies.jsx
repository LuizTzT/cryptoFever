import "./Cryptocurrencies.css";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import PropTypes from "prop-types";

export const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[16, 16]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            className="crypto-card"
            key={`${currency.uuid}`}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                className="card-cryptocurrencies"
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>
                  <strong>Ticker:</strong> {currency.symbol}
                </p>
                <p>
                  <strong>Price:</strong> {`$ ${millify(currency.price)}`}
                </p>
                <p>
                  <strong>Market Cap:</strong> {millify(currency.marketCap)}
                </p>
                <p>
                  <strong>Daily Change:</strong> {currency.change}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

Cryptocurrencies.propTypes = {
  simplified: PropTypes.bool,
};

export default Cryptocurrencies;
