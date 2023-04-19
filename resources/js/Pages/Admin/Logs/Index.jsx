import React, { useState } from "react";

import ICSTable from "./Tables/ICSTable";
import PARTable from "./Tables/PARTable";
import IndividualTable from "./Tables/IndividualTable";
import IndividualTableCOS from "./Tables/IndividualTableCOS";
import Searchbar from "../Components/Searchbar";

export default function Logs({ className }) {
    const [toggleTabs, setToggleTabs] = useState("ics");

    function clickTabs(index) {
        setToggleTabs(index);
    }

    return (
        <div className={className + " flex justify-center"}>
            <div className="z-20 pt-3 flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3 h-14 items-center w-full flex justify-between ">
                    <ul className="flex gap-4">
                        <li
                            onClick={() => clickTabs("ics")}
                            className={
                                toggleTabs === "ics"
                                    ? "btn-color-4 text-white dark:bg-[#476aca] dark:border-none font-semibold rounded-full transition duration-500 ease-in-out"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:bg-darkColor-800 dark:border-[#434343] dark:hover:bg-[#434343] rounded-full"
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
                                ? "btn-color-4 text-white dark:bg-[#476aca] dark:border-none font-semibold rounded-full transition duration-500 ease-in-out"
                                : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:bg-darkColor-800 dark:border-[#434343] dark:hover:bg-[#434343] rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                PAR
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("iir")}
                            className={
                                toggleTabs === "iir"
                                ? "btn-color-4 text-white dark:bg-[#476aca] dark:border-none font-semibold rounded-full transition duration-500 ease-in-out"
                                : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:bg-darkColor-800 dark:border-[#434343] dark:hover:bg-[#434343] rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Individual Inventory Regular
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("iij")}
                            className={
                                toggleTabs === "iij"
                                ? "btn-color-4 text-white dark:bg-[#476aca] dark:border-none font-semibold rounded-full transition duration-500 ease-in-out"
                                : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:bg-darkColor-800 dark:border-[#434343] dark:hover:bg-[#434343] rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Individual Inventory COS/JO
                            </div>
                        </li>
                    </ul>
                    <div className=""><Searchbar className="h-8" /></div>
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col h-full w-[1100px] items-center pt-6 mb-12 py-2 px-4 border dark:border-[#434343] rounded-lg bg-white dark:bg-darkColor-800">
                    {/*ICS Table*/}
                    <ICSTable
                        className={toggleTabs === "ics" ? "" : "hidden"}
                        toggleTabs={toggleTabs}
                    />
                    {/*ICS Table*/}

                    {/*PAR Table*/}
                    <PARTable
                        className={toggleTabs === "par" ? "" : "hidden"}
                        toggleTabs={toggleTabs}
                    />
                    {/*PAR Table*/}

                    {/*Individual Inventory Table*/}
                    <IndividualTable
                        className={toggleTabs === "iir" ? "" : "hidden"}
                        toggleTabs={toggleTabs}
                    />
                    {/*Individual Inventory Table*/}

                    {/*Individual Inventory Table*/}
                    <IndividualTableCOS
                        className={toggleTabs === "iij" ? "" : "hidden"}
                        toggleTabs={toggleTabs}
                    />
                    {/*Individual Inventory Table*/}
                </div>
                {/*Tabs*/}
            </div>
        </div>
    );
}
