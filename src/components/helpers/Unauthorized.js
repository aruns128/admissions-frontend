import React from "react";
import Layout from "../common/Layout";

const Unauthorized = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Unauthorized...</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    </Layout>
  );
};

export default Unauthorized;
