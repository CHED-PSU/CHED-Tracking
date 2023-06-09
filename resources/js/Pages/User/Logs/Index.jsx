import React, { useState } from "react";

import ICSTable from "./Tables/ICSTable";
import PARTable from "./Tables/PARTable";
import IndividualTable from "./Tables/IndividualTable";
import axios from "axios";

export default function Index({ className }) {
    const [toggleTabs, setToggleTabs] = useState("ics");
    const [totalICS, setTotalICS] = useState(0);
    const [totalPAR, setTotalPAR] = useState(0);
    const [Loading, setLoading] = useState(true);

    function clickTabs(index) {
        setToggleTabs(index);
    }

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    function formattedAmountAbbrv(num) {
        const absNum = Math.abs(num);
        if (absNum >= 1e15) {
            return (
                Math.sign(num) * parseFloat((absNum / 1e15).toFixed(1)) + "Q"
            );
        } else if (absNum >= 1e12) {
            return (
                Math.sign(num) * parseFloat((absNum / 1e12).toFixed(1)) + "T"
            );
        } else if (absNum >= 1e9) {
            return Math.sign(num) * parseFloat((absNum / 1e9).toFixed(1)) + "B";
        } else if (absNum >= 1e6) {
            return Math.sign(num) * parseFloat((absNum / 1e6).toFixed(1)) + "M";
        } else if (absNum >= 1e3) {
            return Math.sign(num) * parseFloat((absNum / 1e3).toFixed(1)) + "k";
        } else {
            return Math.sign(num) * absNum;
        }
    }

    return (
        <div className={className + "  2xl:px-10 xl:px-5 px-5"}>
            <div className="relative flex 2xl:w-[73%] xl:w-[70%] w-[70%] h-full flex-col 2xl:space-y-5 xl:space-y-3 space-y-3 2xl:py-5 xl:py-3 py-3 2xl:pr-10 xl:pr-5 pr-5">
                {/*Tabs*/}
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <ul className="flex 2xl:gap-4 xl:gap-2 gap-2 h-10">
                            <li
                                onClick={() => clickTabs("ics")}
                                className={
                                    toggleTabs === "ics"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                }
                            >
                                <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                    ICS
                                </div>
                            </li>
                            <li
                                onClick={() => clickTabs("par")}
                                className={
                                    toggleTabs === "par"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                }
                            >
                                <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                    PAR
                                </div>
                            </li>
                            <li
                                onClick={() => clickTabs("ii")}
                                className={
                                    toggleTabs === "ii"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                }
                            >
                                <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                    Individual Inventory
                                </div>
                            </li>
                        </ul>
                    </div>
                    {toggleTabs === "ics" ? (
                        <ICSTable
                            setTotalICS={setTotalICS}
                            toggleTabs={toggleTabs}
                        />
                    ) : (
                        ""
                    )}

                    {toggleTabs === "par" ? (
                        <PARTable
                            setTotalPAR={setTotalPAR}
                            toggleTabs={toggleTabs}
                        />
                    ) : (
                        ""
                    )}

                    {toggleTabs === "ii" ? (
                        <IndividualTable toggleTabs={toggleTabs} />
                    ) : (
                        ""
                    )}
                </div>
                {/*Tabs*/}
            </div>

            <div className="flex flex-col 2xl:w-[27%] xl:w-[30%] w-[30%] h-full 2xl:py-5 xl:py-3 py-3">
                <div className="2xl:py-8 2xl:px-8 xl:py-6 xl:px-5 2xl:space-y-14 xl:space-y-8 space-y-8 rounded-2xl border border-neutral-200">
                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3">
                            Total amount of ICS items you currently own.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total ICS
                        </div>
                        <div className="flex 2xl:h-52 xl:h-40 h-40 2xl:py-4 2xl:px-6 xl:py-3 xl:px-5 py-3 px-5 rounded-2xl bg-card-3 bg-cover bg-center">
                            <div className="w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Php
                                </div>
                                <div className="w-full 2xl:text-4xl xl:text-3xl text-3xl font-bold text-white">
                                    {formattedAmountAbbrv(totalICS)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3 leading-3">
                            Total amount of PAR items you currently own.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total PAR
                        </div>
                        <div className="flex 2xl:h-52 xl:h-40 h-40 2xl:py-4 2xl:px-6 xl:py-3 xl:px-5 py-3 px-5 rounded-2xl bg-card-9 bg-cover bg-center">
                            <div className="w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Php
                                </div>
                                <div className="w-full 2xl:text-4xl xl:text-3xl text-3xl font-bold text-white">
                                    {formattedAmountAbbrv(totalPAR)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
