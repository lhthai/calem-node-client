import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "analyticApi",
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getBestsellers: builder.query({
      query: ({fromDate, toDate}) =>
        `/analytics/bestsellers/${fromDate}/${toDate}`,
      providesTags: ["Analytics"],
    }),
    getRevenue: builder.query({
      query: ({fromDate, toDate}) =>
        `/analytics/revenue/${fromDate}/${toDate}`,
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetBestsellersQuery,
  useGetRevenueQuery
} = analyticApi;
