import React from "react";
import AppLogo from "../../../../../components/AppLogo";

export default function ProfileSB(props) {

    return (
        <div className="sticky top-0 flex flex-none flex-col h-screen 2xl:w-72 xl:w-[260px] w-[260px] bg-white dark:bg-darkColor-800 text-center border-r border-neutral-200 shrink-0 z-20 transition-all duration-150 transform">
            {/* Logo */}
            <div
                className="flex-none 2xl:h-[118px] xl:h-[100px] h-[100px] dark:border-neutral-700"
                title="TracKagamitan Home"
            >
                <div className="h-full w-full flex items-center justify-center gap-5">
                    <button onClick={() => props.clickProfSett("close")}>
                        <i className="fa-sharp fa-solid fa-arrow-left text-xl"></i>
                    </button>
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
                        <li
                            onClick={() => props.clickSubTabs("profile")}
                            className={
                                props.toggleSubTabs === "profile"
                                    ? "activePage"
                                    : "hover:hoverPage dark:hover:darkHoverPage"
                            }
                        >
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-regular fa-id-card  2xl:text-lg xl:text-sm text-sm"></i>
                                <h4 className=" leading-3">My Profile</h4>
                            </div>
                        </li>
                        <li
                            onClick={() => props.clickSubTabs("theme")}
                            className={
                                props.toggleSubTabs === "theme"
                                    ? "activePage"
                                    : "hover:hoverPage dark:hover:darkHoverPage"
                            }
                        >
                            <div className="flex w-full items-center gap-4 pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                <i className="fa-solid fa-brush fa-boxes-stacked 2xl:text-xl xl:text-lg text-lg"></i>
                                <h4 className=" leading-3">Theme</h4>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
            {/* Links Container */}

        </div>
    )
}
