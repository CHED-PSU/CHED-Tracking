import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import io from "socket.io-client";
const socket = io.connect("http://127.0.0.1:8001");

export default function Landing() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
          });
    }, [socket]);

    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    const [linked, setLinked] = useState(false);

    const handleClick = () => {
        setLinked(true);
    };

    const [tokenOnly, setTokenOnly] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const getToken = localStorage.getItem("token");
            if (getToken !== null) {
                const token = getToken.split("|");
                setTokenOnly(token);
                setToken(getToken);
                setLoading(false);
            } else {
                setTimeout(checkToken, 500);
            }
        };
        checkToken();
    }, []);

    function displayPhoto(profilePhoto, name, className) {
        if (profilePhoto == null) {
            return (
                <span
                    className={
                        className +
                        " bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full"
                    }
                >
                    {name.substring(0, 1)}
                </span>
            );
        } else {
            return (
                <img
                    draggable="false"
                    src="./img/profile-pic.jpeg"
                    className={
                        className + " rounded-full bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    const nav = useNavigate();
    const headers = () => {
        return {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };
    };

    const handleLogOut = () => {
        // axios({
        //     url: "/api/logoutToken",
        //     method: "post",
        //     headers: headers(),
        // }).then((response) => {
        //     if (response.data.status === true) {
        //         localStorage.removeItem("localSession");
        //         localStorage.removeItem("token");
        //         nav("/");
        //     }
        // });

        localStorage.removeItem("localSession");
        localStorage.removeItem("token");
        nav("/");
    };

    if (value) {
        if (value.Authenticated) {
            return (
                <div className="flex  w-full h-screen bg-[#011284] flex-col items-center justify-center">
                    {/* Loader */}
                    {loading == true ? <Loader /> : ""}
                    {/* Loader */}

                    <div className="w-fit fixed z-30 top-10 right-10 flex flex-col items-end space-y-3 2xl:space-x-4 xl:space-x-3 space-x-3">
                        {/* Profile Button */}
                        <button
                            onClick={handleLogOut}
                            className="outline-none flex 2xl:h-12 xl:h-10 h-10 w-fit border border-[#D8DCDF] dark:border-darkColor-800 bg-bg-iconLight dark:bg-bg-iconDark hover:bg-bg-iconLightHover dark:hover:bg-bg-iconDarkHover active:bg-bg-iconLightActive dark:active:bg-bg-iconDarkActive dark:text-lightColor-900 rounded-full justify-between transition duration-300 ease-in-out"
                        >
                            <div className="flex w-full justify-between pl-4 pr-2 xl:items-center items-center xl:h-full h-full rounded-xl gap-2">
                                <div className=" text-left">
                                    <h4 className="text-xs font-bold">
                                        {displayName(value, false)}
                                    </h4>
                                    <p className="text-ss 2xl:block xl:hidden hidden">
                                        {value.role}
                                    </p>
                                </div>
                                {displayPhoto(
                                    value.img,
                                    value.firstname,
                                    "2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 w-7 h-7"
                                )}
                            </div>
                        </button>
                    </div>

                    <div className="z-0 w-[920px] h-[920px] bg-cover bg-center bg-circle-huge absolute right-0"></div>
                    <div className="z-0 w-full h-[150px] bg-cover bg-center bg-bg-pattern absolute bottom-0"></div>
                    <div className="flex flex-col gap-14 z-10">
                        <div className="flex flex-col gap-5 mt-18 w-full items-left cursor-default">
                            <h5 className="text-white font-medium">
                                CHEDRO XI
                            </h5>
                            <h2 className="text-7xl font-bold text-white">
                                Make Your Operations
                            </h2>
                            <h2 className="text-7xl font-bold text-[#F9D909]">
                                Smoother
                            </h2>
                        </div>
                        <div className="flex p-10 rounded-2xl gap-10 bg-white mt-6 border-2 border-[#0E37FD]">
                            <div className="w-[300px] h-[400px] cursor-default flex flex-col gap-6 font-extrabold text-xl pr-14 pt-10">
                                <h1 className="text-5xl text-[#242526] leading-16">
                                    Efficient systems{" "}
                                </h1>
                                <h4 className="font-medium text-lg text-[#434343] leading-8">
                                    To streamline the supply chain and ensure
                                    optimal inventory levels.
                                </h4>
                            </div>
                            <a
                                href={
                                    "http://10.41.1.140:8080/procproject3.5/session-checker?token=" +
                                    tokenOnly
                                }
                                className="w-[300px] h-[400px] cursor-pointer bg-[#FF9FBF] text-white flex flex-col gap-10 justify-center items-center font-extrabold text-xl rounded-3xl"
                            >
                                <div className="h-[200px] w-[200px] bg-cover bg-center bg-procurement-icon"></div>
                                <p>Procurement</p>
                            </a>
                            <a
                                href={
                                    "http://10.41.1.142:8000/login-page/" +
                                    token
                                }
                                className="w-[300px] h-[400px] cursor-pointer bg-[#FFDE6A] text-white flex flex-col gap-10 justify-center items-center font-extrabold text-xl rounded-3xl"
                            >
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
