import { toUpper } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import MultiModalAlert from "../Alerts/MultiModalAlert";
import Alert from "../Alerts/Alert";
import axios from "axios";

export default function ViewIssuedForm({
    className,
    clickView,
    itemsControlDetails,
    items,
}) {
    const [previousName, setPreviousName] = useState("");
    const [previousImg, setPreviousImg] = useState("");
    const [previousDes, setPreviousDes] = useState("");

    useEffect(() => {
        function loadData(index) {
            if (index != null) {
                setPreviousName(
                    index.firstname +
                        " " +
                        (index.middlename
                            ? index.middlename.substring(0, 1) + "."
                            : "") +
                        index.surname +
                        " " +
                        (index.suffix || "")
                );
                setPreviousImg(index.img);
                setPreviousDes(index.designation);
            }
        }
        loadData(itemsControlDetails);
    }, [itemsControlDetails]);

    let modalBody = useRef();

    const itemsMapper = (items) => {
        return items?.map((data, index) => {
            return (
                <tr
                    key={index}
                    className="avoid text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
                    <td className="text-center px-2 border">1</td>
                    <td className="text-center px-2 border">
                        {toUpper(data.unit)}
                    </td>
                    <td className="text-center px-2 border">
                        {formattedAmount(data.price)}
                    </td>
                    <td className="text-left px-2 py-3 border">
                        <div className="font-semibold">
                            {toUpper(data.article)}
                        </div>
                    </td>
                    <td className="text-left px-2 py-3 border">
                        <div className="min-w-[100px]">
                            {toUpper((data.make_model ? data.make_model : '') + (data.color ? ', ' + data.color : '') + (data.sku ? ', SN: ' + data.sku : ''))}
                        </div>
                    </td>
                    <td className="text-left px-2 border">{data.property_no}</td>
                    <td className="text-center px-2 border">
                        {toUpper(data.eul)}
                    </td>
                    <td className="text-center px-2 border">
                        {toUpper(
                            data.firstname +
                                " " +
                                (data.middlename == null
                                    ? ""
                                    : data.middlename.charAt(0) + "." + " ") +
                                " " +
                                data.surname +
                                (data.suffix == null ? "" : " " + data.suffix)
                        )}
                    </td>
                </tr>
            );
        });
    };

    function displayPhoto(profilePhoto, name, className) {
        if (profilePhoto == null || profilePhoto == "default.png") {
            return (
                <span
                    className={
                        className +
                        " bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full"
                    }
                >
                    {name.substring(0, 1)}
                </span>
            );
        } else {
            return (
                <img
                    draggable="false"
                    src="./img/profile-pic.jpeg"
                    className={
                        className + " rounded-full bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
                <div
                    ref={modalBody}
                    className="w-2/5 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20"
                >
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default pb-2">
                        <div className="w-full text-left">
                            <button
                                onClick={() => clickView(false)}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div className={className}>
                        <div className="space-y-3">
                            <div className="flex bg-gray-100 rounded-xl py-4 px-5 gap-3 cursor-default items-center">
                                {previousImg == "" ? (
                                    <img
                                        draggable="false"
                                        src="./img/profile-pic.jpeg"
                                        className="w-18 h-18 rounded-full bg-gray-500 object-cover"
                                    />
                                ) : (
                                    displayPhoto(
                                        previousImg,
                                        previousName,
                                        "w-18 h-18"
                                    )
                                )}
                                <div className="w-full space-y-1">
                                    <div className="border-b-2 border-gray-300 font-semibold pl-[10px] text-lg h-8 w-full">
                                        {previousName}
                                    </div>
                                    <div className="font-medium pl-[10px] text-sm h-8 rounded-md">
                                        {previousDes}
                                    </div>
                                </div>
                            </div>
                            <table className="w-full my-6">
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 px-2 font-medium border">
                                            Qty
                                        </th>
                                        <th className="h-10 px-2 font-medium border">
                                            Unit
                                        </th>
                                        <th className="h-10 px-2 font-medium border">
                                            Amount
                                        </th>
                                        <th
                                            colSpan={2}
                                            className="h-10 px-2 font-medium border"
                                        >
                                            Description
                                        </th>
                                        <th className="h-10 px-2 font-medium border">
                                            Inventory Item No.
                                        </th>
                                        <th className="h-10 px-2 font-medium border">
                                            Estimated Useful Life
                                        </th>
                                        <th className="h-10 px-2 font-medium border">
                                            Assigned to
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{itemsMapper(items)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
