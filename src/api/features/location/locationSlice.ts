import { apiSlice } from "../../apislice";

export const locationsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocationsByVendorId: builder.query({
      query: (vendorId) => `/location/getLocations/${vendorId}`,
    }),
    registerLocation: builder.mutation({
      query: ({ vendorId, address, stadiumName, capacity }) => ({
        url: "/location/new-location",
        method: "POST",
        body: {
          vendorId,
          address,
          stadiumName,
          capacity,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetLocationsByVendorIdQuery, useRegisterLocationMutation } =
  locationsSlice;
