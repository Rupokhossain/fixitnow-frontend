import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
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