import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories", 
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "categories", // রিকোয়ারমেন্ট অনুযায়ী তোমার এন্ডপয়েন্ট পাথ চেক করে নিও
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"], 
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;