import { IAvailability, IBooking, IUser } from "@/lib/types";
import { baseApi } from "./baseApi";

const technicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTechProfile: builder.query<{ data: IUser; success: boolean }, void>({
      query: () => "technician/profile",
      providesTags: ["Users"],
    }),
    getTechAvailability: builder.query<{ data: IAvailability; success: boolean }, void>({
      query: () => "technician/availability",
      providesTags: ["Bookings"],
    }),
    getTechBookings: builder.query<{ data: IBooking[]; success: boolean }, void>({
      query: () => "technician/bookings",
      providesTags: ["Bookings"],
    }),
    updateTechBooking: builder.mutation<{ success: boolean; message: string }, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `technician/bookings/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Bookings"],
    }),
    getSingleTechnician: builder.query<{ data: IUser; success: boolean }, string>({
  query: (id) => `/technician/${id}`, 
  providesTags: ["Users"],
}),
  }),
});

export const { 
  useGetTechProfileQuery, 
  useGetTechAvailabilityQuery, 
  useGetTechBookingsQuery, 
  useUpdateTechBookingMutation 
} = technicianApi;