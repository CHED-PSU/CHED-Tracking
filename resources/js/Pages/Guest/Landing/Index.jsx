import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Landing() {
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    const [linked, setLinked] = useState(false);

    const handleClick = () => {
        setLinked(true);
    };

    const getToken = localStorage.getItem('token')

    const token = getToken.split("|");

    if (value) {
        if (value.Authenticated) {
            return (
                <div className="flex  w-full h-screen bg-[#011284] flex-col items-center justify-center">
                    <div className="z-0 w-[920px] h-[920px] bg-cover bg-center bg-circle-huge absolute right-0"></div>
                    <div className="z-0 w-full h-[150px] bg-cover bg-center bg-bg-pattern absolute bottom-0"></div>
                    <div className="flex flex-col gap-14 z-10">
                        <div className="flex flex-col gap-5 mt-18 w-full items-left cursor-default">
                            <h5 className="text-white font-medium">CHEDRO XI</h5>
                            <h2 className="text-7xl font-bold text-white">Make Your Operations</h2>
                            <h2 className="text-7xl font-bold text-[#F9D909]">Smoother</h2>
                        </div>
                        <div className="flex p-10 rounded-2xl gap-10 bg-white mt-6 border-2 border-[#0E37FD]">
                            <div className="w-[300px] h-[400px] cursor-default flex flex-col gap-6 font-extrabold text-xl pr-14 pt-10">
                                <h1 className="text-5xl text-[#242526] leading-16">Efficient systems </h1>
                                <h4 className="font-medium text-lg text-[#434343] leading-8">To streamline the supply chain and ensure optimal inventory levels.</h4>
                            </div>
                            <div className="w-[300px] h-[400px] cursor-pointer bg-[#FF9FBF] text-white flex flex-col gap-10 justify-center items-center font-extrabold text-xl rounded-3xl">
                                <div className="h-[200px] w-[200px] bg-cover bg-center bg-procurement-icon"></div>
                                <p>Procurement</p>
                            </div>
                            <a href={"http://10.41.1.142:8000/login-page/"+ token[1]} className="w-[300px] h-[400px] cursor-pointer bg-[#FFDE6A] text-white flex flex-col gap-10 justify-center items-center font-extrabold text-xl rounded-3xl">
                                <div className="h-[200px] w-[200px] bg-cover bg-center bg-inventory-icon"></div>
                                <p>Inventory</p>
                            </a>
                            <div
                                onClick={handleClick}
                                className="w-[300px] h-[400px] cursor-pointer bg-[#2F52FF] text-white flex flex-col gap-10 justify-center items-center font-extrabold text-xl rounded-3xl"
                            >
                                <div className="h-[200px] w-[200px] bg-cover bg-center bg-tracking-icon"></div>
                                <p>Tracking</p>
                            </div>
                        </div>
                    </div>
                    {linked && (
                        <Navigate
                            to="/Trackagamitan"
                            state={{ linked: "success" }}
                        />
                    )}
                </div>
            );
        } else {
            return <Navigate to="/Login" />;
        }
    } else {
        return <Navigate to="/Login" />;
    }
}
