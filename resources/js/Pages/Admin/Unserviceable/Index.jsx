import React, { useEffect, useState } from "react";
import ItemTab from "./Tables/ItemTab";
import MasterList from "./Tables/MasterList";
import AdminBg from "../../../Components/AdminBg";

export default function Unserviceable({ className }) {
    const [toggleTabs, setToggleTabs] = useState("item");

    function clickTabs(index) {
        setToggleTabs(index);
    }
    const [itemtab, setItemTab] = useState([]);
    const [masterlist, setMasterList] = useState();
    
    return (
        <div className={className + " flex justify-center relative"}>
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="z-20 pt-3 flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3">
                    <ul className="flex gap-4">
                        <li
                            onClick={() => clickTabs("item")}
                            className={
                                toggleTabs === "item"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Item
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("master-list")}
                            className={
                                toggleTabs === "master-list"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Master List
                            </div>
                        </li>
                        
                    </ul>
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col h-full mb-12 py-2 px-4 border rounded-lg bg-white">
                    {/*Item Table*/}
                    {toggleTabs === "item" ? <ItemTab
                        className={""}
                        items={itemtab.length != 0 ? itemtab : null}
                    /> : ""}
                    {/*Item Table*/}

                    {/*Destruction Table*/}
                    {toggleTabs === "master-list" ? <MasterList
                        className={""}
                        items={masterlist != undefined ? masterlist : null}
                    /> : ""}

                    {/*Destruction Table*/}

                </div>
                {/*Tabs*/}
            </div>
        </div>
    );
}
