import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "productApi",
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
      providesTags: ["Products"],
    }),
    getProductByCategory: builder.query({
      query: (categoryID) => `/products/${categoryID}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (item) => ({
        url: `products/${item._id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
