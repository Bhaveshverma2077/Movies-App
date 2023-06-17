import { Outlet, useLocation } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TopAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
