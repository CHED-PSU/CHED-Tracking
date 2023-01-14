import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ICSNotification from "./Notification/ICSNotification";
import PARNotification from "./Notification/PARNotification";
import Profilesett from "./ProfileSettings/ProfileSettings";


export default function Widgets({ className, notifData, clickTabsSide, toggleDarkMode,read }) {
    const [openProfSett, setOpenProfSett] = useState("close");

    function clickProfSett(index) {
        setOpenProfSett(index);
    }

    // Tabs for Notification
    const [toggleTabs, setToggleTabs] = useState("all");
    function clickTabs(index) {
        setToggleTabs(index);
    }

    // Modal for Notification and Profile
    const [openNotifDropdown, setOpenNotifDropdown] = useState(false);
    const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
    const [adminName, setAdminName] = useState('default');
    const [userRole, setUserRole] = useState('default');
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);


    let notifButton = useRef();
    let notifDropdown = useRef();
    let profileButton = useRef();
    let profileDropdown = useRef();

    const name = window.name

    const nav = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('localSession');
        nav('/');
    }

    useEffect(() => {

        setAdminName(value.name.toUpperCase())
        setUserRole(value.role)

        const handler = (event) => {
            if (!notifButton.current.contains(event.target) && openICSNotification === "close" && openPARNotification === "close") {
                if (!notifDropdown.current.contains(event.target) && openICSNotification === "close" && openPARNotification === "close") {
                    setOpenNotifDropdown(false);
                }
            }
            if (!profileButton.current.contains(event.target)) {
                if (!profileDropdown.current.contains(event.target)) {
                    setOpenProfileDropdown(false);
                }
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    // Modals for Notifications
    const [openICSNotification, setOpenICSNotification] = useState("close");
    const [openPARNotification, setOpenPARNotification] = useState("close");

    function clickICSNotification(index) {
        setOpenICSNotification(index);
    }

    function clickPARNotification(index) {
        setOpenPARNotification(index);
    }


    const notifMapper = (items) => {
        if (items != null) {
            return items.map(data => {
                var created_at = new Date(data.created_at);

                let today = new Date();

                var distance = today.getTime() - created_at.getTime();

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));

                if(data.purpose_id === 5){
                    return (
                        <li className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700">
                            <div className="flex h-full items-center justify-between gap-3 px-3">
                                <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                    {data.firstname.charAt(0)}
                                </div>
                                <div className="w-fit flex flex-col justify-center dark:text-neutral-200">
                                    <div className="text-sm 2xl:leading-0 xl:leading-4">
                                        <span className="font-semibold">
                                            {data.firstname}
                                        </span>{" "}
                                        <span className="">
                                            {" "}
                                            { data.description}
                                        </span>
                                    </div>
                                    <div className="text-xs text-blue-400">
                                        {days === 1 || days === 0 ? "a day ago": days + " days ago"}
                                    </div>
                                </div>
                            </div>

                            {/* Ping Notif */}
                            {data.status_id === 1 ? <div className="h-auto flex relative">
                                <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                </span>
                            </div> : ""}
                        </li>
                    )
                }else{
                    return (
                        <li onClick={() => clickTabsSide("pending")} className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                            <div className="flex h-full items-center justify-between gap-3 px-3">
                                <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                    {data.firstname.charAt(0)}
                                </div>
                                <div className="w-fit flex flex-col justify-center dark:text-neutral-200">
                                    <div className="text-sm 2xl:leading-0 xl:leading-4">
                                        <span className="font-semibold">
                                            {data.firstname}
                                        </span>{" "}
                                        <span className="">
                                            {" "}
                                            {data.description === "has accepted the issued property." ? data.description : "has requested to return an item"}
                                        </span>
                                    </div>
                                    <div className="text-xs text-blue-400">
                                        {days === 1 || days === 0 ? "a day ago": days + " days ago"}
                                    </div>
                                </div>
                            </div>

                            {/* Ping Notif */}
                            {data.status_id === 1 ? <div className="h-auto flex relative">
                                <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                </span>
                            </div> : ""}
                        </li>
                    )
                }
            })

        } else {
            <li className="py-5 text-center cursor-default">
                <small>You don't have notification yet</small>
            </li>
        }
    }

    return (
        <div className={className}>
            <Profilesett
                clickProfSett={clickProfSett}
                openProfSett={openProfSett}
                setOpenProfSett={setOpenProfSett}
                className={openProfSett === "prof-sett" ? "" : "hidden"}
            />

            {/* Buttons */}
            <div className="w-fit flex items-center 2xl:space-x-4 xl:space-x-3 space-x-3">
                {/* Dark Mode Button */}
                <button onClick={toggleDarkMode} className="2xl:w-12 2xl:h-12 xl:w-10 xl:h-10 w-10 h-10 border border-[#D8DCDF] dark:border-darkColor-800 bg-bg-iconLight dark:bg-darkColor-700 hover:bg-darkColor-700 dark:hover:bg-amber-300 rounded-full flex justify-center items-center">
                    <div className="2xl:w-6 xl:w-5 w-5 hover:fill-icon-light dark:fill-[#FFD23B] dark:hover:fill-icon-dark">
                        <svg
                            className="inline-block dark:hidden"
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M249.5 33.4c-4.1 1.8-8.3 6.9-9.1 11-.3 1.9-.4 8.4-.2 14.4.2 9.3.6 11.5 2.4 13.8 3.9 5.3 7.1 6.9 13.4 6.9 6.3 0 9.5-1.6 13.4-6.9 1.9-2.5 2.1-4.2 2.1-16.6 0-15.1-.5-16.7-6.7-21.3-3.3-2.5-11.3-3.2-15.3-1.3zm-147 61c-4.1 1.8-8.3 6.9-9.1 11.1-1.3 7.4.1 10.4 9.9 20.2 9.9 9.8 12.8 11.3 20.4 9.8 4.9-.9 10.9-6.9 11.8-11.8 1.4-7.3-.1-10.5-8.8-19.5-10.7-11.1-16.2-13.3-24.2-9.8zm294.5-.3c-3.1 1.2-17.6 15.4-19.6 19.1-2.1 3.9-1.8 11.7.6 15.6 2.8 4.6 7.6 7.2 13.3 7.2 6.5 0 8.9-1.4 18.4-11.2 8.7-8.9 10.2-12.2 8.9-19.3-1.7-9.1-12.7-14.9-21.6-11.4zm-188.5 21.2c-20.8 7.8-37.2 18.3-53 34.2-21 21-34.4 45.6-40.7 74.8-3.2 14.8-3.2 42.8 0 57.4 12.9 59.5 56.1 102.7 115.6 115.5 14.6 3.1 42.7 3.1 57.3 0 51.3-11.1 92.1-46.5 109.3-94.7 2.3-6.6 3-10.1 2.7-13.2-.6-5.8-4.5-10.7-10.3-12.9-4.5-1.7-4.9-1.7-13.6.4-31.1 7.6-59.7 3.9-86.6-11.3-21.5-12.1-40.5-33.8-49.5-56.5-9.4-23.8-10.9-46.8-4.6-72.7 2.2-8.8 2.2-9.2.5-13.7-4-10.5-12.4-12.7-27.1-7.3zm-167 126.1c-9.7 4.3-12.4 17.1-5.4 25.1 4.2 4.7 8.4 5.7 22.1 5.3 12.6-.3 14.7-1.1 19.2-7.2 2.9-3.9 2.9-13.3 0-17.2-4.6-6.2-6.5-6.9-20.2-7.2-9.1-.1-13.6.2-15.7 1.2zm400 0c-9.7 4.3-12.4 17.1-5.4 25.1 4.2 4.7 8.4 5.7 22.1 5.3 9.9-.2 12.1-.6 14.4-2.4 5.3-3.9 6.9-7.1 6.9-13.4 0-6.3-1.6-9.5-6.9-13.4-2.4-1.8-4.4-2.1-15.4-2.4-9.1-.1-13.6.2-15.7 1.2zm-329 136.5c-1.6 1-6.5 5.4-10.7 9.8-8.2 8.5-9.7 11.8-8.3 19 .9 4.9 6.9 10.9 11.8 11.8 7.3 1.4 10.5-.1 19.5-8.8 9.6-9.4 11.2-11.9 11.2-17.8 0-11.8-13.8-20-23.5-14zm273-.5c-4.1 1.8-8.3 6.9-9.1 11.1-1.3 7.4.1 10.4 9.9 20.2 9.9 9.8 12.8 11.3 20.4 9.8 4.9-.9 10.9-6.9 11.8-11.8 1.4-7.3-.1-10.5-8.8-19.5-10.7-11.1-16.2-13.3-24.2-9.8zm-136 56c-4.1 1.8-8.3 6.9-9.1 11-.3 1.9-.4 8.4-.2 14.4.3 12 1.2 14.2 7.2 18.6 3.9 2.9 13.3 2.9 17.2 0 6.4-4.7 6.9-6.3 6.9-21.4 0-15.1-.5-16.7-6.7-21.3-3.3-2.5-11.3-3.2-15.3-1.3z" />
                        </svg>
                        <svg
                            className="hidden dark:inline-block"
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M248.8 2.1c-2.3 1.2-4.6 3.5-5.8 5.9-1.9 3.6-2 5.8-2 31.2 0 24.7.2 27.7 1.9 30.8 2.9 5.5 6.4 7.5 13.1 7.5 6.7 0 10.2-2 13.1-7.5 1.7-3.1 1.9-6.1 1.9-30.8 0-25.4-.1-27.6-2-31.2-3.7-7.3-12.7-9.9-20.2-5.9zM79.5 72c-1.1.4-3.3 2.2-4.9 3.9-4 4.2-4.8 12.4-1.8 17.3 1.2 1.8 10.3 11.5 20.4 21.5 14.9 14.8 19 18.3 22.3 19.2 11.3 3 21.4-7.2 18.4-18.4-.9-3.2-4.5-7.5-18.2-21.4-21.1-21.3-23.5-23.1-29.6-23-2.5 0-5.5.4-6.6.9zm337.9 1.9c-2.1 1.6-11.6 10.7-21.1 20.2-13.9 14.1-17.3 18.2-18.2 21.4-3 11.3 7.2 21.4 18.4 18.4 3.2-.9 7.6-4.6 22.3-19.2 10.1-10 19.2-19.7 20.4-21.5 2.5-4.1 2.2-12.5-.8-16.5-4.6-6.3-14.5-7.6-21-2.8zm-183.9 56.6C187.9 139 149.8 172 135 216c-7.9 23.5-8 55.3-.3 78.9 14.6 44.9 53.6 78.7 99.7 86.6 11.6 2 31.8 1.9 43.6-.1 46.2-7.9 84.7-41.6 99.4-86.9 7.6-23.4 7.6-53.6 0-77-11.8-36.5-38.7-65.3-74.4-79.9-14.3-5.9-24.1-7.7-43.5-8.2-13.1-.2-20.2.1-26 1.1zM7.8 243.1C3.5 245.3 0 251.2 0 256c0 5 3.5 10.7 8 13 3.6 1.9 5.8 2 31.2 2 30 0 31.7-.3 36.3-6.4 2.8-3.8 2.8-13.4 0-17.2-4.6-6.1-6.2-6.4-36.5-6.4-25.4.1-27.8.2-31.2 2.1zm434.2-.2c-5.5 2.9-7.5 6.4-7.5 13.1 0 6.7 2 10.2 7.5 13.1 3.1 1.7 6.1 1.9 30.8 1.9 25.4 0 27.6-.1 31.2-2 4.5-2.3 8-8 8-13s-3.5-10.7-8-13c-3.6-1.9-5.8-2-31.2-2-24.7 0-27.7.2-30.8 1.9zM114.6 378.5c-2.9 1-8.9 6.3-21.8 19.2-9.9 9.8-18.8 19.3-20 21.1-1.6 2.6-1.9 4.4-1.6 8.8.4 4.7 1 6.1 4.1 9.1 3 3.1 4.4 3.7 9.1 4.1 4.3.3 6.2 0 8.8-1.6 1.8-1.2 11.5-10.3 21.5-20.4 14.8-15 18.3-19 19.2-22.4 3.1-11.7-7.9-22-19.3-17.9zm271.7.4c-6.9 3.2-10.2 10.1-8.3 17.3 1 3.6 3.9 7 18.3 21.7 20.9 21.1 23.5 23.1 29.4 23.1 9 0 14.4-4.8 15.1-13.6.3-4.1 0-6-1.6-8.6-1.2-1.8-10.3-11.5-20.4-21.5-14.8-14.6-19.1-18.3-22.3-19.2-5.2-1.4-5.2-1.4-10.2.8zm-136.9 56.5c-1.7.7-4.2 2.9-5.5 4.7-2.4 3.4-2.4 3.7-2.7 31.6-.3 26.8-.2 28.4 1.8 32.2 2.3 4.6 8 8.1 13 8.1s10.7-3.5 13-8c1.9-3.6 2-5.8 2-31.2 0-24.7-.2-27.7-1.9-30.8-1-1.9-3-4.3-4.4-5.4-3.3-2.4-11.2-3.1-15.3-1.2z" />
                            <path
                                d="m91.5 398.2-17 17.3 17.3-17c16-15.8 17.7-17.5 16.9-17.5-.1 0-7.9 7.8-17.2 17.2z"
                                fillOpacity=".02"
                            />
                        </svg>
                    </div>
                </button>

                {/* Notification Button */}
                <button
                    ref={notifButton}
                    onClick={() => {
                        setOpenNotifDropdown(!openNotifDropdown);
                    }}
                    className="2xl:w-12 2xl:h-12 xl:w-10 xl:h-10 w-10 h-10 border border-[#D8DCDF] dark:border-darkColor-800 bg-bg-iconLight dark:bg-darkColor-700 hover:bg-bg-iconLightHover dark:hover:bg-bg-iconDarkHover rounded-full flex justify-center items-center relative"
                >
                    <div className="2xl:w-6 xl:w-5 w-5 dark:fill-icon-light">
                        <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 174 174"
                        >
                            <path
                                d="M32.4 82c0 12.4.2 17.4.3 11.2.2-6.1.2-16.3 0-22.5-.1-6.1-.3-1.1-.3 11.3zm109 0c0 12.4.2 17.4.3 11.2.2-6.1.2-16.3 0-22.5-.1-6.1-.3-1.1-.3 11.3z"
                                fill="#003"
                            />
                            <path d="M77 8.1c-14 2.3-30.9 14.5-37.7 27.4C33.5 46.7 33 49.8 33 77.9v25.5l-7.1 10.7c-8.3 12.6-9.2 16.1-5.7 22.8 4.4 8.5 1.4 8.1 66.8 8.1 65.4 0 62.4.4 66.8-8.1 3.5-6.7 2.6-10.2-5.7-22.8l-7.1-10.7v-25c0-19.2-.4-26.3-1.5-30.9-3.9-14.8-14.4-27.4-28.6-34.4-11.6-5.6-21.1-7-33.9-5zM67 153.7c0 3 9.2 10.8 14.4 12.3 7.6 2.1 14.8 0 20.9-6 7.9-7.9 7.8-8-15.3-8-18.1 0-20 .2-20 1.7z" />
                            <path
                                d="M59.2 145.7c15.3.2 40.3.2 55.5 0 15.3-.1 2.8-.2-27.7-.2s-43 .1-27.8.2z"
                                fill="#666"
                            />
                        </svg>
                    </div>
                    {/* Ping Notification */}
                   {read > 0 ?  <span className="flex 2xl:h-5 2xl:w-5 xl:h-4 xl:w-4 h-4 w-4 absolute 2xl:-top-1 xl:-top-[3px] -top-[3px] 2xl:-right-1 xl:-right-[3px] -right-[3px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full 2xl:h-5 2xl:w-5 xl:h-4 xl:w-4 h-4 w-4 bg-blue-500 justify-center items-center text-white font-semibold text-ss"></span>
                    </span> : ''}
                </button>

                {/* Profile Button */}
                <button
                    ref={profileButton}
                    onClick={() => {
                        setOpenProfileDropdown(!openProfileDropdown);
                    }}
                    className="outline-none flex 2xl:h-12 xl:h-10 h-10 w-fit border border-[#D8DCDF] dark:border-darkColor-800 bg-bg-iconLight dark:bg-bg-iconDark hover:bg-bg-iconLightHover dark:hover:bg-bg-iconDarkHover active:bg-bg-iconLightActive dark:active:bg-bg-iconDarkActive dark:text-lightColor-900 rounded-full justify-between"
                >
                    <div className="flex w-full justify-between pl-4 pr-2 xl:items-center items-center xl:h-full h-full rounded-xl gap-2">
                        <div className=" text-left">
                            <h4 className="text-xs font-bold">
                                {adminName}
                            </h4>
                            <p className="text-ss 2xl:block xl:hidden hidden">
                                {userRole}
                            </p>
                        </div>
                        <span className="bg-blue-900 dark:bg-blue-600 2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 w-7 h-7 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full">
                            {adminName.substring(0, 1)}
                        </span>
                    </div>
                </button>
            </div>

            {/* Dropdowns */}
            <div className="absolute w-fit h-fit flex justify-end 2xl:top-20 xl:top-16 top-16 2xl:right-10 xl:right-5 right-5 z-50">
                {/* Modals */}
                <ICSNotification
                    clickICSNotification={clickICSNotification}
                    className={openICSNotification === "open" ? "" : "hidden"}
                />
                <PARNotification
                    clickPARNotification={clickPARNotification}
                    className={openPARNotification === "open" ? "" : "hidden"}
                />

                {/* Notification */}
                <div
                    ref={notifDropdown}
                    className={openNotifDropdown ? "" : "hidden"}
                >
                    <div className="relative w-fit min-h-fit 2xl:max-h-[660px] xl:max-h-[500px] max-h-[500px] bg-white border border-neutral-200 dark:border-neutral-700 dark:bg-darkColor-800 rounded-xl 2xl:py-4 xl:py-3 py-3 2xl:pl-5 2xl:pr-4 xl:px-4 px-4 2xl:space-y-3 xl:space-y-2 space-y-2 shadow-lg">
                        <div className="text-left cursor-default 2xl:pt-1">
                            <h2 className="2xl:text-xl xl:text-lg text-lg font-semibold dark:text-neutral-200">
                                Notification
                            </h2>
                            <p className="text-xs 2xl:mt-0 xl:-mt-1 -mt-1 text-slate-600 dark:text-neutral-300">
                                You've got 9 unread notifications.
                            </p>
                        </div>

                        {/*tab buttons*/}
                        <ul className="flex gap-2">
                            <li
                                onClick={() => clickTabs("all")}
                                className={
                                    toggleTabs === "all"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:border-neutral-700 dark:bg-darkColor-800 dark:text-white hover:bg-neutral-200 rounded-full"
                                }
                            >
                                <div className="select-none text-xs w-fit px-5 py-2 cursor-pointer">
                                    All
                                </div>
                            </li>
                            {/* <li
                                onClick={() => clickTabs("unread")}
                                className={
                                    toggleTabs === "unread"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:border-neutral-700 dark:bg-darkColor-800 dark:text-white hover:bg-neutral-200 rounded-full"
                                }
                            >
                                <div className="select-none text-xs w-fit px-5 py-2 cursor-pointer">
                                    Unread
                                </div>
                            </li> */}
                        </ul>
                        {/*tab buttons*/}

                        {/* All Tabs */}
                        <div
                            className={toggleTabs === "all" ? "flex" : "hidden"}
                        >
                            <ul className="min-h-fit 2xl:max-h-[520px] xl:max-h-[380px] max-h-[380px] pr-1 overflow-auto flex-row space-y-2 2xl:w-[350px] xl:w-[300px] w-[300px]">
                                {/* no notification */}
                                {notifData?.length != 0 ? notifMapper(notifData) : 
                                <li className="py-5 text-center cursor-default">
                                    <small>You don't have notification yet</small>
                                </li>}
                            </ul>
                        </div>

                        {/* Unread Tabs */}
                        <div
                            className={
                                toggleTabs === "unread" ? "flex" : "hidden"
                            }
                        >
                            <ul className="min-h-fit 2xl:max-h-[520px] xl:max-h-[380px] max-h-[380px] pr-1 overflow-auto flex-row space-y-2 2xl:w-[350px] xl:w-[300px] w-[300px]">
                                {/* no notification */}
                                <li className="py-5 text-center cursor-default">
                                    <small>You don't have notification yet</small>
                                </li>
                                {/* no notification */}

                                <li className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            M
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-neutral-200">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            M
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-neutral-200">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            M
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-neutral-200">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Notification */}

                {/* Profile */}
                <div
                    ref={profileDropdown}
                    className={openProfileDropdown ? "" : "hidden"}
                >
                    <div className="w-fit h-fit bg-white border border-neutral-200 dark:border-neutral-700 dark:bg-darkColor-800 rounded-xl 2xl:pt-2 xl:pt-0 pt-0 2xl:pb-4 xl:pb-3 pb-3 2xl:px-4 xl:px-3 px-3 space-y-3 shadow-lg">
                        <ul className="flex-row space-y-2">
                            <li
                                onClick={() => clickProfSett("prof-sett")}
                                className="2xl:w-[250px] xl:w-[220px] w-[220px] flex items-center py-3 gap-1 border-sh dark:border-neutral-700 border-b cursor-pointer">
                                <div className="flex justify-between 2xl:gap-4 xl:gap-3 gap-3 px-3">
                                    <div className="flex-none flex justify-center items-center 2xl:text-2xl xl:text-xl text-xl 2xl:h-12 2xl:w-12 xl:h-8 xl:w-8 h-8 w-8 rounded-profile bg-primary dark:bg-active-icon">
                                        {adminName.substring(0, 1)}
                                    </div>
                                    <div className="flex items-center">
                                        <h2 className="2xl:text-sm xl:text-xs text-xs font-semibold dark:text-neutral-200">
                                            {adminName}
                                        </h2>
                                    </div>
                                </div>
                            </li>
                            <li onClick={handleLogOut} className="flex text-left dark:text-neutral-200 gap-3 2xl:py-3 xl:py-2 py-2 2xl:px-3 xl:px-2 px-2 rounded-md items-center hover:bg-slate-100 dark:hover:bg-darkColor-700 cursor-pointer">
                                <div className="flex justify-between gap-3 2xl:px-3 xl:px-2 px-2">
                                    <div className="flex-col">
                                        <h2 className="text-sm font-semibold">
                                            Logout
                                        </h2>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Profile */}
            </div>
        </div>
    );
}
