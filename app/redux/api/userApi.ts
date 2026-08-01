import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({searchTerm}) => ({
        url: "/api/admin/users",
        params: {
          searchTerm
        }
      }),
      providesTags: ["Users"],
      
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/users/${id}`, 
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userApi;