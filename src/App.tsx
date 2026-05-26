import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { Entry } from "./pages/Entry/Entry";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Layout } from "./layout/PageLayout/PageLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthContextProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/entry", element: <Entry /> },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
