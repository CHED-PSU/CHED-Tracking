import React, { useState } from "react";
import ProfileSB from "./Pages/ProfileSB";
import Profile from "./Pages/Profile";
import Theme from "./Pages/Theme";
import ProfileBg from "../../../../components/ProfileBg";

export default function Profilesett({ className, clickProfSett }) {    
    const [toggleSubTabs, setToggleSubTabs] = useState("profile");

    function clickSubTabs(index) {
        setToggleSubTabs(index);
    }

    return (
        <div className={className}>

            <div className="fixed inset-0 z-30 w-full h-screen flex bg-[#fafafa] dark:bg-darkColor-900 transition-all duration-150 transform overflow-hidden">
                
                <ProfileSB 
                clickSubTabs={clickSubTabs}
                toggleSubTabs={toggleSubTabs}
                setToggleSubTabs={setToggleSubTabs}
                clickProfSett={clickProfSett}
                />

            <div className="relative flex flex-col flex-auto w-auto h-screen">
                <nav className="h-fit flex justify-between border-b border-neutral-200 dark:border-neutral-700 2xl:pt-5 xl:pt-2 py-2 2xl:px-10 xl:px-5 px-5">
                    {/* Titles */}
                    <div className="w-full">
                        {/* Profile */}
                        <div className={toggleSubTabs === "profile" ? "" : "hidden"}>
                            <div className="flex justify-between">
                                <div className="flex flex-col h-40 w-[450px] pt-3 cursor-default">
                                    <strong className="2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 pb-6">Profile</strong>
                                    <h2 className="text-2xl text-primary font-semibold pb-2">Know your current information</h2>
                                    <small className="text-sm text-text-gray">Your basic information can be seen here. You cannot alter it, please be guided by your property custodian.</small>
                                </div>
                                <ProfileBg className="w-40"/>
                            </div>
                        </div>
                        {/* Theme */}
                        <div className={toggleSubTabs === "theme" ? "" : "hidden"}>
                            <div className="flex justify-between">
                                <div className="flex flex-col h-40 w-[450px] pt-3 cursor-default">
                                    <strong className="2xl:text-xl xl:text-lg text-lg font-bold text-neutral-700 dark:text-neutral-200 pb-6">Theme</strong>
                                    <h2 className="text-2xl text-primary font-semibold pb-2">Pick your preference</h2>
                                    <small className="text-sm text-text-gray">Make your workplace look good; that suits your preferences.</small>
                                </div>
                                <ProfileBg className="w-40"/>
                            </div>
                        </div>
                    </div>
                    {/* Titles */}
                </nav>

                {/* Contents */}
                <div className="h-full flex">
                    {/* Profile */}
                    {toggleSubTabs === "profile" ? <Profile className={"relative flex w-full h-full"} /> : ""}
                    {/* Theme */}
                    {toggleSubTabs === "theme" ? <Theme className={"relative flex w-full h-full"} /> : ""}
                </div>

            </div>

            </div>
        </div>
    )
}