import React, { useEffect, useRef } from "react";

export default function Alert(props) {
    let modalBody = useRef();

    return (
        <div className={props.className}>
            <div className="z-50 w-full h-full bg-neutral-800 bg-opacity-75 fixed top-0 right-0 flex justify-center items-center">
                <div
                    ref={modalBody}
                    className="bg-white max-w-[550px] p-8 space-y-6 rounded-2xl text-center flex flex-col items-left"
                >
                    <div className="flex gap-5">
                        {/* Question */}
                        <div
                            className={
                                props.alertIcon === "check" ? "" : "hidden"
                            }
                        >
                            <div className="flex-none border-4 border-green-400 rounded-full w-14 h-14 flex justify-center items-center">
                                <i className="fa-solid fa-check text-3xl text-green-400"></i>
                            </div>
                        </div>
                        {/* Question */}

                        {/* Question */}
                        <div
                            className={
                                props.alertIcon === "question" ? "" : "hidden"
                            }
                        >
                            <div className="flex-none border-4 border-yellow-400 rounded-full w-14 h-14 flex justify-center items-center">
                                <i className="fa-solid fa-question text-3xl text-yellow-400"></i>
                            </div>
                        </div>
                        {/* Question */}

                        {/* Exclamation */}
                        <div
                            className={
                                props.alertIcon === "exclamation"
                                    ? ""
                                    : "hidden"
                            }
                        >
                            <div className="flex-none border-4 border-red-500 rounded-full w-14 h-14 flex justify-center items-center">
                                <i className="fa-solid fa-exclamation text-3xl text-red-500"></i>
                            </div>
                        </div>
                        {/* Exclamation */}

                        <div
                            className={
                                props.alertIcon === "check" ? "" : "hidden"
                            }
                        >
                            <div className="text-left h-full flex items-center">
                                <h1 className="text-xl leading-none font-semibold">
                                    {props.alertHeader}
                                </h1>
                            </div>
                        </div>

                        <div
                            className={
                                props.alertIcon !== "check" ? "" : "hidden"
                            }
                        >
                            <div className="text-left space-y-3">
                                <h1 className="text-xl leading-none font-semibold">
                                    {props.alertHeader}
                                </h1>
                                {props.alertDesc ? (
                                    <div className="text-base text-[#707070]">
                                        {props.alertDesc}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <div
                            onClick={() => props.clickAlert(false)}
                            className="btn-color-3 dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full px-5 py-3 cursor-pointer"
                        >
                            {props.alertNoButton}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
