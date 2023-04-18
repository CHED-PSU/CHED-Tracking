import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Alert from "./Alert";
import MiniLogo from "../../../../../Components/Mini-logo";
import BarCode from "../../../../../Components/BarCode";
import QRCode from "../../../../../Components/QRCode";

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
        setOpenAlert(true);
        setAlertIcon("exclamation");
        setAlertHeader("No selected items.");
        setAlertDesc("Please select an item on the checkbox.");
        setAlertNoButton("Okay");
        setAccept("acceptNotif");
        setOpenAlert(index);
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
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
    const [selectSingleIds, setSelectSingleIds] = useState([]);

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

        setSelectSingleIds([]);
    };

    const handleSelectItem = (event) => {
        const itemId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        if (isChecked) {
            // Add the selected item ID to the array
            setSelectedMultipleIds([...selectedMultipleIds, itemId]);
        } else {
            // Remove the selected item ID from the array
            setSelectedMultipleIds(
                selectedMultipleIds.filter((id) => id !== itemId)
            );
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

        setSelectSingleIds([]);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("select-all");
        selectAllCheckbox.addEventListener("change", handleSelectAll);
    }, []);

    //Select Only One
    const handleSelectSingleItem = (itemId) => {
        setSelectSingleIds([itemId]);
    };

    const icsItemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr
                    key={data.id}
                    className="avoid text-xs h-fit
                 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
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
                    <td className="text-center px-3 border">1</td>
                    <td className="text-center px-3 border">{data.unit}</td>
                    <td className="text-center px-3 border">
                        {formattedAmount(data.price)}
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div className="font-semibold">{data.article}</div>
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div className="min-w-[100px]">{data.description}</div>
                    </td>
                    <td className="flex justify-center items-center px-2 h-14">
                        <button
                            className="flex justify-center items-center gap-2 w-fit h-8 py-4 px-3 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => {
                                handleSelectSingleItem(data.id);
                                clickPreview("open");
                            }}
                        >
                            <i className="fa-solid fa-print"></i>
                            <p className="text-xs font-semibold">Print Item</p>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const selectedIds =
        selectSingleIds != "" ? selectSingleIds : selectedMultipleIds;

    function formatDateDisplay(
        dateString,
        increment = 0,
        showFullDate = false
    ) {
        const date = new Date(dateString);
        const year = date.getFullYear() + increment;
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        if (showFullDate) {
            return `${month} ${day}, ${year}`;
        } else {
            return `${year}`;
        }
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    const stickerMapper = (items, selectedItems) => {
        return items?.map((data) => {
            if (selectedItems.includes(data.id)) {
                const stickers = [];
                for (let i = 0; i < 1; i++) {
                    stickers.push(
                        <div
                            key={i}
                            className="flex-none border-2 border-black w-[3.1in] avoid"
                        >
                            <div className="flex items-center justify-center gap-1 bg-amber-400 p-2">
                                <MiniLogo className="w-14 h-14" />
                                <div className="w-full">
                                    <div className="w-[180px] text-[8px] font-medium text-center">
                                        <h6>Republic of the Philippines</h6>
                                        <h6>OFFICE OF THE PRESIDENT</h6>
                                        <h5 className="text-[9px] font-semibold">
                                            COMMISSION ON HIGHER EDUCATION
                                        </h5>
                                        <h6>REGIONAL OFFICE XI</h6>
                                    </div>
                                </div>
                                <QRCode
                                    className="w-10 h-10 bg-white p-1 flex-none"
                                    serial_no={data.serial_no}
                                />
                            </div>
                            <div className="bg-black text-white text-ss font-bold text-center">
                                PROPERTY INVENTORY STICKER
                            </div>
                            <div className="bg-neutral-300 px-1">
                                <div className="text-[7px] font-medium py-1">
                                    Sticker No. LDP-
                                </div>
                                <table className="text-[5px]">
                                    <tbody>
                                        <tr>
                                            <td className="h-3 w-16">
                                                ARTICLE
                                            </td>
                                            <td className="text-[8px] font-semibold">
                                                : {data.article}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">DESCRIPTION</td>
                                            <td className="text-[8px] font-medium flex">
                                                :&nbsp;
                                                <p className="w-[185px] truncate">
                                                    {data.description}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">SERIAL NO.</td>
                                            <td className="text-[8px] font-medium">
                                                :{" "}
                                                {data.serial_no
                                                    ? data.serial_no
                                                    : "N/A"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">
                                                PROPERTY CODE
                                            </td>
                                            <td className="text-[8px] font-medium">
                                                :{" "}
                                                {props.formDetails.ics_no ||
                                                    props.formDetails.par_no}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">
                                                DATE ACQUIRED
                                            </td>
                                            <td className="text-[8px] font-medium">
                                                :{" "}
                                                {formatDateDisplay(
                                                    props.formDetails
                                                        .issued_date,
                                                    0,
                                                    true
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">AMOUNT</td>
                                            <td className="text-[8px] font-medium">
                                                : {data.price}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">ISSUED TO</td>
                                            <td className="text-[8px] font-medium">
                                                :{" "}
                                                {props.formDetails.receiverF +
                                                    " " +
                                                    (props.formDetails
                                                        .receiverM == null
                                                        ? ""
                                                        : props.formDetails.receiverM.charAt(
                                                              0
                                                          ) +
                                                          "." +
                                                          " ") +
                                                    " " +
                                                    props.formDetails
                                                        .receiverS +
                                                    (props.formDetails
                                                        .receiverSuf == null
                                                        ? ""
                                                        : " " +
                                                          props.formDetails
                                                              .receiverSuf)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-3">
                                                INSPECTED BY
                                            </td>
                                            <td className="text-[8px] font-medium">
                                                :{" "}
                                                {props.formDetails.issuerF +
                                                    " " +
                                                    (props.formDetails
                                                        .issuerM == null
                                                        ? ""
                                                        : props.formDetails.issuerM.charAt(
                                                              0
                                                          ) +
                                                          "." +
                                                          " ") +
                                                    " " +
                                                    props.formDetails.issuerS +
                                                    (props.formDetails
                                                        .issuerSuf == null
                                                        ? ""
                                                        : " " +
                                                          props.formDetails
                                                              .issuerSuf)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="text-[8px] border-y-2 border-black">
                                        <th className="bg-black text-white">
                                            Year
                                        </th>
                                        <th className="bg-amber-400">
                                            {formatDateDisplay(
                                                props.formDetails.issued_date,
                                                0
                                            )}
                                        </th>
                                        <th className="bg-black text-white">
                                            {formatDateDisplay(
                                                props.formDetails.issued_date,
                                                1
                                            )}
                                        </th>
                                        <th className="bg-amber-400">
                                            {" "}
                                            {formatDateDisplay(
                                                props.formDetails.issued_date,
                                                2
                                            )}
                                        </th>
                                        <th className="bg-black text-white">
                                            {formatDateDisplay(
                                                props.formDetails.issued_date,
                                                3
                                            )}
                                        </th>
                                        <th className="bg-amber-400">
                                            {formatDateDisplay(
                                                props.formDetails.issued_date,
                                                4
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-y border-black">
                                        <td className="text-[8px] text-center border-r border-black font-semibold w-16">
                                            COA
                                        </td>
                                        <td className="border-r border-black"></td>
                                        <td className="border-r border-black"></td>
                                        <td className="border-r border-black"></td>
                                        <td className="border-r border-black"></td>
                                        <td></td>
                                    </tr>
                                    <tr className="border-y border-black">
                                        <td className="border-r border-black text-[8px] text-center font-semibold">
                                            CHEDROXI
                                        </td>
                                        <td className="border-r border-black text-[6px] font-medium">
                                            {""}
                                        </td>
                                        <td className="border-r border-black text-[6px] font-medium">
                                            {""}
                                        </td>
                                        <td className="border-r border-black text-[6px] font-medium">
                                            {""}
                                        </td>
                                        <td className="border-r border-black text-[6px] font-medium">
                                            {""}
                                        </td>
                                        <td className="text-[6px]">{""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-[7px] text-black font-semibold bg-amber-400 py-1 px-1">
                                NOTE: PLEASE DO NOT REMOVE
                            </div>
                            <div className="flex gap-2 px-2 items-center bg-black text-white text-[5px] text-center pt-1 py-1">
                                {data.serial_no ? (
                                    <BarCode
                                        className="h-8 bg-white"
                                        serial_no={data.serial_no}
                                    />
                                ) : (
                                    <div className="h-8"></div>
                                )}
                                <p className="text-[6px] font-medium text-left">
                                    UNAUTHORIZED REMOVAL OR TAMPERING WILL BE
                                    SUBJECTED TO DISCIPLINARY ACTION.
                                </p>
                            </div>
                        </div>
                    );
                }
                return stickers;
            } else {
                return null;
            }
        });
    };

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
                            <div
                                ref={stickerRef}
                                className="relative max-w-[6.6in] h-fit flex flex-wrap gap-8"
                            >
                                {props.icsItems?.length !== 0
                                    ? stickerMapper(
                                          Object.values(props.icsItems),
                                          selectedIds
                                      )
                                    : ""}
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
                    className="bg-white w-fit p-8 space-y-4 rounded-xl flex flex-col items-left"
                >
                    <div
                        onClick={() => props.clickSticker("close")}
                        className="w-fit pr-3 cursor-pointer text-lg"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="text-center cursor-default flex flex-col gap-1 pb-2">
                        <h4 className="text-primary dark:text-white text-2xl font-semibold">
                            Print Sticker
                        </h4>
                        <p className="text-sm text-text-gray dark:text-neutral-300">
                            You may print an <b>Inventory Sticker</b> here.
                        </p>
                    </div>
                    <div className="w-full flex justify-end  items-center">
                        <button
                            id="multipleSelectionButton"
                            className="flex justify-center items-center gap-2 px-3 w-fit h-10 py-4 text-[14px] text-text-black rounded-full default-btn"
                            onClick={() => {
                                if (selectedMultipleIds.length > 0) {
                                    clickPreview("open");
                                } else {
                                    clickAlert(true);
                                }
                                handleSelectSingleItem("");
                            }}
                        >
                            <i className="fa-solid fa-print"></i>
                            <p className="font-semibold">Print Selected</p>
                        </button>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
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
                                    <th className="h-10 w-32 font-medium text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*item*/}
                                {props.icsItems?.length !== 0 ? (
                                    icsItemsMapper(
                                        Object.values(props.icsItems)
                                    )
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
        </div>
    );
}
