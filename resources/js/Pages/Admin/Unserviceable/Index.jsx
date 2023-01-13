import React, { useEffect, useState } from "react";
import DonationTable from "./Tables/DonationTable";
import DestructionTable from "./Tables/DestructionTable";
import SalesTable from "./Tables/SalesTable";
import AdminBg from "../../../Components/AdminBg";

export default function Unserviceable({ className }) {
    const [toggleTabs, setToggleTabs] = useState("donation");

    function clickTabs(index) {
        setToggleTabs(index);
    }
    const [donation, setDonation] = useState([]);
    const [destruction, setDestruction] = useState();
    const [sales, setSales] = useState();

    
    return (
        <div className={className + " flex justify-center"}>
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="z-20 pt-3 flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3">
                    <ul className="flex gap-4">
                        <li
                            onClick={() => clickTabs("donation")}
                            className={
                                toggleTabs === "donation"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Donation
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("destruction")}
                            className={
                                toggleTabs === "destruction"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Destruction
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("sales")}
                            className={
                                toggleTabs === "sales"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Sales
                            </div>
                        </li>
                    </ul>
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col h-full">
                    {toggleTabs === "donation" ? <DonationTable
                        className={""}
                        items={donation.length != 0 ? donation : null}
                    /> : ""}
                    {/*Donation Table*/}

                    {/*Donation Table*/}

                    {/*Destruction Table*/}
                    {toggleTabs === "destruction" ? <DestructionTable
                        className={""}
                        items={destruction != undefined ? destruction : null}
                    /> : ""}

                    {/*Destruction Table*/}

                    {/*Sales Table*/}
                    {toggleTabs === "sales" ? <SalesTable
                        items={sales != undefined ? sales : null}
                        className={""}
                    /> : ""}
                    {/*Sales Table*/}


                </div>
                {/*Tabs*/}
            </div>
        </div>
    );
}
