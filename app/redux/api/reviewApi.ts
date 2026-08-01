import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "Users"], 
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;