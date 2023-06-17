import { Outlet } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";

const Layout: React.FC = () => {
  return (
    <>
      <TopAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
