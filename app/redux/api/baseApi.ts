import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set("authorization", `Bearer ${token}`) 
      }
      return headers
    },
    credentials: "include",
  }),
  tagTypes: ["Services", "Bookings", "Users", "Categories"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/api/services",
      providesTags: ["Services"],
    }),
  }),
})

export const { useGetServicesQuery } = baseApi
