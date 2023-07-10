import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "orderApi",
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: (item) => ({
        url: `orders/${item.order._id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
