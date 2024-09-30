import React from "react";
import Layout from "../components/Layout"; // Adjust the import path as needed
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { role } = useAuth();

  const renderContent = () => {
    if (role === "admin") {
      return (
        <>
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </>
      );
    } else if (role === "agent") {
      return (
        <>
          <h2 className="text-xl font-bold">Agent Dashboard</h2>
        </>
      );
    } else {
      return <h2 className="text-xl font-bold">Unauthorized</h2>;
    }
  };

  return <Layout>{renderContent()}</Layout>;
};

export default Dashboard;
