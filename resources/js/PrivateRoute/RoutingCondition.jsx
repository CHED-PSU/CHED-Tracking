import React, {useEffect, useState} from "react";
import {Navigate,Outlet} from "react-router-dom";
import AdminIndex from "../Pages/Admin/PageIndex";
import UserIndex from "../pages/User/PageIndex";
const Auth2 = () => {
    

    return user;
}

const PrivateRoute = () => {
    const user = localStorage.getItem('localSession');
    const value =JSON.parse(user);
    
    if(value){
        if(value.Authenticated){
            if(value.Path === "/admin"){
                return <AdminIndex />
            }else{
                return <UserIndex /> 
            }
        }else{
           return <Navigate to="/login" />
        }
    }else{
        return <Navigate to="/login" />
    }
    
}; 


export default PrivateRoute;