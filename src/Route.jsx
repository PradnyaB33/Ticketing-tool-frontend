import React from "react";
import { Route, Routes } from "react-router-dom";
import TermsAndConditionsPage from "./components/TermsPrivacyCookies/termsconditonpage";
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import RequireAuth, { AuthProvider } from "./context/AuthProvider";
import Signup from "./pages/SignUp/NewSignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivacyPolicy from "./components/TermsPrivacyCookies/PrivacyPolicy";
import TabTermsPrivacyPolicy from "./components/TermsPrivacyCookies/TabTermsPrivacyPolicy";
import ParentNotification from "./pages/AllNotifications/page";
import ResetNewPassword from "./pages/ResetNewPassword/ResetNewPassword";
import Header from "./components/app-layout/components/Header";
import LoginPage from "./pages/Test/LoginPage";
import SelfEmployeeTest from "./pages/Test/SelfEmployeeTest";
import RoleBasedNavigation from "./pages/HR-Helpdesk/Rolebasednav";
import HRAdminDashboard from "./pages/HR-Helpdesk/Dashboard/hradmindashboard";
import TicketHistory from "./pages/HR-Helpdesk/Employee/TicketHistory";
import HowToDocuments from "./pages/HR-Helpdesk/HowtoDoc/HowToDocuments";
import RaisedTickets from "./pages/HR-Helpdesk/admin/RaisedTickets";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="849324104799-loeq6pqf7e7csvrir27tktq4abpcvmt9.apps.googleusercontent.com">
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/terms-policy-cookies"
            element={<TabTermsPrivacyPolicy />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* SelfOnboarding */}
          <Route
            path="/organisation/:organisationId/Selfemployee-onboarding/:employeeId"
            element={
              <RequireAuth permission={["Employee"]}>
                <SelfEmployeeTest />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Header />}>
            {/* Training Routes */}
            
            <Route path="/resetpassword" element={<ResetNewPassword />} />

            <Route path="/verify/:token/" element={<AnimationComponent />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            

            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditionsPage />}
            />

            <Route
              path="/organisation/:organisationId/tickets"
              element={
                <RequireAuth
                  permission={["Employee", "Super-Admin", "HR", "Hr-Admin"]}
                >
                  <RoleBasedNavigation />
                </RequireAuth>
              }
            />

            <Route
              path="/organisation/:organisationId/ticket-history"
              element={
                <RequireAuth permission={["Employee"]}>
                  <TicketHistory />
                </RequireAuth>
              }
            />

            <Route
              path="/organisation/:organisationId/raised-tickets"
              element={
                <RequireAuth permission={["Super-Admin", "Hr-Admin", "HR"]}>
                  <RaisedTickets />
                </RequireAuth>
              }
            />

            <Route
              path="/organisation/:organisationId/How-to-Doc"
              element={
                <RequireAuth
                  permission={["Super-Admin", "Hr-Admin", "HR", "Employee"]}
                >
                  <HowToDocuments />
                </RequireAuth>
              }
            />

            <Route
              // path="/organisation/:organisationId/dashboard/HR-Admin"
              path = "/"
              element={
                <RequireAuth permission={[ "Super-Admin",
                    "Delegate-Super-Admin",
                    "Department-Head",
                    "Delegate-Department-Head",
                    "Department-Admin",
                    "Delegate-Department-Admin",
                    "Accountant",
                    "Delegate-Accountant",
                    "HR",
                    "Hr-Admin",
                    "Manager",
                    "Employee",
                    "Teacher",]}>
                  <HRAdminDashboard />
                </RequireAuth>
              }
            />

            
            <Route
              path="/notification"
              element={
                <RequireAuth
                  permission={[
                    "Super-Admin",
                    "Delegate-Super-Admin",
                    "Department-Head",
                    "Delegate-Department-Head",
                    "Department-Admin",
                    "Delegate-Department-Admin",
                    "Accountant",
                    "Delegate-Accountant",
                    "HR",
                    "Hr-Admin",
                    "Manager",
                    "Employee",
                    "Teacher",
                  ]}
                >
                  <ParentNotification />
                </RequireAuth>
              }
            />
            <Route
              path="/organisation/:organisationId/notification"
              element={
                <RequireAuth
                  permission={[
                    "Super-Admin",
                    "Delegate-Super-Admin",
                    "Department-Head",
                    "Delegate-Department-Head",
                    "Department-Admin",
                    "Delegate-Department-Admin",
                    "Accountant",
                    "Delegate-Accountant",
                    "HR",
                    "Hr-Admin",
                    "Manager",
                    "Employee",
                    "Teacher",
                  ]}
                >
                  <ParentNotification />
                </RequireAuth>
              }
            />

            
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

// function RequireAuth({ children, permission }) {
//   const { getCurrentUser, useGetCurrentRole } = UserProfile();
//   const navigate = useNavigate("");
//   const user = getCurrentUser();
//   const role = useGetCurrentRole();
//   const isPermission = permission?.includes(role);

//   // Check if the current path includes either "sign-in" or "sign-up"
//   const isAuthPage =
//     window.location.pathname.includes("sign-in") ||
//     window.location.pathname.includes("sign-up");

//   if (!isAuthPage) {
//     if (!user) return <Navigate to={"/sign-in"} />;
//     if (user && isPermission) return children;
//     if (!isPermission) return navigate(-1);
//   }

//   return children;
// }
