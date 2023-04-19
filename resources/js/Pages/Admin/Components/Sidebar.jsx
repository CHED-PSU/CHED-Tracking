import React from "react";
import AppLogo from "../../../components/AppLogo";
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {
    function refreshPage() {
        window.location.reload(false);
    }

    function clickSidebar(index) {
        props.setSidebar(index);
    }

    const name = window.name
    const nav = useNavigate();

    const handleLogOut = () => {
        nav('/Portal');
    }

    return (
        <div className="sticky top-0 overflow-x-auto flex flex-none flex-col bg-white dark:bg-darkColor-800 text-center border-r border-neutral-200 dark:border-[#434343] shrink-0 z-20 transition-all duration-150 transform
        2xl:w-72 xl:w-[240px] lg:w-[280px] md:w-[220px] w-[260px] 
        h-screen ">
            {/* Logo */}
            <div
                className="flex-none 2xl:h-[118px] xl:h-[100px] h-[100px] dark:border-neutral-700"
                title="TracKagamitan Home"
            >
                <div className="h-full w-full flex items-center justify-center">
                    <div
                        onClick={refreshPage}
                        className="flex items-center font-semibold text-gray-600 dark:text-gray-50 gap-3 cursor-pointer"
                    >
                        <AppLogo className="2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 w-8 h-8" />
                        <h4 className="select-none font-bold xl:text-sm">
                            Trac
                            <font className="text-primary dark:text-[#476aca]">
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
                    <ul className="links flex-none 2xl:text-sm xl:text-[13px] text-[13px] text-neutral-700 dark:text-neutral-300 font-medium">
                        {/* Dashboard Link */}
                        <li
                            onClick={() => clickSidebar("dashboard")}
                            className={
                                props.sidebar === "dashboard"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between p-4 cursor-pointer xl:h-10 h-12 py-3 select-none">
                                <div className="flex items-center
                                 xl:gap-3 gap-4">
                                    <i className="fa-solid fa-square-poll-horizontal 2xl:text-3xl xl:text-xl text-2xl"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Dashboard</h4>
                                </div>
                                <span className={
                                    props.sidebar === "dashboard"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* Pending Link */}
                        <li
                            onClick={() => clickSidebar("pending")}
                            className={
                                props.sidebar === "pending"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-envelope-open-text 
                                    2xl:text-2xl xl:text-lg text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Pending Requests</h4>
                                </div>
                                <span className={
                                    props.sidebar === "pending"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* Logs Link */}
                        <li
                            onClick={() => clickSidebar("logs")}
                            className={
                                props.sidebar === "logs"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between gap-4 p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-list-check 2xl:text-2xl xl:text-xl text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Logs</h4>
                                </div>
                                <span className={
                                    props.sidebar === "logs"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* Return Link */}
                        <li
                            onClick={() => clickSidebar("return")}
                            className={
                                props.sidebar === "return"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between gap-4 p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-box-archive 2xl:text-2xl xl:text-md text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Return Items</h4>
                                </div>
                                <span className={
                                    props.sidebar === "return"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* Inventory Link */}
                        <li
                            onClick={() => clickSidebar("inventory")}
                            className={
                                props.sidebar === "inventory"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between gap-4 p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-box-open 2xl:text-xl xl:text-base text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Inventory</h4>
                                </div>
                                <span className={
                                    props.sidebar === "inventory"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* Unserviceable Link */}
                        <li
                            onClick={() => clickSidebar("unserv")}
                            className={
                                    props.sidebar === "unserv"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between gap-4 p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-dumpster 2xl:text-xl xl:text-md text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Unserviceable</h4>
                                </div>
                                <span className={
                                    props.sidebar === "unserv"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>

                        {/* page Forecasting Link */}
                        <li
                            onClick={() => clickSidebar("forecast")}
                            className={
                                props.sidebar === "forecast"
                                    ? "activePage dark:bg-darkHoverPage xl:mx-4 mx-6"
                                    : "hover:hoverPage dark:hover:darkHoverPage xl:mx-4 mx-6"
                            }
                        >
                            <div className="flex w-full items-center justify-between gap-4 p-4 cursor-pointer 2xl:h-12 xl:h-10 h-14 py-3 select-none">
                                <div className="flex items-center
                                xl:gap-3 gap-4">
                                    <i className="fa-solid fa-chart-line 2xl:text-2xl xl:text-lg text-lg"></i>
                                    <h4 className="xl:text-[12px] text-[13px] leading-3 font-medium">Forecasting</h4>
                                </div>
                                <span className={
                                    props.sidebar === "forecast"
                                    ? "h-5 w-2 bg-primary dark:bg-[#476aca] drop-shadow-pageIn dark:drop-shadow-pageInD rounded-full transition duration-500 ease-in-out"
                                    : "opacity-0"
                                }></span>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>

            <div className="flex-none h-36 flex text-center items-center mx-6">
                <button onClick={handleLogOut} className="font-semibold 2xl:text-sm xl:text-[12px] text-[15px] text-neutral-700 hover:text-neutral-900 hover:bg-gray-100 dark:hover:bg-[#313131] dark:text-neutral-400 dark:hover:text-neutral-50 mx-auto rounded-full w-full transition duration-500 ease-in-out">
                    <div className="flex items-center justify-center gap-3 w-full h-10">
                        <i className="fa-solid fa-door-open"></i>
                        <p>Back to homepage</p>
                    </div>
                </button>

            </div>
        </div>
    );
}
