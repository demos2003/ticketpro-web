import { apiSlice } from "../../apislice";

export const eventsSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getEventsByVendorId: builder.query({
            query:(vendorId) => `/vendor/events/getEvents/${vendorId}`,
        }),
        getEventById: builder.query({
            query: (id) => `/vendor/events/${id}`,
          }),
        createEvent: builder.mutation({
            query: (formData) => ({
                url: '/vendor/events/create-with-image',
                method: 'POST',
                body: formData,
              }),
        })
    }),
    overrideExisting: true,
})


export const {
    useGetEventsByVendorIdQuery,
    useGetEventByIdQuery,
    useCreateEventMutation
} = eventsSlice;