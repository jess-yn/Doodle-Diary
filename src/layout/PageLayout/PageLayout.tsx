import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router";
import "./PageLayout.css";

export function Layout() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}
