import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories", 
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"], 
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;