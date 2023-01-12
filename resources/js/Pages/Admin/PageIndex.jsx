import React, { useEffect, useState } from "react";

import Sidebar from "./Components/Sidebar";
import Widgets from "./Components/Widgets";
import Dashboard from "./Dashboard/Index";
import Pending from "./Pending/Index";
import Logs from "./Logs/Index";
import Return from "./Return/Index";
import Unserviceable from "./Unserviceable/Index";
import Forecasting from "./Forecasting/Index";
import Searchbar from "./Components/Searchbar";
import axios from "axios";

export default function Index() {
    //dark mode
    const [theme, setTheme] = useState("light");

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
    //dark mode
    const [read, setRead] = useState('');
    const [toggleTabs, setToggleTabs] = useState("dashboard");
    const [notifData, setNotifData] = useState(null);
    function clickTabs(index) {
        setToggleTabs(index);
    }
    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    const getNotif = () => {
        fetch("http://" + url.hostname + ":8000/api/get_notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: value.id,
        })
            .then((response) => response.json())
            .then((data) => {
                setNotifData(data.notifData);
            });

        fetch(
            "http://" +
                url.hostname +
                ":8000/api/get_numbers_of_unread_notification",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: value.id,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setRead(data.unread);
            });
    };

    useEffect(() => {
        getNotif();
    }, []);

    return (
        <div className="relative w-full h-screen flex bg-[#fafafa] dark:bg-darkColor-900 transition-all duration-150 transform overflow-hidden">
            <Sidebar
                clickTabs={clickTabs}
                toggleTabs={toggleTabs}
                setToggleTabs={setToggleTabs}
            />
            <div className="relative flex flex-col flex-auto w-auto h-screen">
                <nav className="h-fit flex justify-between border-b border-neutral-200 dark:border-neutral-700 2xl:py-5 xl:py-2 py-2 2xl:px-10 xl:px-5 px-5">
                    {/* Titles */}
                    <div className="w-full">
                        {/* Dashboard */}
                        <div
                            className={
                                toggleTabs === "dashboard" ? "" : "hidden"
                            }
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Dashboard
                                </div>
                            </div>
                        </div>
                        {/* Pending Req */}
                        <div
                            className={toggleTabs === "pending" ? "" : "hidden"}
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Pending Requests
                                </div>
                            </div>
                        </div>
                        {/* Logs */}
                        <div className={toggleTabs === "logs" ? "" : "hidden"}>
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Logs
                                </div>
                            </div>
                        </div>
                        {/* Return Items */}
                        <div
                            className={toggleTabs === "return" ? "" : "hidden"}
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Return Items
                                </div>
                            </div>
                        </div>
                        {/* Unserviceable */}
                        <div
                            className={toggleTabs === "unserv" ? "" : "hidden"}
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Unserviceable
                                </div>
                            </div>
                        </div>
                        {/* Forecasting */}
                        <div
                            className={
                                toggleTabs === "forecast" ? "" : "hidden"
                            }
                        >
                            <div className="flex">
                                <div className="flex h-12 items-center 2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 cursor-default">
                                    Forecasting
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Titles */}

                    <Widgets
                        notifData={notifData != null ? notifData : null}
                        clickTabsSide={clickTabs}
                        toggleDarkMode={toggleDarkMode}
                        className="w-full flex justify-end"
                        unread = {read}
                    />
                </nav>

                {/* Contents */}
                <div className="h-full flex">
                    {/* Dashboard */}

                    {toggleTabs === "dashboard" ? (
                        <Dashboard className={"relative flex w-full h-full"} />
                    ) : (
                        ""
                    )}

                    {/* Pending */}
                    {toggleTabs === "pending" ? (
                        <Pending className={"relative flex w-full h-full"} />
                    ) : (
                        ""
                    )}

                    {/* Logs */}
                    {toggleTabs === "logs" ? (
                        <Logs className={"relative flex w-full h-full"} />
                    ) : (
                        ""
                    )}

                    {/* Pending */}
                    {toggleTabs === "return" ? (
                        <Return className={"relative flex w-full h-full"} />
                    ) : (
                        ""
                    )}

                    {/* Unserviceable */}
                    {toggleTabs === "unserv" ? (
                        <Unserviceable
                            className={"relative flex w-full h-full"}
                        />
                    ) : (
                        ""
                    )}

                    {/* Forecasting */}
                    {toggleTabs === "forecast" ? (
                        <Forecasting
                            className={"relative flex w-full h-full"}
                        />
                    ) : (
                        ""
                    )}
                </div>
                {/* Contents */}
            </div>
        </div>
    );
}
