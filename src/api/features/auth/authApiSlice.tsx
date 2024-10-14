import { apiSlice } from "../../apislice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email, password}) => ({
        url: "/auth/authenticate",
        method: "POST",
        body: { email, password },
      }),
    }),
    signUp: builder.mutation({
      query: ({ email, password, phoneNumber, representativeName, role, organizationType, organizerType  }) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: {
            email,
            password,
            phoneNumber,
            representativeName,
            organizationType,
            role,
            organizerType
          },
        };
      },
    }),
    validateEmail: builder.mutation({
      query: ({ email, otp }) => {
        return {
          url: "/auth/validate-otp",
          method: "POST",
          body: {
            email,
            otp,
          },
          responseHandler: 'text'
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useSignUpMutation, useValidateEmailMutation } =
  authApiSlice;
