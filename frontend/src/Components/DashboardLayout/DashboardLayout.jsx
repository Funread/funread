import "./DashboardLayout.css";

import { Outlet, Navigate, useLocation } from "react-router-dom";
import TabMenu from "./TabMenu";
import DashboardLayoutHeader from "./DashboardLayoutHeader.jsx";

const DashboardLayout = ({ role }) => {
  const location = useLocation();

  if (location.pathname === "/dashboard") {
    if (role === "profesor") {
      return <Navigate to="/dashboard/library" replace />;
    } else if (role === "estudiante") {
      return <Navigate to="/dashboard/myclasses" replace />;
    } else if (role === "administrativo") {
      return <Navigate to="/dashboard/badges" replace />;
    }
  }

  return (
    <div className="dashboard">

      <DashboardLayoutHeader />      

      <div className="dashboard__content">
        <TabMenu role={role} />
        <main className="dashboard__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
