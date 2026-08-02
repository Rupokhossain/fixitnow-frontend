import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    credentials: "include", 
  }),
  tagTypes: ["Services", "Bookings", "Users","Categories"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/api/services",
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetServicesQuery } = baseApi;