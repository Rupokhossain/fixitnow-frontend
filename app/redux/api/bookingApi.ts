import { baseApi } from "./baseApi"

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => "admin/bookings",
      providesTags: ["Bookings"],
    }),
    getBookings: builder.query({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/technician/bookings/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Bookings"],
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings", 
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
