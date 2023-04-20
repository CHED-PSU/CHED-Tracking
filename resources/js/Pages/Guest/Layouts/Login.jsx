import React from "react";
import { Link } from "react-router-dom";

import AppLogo from "../../../components/AppLogo";
import ChedLogo from "../../../components/ChedLogo";

export default function Login({ children }) {
    return (
        <div className="overflow-auto flex w-full h-screen bg-white">
            {/* Left Column */}
            <div className="justify-center items-end flex-col px-5 cursor-default w-full lg:flex hidden">
                <img
                    src="./img/guest_illustration.png"
                    className="2xl:w-[950px] xl:w-[650px] md:none sm:none w-[650px]"
                    draggable="false"
                />
            </div>

            {/* Right Column */}
            <div className="xl:w-[45%] w-[100%] flex flex-none justify-center items-center px-5">
                <div className="flex flex-col 2xl:w-[500px] xl:w-[450px] md:w-[360px] w-[360px] 2xl:space-y-14 xl:space-y-8 space-y-8">
                    <div className="flex flex-col 2xl:gap-16 xl:gap-8 h-fit text-darkColor-700 items-center">
                        <ChedLogo className="2xl:h-36 xl:h-24 h-20 md:mb-5 sm:mb-5" />
                        <div className="h-fit space-y-2 text-center">
                            <p className="2xl:text-2xl xl:text-lg text-lg font-bold text-darkColor-700 dark:text-white">
                                Welcome!
                            </p>
                            <p className="2xl:text-base xl:text-sm text-sm font-semibold text-gray-500 dark:text-lightColor-800">
                                Please login your account
                            </p>
                        </div>
                    </div>
                    <div className="space-y-10">


                        <div className="h-fit">{children}</div>
                    </div>
                    <div className="flex justify-center dark:text-lightColor-700">
                        <p className="md:text-ss text-xs mt-4 select-none">
                            © 2022 CHEDRO XI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
