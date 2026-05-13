import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Entry } from "./pages/Entry/Entry";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Layout } from "./layout/PageLayout/PageLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/entry", element: <Entry /> },
        { path: "/dashboard", element: <Dashboard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
