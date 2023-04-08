import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AdminIndex from "../Pages/Admin/PageIndex";
import UserIndex from "../Pages/User/PageIndex";

function RoutingCondition() {
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);
    const location = useLocation();
    const linked = location.state ? location.state.linked : "wait";

    if (value) {
        if (value.Authenticated && linked == "success") {
            if (value.Path === "/admin") {
                return <AdminIndex />;
            } else {
                return <UserIndex />;
            }
        } else {
            return <Navigate to="/LandingPage" />;
        }
    } else {
        return <Navigate to="/LandingPage" />;
    }
}

export default RoutingCondition;
