import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "../pages/NotFound";
import RoutingCondition from "../PrivateRoute/RoutingCondition";
import PublicRoute from "../PrivateRoute/PublicRoute";
import Landing from "../Pages/Guest/Landing/Index";

export default function Router() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<NotFound />} />
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<PublicRoute />} />
                <Route path="/Portal" element={<Landing />} />
                <Route path="/Trackagamitan" element={<RoutingCondition />} />
            </Routes>
        </div>
    );
}
