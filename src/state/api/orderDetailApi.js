import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderDetailApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "orderDetailApi",
  tagTypes: ["OrderDetails"],
  endpoints: (builder) => ({
    getOrderDetails: builder.query({
      query: () => `/orderDetails`,
      providesTags: ["OrderDetails"],
    }),
    getOrderDetail: builder.query({
      query: (id) => `/orderDetails/${id}`,
      providesTags: ["OrderDetails"],
    }),
    addOrderDetail: builder.mutation({
      query: (payload) => ({
        url: "/orderDetails",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["OrderDetails"],
    }),
    updateOrderDetail: builder.mutation({
      query: (item) => ({
        url: `orderDetails/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["OrderDetails"],
    }),
    deleteOrderDetail: builder.mutation({
      query: (id) => ({
        url: `/orderDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrderDetails"],
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useGetOrderDetailQuery,
  useAddOrderDetailMutation,
  useUpdateOrderDetailMutation,
  useDeleteOrderDetailMutation,
} = orderDetailApi;
