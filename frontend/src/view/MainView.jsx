import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";

export const MainView = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};