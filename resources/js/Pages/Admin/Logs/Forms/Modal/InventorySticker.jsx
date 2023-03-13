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

    const handlePrint = useReactToPrint({
        content: () => stickerRef.current,
        pageStyle: `
        @media print {
            body {-webkit-print-color-adjust: exact;}
            @page {
              size: A4 portrait;
            }
          }`,
        documentTitle: "Inventory Sticker",
    });

    //Select all

    //Storage for IDs that is selected
    const [selectedIds, setSelectedIds] = useState([]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Get all the checkboxes and their values
            const checkboxes = document.querySelectorAll(".u_items");
            const ids = [];
            checkboxes.forEach((checkbox) => {
                ids.push(parseInt(checkbox.value));
                checkbox.checked = true;
            });
            setSelectedIds(ids);
        } else {
            // Clear the selected IDs array and uncheck all the checkboxes
            setSelectedIds([]);
            const checkboxes = document.querySelectorAll(".u_items");
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }

        // Update the individual checkboxes' state
        const individualCheckboxes = document.querySelectorAll(".u_items");
        individualCheckboxes.forEach((checkbox) => {
            checkbox.checked = event.target.checked;
        });
    };

    const handleSelectItem = (event) => {
        const itemId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        if (isChecked) {
            // Add the selected item ID to the array
            setSelectedIds([...selectedIds, itemId]);
        } else {
            // Remove the selected item ID from the array
            setSelectedIds(selectedIds.filter((id) => id !== itemId));
        }

        // Check if all checkboxes are checked or not
        const checkboxes = document.querySelectorAll(".u_items");
        const allChecked = Array.from(checkboxes).every(
            (checkbox) => checkbox.checked
        );
        const selectAllCheckbox = document.querySelector("#select-all");

        // Update the select all checkbox accordingly
        if (allChecked) {
            selectAllCheckbox.checked = true;
        } else {
            selectAllCheckbox.checked = false;
        }
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("select-all");
        selectAllCheckbox.addEventListener("change", handleSelectAll);
    }, []);

    console.log(selectedIds);

    const icsItemsMapper = (items) => {
        return items?.map((data, index) => {
            return (
                <tr key={data.id} className="avoid text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="h-full">
                        <div className="flex justify-center item-center">
                            <input
                                type="checkbox"
                                className="u_items"
                                value={data.id}
                                onChange={handleSelectItem}
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

    function Sticker({ times }) {
        return (
            <>
                {[...Array(times)].map((_, index) => (
                    <div key={index} className="flex-none border-2 border-black w-[3in] avoid">
                        <div className="flex items-center bg-amber-400 py-2">
                            <MiniLogo className="w-12 h-12" />
                            <div className="w-full ">
                                <div className="w-[185px] text-[8px] font-medium text-center">
                                    <h6>Republic of the Philippines</h6>
                                    <h6>OFFICE OF THE PRESIDENT</h6>
                                    <h5 className="text-[9px] font-semibold">COMMISSION ON HIGHER EDUCATION</h5>
                                    <h6>REGIONAL OFFICE XI</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black text-white font-bold text-center text-ss">PROPERTY INVENTORY STICKER</div>
                        <div className="bg-neutral-300 px-1">
                            <div className="text-[7px] font-medium py-1">Sticker No. LDP-001</div>
                            <table className="text-[6px]">
                                <tbody>
                                    <tr>
                                        <td className="h-2 w-20">ARTICLE</td>
                                        <td className="text-[8px] w-80 font-semibold">: TABLE</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">DESCRIPTION</td>
                                        <td className="text-[9px] font-medium flex">:&nbsp;<p className="w-52 truncate">P-SHAPE TABLE WOODGRAIN FINISH 180X80</p> </td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">SERIAL NO.</td>
                                        <td className="text-[8px] font-medium">: -</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">PROPERTY CODE</td>
                                        <td className="text-[8px] font-medium">: CHED11-TP-001</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">DATE ACQUIRED</td>
                                        <td className="text-[8px] font-medium">: JUNE 2015</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">AMOUNT</td>
                                        <td className="text-[8px] font-medium">: *</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">ISSUED TO</td>
                                        <td className="text-[8px] font-medium">: LUIS D. PEREZ</td>
                                    </tr>
                                    <tr>
                                        <td className="h-2">INSPECTED BY</td>
                                        <td className="text-[8px] font-medium">: </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-ss h-6 border-y-2 border-black">
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
                                    <td className=" text-[8px] text-center border-r border-black font-semibold">COA</td>
                                    <td className="border-r border-black"></td>
                                    <td className="border-r border-black"></td>
                                    <td className="border-r border-black"></td>
                                    <td className="border-r border-black"></td>
                                    <td></td>
                                </tr>
                                <tr className="border-y border-black">
                                    <td className="border-r border-black text-[8px] text-center font-semibold">CHEDROXI</td>
                                    <td className="border-r border-black text-[6px] font-medium">JBASISTER</td>
                                    <td className="border-r border-black text-[6px] font-medium">JBASISTER</td>
                                    <td className="border-r border-black text-[6px] font-medium">JBASISTER</td>
                                    <td className="border-r border-black text-[6px] font-medium">JBASISTER</td>
                                    <td className="text-[6px]">JBASISTER</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-[7px] text-black font-semibold bg-amber-400 py-1 px-1">NOTE: PLEASE DO NOT REMOVE</div>
                        <div className="bg-black text-white text-[5px] text-center py-1">UNAUTHORIZED REMOVAL OR TAMPERING WILL BE SUBJECTED TO DISCIPLINARY ACTION.</div>
                    </div>
                ))}
            </>
        );
    }

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
                            <div className="flex w-1/2 justify-end items-end gap-4">
                                <button
                                    onClick={handlePrint}
                                    className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                                >
                                    <i className="fa-solid fa-print mr-1"></i>
                                    Print
                                </button>
                            </div>

                        </div>

                        <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 p-5">
                            <div ref={stickerRef} className="relative w-[8.27in] h-fit flex flex-wrap gap-5">

                                {/* Sticker sample */}
                                <Sticker times={6} />
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
                                            onChange={handleSelectAll}
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
