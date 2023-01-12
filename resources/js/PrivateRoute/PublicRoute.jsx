import React, {useEffect, useState} from "react";
import {Navigate,Outlet} from "react-router-dom";

import GuestIndex from "../Pages/Guest/PageIndex";


const PublicRoute = () => {
    const user = localStorage.getItem('localSession');
    const value =JSON.parse(user);

    if(value){
        if(value.Authenticated){
            return <Navigate to="/dashboard"/>
        }else{
            return <GuestIndex />
        }
    }else{
        return <GuestIndex />
    }
    
}; 


export default PublicRoute;