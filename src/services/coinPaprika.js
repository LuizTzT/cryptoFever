import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinPaprikaHeaders = {
  "X-RapidAPI-Key": "YOUR-KEY",
  "X-RapidAPI-Host": "coinpaprika1.p.rapidapi.com",
};

const baseUrl = "https://coinpaprika1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: coinPaprikaHeaders });

export const coinPaprikaApi = createApi({
  reducerPath: "coinPaprikaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchangeDesc: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const { useGetExchangeDescQuery } = coinPaprikaApi;
