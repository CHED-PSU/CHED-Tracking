import React from "react";
import AppLogo from "../../../components/AppLogo";

export default function Sidebar() {
    
    return (
        <div className="sticky top-0 flex flex-none flex-col h-screen 2xl:w-72 xl:w-[260px] w-[260px] bg-white dark:bg-darkColor-800 text-center border-r border-neutral-200 shrink-0 z-20 transition-all duration-150 transform">
            {/* Logo */}
            <div
                className="flex-none 2xl:h-[118px] xl:h-[100px] h-[100px] dark:border-neutral-700"
                title="TracKagamitan Home"
            >
                <div className="h-full w-full flex items-center justify-center">
                    <div
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
                        {/* Dashboard Link */}
                        <li className="activePage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-square-poll-horizontal 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Dashboard</h4>
                            </div>
                        </li>

                        {/* Pending Link */}
                        <li className="hover:hoverPage dark:hover:darkHoverPage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-envelope-open-text 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Pending Requests</h4>
                            </div>
                        </li>

                        {/* Logs Link */}
                        <li className="hover:hoverPage dark:hover:darkHoverPage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-list-check 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Logs</h4>
                            </div>
                        </li>

                        {/* Return Link */}
                        <li className="hover:hoverPage dark:hover:darkHoverPage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-box-archive 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Return Items</h4>
                            </div>
                        </li>

                        {/* Unserviceable Link */}
                        <li className="hover:hoverPage dark:hover:darkHoverPage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-dumpster 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Unserviceable</h4>
                            </div>
                        </li>

                        {/* Forecasting Link */}
                        <li className="hover:hoverPage dark:hover:darkHoverPage">
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-chart-line 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Forecasting</h4>
                            </div>
                        </li>
                    </ul>

                    <div className=" w-full flex justify-center items-center">
                        <img
                            draggable="false"
                            src="./img/sidebar_illustration.png"
                            className="2xl:h-52 xl:h-36 h-36"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-none h-20 flex text-center items-center mx-6">
                <button className="font-semibold 2xl:text-md xl:text-[15px] text-[15px] dark:text-lightColor-800 mx-auto">
                    Log out 
                </button>
                
            </div>
        </div>
    );
}
