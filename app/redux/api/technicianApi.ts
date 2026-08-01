import { IAvailability, IAvailabilityResponse, IBooking, ITechnicianProfile, IUser } from "@/lib/types"
import { baseApi } from "./baseApi"

const technicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTechProfile: builder.query<
      { success: boolean; data: ITechnicianProfile },
      void
    >({
      query: () => "/api/technician/profile",
      providesTags: ["Users"],
    }),

    getTechAvailability: builder.query<
      { success: boolean; data: IAvailability },
      void
    >({
      query: () => "/api/technician/availability",
      providesTags: ["Users"],
    }),

    getTechBookings: builder.query<
      { success: boolean; data: IBooking[] },
      void
    >({
      query: () => "/api/technician/bookings",
      providesTags: ["Bookings"],
    }),

    updateTechBooking: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/technician/bookings/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Bookings"],
    }),

    getSingleTechnician: builder.query<
      { success: boolean; data: IUser },
      string
    >({
      query: (id) => `/api/technicians/${id}`,
      providesTags: ["Users"],
    }),

    updateTechProfile: builder.mutation({
      query: (body) => ({
        url: "/api/technician/profile",
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Users"],
    }),

    updateAvailability: builder.mutation<IAvailabilityResponse, { availability: string }>({
  query: (data) => ({
    url: "/api/technician/availability", // তোমার ব্যাকএন্ড এন্ডপয়েন্ট (PUT বা PATCH চেক করে নিও)
    method: "PUT", 
    body: data,
  }),
  invalidatesTags: ["Users", "Bookings"], // এটি করলে ড্যাশবোর্ড কার্ড অটো আপডেট হবে
}),
// reviewApi.ts এর ভেতরে এটি যোগ করো
getAllReviews: builder.query({
  query: () => "/api/reviews", // তোমার ব্যাকএন্ডের GET /reviews এন্ডপয়েন্ট অনুযায়ী
  providesTags: ["Users"], // ট্যাগটি Users রাখো যাতে প্রোফাইল আপডেটের সাথে মিলে যায়
}),

    
  }),
})

export const {
  useGetTechProfileQuery,
  useGetTechAvailabilityQuery,
  useGetTechBookingsQuery,
  useUpdateTechBookingMutation,
  useGetSingleTechnicianQuery,
  useUpdateTechProfileMutation,
  useUpdateAvailabilityMutation,
  useGetAllReviewsQuery 
} = technicianApi
