import { IAvailability, IAvailabilityResponse, IBooking, ITechnicianProfile, IUser } from "@/lib/types"
import { baseApi } from "./baseApi"

const technicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTechProfile: builder.query<
      { success: boolean; data: ITechnicianProfile },
      void
    >({
      query: () => "technician/profile",
      providesTags: ["Users"],
    }),

    getTechAvailability: builder.query<
      { success: boolean; data: IAvailability },
      void
    >({
      query: () => "technician/availability",
      providesTags: ["Users"],
    }),

    getTechBookings: builder.query<
      { success: boolean; data: IBooking[] },
      void
    >({
      query: () => "technician/bookings",
      providesTags: ["Bookings"],
    }),

    updateTechBooking: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `technician/bookings/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Bookings"],
    }),

    getSingleTechnician: builder.query<
      { success: boolean; data: IUser },
      string
    >({
      query: (id) => `technicians/${id}`,
      providesTags: ["Users"],
    }),

    updateTechProfile: builder.mutation({
      query: (body) => ({
        url: "technician/profile",
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Users"],
    }),

    updateAvailability: builder.mutation<IAvailabilityResponse, { availability: string }>({
  query: (data) => ({
    url: "technician/availability", // তোমার ব্যাকএন্ড এন্ডপয়েন্ট (PUT বা PATCH চেক করে নিও)
    method: "PUT", 
    body: data,
  }),
  invalidatesTags: ["Users", "Bookings"], // এটি করলে ড্যাশবোর্ড কার্ড অটো আপডেট হবে
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
  useUpdateAvailabilityMutation
} = technicianApi
