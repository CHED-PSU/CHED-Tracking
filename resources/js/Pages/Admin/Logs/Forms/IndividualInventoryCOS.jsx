import { toUpper } from "lodash";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function IndividualInventoryCOS(props) {
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
        documentTitle: "Individual Inventory COS/JO",
    });

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const itemsMapper = (items) => {
        return items?.map((data, index) => {
            const date = new Date(data.created_At);
            return (
                <tr
                    key={index}
                    className="avoid text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
                    <td className="text-center px-2 border">{index + 1}</td>
                    <td className="text-center px-2 border">
                        {toUpper(data.article)}
                    </td>
                    <td className="text-left px-2 border">
                        {toUpper((data.make_model ? data.make_model + ', ' : '') + data.description + (data.color ? ', ' + data.color : ''))}
                    </td>
                    <td className="text-center px-2 border">1</td>
                    <td className="text-center px-2 border">{data.property_no}</td>
                    <td className="text-center px-2 border">
                        {formattedAmount(data.amount)}
                    </td>
                    <td className="text-center px-2 border">
                        {formatDateDisplay(data.date)}
                    </td>
                    <td className="text-center px-2 border">{toUpper(data.remarks)}</td>
                </tr>
            );
        });
    };

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    return (
        <div className={props.className}>
            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-30">
                <div className="dark:bg-darkColor-800 h-full w-fit border border-[#C8C8C8] overflow-y-auto pb-10">
                    {/* header */}
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-1/2">
                            <button
                                onClick={() => props.clickForms("close")}
                                className="py-3 mt-4"
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-default">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    Individual Inventory COS/JO
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / Individual Inventory /{" "}
                                    {props.userName}
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={handlePrint}
                            className="flex w-1/2 justify-end items-end"
                        >
                            <div className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">
                                <i className="fa-solid fa-print mr-1"></i>
                                Print
                            </div>
                        </div>
                    </div>
                    {/* header */}
                    {/* data table */}
                    <div className="bg-white dark:bg-darkColor-900 border mx-10 rounded-lg">
                        <div ref={ref} className="w-[8.27in] p-6 py-10">
                            {/* title */}
                            <div className="flex justify-center">
                                <h4 className="text-text-black dark:text-white text-lg font-semibold pb-4">
                                    Individual Inventory COS/JO
                                </h4>
                            </div>
                            {/* details */}
                            <div className="flex text-left gap-2 py-3">
                                <div className="text-xs font-semibold text-text-black dark:text-neutral-300">
                                    Name:
                                </div>
                                <div className="">
                                    <p className="text-xs text-slate-600 dark:text-neutral-300 underline">
                                        {props.userName.toUpperCase()}
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-neutral-300">
                                        {props.designation === null ? 'N/A' : props.designation}
                                    </p>
                                </div>
                            </div>

                            {/* table container */}
                            <div className="flex flex-col h-fit">
                                <div className="overflow-y-hidden">
                                    {/* items */}
                                    <table
                                        id="items"
                                        className="table-auto custom-t w-full min-w-[650px]"
                                    >
                                        <tbody>
                                            <tr className="h-8 avoid text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                                <th
                                                    title="No."
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    title="Article"
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Article
                                                </th>
                                                <th
                                                    title="Description"
                                                    className="w-auto h-10 font-medium text-center border px-2"
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    title="Quantity"
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Qty
                                                </th>
                                                <th
                                                    title="Inventory Item No."
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Code
                                                </th>
                                                <th
                                                    title="Amount"
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Amount
                                                </th>
                                                <th
                                                    title="Data Acquired"
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Date Acquired
                                                </th>
                                                <th
                                                    title="Remarks"
                                                    className="h-10 font-medium text-center border px-2"
                                                >
                                                    Remarks
                                                </th>
                                            </tr>
                                            {/* index 1 */}
                                            {props.Loading ? (
                                                <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                    <td
                                                        colSpan={100}
                                                        className="text-center py-2 px-2 border"
                                                    >
                                                        Loading data.
                                                    </td>
                                                </tr>
                                            ) : props.indivItems?.length !==
                                              0 ? (
                                                itemsMapper(
                                                    Object.values(
                                                        props.indivItems
                                                    )
                                                )
                                            ) : (
                                                <tr className="avoid text-sm h-14 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                    <td
                                                        colSpan={100}
                                                        className="text-center py-2 px-2 border"
                                                    >
                                                        There is no data yet.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {/*  /items */}
                                </div>
                            </div>
                            {/* table container */}
                            <div className="avoid w-full flex justify-end gap-1 text-sm mt-4">
                                Total Amount:{" "}
                                <span>
                                    ₱ {formattedAmount(props.totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* data table */}
                </div>
            </div>
        </div>
    );
}
