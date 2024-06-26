import { ApiSlice } from "./ApiSlice";
const userApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password, name, contact }) => ({
        url: "/users/register",
        method: "POST",
        body: {
          email: email,
          password: password,
          name: name,
          contact: contact,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    verifyJWT: builder.mutation({
      query: (jwt) => ({
        url: "users/verifyJWT",
        method: "POST",
        body: {
          jwt,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyJWTMutation } =
  userApi;
