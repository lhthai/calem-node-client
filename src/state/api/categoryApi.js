import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "categoryApi",
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/categories`,
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (payload) => ({
        url: "/categories",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (item) => ({
        url: `categories/${item._id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
