import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
export default function PARDetails(props) {
    const ref = useRef();
    
    return (
        <div className={props.className}>
            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40">
                <div className="dark:bg-darkColor-800 h-full w-[70%] border border-[#C8C8C8]">
                    {/* header */}
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-1/2">
                            <button
                                onClick={() => props.clickSubForms("close")}
                                className="py-3 mt-4"
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-defaul">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    PAR Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / PAR / 0
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
                    <div ref={ref} className="bg-white dark:bg-darkColor-900 rounded-lg w-full px-12 py-6 ">
                        <div className="text-center dark:text-white py-2">
                            <div className="text-sm font-semibold">
                                PROPERTY ACKNOWLEDGEMENT RECEIPT
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs dark:text-gray-400 font-semibold">
                                        Commision on Higher Education
                                    </div>
                                </div>
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Fund Cluster:
                                    </div>
                                    <div className="text-xs dark:text-gray-400 font-semibold">
                                        101
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        PAR No:
                                    </div>
                                    <div className="text-xs dark:text-gray-400 font-semibold">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-2 overflow-y-hidden">
                            <table
                                id="items "
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 w-20 font-medium border">
                                            Quantity
                                        </th>
                                        <th className="h-10 w-20 font-medium border">
                                            Unit
                                        </th>
                                        <th className="h-10 font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Property Number
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Date Acquired
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td className="text-center px-3 border">
                                            0
                                        </td>
                                        <td className="text-center px-3 border">
                                            0
                                        </td>
                                        <td className="text-left px-3 py-3 border">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-semibold mr-3">
                                                    0
                                                </div>
                                                <div>
                                                    0
                                                </div>
                                                <div className="text-center">
                                                    *nothing follows*
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" px-3 border">
                                            0
                                        </td>
                                        <td className="text-center px-3 border">
                                            0
                                        </td>
                                        <td className="text-center px-3 border">
                                            0
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Issued by: 0
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="Property_custodian_name"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0   
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Received by: 0
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="user-employee"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        0
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
