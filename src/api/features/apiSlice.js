import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://babystepsbackend-445s.onrender.com/api" }),
  tagTypes: ["Doctor", "Appointment"],
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors",
      providesTags: ["Doctor"],
    }),
    getDoctorSlots: builder.query({
      query: ({ id, date }) => `/doctors/${id}/slots?date=${date}`,
    }),
    getAppointments: builder.query({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),
    getAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointment"],
    }),
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: `/appointments/`,
        method: "POST",
        // params: { date },
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...appointment }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: appointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorSlotsQuery,
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = apiSlice;
export default apiSlice;
