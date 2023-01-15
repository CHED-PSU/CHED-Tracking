import React, { useEffect, useState } from "react";
import axios from "axios";
import IcsItems from "../FormItems/IcsItems";
import Searchbar from "../../Components/Searchbar";
import { values } from "lodash";


export default function ICSTable({ className, toggleTabs, clickTabs }) {
    const [icsItems, setIcsItems] = useState([]);
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    useEffect(() => {
        if (icsItems.length === 0) {

            fetch('http://' + url.hostname + ':8000/api/getICS', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: value.id
            })
                .then(response => response.json())
                .then((data) => {
                    setIcsItems(data.allICS);
                })
        }

        setFilteredItemsData(icsItems)
    }, [icsItems])

    useEffect(() => {
        search()
    }, [searchTerm])


    const icsMapper = (ics) => {
        return ics.map((data) => {
            if (data) {
                return <IcsItems key={data.id} data={data} />
            }
        })
    }
    const search = () => {
        if (searchTerm !== ' ') {
            const filterData = icsItems.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
            })

            setFilteredItemsData(filterData)
        } else {
            setFilteredItemsData(icsItems)
        }
    }

    return (<>
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
            <Searchbar search={setSearchTerm} className="h-10" />
        </div>
        <div className="mt-5 flex flex-col w-full">
            <table className={className}>
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 font-medium text-left pl-6">ICS No.</th>
                        <th className="h-10 font-medium text-left">
                            Date Acquired
                        </th>
                        <th className="h-10 font-medium text-left">Amount</th>
                        <th className="h-10 font-medium text-left">
                            Remarks/Transferred
                        </th>
                        <th className="h-10 w-32 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* no data */}

                    {/* no data */}

                    {/*item 1*/}
                    {filteredItemsData?.length != 0 ? icsMapper(Object.values(filteredItemsData)) : <tr>
                        <td colspan="5" className="text-center h-12 bg-white border">
                            <small>No data available in table</small>
                        </td>
                    </tr>}


                    {/*item 5*/}
                </tbody>
            </table>
        </div>
    </>
    );
}
