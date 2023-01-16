import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function IndividualInventory(props) {
    const ref = useRef();

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        docunentTitle: 'emp-data',
    })
    
    const IndividualItem = (items) => {
        return items.map(data => {
            return <>
                
            </>
        })
    }
    return (
        <div className={props.className}>
            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-30">
                <div className="dark:bg-darkColor-800 h-full w-3/4 border border-[#C8C8C8]">
                    {/* header */}
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-1/2">
                            <button
                                onClick={() => props.clickForms("close")}
                                className="py-3 mt-4"
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-defaul">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    Individual Inventory
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / Individual Inventory / Will
                                    Smith
                                </p>
                            </div>
                        </div>
                        <div onClick={handlePrint} className="flex w-1/2 justify-end items-end">
                            <div className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">
                                <i className="fa-solid fa-print mr-1"></i>
                                Print
                            </div>
                        </div>
                    </div>
                    {/* header */}
                    {/* data table */}
                    <div ref={ref} className="bg-white dark:bg-darkColor-900 border mx-10 rounded-lg px-8 py-12">
                        {/* title */}
                        <div className="flex justify-center">
                            <h4 className="text-text-black dark:text-white text-lg font-semibold pb-4">
                                Individual Inventory Regular
                            </h4>
                        </div>
                        {/* details */}
                        <div className="flex text-left gap-2 py-3">
                            <div className="text-xs font-semibold text-text-black dark:text-neutral-300">
                                Name:
                            </div>
                            <div className="">
                                <p className="text-xs text-slate-600 dark:text-neutral-300 underline">
                                    ENGR. LUIS D. PEREZ
                                </p>
                                <p className="text-xs text-slate-600 dark:text-neutral-300">
                                    CEPS, TECHNICAL DIVISION
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
                                    <thead>
                                        <tr className="h-8 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                colSpan="10"
                                                className="text-left font-medium pl-2"
                                            >
                                                OFFICE EQUIPMENT AND FURNITURE &
                                                FIXTURES
                                            </th>
                                        </tr>
                                        <tr className="text-xs border dark:border-neutral-700 text-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                title="No."
                                                className="w-16 h-10 font-medium text-center border px-2"
                                            >
                                                NO.
                                            </th>
                                            <th
                                                title="Article"
                                                className="w-36 h-10 font-semibold text-center border px-2"
                                            >
                                                ARTICLE
                                            </th>
                                            <th
                                                title="Description"
                                                className="w-auto h-10 font-semibold text-center border px-2"
                                            >
                                                DESCRIPTION
                                            </th>
                                            <th
                                                title="Quantity"
                                                className="w-16 h-10 font-semibold text-center border px-2"
                                            >
                                                QTY
                                            </th>
                                            <th
                                                title="Serial No."
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                Serial No
                                            </th>
                                            <th
                                                title="Inventory Item No."
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                CODE
                                            </th>
                                            <th
                                                title="Amount"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                AMOUNT
                                            </th>
                                            <th
                                                title="Data Acquired"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                DATE ACQUIRED
                                            </th>
                                            <th
                                                title="Remarks"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                REMARKS/ TRANSFERRED
                                            </th>
                                            <th
                                                title="Remarks"
                                                className="w-28 h-10 font-semibold text-center border px-2"
                                            >
                                                REMARKS 2021
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="h-8 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th
                                                colSpan="10"
                                                className="text-left font-medium pl-2"
                                            >
                                                FURNITURE AND FIXTURES
                                            </th>
                                        </tr>
                                         
                                        {/* index 1 */}
                                        <tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-left px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border"></td>
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border">
                                                0
                                            </td>
                                            <td className="text-center px-2 border">
                                                N/AS
                                            </td>
                                            <td className="text-center px-2 border"></td>
                                        </tr>

                                    </tbody>
                                </table>
                                {/*  /items */}
                            </div>
                        </div>
                        {/* table container */}
                        <div className="w-full flex justify-end gap-1 text-sm mt-4">
                            Total Amount: <span>47760.00</span>
                        </div>
                    </div>
                    {/* data table */}
                </div>
            </div>
        </div>
    );
}
