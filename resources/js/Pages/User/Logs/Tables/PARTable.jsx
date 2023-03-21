import React, { useEffect, useState } from "react";
import ParItems from "../FormItems/ParItems";
import axios from "axios";
import Searchbar from "../../Components/Searchbar";

export default function PARTable({ className }) {
    const [parItems, setParItems] = useState([]);
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [Loading, setLoading] = useState(false);

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    useEffect(() => {
        const getParItems = async () => {
            setLoading(true);
            try {
                await axios
                    .post("api/getPAR", {
                        user_id: value.id,
                    })
                    .then((res) => {
                        setParItems(res.data.allPar);
                    });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        getParItems();
        setFilteredItemsData(parItems);
    }, []);

    useEffect(() => {
        search();
    }, [searchTerm]);

    const search = () => {
        if (searchTerm !== " ") {
            const filterData = parItems.filter((item) => {
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

    const parMapper = (par) => {
        return par.map((data) => {
            if (data) {
                return <ParItems key={data.id} data={data} />;
            }
        });
    };

    return (
        <>
            <div className=" flex w-fit right-0 absolute px-5">
                <Searchbar search={setSearchTerm} className="h-10" />
            </div>
            <div className="mt-5 flex flex-col w-full">
                <table className={className}>
                    <thead>
                        <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <th className="h-10 font-medium text-left pl-6">
                                PAR No.
                            </th>
                            <th className="h-10 font-medium text-left">
                                Description & Date Acquired
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
                        {Loading ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center h-12 bg-white border"
                                >
                                    <small>Loading data.</small>
                                </td>
                            </tr>
                        ) : filteredItemsData?.length == 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center h-12 bg-white border"
                                >
                                    <small>No data available in table</small>
                                </td>
                            </tr>
                        ) : (
                            parMapper(Object.values(filteredItemsData))
                        )}
                        {/*item 5*/}
                    </tbody>
                </table>
            </div>
        </>
    );
}
