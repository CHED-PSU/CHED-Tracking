import React from "react";
import { Link } from "react-router-dom";

import AppLogo from "../../../components/AppLogo";
import ChedLogo from "../../../components/ChedLogo";

export default function Login({ children }) {
    return (
        <div className="flex w-full h-screen bg-white">
            {/* Left Column */}
            <div className="justify-center items-end flex-col px-5 cursor-default w-full lg:flex hidden">
                <img
                    src="./img/guest_illustration.png"
                    className="2xl:w-[900px] xl:w-[650px] w-[650px]"
                    draggable="false"
                />
            </div>

            {/* Right Column */}
            <div className="xl:w-[45%] w-[45%] flex flex-none justify-center items-center px-5">
                <div className="flex flex-col 2xl:w-[500px] xl:w-[450px] w-[450px] 2xl:space-y-14 xl:space-y-8 space-y-8">
                    <div className="flex h-fit text-darkColor-700 justify-between">
                        <div className="flex items-center h-10 gap-4">
                            <Link to="/">
                                <AppLogo className="h-10" />
                            </Link>
                            <h4 className="2xl:text-lg xl:text-base text-base font-semibold select-none">
                                Trac
                                <font className="text-primary">Kagamitan</font>
                            </h4>
                        </div>
                        <ChedLogo className="h-10" />
                    </div>
                    <div className="space-y-10">
                        <div className="h-fit">
                            <p className="2xl:text-xl xl:text-lg text-lg font-bold text-darkColor-700 dark:text-white">
                                Welcome!
                            </p>
                            <p className="2xl:text-base xl:text-sm text-sm font-semibold text-gray-500 dark:text-lightColor-800">
                                Please login your account
                            </p>
                        </div>

                        <div className="h-fit">{children}</div>
                    </div>
                    <div className="flex items-end dark:text-lightColor-700">
                        <p className="text-xs mt-4 select-none">
                            © 2022 TracKagamitan. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
