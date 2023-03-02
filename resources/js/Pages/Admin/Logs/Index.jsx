import React, { useState } from "react";

import AdminBg from "../../../Components/AdminBg";
import ICSTable from "./Tables/ICSTable";
import PARTable from "./Tables/PARTable";
import IndividualTable from "./Tables/IndividualTable";
import Searchbar from "../Components/Searchbar";

export default function Logs({ className }) {
    const [toggleTabs, setToggleTabs] = useState("ics");

    function clickTabs(index) {
        setToggleTabs(index);
    }

    return (
        <div className={className + " flex justify-center"}>
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="z-20 pt-3 flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3 h-14 items-center w-full flex justify-between ">
                    <ul className="flex gap-4">
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
                    <div className=""><Searchbar className="h-8" /></div>
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col h-full w-[1100px] items-center pt-6 mb-12 py-2 px-4 border dark:border-[#434343] rounded-lg bg-white dark:bg-darkColor-800">
                    {/*ICS Table*/}
                    <ICSTable
                        className={toggleTabs === "ics" ? "" : "hidden"}
                    />
                    {/*ICS Table*/}

                    {/*PAR Table*/}
                    <PARTable
                        className={toggleTabs === "par" ? "" : "hidden"}
                    />
                    {/*PAR Table*/}

                    {/*Individual Inventory Table*/}
                    <IndividualTable
                        className={toggleTabs === "ii" ? "" : "hidden"}
                    />
                    {/*Individual Inventory Table*/}
                </div>
                {/*Tabs*/}
            </div>
        </div>
    );
}
