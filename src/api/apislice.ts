import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import config from "./config";
  import { RootState } from './store';


  const baseQuery = fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      console.log(token)
  
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      return headers;
    },
  });


  const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
  ) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result?.error?.status === 401) {
    //   await logout();
    console.log("logout")
    }
    return result;
  };

  export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['Tickets'] as const,
    endpoints: (builder) => ({}),
  });