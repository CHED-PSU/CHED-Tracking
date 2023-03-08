import React, { useEffect, useState } from "react";
import DonationTab from "../MasterListTabs/DonationTab";
import DestructionTab from "../MasterListTabs/DestructionTab";

export default function MasterList({ className , items }) {
    const [toggleTabs, setToggleTabs] = useState("donation");

    function clickTabs(index) {
        setToggleTabs(index);
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-fit h-full"}>
            <div className="w-full flex justify-between items-center h-16">
                <ul className="flex">
                    <li onClick={() => clickTabs("donation")}
                        className={
                            toggleTabs === "donation"
                                ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                : "text-[#707070] hover:text-[#4b4b4b]"
                        }>
                            <div className="text-xs font-semibold cursor-pointer p-3 ">
                                Donation
                            </div>
                    </li>
                    <li onClick={() => clickTabs("destruction")}
                        className={
                            toggleTabs === "destruction"
                                ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                : "text-[#707070] hover:text-[#4b4b4b]"
                        }>
                            <div className="text-xs font-semibold cursor-pointer p-3  ">
                                Destruction & Sales
                            </div>
                    </li>
                </ul>
            </div>

            {/* Tabs */}
            <div className="flex-col h-full">
                    {/*Donation Table*/}
                    <DonationTab
                        className={toggleTabs === "donation" ? "" : "hidden"}
                    />
                    {/*Donation Table*/}

                    {/*Destruction Table*/}
                    <DestructionTab
                        className={toggleTabs === "destruction" ? "" : "hidden"}
                    />
                    {/*Destruction Table*/}

                </div>
            {/* Tabs */}

        </div>
    )
};
