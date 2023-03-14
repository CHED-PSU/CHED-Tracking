import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Alert from "./Alert";
import MiniLogo from "../../../../../Components/Mini-logo";

export default function InventorySticker(props) {
    const stickerRef = useRef();
    const modalBody = useRef();
    const [openPreview, setOpenPreview] = useState("close");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [accept, setAccept] = useState(false);

    function clickPreview(index) {
        setOpenPreview(index);
    }

    function clickAlert(index) {
        setOpenAlert(true)
        setAlertIcon("exclamation");
        setAlertHeader("No selected items.");
        setAlertDesc("Please select an item on the checkbox.");
        setAlertNoButton("Okay");
        setAccept("acceptNotif");
        setOpenAlert(index);
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
    const [selectedMultipleIds, setSelectedMultipleIds] = useState([]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Get all the checkboxes and their values
            const checkboxes = document.querySelectorAll(".u_items");
            const ids = [];
            checkboxes.forEach((checkbox) => {
                ids.push(parseInt(checkbox.value));
                checkbox.checked = true;
            });
            setSelectedMultipleIds(ids);
        } else {
            // Clear the selected IDs array and uncheck all the checkboxes
            setSelectedMultipleIds([]);
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
            setSelectedMultipleIds([...selectedMultipleIds, itemId]);
        } else {
            // Remove the selected item ID from the array
            setSelectedMultipleIds(selectedMultipleIds.filter((id) => id !== itemId));
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

    //Select Only One
    const [selectSingleIds, setSelectSingleIds] = useState([]);

    const handleSelectSingleItem = (itemId) => {
        setSelectSingleIds([itemId]);
    };


    console.log(selectedMultipleIds);
    console.log(selectSingleIds);

    const icsItemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr key={data.id} className="avoid text-xs h-fit
                 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
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
                        <div className="font-semibold">{data.article}</div>
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div>{data.description}</div>
                    </td>
                    <td className="text-left px-3 border"></td>
                    <td className="flex justify-center items-center px-2 h-14">
                        <button
                            className="flex justify-center items-center gap-1 w-8 h-8 p-4 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => { handleSelectSingleItem(data.id); clickPreview("open"); }}
                        >
                            <i className="fa-regular fa-note-sticky"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const selectedIds = selectSingleIds != "" ? selectSingleIds : selectedMultipleIds;

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const stickerMapper = (items, selectedItems) => {
        return items?.map((data) => {
            if (selectedItems.includes(data.id)) {
                return (
                    <div key={data.id} className="flex-none border-2 border-black w-[2.9in] avoid">
                        <div className="flex items-center bg-amber-400 py-2">
                            <MiniLogo className="w-14 h-14" />
                            <div className="w-full">
                                <div className="w-[180px] text-[8px] font-medium text-center">
                                    <h6>Republic of the Philippines</h6>
                                    <h6>OFFICE OF THE PRESIDENT</h6>
                                    <h5 className="text-[9px] font-semibold">COMMISSION ON HIGHER EDUCATION</h5>
                                    <h6>REGIONAL OFFICE XI</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black text-white text-ss font-bold text-center">PROPERTY INVENTORY STICKER</div>
                        <div className="bg-neutral-300 px-1">
                            <div className="text-[7px] font-medium py-1">Sticker No. LDP-001</div>
                            <table className="text-[5px]">
                                <tbody>
                                    <tr>
                                        <td className="h-3 w-16">ARTICLE</td>
                                        <td className="text-[8px] font-semibold">: {data.article}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">DESCRIPTION</td>
                                        <td className="text-[8px] font-medium flex">:&nbsp;<p className="w-[185px] truncate">{data.description}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">SERIAL NO.</td>
                                        <td className="text-[8px] font-medium">: {data.property_no}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">PROPERTY CODE</td>
                                        <td className="text-[8px] font-medium">: {props.formDetails.ics_no}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">DATE ACQUIRED</td>
                                        <td className="text-[8px] font-medium">: {formatDateDisplay(props.formDetails.issued_date)}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">AMOUNT</td>
                                        <td className="text-[8px] font-medium">: {data.price}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">ISSUED TO</td>
                                        <td className="text-[8px] font-medium">: {props.formDetails.received}</td>
                                    </tr>
                                    <tr>
                                        <td className="h-3">INSPECTED BY</td>
                                        <td className="text-[8px] font-medium">: {props.formDetails.issued}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-[8px] border-y-2 border-black">
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
                                    <td className="text-[8px] text-center border-r border-black font-semibold w-20">COA</td>
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
                );
            } else {
                return null;
            }
        });
    }

    return (
        <div className={props.className}>

            {openAlert ? (
                <Alert
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertNoButton={alertNoButton}
                    clickAlert={clickAlert}
                    accept={accept}
                    className={""}
                />
            ) : (
                ""
            )}

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
                                        Sticker previews of the selected item/s.
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

                        <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 p-8 flex justify-center w-[8in]">
                            <div ref={stickerRef} className="relative max-w-[6.15in] h-fit flex flex-wrap gap-8">

                                {props.icsItems?.length !== 0 ? (
                                    stickerMapper(Object.values(props.icsItems), selectedIds)
                                ) : ("")}

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
                            id="multipleSelectionButton"
                            className="flex justify-center items-center gap-1 w-8 h-8 p-4 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => {
                                if (selectedMultipleIds.length > 0) {
                                    clickPreview("open");
                                } else {
                                    clickAlert(true);
                                }
                                handleSelectSingleItem("");
                            }}
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
