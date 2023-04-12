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
                <div className="flex w-full h-screen bg-white flex-col items-center justify-center">
                    <div className="flex gap-10">
                        <div className="w-[400px] h-[400px] cursor-pointer bg-pink-400 flex justify-center items-center font-extrabold text-xl rounded-xl">
                            Procurement
                        </div>
                        <a
                            href={"http://10.41.1.142:8000/login-page/"+ token[1]}
                            className="w-[400px] h-[400px] cursor-pointer bg-green-400 flex justify-center items-center font-extrabold text-xl rounded-xl"
                        >
                            Inventory
                        </a>
                        <div
                            onClick={handleClick}
                            className="w-[400px] h-[400px] cursor-pointer bg-blue-400 flex justify-center items-center font-extrabold text-xl rounded-xl"
                        >
                            Tracking
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
