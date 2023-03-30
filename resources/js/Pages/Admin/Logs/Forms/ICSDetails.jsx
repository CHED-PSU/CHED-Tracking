import { toUpper } from "lodash";
import React, { createRef, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InventorySticker from "./Modal/InventorySticker";

export default function ICSDetails(props) {
    const ref = useRef();
    const [openSticker, setOpenSticker] = useState("close");

    function clickSticker(index) {
        setOpenSticker(index);
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        pageStyle: `
        @media print {
            @page {
              size: A4 portrait;
              margin-top: 0.5in;
              margin-bottom: 0.5in;
            }
          }`,
        documentTitle: "ICS",
    });

    const icsItemsMapper = (items) => {
        return items?.map((data, index) => {
            return (
                <tr
                    key={index}
                    className="avoid text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
                    <td className="text-center px-2 border">{data.quantity}</td>
                    <td className="text-center px-2 border">{toUpper(data.unit)}</td>
                    <td className="text-center px-2 border">
                        {formattedAmount(data.quantity * data.price)}
                    </td>
                    <td className="text-left px-2 py-3 border">
                        <div className="font-semibold">{toUpper(data.article)}</div>
                    </td>
                    <td className="text-left px-2 py-3 border">
                        <div className="min-w-[100px]">{toUpper(data.description)}</div>
                    </td>
                    <td className="text-left px-2 border"></td>
                    <td className="text-center px-2 border">{toUpper(data.eul)}</td>
                    <td className="text-center px-2 border">
                        {toUpper(data.firstname +
                              " " +
                              (data.middlename == null
                                  ? ""
                                  : data.middlename.charAt(0) + "." + " ") +
                              " " +
                              data.surname +
                              (data.suffix == null ? "" : " " + data.suffix))}
                    </td>
                </tr>
            );
        });
    };

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <div className={props.className}>
            {openSticker === "open" ? (
                <InventorySticker
                    className={""}
                    formDetails={props.formDetails}
                    icsItems={props.icsItems}
                    clickSticker={clickSticker}
                />
            ) : (
                ""
            )}

            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-30">
                <div className="dark:bg-darkColor-800 h-full w-fit border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                    {/* header */}
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-1/2">
                            <button
                                onClick={() => props.clickSubForms("close")}
                                className="py-3 mt-4"
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-default">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    ICS Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / ICS / {props.userName} /{" "}
                                    {props.formDetails.ics_no}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-end gap-4">
                            <button
                                onClick={() => clickSticker("open")}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                            >
                                <i className="fa-solid fa-print mr-1"></i>
                                Print Sticker
                            </button>
                            <button
                                onClick={handlePrint}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                            >
                                <i className="fa-solid fa-print mr-1"></i>
                                Print
                            </button>
                        </div>
                    </div>
                    {/* header */}
                    {/* data table */}
                    <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10">
                        <div ref={ref} className="w-[8.27in] px-6 py-6">
                            <div className="text-center dark:text-white py-2">
                                <div className="text-sm font-semibold">
                                    INVENTORY CUSTODIAN SLIP
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
                                            ICS No:
                                            <span id="form_identifier"></span>
                                        </div>
                                        <div className="text-xs  dark:text-gray-400 font-semibold">
                                            {props.formDetails.ics_no}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-2 overflow-y-hidden">
                                <table
                                    id="items"
                                    className="table-auto w-full min-w-[700px]"
                                >
                                    <tbody id="slip-table">
                                        {/* header */}
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
                                        {/* header */}

                                        {props.Loading ? (
                                            <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                <td
                                                    colSpan={8}
                                                    className="text-center py-2 px-2 border"
                                                >
                                                    Loading data.
                                                </td>
                                            </tr>
                                        ) : props.icsItems?.length !== 0 ? (
                                            icsItemsMapper(
                                                Object.values(props.icsItems)
                                            )
                                        ) : (
                                            <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                <td
                                                    colSpan={8}
                                                    className="text-center py-2 px-2 border"
                                                >
                                                    There is no data yet.
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
                                            {props.formDetails.issuerF +
                                                " " +
                                                (props.formDetails.issuerM ==
                                                null
                                                    ? ""
                                                    : props.formDetails.issuerM.charAt(
                                                          0
                                                      ) +
                                                      "." +
                                                      " ") +
                                                " " +
                                                props.formDetails.issuerS +
                                                (props.formDetails.issuerSuf ==
                                                null
                                                    ? ""
                                                    : " " +
                                                      props.formDetails
                                                          .issuerSuf)}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="Property_custodian_name"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Signature Over Printed Name
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {props.formDetails.designation1}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formatDateDisplay(
                                                props.formDetails.issued_date
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                    <div className="w-fit">
                                        <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                            Received by:{" "}
                                            {props.formDetails.receiverF +
                                                " " +
                                                (props.formDetails.receiverM ==
                                                null
                                                    ? ""
                                                    : props.formDetails.receiverM.charAt(
                                                          0
                                                      ) +
                                                      "." +
                                                      " ") +
                                                " " +
                                                props.formDetails.receiverS +
                                                (props.formDetails
                                                    .receiverSuf == null
                                                    ? ""
                                                    : " " +
                                                      props.formDetails
                                                          .receiverSuf)}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="user-employee"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Signature Over Printed Name
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {props.formDetails.designation2}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formatDateDisplay(
                                                props.formDetails.received_date
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* data table */}
                </div>
            </div>
        </div>
    );
}
