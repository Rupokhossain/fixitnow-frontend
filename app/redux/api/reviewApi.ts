import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "/api/reviews", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "Users"], 
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;