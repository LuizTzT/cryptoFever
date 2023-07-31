// server.cjs
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3001; // Porta em que o servidor irá ouvir as solicitações

app.use(express.json());

// Função assíncrona para lidar com a solicitação da API do CoinMarketCap
app.get("/api/exchanges", async (req, res) => {
  try {
    // Faça a solicitação à API do CoinMarketCap aqui usando a chave de API
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/exchange/info",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "90cf3e92-9495-4256-89de-73dc28b9fc03",
        },
      }
    );
    const data = response.data;

    // Envie os dados obtidos da API de volta como resposta ao cliente
    res.json(data);
  } catch (error) {
    console.error("Erro ao fazer solicitação à API do CoinMarketCap:", error);
    res.status(500).json({ error: "Erro ao obter os dados das exchanges" });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
