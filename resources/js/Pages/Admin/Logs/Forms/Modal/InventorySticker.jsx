import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MiniLogo from "../../../../../Components/Mini-logo";

export default function InventorySticker(props) {
    const stickerRef = useRef();
    const modalBody = useRef();
    const [openPreview, setOpenPreview] = useState("close");

    function clickPreview(index) {
        setOpenPreview(index);
    }

    console.log(openPreview)

    const handlePrint = useReactToPrint({
        content: () => stickerRef.current,
        pageStyle: `
        @media print {
            @page {
              size: A4 portrait;
              margin-top: 0.5in;
              margin-bottom: 0.5in;
            }
          }`,
        documentTitle: "Inventory Sticker",
    });

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
                <div className="fixed inset-0 bg-white w-full h-screen flex flex-col items-center justify-center space-y-10 z-50">
                    <div className="dark:bg-darkColor-800 h-full w-fit border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                        <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                            <div className="w-full flex gap-6 py-3 mt-4">
                                <button
                                    onClick={() => clickPreview("close")}
                                    className=""
                                >
                                    <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                                </button>
                                <div className="text-left cursor-default">
                                    <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                        Inventory Sticker
                                    </h4>
                                    <p className="text-sm text-text-gray dark:text-neutral-300">
                                        This page is hidden. For layout preview only.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 p-[0.5in]">
                            <div ref={stickerRef} className="w-[11.69in] h-[8.27in]">

                                {/* Sticker sample */}
                                <div className="border-2 border-black w-[4.4in]">
                                    <div className="flex items-center bg-amber-400 py-2">
                                        <MiniLogo className="w-20 h-20"/>
                                        <div className="w-full ">
                                        <div className="w-[280px] text-xs font-medium text-center">
                                            <h6>Republic of the Philippines</h6>
                                            <h6>OFFICE OF THE PRESIDENT</h6>
                                            <h5 className="text-sm font-semibold">COMMISSION ON HIGHER EDUCATION</h5>
                                            <h6>REGIONAL OFFICE XI</h6>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="bg-black text-white font-bold text-center">PROPERTY INVENTORY STICKER</div>
                                    <div className="bg-neutral-300 px-1">
                                        <div className="text-xs font-medium py-1">Sticker No. LDP-001</div>
                                        <table className="text-[8px]">
                                            <tbody>
                                                <tr>
                                                    <td className="h-5">ARTICLE</td>
                                                    <td className="text-xs w-80 font-semibold">: TABLE</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">DESCRIPTION</td>
                                                    <td className="text-xs font-medium">: P-SHAPE TABLE WOODGRAIN FINISH 180X80</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">SERIAL NO.</td>
                                                    <td className="text-xs font-medium">: -</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">PROPERTY CODE</td>
                                                    <td className="text-xs font-medium">: CHED11-TP-001</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">DATE ACQUIRED</td>
                                                    <td className="text-xs font-medium">: JUNE 2015</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">AMOUNT</td>
                                                    <td className="text-xs font-medium">: *</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">ISSUED TO</td>
                                                    <td className="text-xs font-medium">: LUIS D. PEREZ</td>
                                                </tr>
                                                <tr>
                                                    <td className="h-5">INSPECTED BY</td>
                                                    <td className="text-xs font-medium">: </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-xs h-6 border-y-2 border-black">
                                                <th className="bg-black text-white">Year</th>
                                                <th className="bg-amber-400">2021</th>
                                                <th className="bg-black text-white">2022</th>
                                                <th className="bg-amber-400">2023</th>
                                                <th className="bg-black text-white">2024</th>
                                                <th className="bg-amber-400">2025</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-y border-black">
                                                <td className="text-xs text-center border-r border-black font-semibold">COA</td>
                                                <td className="border-r border-black"></td>
                                                <td className="border-r border-black"></td>
                                                <td className="border-r border-black"></td>
                                                <td className="border-r border-black"></td>
                                                <td></td>
                                            </tr>
                                            <tr className="border-y border-black">
                                                <td className="border-r border-black text-xs text-center font-semibold">CHEDROXI</td>
                                                <td className="border-r border-black text-[8px] font-medium">JBASISTER</td>
                                                <td className="border-r border-black text-[8px] font-medium">JBASISTER</td>
                                                <td className="border-r border-black text-[8px] font-medium">JBASISTER</td>
                                                <td className="border-r border-black text-[8px] font-medium">JBASISTER</td>
                                                <td className="text-[8px]">JBASISTER</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-ss text-black font-semibold bg-amber-400 py-1 px-1">NOTE: PLEASE DO NOT REMOVE</div>
                                    <div className="bg-black text-white text-[8px] text-center py-1">UNAUTHORIZED REMOVAL OR TAMPERING WILL BE SUBJECTED TO DISCIPLINARY ACTION.</div>
                                </div>
                                {/* Sticker sample */}
                                
                            </div>
                        </div>

                    </div>
                </div>

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
