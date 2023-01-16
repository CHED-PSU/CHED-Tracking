import React, { StrictMode, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "../pages/NotFound";
import GuestIndex from "../Pages/Guest/PageIndex";
import AdminIndex from "../pages/Admin/PageIndex";
import UserIndex from "../pages/User/PageIndex";
import RoutingCondition from "../PrivateRoute/RoutingCondition";
import PublicRoute from "../PrivateRoute/PublicRoute";
export default function Router() {

    
    return (
        <div>
            <Routes>
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/" element={<Navigate to="/login"/>} />
                    <Route path="/login" element={<PublicRoute />}/>
                    <Route path="/dashboard" element={<RoutingCondition />} />
                    <Route path="/user" element={<UserIndex />} />
            </Routes>
        </div>
    );
};
