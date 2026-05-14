import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Outlet } from "react-router";
import "./PageLayout.css";

export function Layout() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
