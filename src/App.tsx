import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/login/Login";
import SignUp from "./screens/signup/Signup";
import Layout from "./components/layout/Layout";
import Overview from "./screens/overview/Overview";
import Events from "./screens/events/Events";
import Tickets from "./screens/tickets/Tickets";
import Settings from "./screens/settings/Settings";
import Customers from "./screens/customers/Customers";
import Reports from "./screens/reports/Reports";
import Location from "./screens/location/Location";
import Adplacement from "./screens/adplacement/Adplacement";
import EventExepense from "./screens/eventexpense/EventExpense";
import Otp from "./screens/otp/Otp";
import ForgotPassword from "./screens/forgotpassword/ForgotPassword";
import ProtectedRoute from "../src/components/protectedroute/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="events" element={<Events />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="location" element={<Location />} />
          <Route path="adplacement" element={<Adplacement />} />
          <Route path="event-expense" element={<EventExepense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
