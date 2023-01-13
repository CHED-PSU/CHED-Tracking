import React, { useEffect, useRef, useState } from "react";

export default function ICSModal(props) {
    let modalBody = useRef();


    return (
        <div>
            
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-30">
                <div
                    ref={modalBody}
                    className="w-1/3 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-8 space-y-4 z-20"
                >
                    <div className="text-center dark:text-white">
                        <div className="w-full text-left">
                            <button
                                onClick={() => props.clickICSModal("close")}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="text-xs -mt-5">
                            Commission on Higher Education
                        </div>
                        <div className="text-xs">Regional Office XI</div>
                        <div className="text-xs">SUPPLY & PROCUREMENT UNIT</div>
                    </div>
                    <div className="dark:text-white">
                        <div className="text-xs">Description of Property</div>
                        <div className="text-sm flex justify-between">
                            <div className="">
                                <div className="">
                                    Type :{" "}
                                    <font className="dark:text-gray-400">
                                        0
                                    </font>
                                </div>
                                <div className="">
                                    Serial No:{" "}
                                    <font className="dark:text-gray-400">
                                        0
                                    </font>
                                </div>
                                <div className="">
                                    Acquisition:{" "}
                                    <font className="dark:text-gray-400">
                                        P 0
                                    </font>
                                </div>
                                <div className="">
                                    Nature of last repair:{" "}
                                    <font className="dark:text-gray-400"></font>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    Brand/Model:{" "}
                                    <font className="dark:text-gray-400">
                                        0
                                    </font>
                                </div>
                                <div className="">
                                    Property No:{" "}
                                    <font className="dark:text-gray-400">
                                        0
                                    </font>
                                </div>
                                <div className="">
                                    Date of last repair:{" "}
                                    <font className="dark:text-gray-400">
                                        N/A
                                    </font>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dark:text-white">
                        <div className="text-sm">DEFECT:</div>
                        <div className="text-xs dark:text-gray-400">
                            0
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="dark:text-white">Request by:</div>
                        <div className="dark:text-gray-400">
                            0
                        </div>
                    </div>
                    <div className="text-xs dark:text-gray-300">
                        <div className="">0</div>
                    </div>
                    <div className="">
                        {/* Hide this buttons if the form is already accepted */}
                        <div className="flex flex-col space-y-3">
                            <button
                                className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                            >
                                Accept
                            </button>
                            <button
                                className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] "
                            >
                                Decline
                            </button>
                        </div>

                        {/* Accepted Button (unhide this button if the form is already accepted) */}
                        <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] disabled hidden">
                            Accepted
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
