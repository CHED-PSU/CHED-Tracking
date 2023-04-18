import React, { useState, useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import InventoryTab from "./Tables/Inventory";

export default function Inventory({ className }) {
    const [toggleTabs, setToggleTabs] = useState("items");

    function clickTabs(index) {
        setToggleTabs(index);
    }

    return (
        <div className={className + " flex justify-center relative"}>
            <div className="z-20 pt-[14px] flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                <div className="pb-3 h-14 items-center w-full">
                    <div className="pb-3 h-14 items-center w-full flex justify-between ">
                        <ul className="flex gap-4">
                            <li
                                onClick={() => clickTabs("items")}
                                className={
                                    toggleTabs === "items"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                }
                            >
                                <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                    Items
                                </div>
                            </li>
                            <li
                                onClick={() => clickTabs("issued")}
                                className={
                                    toggleTabs === "issued"
                                        ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                        : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                }
                            >
                                <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                    Issued Forms
                                </div>
                            </li>
                        </ul>
                        <div className="">
                            <Searchbar />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-[1100px] items-center mb-12 pb-2 pt-0 px-4 border rounded-lg bg-white dark:border-[#434343] dark:bg-darkColor-800">
                    {toggleTabs === "items" ? <InventoryTab /> : ''}
                    {toggleTabs === "issued" ? '' : ''}
                </div>
            </div>
        </div>
    );
}
