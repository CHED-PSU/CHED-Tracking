import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../../components/AppLogo";

export default function Sidebar(props) {
    function refreshPage() {
        window.location.reload(false);
    }

    const nav = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('localSession')
        localStorage.removeItem("token");
        nav('/');
    }

    return (
        <>
        <div className="sticky top-0 flex flex-none flex-col h-screen 2xl:w-72 xl:w-[260px] w-[260px] bg-white dark:bg-darkColor-800 text-center border-r border-neutral-200 shrink-0 z-20 transition-all duration-150 transform">
            {/* Logo */}
            <div
                className="flex-none 2xl:h-[118px] xl:h-[100px] h-[100px] dark:border-neutral-700"
                title="TracKagamitan Home"
            >
                <div className="h-full w-full flex items-center justify-center">
                    <div
                        onClick={refreshPage}
                        className="flex items-center font-semibold text-gray-600 dark:text-gray-50 gap-2 cursor-pointer"
                    >
                        <AppLogo className="2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 w-8 h-8" />
                        <h4 className="select-none font-bold">
                            Trac
                            <font className="text-primary dark:text-[#011284]">
                                Kagamitan
                            </font>
                        </h4>
                    </div>
                </div>
            </div>

            {/* Links Container */}
            <div className="flex-1 ">
                <div className="flex flex-col justify-between h-full 2xl:py-8 xl:py-1 py-1">
                    {/* Page Links */}
                    <ul className="links flex-none 2xl:text-sm xl:text-[13px] text-[13px] text-darkColor-800 dark:text-lightColor-800 font-medium">
                        {/* Home Link */}
                        <li
                            onClick={() => props.clickTabs("home")}
                            className={
                                props.toggleTabs === "home"
                                    ? "border-r-8 border-primary text-primary font-semibold"
                                    : "hover:hoverPage dark:hover:darkHoverPage"
                            }
                        >
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-square-poll-horizontal 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Home</h4>
                            </div>
                        </li>

                        {/* My Account Link */}
                        <li
                            onClick={() => props.clickTabs("account")}
                            className={
                                props.toggleTabs === "account"
                                    ? "border-r-8 border-primary text-primary font-semibold"
                                    : "hover:hoverPage dark:hover:darkHoverPage"
                            }
                        >
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-regular fa-id-card 2xl:text-lg xl:text-sm text-sm"></i>
                                <h4 className=" leading-3">My Account</h4>
                            </div>
                        </li>

                        {/* Theme Link */}
                        <li
                            onClick={() => props.clickTabs("theme")}
                            className={
                                props.toggleTabs === "theme"
                                    ? "border-r-8 border-primary text-primary font-semibold"
                                    : "hover:hoverPage dark:hover:darkHoverPage"
                            }
                        >
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-brush fa-boxes-stacked 2xl:text-2xl xl:text-xl text-xl"></i>
                                <h4 className=" leading-3">Theme</h4>
                            </div>
                        </li>


                    </ul>

                    {/* <div className="w-full flex justify-center px-8">
                        Profile Button
                        <div
                            className="outline-none flex 2xl:h-14 xl:h-12 h-12 w-full border border-[#D8DCDF] dark:border-darkColor-800 bg-bg-iconLight dark:bg-bg-iconDark dark:active:bg-bg-iconDarkActive dark:text-lightColor-900 rounded-full justify-between cursor-default">
                            <div className="flex w-full pl-2 pr-4 xl:items-center items-center h-full rounded-xl gap-3">
                                <span className="flex flex-none justify-center items-center bg-blue-900 dark:bg-blue-600 2xl:w-10 2xl:h-10 xl:w-7 xl:h-7 w-7 h-7 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full">
                                    A
                                </span>
                                <div className="text-left leading-3 truncate">
                                    <h4 className="text-sm font-bold">
                                        {name}
                                    </h4>
                                    <p className="text-ss">
                                        User | {role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="flex-none h-36 flex text-center items-center mx-6">
                <button onClick={handleLogOut} className="font-semibold 2xl:text-md xl:text-[15px] text-[15px] dark:text-lightColor-800 mx-auto">
                    Log out
                </button>

            </div>
        </div>
        </>
    );
}
