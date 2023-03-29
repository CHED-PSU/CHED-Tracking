import React, { useEffect, useState } from "react";
import axios from "axios";
import Items from "../FormItems/Items";
import Searchbar from "../../Components/Searchbar";

export default function IndividualTable({ className, toggleTabs, clickTabs }) {
    const [indivItems, setIndivItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [Loading, setLoading] = useState(true);

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    useEffect(() => {
        const getIndividualItems = async () => {
            try {
                await axios
                    .post("/api/getIndividualItems", {
                        id: value.id,
                    })
                    .then((res) => {
                        setIndivItems(res.data.allIndivItems);
                        setTotalPrice(res.data.total_price);
                    });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getIndividualItems();
        setFilteredItemsData(indivItems);
    }, []);

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    useEffect(() => {
        search();
    }, [searchTerm]);

    const itemsMapper = (im) => {
        let counter = 0;
        return im.map((data) => {
            counter++;
            if (data != "No items") {
                return <Items data={data} key={data.id} counter={counter} formattedAmount={formattedAmount} />;
            } else {
                return "";
            }
        });
    };

    const search = () => {
        if (searchTerm !== " ") {
            const filterData = indivItems.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });

            setFilteredItemsData(filterData);
        } else {
            setFilteredItemsData(indivItems);
        }
    };

    return (
        <>
            <div className=" flex w-fit right-0 absolute px-5">
                <Searchbar search={setSearchTerm} className="h-10" />
            </div>
            <div className="mt-5 flex flex-col w-full">
                <div className={className}>
                    <div className="bg-white dark:bg-darkColor-900 border rounded-lg 2xl:px-8 2xl:py-10 xl:px-5 xl:py-5 px-5 py-5">
                        {/* title */}
                        <div className="flex justify-center">
                            <h4 className="text-text-black dark:text-white 2xl:text-lg xl:text-base text-base font-semibold pb-4">
                                Individual Inventory Regular
                            </h4>
                        </div>
                        {/* details */}
                        <div className="flex text-left gap-2 py-3">
                            <div className="text-xs font-semibold text-text-black dark:text-neutral-300">
                                Name:
                            </div>
                            <div className="">
                                <p className="text-xs text-slate-600 dark:text-neutral-300 underline">
                                    {''}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-neutral-300">
                                    {''}
                                </p>
                            </div>
                        </div>
                        {/* table container */}
                        <div className="flex flex-col h-fit">
                            <div className="overflow-scroll 2xl:max-h-[500px] xl:max-h-[300px] max-h-[300px] 2xl:max-w-fit xl:max-w-[750px] max-w-[750px]">
                                {/* items */}
                                <table className="table-auto">
                                    <thead>
                                        <tr className="h-8 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                colSpan="10"
                                                className="text-left font-medium pl-2"
                                            >
                                                OFFICE EQUIPMENT AND FURNITURE &
                                                FIXTURES
                                            </th>
                                        </tr>
                                        <tr className="text-xs border dark:border-neutral-700 text-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                title="No."
                                                className="w-16 h-10 font-medium text-center border px-2"
                                            >
                                                NO.
                                            </th>
                                            <th
                                                title="Article"
                                                className="w-36 h-10 font-semibold text-center border px-2"
                                            >
                                                ARTICLE
                                            </th>
                                            <th
                                                title="Description"
                                                className="w-auto h-10 font-semibold text-center border px-2"
                                            >
                                                DESCRIPTION
                                            </th>
                                            <th
                                                title="Quantity"
                                                className="w-16 h-10 font-semibold text-center border px-2"
                                            >
                                                QTY
                                            </th>
                                            <th
                                                title="Serial No."
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                Serial No
                                            </th>
                                            <th
                                                title="Inventory Item No."
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                CODE
                                            </th>
                                            <th
                                                title="Amount"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                AMOUNT
                                            </th>
                                            <th
                                                title="Data Acquired"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                DATE ACQUIRED
                                            </th>
                                            <th
                                                title="Remarks"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                REMARKS/ TRANSFERED
                                            </th>
                                            <th
                                                title="Remarks"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                REMARKS 2021
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="h-8 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                colSpan="10"
                                                className="text-left font-medium pl-2"
                                            >
                                                FURNITURE AND FIXTURES
                                            </th>
                                        </tr>
                                        {Loading ? (
                                            <tr>
                                                <td
                                                    colSpan="10"
                                                    className="text-center h-12 bg-white border"
                                                >
                                                    <small>Loading data.</small>
                                                </td>
                                            </tr>
                                        ) : indivItems?.length == 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="10"
                                                    className="text-center h-12 bg-white border"
                                                >
                                                    <small>
                                                        No data available in
                                                        table
                                                    </small>
                                                </td>
                                            </tr>
                                        ) : (
                                            itemsMapper(
                                                Object.values(indivItems)
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-1 text-sm mt-4">
                            Total Amount:{" "}
                            <span>
                                {Loading ? "computing...." : '₱ ' + formattedAmount(totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
