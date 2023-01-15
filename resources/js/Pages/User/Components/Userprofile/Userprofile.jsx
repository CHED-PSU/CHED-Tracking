import React, { useEffect, useState } from "react";
import AppLogo from "../../../../components/AppLogo";
import ProfileBg from "../../../../components/ProfileBg";

export default function Userprofile({ className, clickForms }) {
    
    return (
        <div className={className}>
            <div className="fixed flex inset-0 bg-white w-full h-full z-40">

                {/* sidebar */}
                <div className="sticky top-0 flex flex-none flex-col h-screen 2xl:w-72 xl:w-[260px] w-[260px] bg-white dark:bg-darkColor-800 text-center border-r border-neutral-200 shrink-0 z-20 transition-all duration-150 transform">
                    {/* logo */}
                    <div
                    className="flex-none 2xl:h-[118px] xl:h-[100px] h-[100px] dark:border-neutral-700"
                    title="TracKagamitan Home"
                    >
                        <div className="h-full w-full flex items-center justify-center gap-5">
                            <div 
                                onClick={() => clickForms("close")}
                                className="cursor-pointer">
                                <i className="fa-sharp fa-solid fa-arrow-left text-xl"></i>
                            </div>
                            <div className="flex items-center font-semibold text-gray-600 dark:text-gray-50 gap-2 cursor-pointer">
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
                    {/* logo */}
                    {/* Links Container */}
                    <div className="flex-1 ">
                        <div className="flex flex-col justify-between h-full 2xl:py-8 xl:py-1 py-1">
                            {/* Page Links */}
                            <ul className="links flex-none 2xl:text-sm xl:text-[13px] text-[13px] text-darkColor-800 dark:text-lightColor-800 font-medium">
                                <li className="border-r-8 border-primary font-semibold text-primary">
                                    <div className="flex w-full items-center pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                        <h4 className=" leading-3">My Account</h4>
                                    </div>
                                </li>
                                <li className="hover:hoverPage dark:hover:darkHoverPage">
                                    <div className="flex w-full items-center pl-10 cursor-pointer 2xl:h-16 xl:h-14 h-14 py-3 select-none">
                                        <h4 className=" leading-3">Theme</h4>
                                    </div>
                                </li>
                            </ul>
                            <div className="w-full flex justify-center px-8">
                                {/* Profile Button */}
                                <div 
                                    className="outline-none flex 2xl:h-14 xl:h-12 h-12 w-full rounded-full justify-between cursor-default">
                                    <div className="flex w-full pl-2 pr-4 xl:items-center items-center h-full rounded-xl gap-3">
                                        <span className="flex flex-none justify-center items-center bg-blue-900 dark:bg-blue-600 2xl:w-10 2xl:h-10 xl:w-7 xl:h-7 w-7 h-7 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full">
                                            A
                                        </span>
                                        <div className="text-left leading-3 truncate">
                                            <h4 className="text-sm font-bold">
                                                LUIS
                                            </h4>
                                            <p className="text-ss">
                                                User | Requestor
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Links Container */}
                </div>
                {/* sidebar */}

                {/* my account */}
                <div className="relative flex flex-col flex-auto w-auto h-screen py-9 px-16">
                    <div className="flex justify-between border-b-2">
                        <div className="space-y-6">
                            <h5 className="text-xl text-[#434343] font-semibold cursor-default">Profile</h5>
                            <div className="w-[450px] space-y-2">
                                <h3 className="text-2xl text-primary font-semibold cursor-default">Know your current information</h3>
                                <p className="text-sm text-[#878787] cursor-default">Your basic information can be seen here. You cannot alter it, please be guided by your property custodian.</p>
                            </div>
                        </div>
                        <ProfileBg className="w-40"/>
                    </div>
                    <div className="flex w-full justify-between pt-10">
                        <div className="w-1/2 pr-10 space-y-8">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium pl-3 cursor-default">Display Name</h4>
                                <div className="border rounded-full px-4 py-2">
                                    <h6 className="text-[17px] text-[#434343] font-semibold">John Doe</h6>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium pl-3 cursor-default">Email</h4>
                                <div className="border rounded-full px-4 py-2">
                                    <h6 className="text-[17px] text-[#434343] font-semibold">johndoe@example.com</h6>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium pl-3 cursor-default">Phone number</h4>
                                <div className="border rounded-full px-4 py-2">
                                    <h6 className="text-[17px] text-[#434343] font-semibold">*******95</h6>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium pl-3 cursor-default">Password</h4>
                                <div className="border rounded-full px-4 py-2">
                                    <h6 className="text-[17px] text-[#434343] font-semibold">************</h6>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                            <img className="rounded-full shadow-xl object-cover w-60 h-60 " src="./img/profile-pic.jpeg" alt="Profile picture" />
                        </div>
                    </div>

                </div>
                {/* my account */}

                {/* theme */}
                <div className="hidden relative flex flex-col flex-auto w-auto h-screen py-9 px-16">
                    <div className="flex justify-between border-b-2">
                        <div className="space-y-6">
                            <h5 className="text-xl text-[#434343] font-semibold cursor-default">Theme</h5>
                            <div className="w-[450px] space-y-2">
                                <h3 className="text-2xl text-primary font-semibold cursor-default">Pick your preference</h3>
                                <p className="text-sm text-[#878787] cursor-default">Make your workplace look good; that suits your preferences.</p>
                            </div>
                        </div>
                        <ProfileBg className="w-40"/>
                    </div>
                    <div className="w-full pt-10">
                        <div className="w-1/2 pr-10 space-y-8">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium pl-3 cursor-default">Color Theme</h4>
                                <form action="">
                                    <div className="flex flex-col space-y-2 pt-4">
                                        <div className="flex gap-2 pl-5">
                                            <input type="radio" id="light" name="colortheme" value="Light Theme" className="cursor-pointer" defaultChecked/>
                                            <label htmlFor="light" className="cursor-pointer font-medium">Light Theme</label>
                                        </div>
                                        <div className="flex gap-2 pl-5">
                                            <input type="radio" id="dark" name="colortheme" value="Dark Theme" className="cursor-pointer" />
                                            <label htmlFor="dark" className="cursor-pointer font-medium">Dark Theme</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>
                {/* theme */}

            </div>
        </div>
    )
}