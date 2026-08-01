import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/api/categories", 
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/api/admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"], 
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;