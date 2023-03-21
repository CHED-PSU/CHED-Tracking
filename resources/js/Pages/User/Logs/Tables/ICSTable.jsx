import React, { useEffect, useState } from "react";
import axios from "axios";
import IcsItems from "../FormItems/IcsItems";
import Searchbar from "../../Components/Searchbar";
import { values } from "lodash";

export default function ICSTable({ className, toggleTabs, clickTabs, setTotalICS }) {
    const [icsItems, setIcsItems] = useState([]);
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [Loading, setLoading] = useState(true);

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    useEffect(() => {
        const getIcsItems = async () => {
            try {
                await axios
                    .post("api/getICS", {
                        user_id: value.id,
                    })
                    .then((res) => {
                        setIcsItems(res.data.allICS);
                    });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getIcsItems();
        setFilteredItemsData(icsItems);
    }, []);

    useEffect(() => {
        search();
        setFilteredItemsData(icsItems);
    }, [searchTerm]);

    const icsMapper = (ics) => {
        let totalICS = 0;

        const icsItems = ics.map((data) => {
            if (data) {
                totalICS += parseFloat(data.total);
                return <IcsItems key={data.id} data={data} />;
            }
        });
        setTotalICS(totalICS);
        return icsItems;
    };

    const search = () => {
        if (searchTerm !== " ") {
            const filterData = icsItems.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });

            setFilteredItemsData(filterData);
        } else {
            setFilteredItemsData(icsItems);
        }
    };

    return (
        <>
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
                            <th className="h-10 font-medium text-left pl-6">
                                ICS No.
                            </th>
                            <th className="h-10 font-medium text-left">
                                Date Acquired
                            </th>
                            <th className="h-10 font-medium text-left">
                                Amount
                            </th>
                            <th className="h-10 font-medium text-left">
                                Remarks/Transferred
                            </th>
                            <th className="h-10 w-32 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*item 1*/}
                        {Loading ? (
                            <>
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center h-12 bg-white border"
                                    >
                                        <small>
                                            No data available in table
                                        </small>
                                    </td>
                                </tr>
                            </>
                        ) : (
                            icsMapper(Object.values(icsItems))
                        )}
                        {/*item 5*/}
                    </tbody>
                </table>
            </div>
        </>
    );
}
