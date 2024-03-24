import PatientProfile from "./Components/Patient/PatientProfile/PatientProfile.jsx";
import WelcomePage from "./Components/authComponent/WelcomePage.jsx";
import LandingPage from "./Components/landingPage/LandingPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DoctorProfile from "./Components/Doctor/DoctorProfile/DoctorProfile.jsx";
// import NavBar from "./UI/NavBar";
import Header from "./Components/HomePage/Header.jsx";
import "./index.css";
import Appointment from "./Components/Appointments/Appointment.jsx";
import DoctorProfilePatient from "./Components/Doctor/DoctorProfilePatient/DoctorProfilePatient.jsx";
import PatientRoot from "./Components/Patient/PatientRoute/PatientRoot.jsx";
import SignUp from "./Components/authComponent/Signup.jsx";
import PregnancyPanic from "./Components/Education/templatePage.js";
import SexualityWTF from "./Components/Education/SexualityWTF.js";
import NavigatingConsent from "./Components/Education/NavigatingConsent.js";
import SexualAnatomy from "./Components/Education/SexualAnatomy.js";
import Education from "./Components/Education/Education.jsx";
import DoctorRoot from "./Components/Doctor/DoctorRoute/DoctorRoot.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./util/appointment.js";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <WelcomePage />,
        },
        {
          path: "education",
          element: <SexualAnatomy />,
          children: [
            {
              path: "sexualitywtf",
              element: <SexualityWTF />,
            },
          ],
        },
        {
          path: "patient/:id",
          element: <PatientRoot />,
          children: [
            {
              path: "home",
              element: <Header />,
            },
            {
              path: "profile",
              element: <PatientProfile />,
            },
            {
              path: "findADoctor",
              element: <DoctorProfilePatient />,
            },
          ],
        },
        {
          path: "doctor/me",
          element: <DoctorRoot />,
          children: [
            {
              path: "home",
              element: <Header />,
            },
            {
              path: "profile",
              element: <DoctorProfile />,
            },
            {
              path: "appointment",
              element: <Appointment />,
            },
          ],
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
  // return <DoctorProfilePatient />;
}
