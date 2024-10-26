import "./App.css";
import Navbar from "./components/shared/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJobs from "./components/admin/CreateJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/description/:id",
      element: <JobDescription />,
    },

    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/admin/companies",
      element: <ProtectedRoute><Companies /></ProtectedRoute>,
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>  ,
    },
    {
      path: "/admin/companies/:id",
      element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute><AdminJobs /></ProtectedRoute>  ,
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedRoute><CreateJobs /></ProtectedRoute> ,
    },
    {
      path: "/admin/jobs/:id/applicants",
      element:  <ProtectedRoute><Applicants /></ProtectedRoute>,
    },
    
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
