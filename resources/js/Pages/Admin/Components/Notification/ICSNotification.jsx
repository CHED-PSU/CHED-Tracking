import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ICSNotification({
    className,
    clickICSNotification,
    listId,
    formType
}) {
    const [Loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [formDetails, setFormDetails] = useState([]);

    async function getIssuedItems() {
        setLoading(true);
        try {
            await axios
                .post("api/getAdminNotifSecListItems", {
                    listId: listId,
                })
                .then((res) => {
                    setItems(res.data.items);
                    setFormDetails(res.data.form_details);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIssuedItems();
    }, []);

    const itemsData = (item) => {
        let counter = 0;
        return item.map((data) => {
            counter++;
            return (
                <tr
                    key={counter}
                    className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
                    <td className="text-center px-3 border">{data.quantity}</td>
                    <td className="text-center px-3 border">{data.unit}</td>
                    <td className="text-center px-3 border">
                        {parseInt(data.price) * parseInt(data.quantity)}
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div className="flex items-center">
                            <div className="font-semibold mr-3">
                                {data.article}
                            </div>
                            <div>{data.description}</div>
                        </div>
                    </td>
                    <td className="text-left px-3 border">
                        {data.inventory_no}
                    </td>
                    <td className="text-center px-3 border">{data.eul}</td>
                </tr>
            );
        });
    };

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 flex items-center justify-center z-30">
                <div className="w-1/2 h-fit bg-white shadow-lg rounded-2xl px-8 py-6 z-20">
                    <button
                        onClick={() => clickICSNotification("close")}
                        className="closeModal text-xl pb-2"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="bg-white dark:bg-darkColor-900 rounded-lg px-5 pb-6 ">
                        <div className="text-center dark:text-white py-2">
                            <div className="text-sm font-semibold">
                                ACCEPTED {formType} FORM DETAILS
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        Commision on Higher Education
                                    </div>
                                </div>
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Fund Cluster:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        {""}
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        {formType} No:{""}
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        {formDetails
                                            ? formDetails.tracking_id
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-2 overflow-y-hidden">
                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 w-20 text-center font-medium border px-2">
                                            Qty
                                        </th>
                                        <th className="h-10 w-20 text-center font-medium border px-2">
                                            Unit
                                        </th>
                                        <th className="h-10 w-10 text-center font-medium border px-2">
                                            Amount
                                        </th>
                                        <th className="h-10 w-50 text-center font-medium border px-2">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 text-center font-medium border px-2">
                                            Inventory Item No.
                                        </th>
                                        <th className="h-10 w-30 text-center font-medium border px-2">
                                            Estimated Useful Life
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    {Loading == false ? (
                                        itemsData(Object.values(items))
                                    ) : (
                                        <tr className="text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                            <td
                                                colSpan="6"
                                                className="text-xs px-2 h-fit text-center"
                                            >
                                                Loading data.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Issued by:{" "}
                                        {formDetails
                                            ? formDetails.u1name +
                                              " " +
                                              formDetails.u1surname
                                            : ""}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="Property_custodian_name"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails
                                            ? formDetails.u1designation
                                            : ""}
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u1role : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Received by: {""}
                                        {formDetails
                                            ? formDetails.u2name +
                                              " " +
                                              formDetails.u2surname
                                            : ""}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="user-employee"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails
                                            ? formDetails.u2designation
                                            : ""}
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u2role : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
