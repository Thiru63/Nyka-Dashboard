import React from "react";
import { Route, Routes } from "react-router-dom/dist";
import { DoctersDashboard } from "../Pages/DoctersDashboard";
import { Login } from "../Pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { AddDocter } from "../Pages/AddDocter";


export const AllRoutes = () => {
  return <div>
    <Routes>
      <Route path='/' element={<DoctersDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addappointment" element={
        <PrivateRoute>
          <AddDocter />
        </PrivateRoute>
      } />
    </Routes>
  </div>;
};
