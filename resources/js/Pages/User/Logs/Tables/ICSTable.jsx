import React, { useEffect, useState } from "react";
import axios from "axios";
import IcsItems from "../FormItems/IcsItems";
import Searchbar from "../../Components/Searchbar";

export default function ICSTable({ setTotalICS }) {
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
            <div className=" flex w-fit right-0 absolute px-5">
                <Searchbar search={setSearchTerm} className="h-10" />
            </div>
            <div className="mt-5 flex flex-col w-full">
                <table>
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
                                Issued By
                            </th>
                            <th className="h-10 w-32 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*item 1*/}
                        {Loading ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center h-12 bg-white border"
                                >
                                    <small>Loading data.</small>
                                </td>
                            </tr>
                        ) : (
                            icsItems?.length == 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center h-12 bg-white border"
                                    >
                                        <small>No data available in table</small>
                                    </td>
                                </tr>
                            ) : (
                                icsMapper(Object.values(icsItems))
                            )
                        )}
                        {/*item 5*/}
                    </tbody>
                </table>
            </div>
        </>
    );
}
