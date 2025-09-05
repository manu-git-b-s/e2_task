import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  return (
    <div>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
