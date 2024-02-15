import { Outlet } from "react-router-dom";
import HeaderAuth from "./HeaderAuth";

function Layout() {
  return (
    <>
      <HeaderAuth />

      <Outlet />
    </>
  );
}

export default Layout;
