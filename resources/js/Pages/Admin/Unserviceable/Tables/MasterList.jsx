import React, { useEffect, useState } from "react";
import DonationTab from "../MasterListTabs/DonationTab";
import DestructionTab from "../MasterListTabs/DestructionTab";
import SalesTab from "../MasterListTabs/SalesTab";

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
            <div className="w-full flex justify-between items-center pb-2">
                <ul className="flex">
                    <li onClick={() => clickTabs("donation")}
                        className={
                            toggleTabs === "donation"
                                ? "text-primary font-medium bg-blue-50 rounded-md"
                                : "text-[#707070] hover:text-[#4b4b4b]"
                        }>
                            <div className="text-xs font-semibold cursor-pointer p-3 ">
                                Donation
                            </div>
                    </li>
                    <li onClick={() => clickTabs("destruction")}
                        className={
                            toggleTabs === "destruction"
                                ? "text-primary font-medium bg-blue-50 rounded-md"
                                : "text-[#707070] hover:text-[#4b4b4b]"
                        }>
                            <div className="text-xs font-semibold cursor-pointer p-3  ">
                                Destruction
                            </div>
                    </li>
                    <li onClick={() => clickTabs("sales")}
                        className={
                            toggleTabs === "sales"
                                ? "text-primary font-medium bg-blue-50 rounded-md"
                                : "text-[#707070] hover:text-[#4b4b4b]"
                        }>
                            <div className="text-xs font-semibold cursor-pointer p-3  ">
                                Sales
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

                    {/*Sales Table*/}
                    <SalesTab
                        className={toggleTabs === "sales" ? "" : "hidden"}
                    />
                    {/*Sales Table*/}
                </div>
            {/* Tabs */}

        </div>
    )
};
