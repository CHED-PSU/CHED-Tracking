import { toUpper } from "lodash";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InventorySticker from "./Modal/InventorySticker";

export default function PARDetails(props) {
    const ref = useRef();

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
        documentTitle: "PAR",
    });

    const [openSticker, setOpenSticker] = useState("close");

    function clickSticker(index) {
        setOpenSticker(index);
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const parItemsMapper = (items) => {
        return items?.map((data, index) => {
            return (
                <tr key={index} className="avoid text-xs h-fit cursor-default border border-darkColor-700 dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="text-center px-3 border border-darkColor-700">
                        1
                    </td>
                    <td className="text-center px-3 border border-darkColor-700">
                        {toUpper(data.unit)}
                    </td>
                    <td className="text-left border border-darkColor-700 text-xs">
                        <div className="px-3 py-1 font-semibold border-b border-darkColor-700">
                            {data.article}
                        </div>
                        <div className="px-3 py-1">{toUpper(data.make_model ? data.make_model + ', ' : '') + data.description + (data.color ? ', ' + data.color : '')}</div>
                    </td>
                    <td className="text-center border border-darkColor-700">
                        {data.property_no}
                    </td>
                    <td className="text-center border border-darkColor-700">
                        {props.dateAcquired}
                    </td>
                    <td className="text-center border border-darkColor-700">
                        {formattedAmount(data.price)}
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={props.className}>
            {openSticker === "open" ? (
                <InventorySticker
                    className={""}
                    formDetails={props.formDetails}
                    icsItems={props.parItems}
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
                                    PAR Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / PAR / {props.userName} /{" "}
                                    {props.formDetails.par_no}
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
                    <div className="bg-white text-darkColor-800 dark:bg-darkColor-900 rounded-lg mx-10">
                        <div ref={ref} className="w-[8.27in] py-2">
                            <div className="text-center pt-2 pb-6 dark:text-white border border-b-0 border-darkColor-700">
                                <div className="text-[13px] font-bold">
                                    PROPERTY ACKNOWLEDGEMENT RECEIPT
                                </div>
                            </div>
                            <div className="flex justify-between items-center border border-y-0 border-darkColor-700 pb-3">
                                <div className="">
                                    <div className="pt-4 flex items-center gap-2">
                                        <div className="pl-3 text-xs dark:text-white">
                                            Entity Name:
                                        </div>
                                        <div className="text-xs dark:text-gray-400 font-semibold">
                                            Commision on Higher Education
                                        </div>
                                    </div>
                                    <div className="pt-1 flex items-center gap-2">
                                        <div className="pl-3 text-xs dark:text-white">
                                            Fund Cluster:
                                        </div>
                                        <div className="text-xs dark:text-gray-400 font-semibold">
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="pt-1 flex items-center gap-2">
                                        <div className="text-xs dark:text-white">
                                            PAR No:
                                        </div>
                                        <div className="pr-3 text-xs dark:text-gray-400 font-semibold">
                                            {props.formDetails.par_no}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <table
                                    id="items "
                                    className="table-auto w-full min-w-[700px]"
                                >
                                    <tbody id="slip-table">
                                        <tr className="avoid text-xs text-darkColor-700 border dark:border-neutral-700 dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th className="h-10 font-medium border border-darkColor-700">
                                                Quantity
                                            </th>
                                            <th className="h-10 font-medium border border-darkColor-700">
                                                Unit
                                            </th>
                                            <th className="h-10 w-80 font-medium border border-darkColor-700">
                                                Description
                                            </th>
                                            <th className="h-10 font-medium border border-darkColor-700">
                                                Property Number
                                            </th>
                                            <th className="h-10 font-medium border border-darkColor-700">
                                                Date Acquired
                                            </th>
                                            <th className="h-10 font-medium border border-darkColor-700">
                                                Amount
                                            </th>
                                        </tr>
                                        {props.Loading ? (
                                            <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-2 px-2 border"
                                                >
                                                    There is no data yet.
                                                </td>
                                            </tr>
                                        ) : props.parItems?.length !== 0 ? (
                                            parItemsMapper(
                                                Object.values(props.parItems)
                                            )
                                        ) : (
                                            <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-2 px-2 border"
                                                >
                                                    There is no data yet.
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="border border-darkColor-700"></td>
                                            <td className="border border-darkColor-700"></td>
                                            <td className="text-center font-semibold text-ss border border-darkColor-700">
                                                *nothing follows*
                                            </td>
                                            <td className="border border-darkColor-700"></td>
                                            <td className="border border-darkColor-700"></td>
                                            <td className="border border-darkColor-700"></td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="font-medium border border-t-0 pb-3 border-darkColor-700"
                                            >
                                                <div className="pt-4 ml-2 text-left text-xs font-medium dark:text-white">
                                                    Received by:
                                                </div>
                                                <div
                                                    className="pt-10 text-center text-sm underline font-semibold dark:text-white"
                                                    id="Property_custodian_name"
                                                >
                                                    {props.formDetails
                                                        .receiverF +
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
                                                </div>
                                                <div className="text-center underline dark:text-gray-400 text-xs">
                                                    {props.formDetails
                                                        .designation2 === null
                                                        ? "N/A"
                                                        : props.formDetails
                                                              .designation2}
                                                </div>
                                                <div className="text-center dark:text-gray-400 text-xs">
                                                    Position / Office
                                                </div>
                                                <div className="text-center underline dark:text-gray-400 text-xs">
                                                    {formatDateDisplay(
                                                        props.formDetails
                                                            .received_date
                                                    )}
                                                </div>
                                                <div className="pb-6 text-center dark:text-gray-400 text-xs">
                                                    Date
                                                </div>
                                                {/* assigned to */}
                                                <div className="pt-4 ml-2 text-left text-xs font-medium dark:text-white">
                                                    Assigned to:
                                                </div>
                                                <div
                                                    className="text-center text-sm font-semibold dark:text-white"
                                                    id="Property_custodian_name"
                                                >
                                                    {props.formDetails
                                                        .assignedF +
                                                        " " +
                                                        (props.formDetails
                                                            .assignedM == null
                                                            ? ""
                                                            : props.formDetails.assignedM.charAt(
                                                                  0
                                                              ) +
                                                              "." +
                                                              " ") +
                                                        " " +
                                                        props.formDetails
                                                            .assignedS +
                                                        (props.formDetails
                                                            .assignedSuf == null
                                                            ? ""
                                                            : " " +
                                                              props.formDetails
                                                                  .assignedSuf)}
                                                </div>
                                                <div className="text-center dark:text-gray-400 text-xs">
                                                    {props.formDetails
                                                        .designation3 === null
                                                        ? "N/A"
                                                        : props.formDetails
                                                              .designation3}
                                                </div>
                                            </td>
                                            <td
                                                colSpan={3}
                                                className="font-medium border border-t-0 pb-3 border-l-0 border-darkColor-700"
                                            >
                                                <div className="pt-4 ml-2 text-left text-xs font-medium dark:text-white">
                                                    Issued by:
                                                </div>
                                                <div
                                                    className="pt-16 text-center text-sm underline font-semibold dark:text-white"
                                                    id="user-employee"
                                                >
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
                                                        props.formDetails
                                                            .issuerS +
                                                        (props.formDetails
                                                            .issuerSuf == null
                                                            ? ""
                                                            : " " +
                                                              props.formDetails
                                                                  .issuerSuf)}
                                                </div>
                                                <div className="text-center underline dark:text-gray-400 text-xs">
                                                    {props.formDetails
                                                        .designation1 === null
                                                        ? "N/A"
                                                        : props.formDetails
                                                              .designation1}
                                                </div>
                                                <div className="text-center dark:text-gray-400 text-xs">
                                                    Position / Office
                                                </div>
                                                <div className="text-center underline dark:text-gray-400 text-xs">
                                                    {formatDateDisplay(
                                                        props.formDetails
                                                            .issued_date
                                                    )}
                                                </div>
                                                <div className="pb-16 text-center dark:text-gray-400 text-xs">
                                                    Date
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* data table */}
                </div>
            </div>
        </div>
    );
}
