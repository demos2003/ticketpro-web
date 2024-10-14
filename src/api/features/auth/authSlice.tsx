import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: localStorage.getItem("email") || "",
    password: "",
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
    accessToken: localStorage.getItem("accessToken"),
    emailVerified: JSON.parse(localStorage.getItem("emailVerified") || "false"),
    userId: localStorage.getItem("userId") || "",
    repName: localStorage.getItem("repName") || "",
  },
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.emailVerified = action.payload.emailVerified;
      state.repName = action.payload.representativeName;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      
      // Save to localStorage
      try {
        localStorage.setItem('accessToken', action.payload.accessToken ?? '');
        localStorage.setItem('isAuthenticated', JSON.stringify(action.payload.isAuthenticated));
        localStorage.setItem('emailVerified', JSON.stringify(action.payload.emailVerified));
        localStorage.setItem('representativeName', action.payload.representativeName);
        localStorage.setItem('userId', action.payload.userId);
        localStorage.setItem('email', action.payload.email);
      } catch (e) {
        console.error('Failed to save data to localStorage', e);
      }
    },
    clearCredentials: (state) => {
      state.email = "";
      state.password = "";
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
      state.accessToken = null;
      state.emailVerified = false;

      // Clear localStorage
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('emailVerified');
        localStorage.removeItem('representativeName');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
      } catch (e) {
        console.error('Failed to clear localStorage', e);
      }
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
      localStorage.setItem('emailVerified', JSON.stringify(action.payload));
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem('isAuthenticated', JSON.stringify(action.payload));
    },
  },
});

export const {
  setCredentials,
  setAuthState,
  clearCredentials,
  logout,
  setAuthenticated,
  setEmailVerified,
} = authSlice.actions;
export default authSlice.reducer;
