import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://127.0.0.1:8001")

import Sidebar from "./Components/Sidebar";
import Widgets from "./Components/Widgets";
import Home from "./Home/Index";
import Logs from "./Logs/Index";
import Items from "./Items/Index";
import Requests from "./Requests/Index";
import Myaccount from "./MyAccount/Index";
import Theme from "./Theme/Index";

export default function Index() {
    //dark mode
    const [theme, setTheme] = useState(null);

    useEffect(()=>{
        socket.on("User_Notif" , (data) => {
            alert(data.message)
        })
    },[socket])

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const [read, setRead] = useState('');
    const [toggleTabs, setToggleTabs] = useState("home");

    function clickTabs(index) {
        setToggleTabs(index);
    }

 

    return (
        <div className="relative w-full h-screen flex bg-[#fafafa] dark:bg-darkColor-900 transition-all duration-150 transform overflow-x-hidden">
            <Sidebar
                clickTabs={clickTabs}
                toggleTabs={toggleTabs}
                setToggleTabs={setToggleTabs}
            />
            <div className="relative flex flex-col flex-auto w-auto h-screen">
                <nav className="h-fit flex justify-between border-b border-neutral-200 dark:border-neutral-700 2xl:py-5 xl:py-2 py-2 2xl:px-10 xl:px-5 px-5">
                    {/* Titles */}
                    <div className="w-full">
                        {/* home */}
                        <div className={toggleTabs === "home" ? "" : "hidden"}>
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Home
                                </div>
                            </div>
                        </div>
                        {/* Logs */}
                        <div className={toggleTabs === "logs" ? "" : "hidden"}>
                            <div className="flex items-center gap-5">
                                <div
                                    onClick={() => clickTabs("home")}
                                    className="cursor-pointer"
                                >
                                    <i className="fa-sharp fa-solid fa-arrow-left text-xl"></i>
                                </div>
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Logs
                                </div>
                            </div>
                        </div>
                        {/* Items */}
                        <div className={toggleTabs === "items" ? "" : "hidden"}>
                            <div className="flex items-center gap-5">
                                <div
                                    onClick={() => clickTabs("home")}
                                    className="cursor-pointer"
                                >
                                    <i className="fa-sharp fa-solid fa-arrow-left text-xl"></i>
                                </div>
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Items
                                </div>
                            </div>
                        </div>
                        {/* Requests */}
                        <div
                            className={
                                toggleTabs === "requests" ? "" : "hidden"
                            }
                        >
                            <div className="flex items-center gap-5">
                                <div
                                    onClick={() => clickTabs("home")}
                                    className="cursor-pointer"
                                >
                                    <i className="fa-sharp fa-solid fa-arrow-left text-xl"></i>
                                </div>
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Requests
                                </div>
                            </div>
                        </div>
                        {/* My Account */}
                        <div
                            className={toggleTabs === "account" ? "" : "hidden"}
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Profile
                                </div>
                            </div>
                        </div>
                        {/* Theme */}
                        <div className={toggleTabs === "theme" ? "" : "hidden"}>
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Theme
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Titles */}
                    <Widgets
                        className="w-full flex justify-end"
                        clickTabs={clickTabs}
                        toggleDarkMode={toggleDarkMode}
                        unread = {read}
                    />
                </nav>

                {/* Contents */}
                <div className="h-full flex">
                    {/* Home */}
                    {toggleTabs === "home" ? (
                        <Home
                            clickTabs={clickTabs}
                            toggleTabs={toggleTabs}
                            className="relative flex w-full h-full"
                        />
                    ) : (
                        ""
                    )}

                    {/* Logs */}
                    {toggleTabs === "logs" ? (
                        <Logs className="relative flex w-full h-full" />
                    ) : (
                        ""
                    )}

                    {/* Items */}
                    {toggleTabs === "items" ? (
                        <Items className="relative flex w-full h-full" />
                    ) : (
                        ""
                    )}

                    {/* Requests */}
                    {toggleTabs === "requests" ? (
                        <Requests className="relative flex w-full h-full" />
                    ) : (
                        ""
                    )}

                    {/* My Account */}
                    {toggleTabs === "account" ? (
                        <Myaccount className="relative flex w-full h-full" />
                    ) : (
                        ""
                    )}

                    {/* Theme */}
                    {toggleTabs === "theme" ? (
                        <Theme className="relative flex w-full h-full" />
                    ) : (
                        ""
                    )}
                </div>
                {/* Contents */}
            </div>
        </div>
    );
}
