import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import StickerPreview from "./StickerPreview";

export default function InventorySticker(props) {
    const modalBody = useRef();
    const [openPreview, setOpenPreview] = useState("close");

    function clickPreview(index) {
        setOpenPreview(index);
    }

    console.log(openPreview)

    const icsItemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr className="avoid text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="h-full">
                        <div className="flex justify-center item-center">
                            <input
                                type="checkbox"
                                className=""
                                id="select-all"
                            />
                        </div>
                    </td>
                    <td className="text-center px-3 border">{data.quantity}</td>
                    <td className="text-center px-3 border">{data.unit}</td>
                    <td className="text-center px-3 border">
                        {data.quantity * data.price}
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div className="font-semibold">{data.description}</div>
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div>{data.property_no}</div>
                    </td>
                    <td className="text-left px-3 border"></td>
                    <td className="flex justify-center items-center px-2 h-14">
                        <button
                            className="flex justify-center items-center gap-1 w-8 h-8 p-4 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => clickPreview("open")}
                        >
                            <i className="fa-regular fa-note-sticky"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={props.className}>

            {openPreview === "open" ? (
                <StickerPreview
                    className={""}
                />
            ) : (
                ""
            )}

            <div className="z-40 w-full h-full bg-neutral-800 bg-opacity-75 fixed top-0 right-0 flex justify-center items-center">
                <div
                    ref={modalBody}
                    className="bg-white w-fit p-8 space-y-4 rounded-2xl flex flex-col items-left"
                >
                    <div
                        onClick={() => props.clickSticker("close")}
                        className="w-fit pr-3 cursor-pointer text-lg"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="w-full flex justify-end  items-center">
                        <button
                            className="flex justify-center items-center gap-1 w-8 h-8 p-4 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => clickPreview("open")}
                        >
                            <i className="fa-regular fa-note-sticky"></i>
                        </button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <th className="h-10 w-14 font-medium flex justify-center">
                                    <div className="flex item-center">
                                        <input
                                            type="checkbox"
                                            className=""
                                            id="select-all"
                                        />
                                    </div>
                                </th>
                                <th className="h-10 w-14 px-3 font-medium border">
                                    Qty
                                </th>
                                <th className="h-10 w-16 px-3 font-medium border">
                                    Unit
                                </th>
                                <th className="h-10 px-3 font-medium border">
                                    Amount
                                </th>
                                <th
                                    colSpan={2}
                                    className="h-10 px-3 font-medium border"
                                >
                                    Description
                                </th>
                                <th className="h-10 px-3 font-medium border">
                                    Inventory Item No.
                                </th>
                                <th className="h-10 w-32 font-medium text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*item*/}
                            {props.icsItems?.length !== 0 ? (
                                icsItemsMapper(Object.values(props.icsItems))
                            ) : (
                                <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                    <td
                                        colSpan={7}
                                        className="text-center py-2 px-2 border"
                                    >
                                        There is no data yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
