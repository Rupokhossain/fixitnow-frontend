import { baseApi } from "./baseApi"

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => "/api/admin/bookings",
      providesTags: ["Bookings"],
    }),
    getBookings: builder.query({
      query: () => "/api/bookings",
      providesTags: ["Bookings"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/technician/bookings/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Bookings"],
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "/api/bookings", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"], 
    }),
  }),
})

export const {
  useGetAllBookingsQuery,
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
  useCreateBookingMutation 
} = bookingApi
