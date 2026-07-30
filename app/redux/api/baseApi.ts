import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include", 
  }),
  tagTypes: ["Services", "Bookings", "Users"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetServicesQuery } = baseApi;