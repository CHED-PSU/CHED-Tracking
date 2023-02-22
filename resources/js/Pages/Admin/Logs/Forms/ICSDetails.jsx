import React, { createRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ICSprintable from "../Printables/ICSprintable";


export default function ICSDetails(props) {
    const ref = useRef();

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'emp-data',
    })


    const icsItemsMapper = (items) => {
        return items?.map(data => {
            return (
                <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="text-center px-3 border">
                        {data.quantity}
                    </td>
                    <td className="text-center px-3 border">
                        {data.unit}
                    </td>
                    <td className="text-center px-3 border">
                        {data.quantity * data.price}
                    </td>
                    <td className="text-left px-3 py-3 border">
                        <div className="flex items-center">
                            <div className="font-semibold mr-3">
                                {data.description}
                            </div>
                            <div>
                                {data.property_no}
                            </div>
                        </div>
                    </td>
                    <td className="text-left px-3 border">
                        {data.eul}
                    </td>
                    <td className="text-center px-3 border"></td>
                </tr>
            )
        })
    }

    return (

        <div className={props.className}>

            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40">
                <div className="dark:bg-darkColor-800 h-full w-[70%] border-x border-[#C8C8C8]">
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
                                    ICS Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / ICS / {props.formDetails.ics_no}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-end">
                            <button onClick={handlePrint} className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">
                                <i className="fa-solid fa-print mr-1"></i>
                                Print
                            </button>
                        </div>
                    </div>
                    {/* header */}
                    {/* data table */}
                    <div ref={ref} className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 px-5 py-6 ">
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
                                        101
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
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 w-20 font-medium border">
                                            Qty
                                        </th>
                                        <th className="h-10 w-20 font-medium border">
                                            Unit
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Amount
                                        </th>
                                        <th className="h-10 font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Inventory Item No.
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Estimated Useful Life
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    {props.icsItems?.lenght !== 0 ? icsItemsMapper(Object.values(props.icsItems)) : ''}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Issued by: {props.formDetails.issued}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="Property_custodian_name"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                    {props.formDetails.designation2}
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                    {props.formDetails.issued_date}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Received by: {props.formDetails.received}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="user-employee"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                    {props.formDetails.designation1}
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                    {props.formDetails.received_date}
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
