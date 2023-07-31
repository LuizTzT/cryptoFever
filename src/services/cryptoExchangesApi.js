import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesHeader = {
  "X-RapidAPI-Key": "YOUR-KEY",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd";

const createRequest = (url) => ({ url, headers: cryptoExchangesHeader });

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: (count) => createRequest(`/exchanges?limit=${count}`),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangesApi;
