import React, {forwardRef, useRef} from "react";
import { useReactToPrint } from "react-to-print";

const ICSprintable = (props, ref) => { 
    
    return (
        <div ref = {ref} className="{props.hidden} bg-white dark:bg-darkColor-900 rounded-lg my-20 mx-10 px-5 py-6 ">
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
                                        ICS No:{" "}
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        2022-001-14
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
                                    {/* index 1 */}
                                    <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td className="text-center px-3 border">
                                            1
                                        </td>
                                        <td className="text-center px-3 border">
                                            PC
                                        </td>
                                        <td className="text-center px-3 border">
                                            5,400.00
                                        </td>
                                        <td className="text-left px-3 py-3 border">
                                            <div className="flex items-center">
                                                <div className="font-semibold mr-3">
                                                    PRINTER
                                                </div>
                                                <div>
                                                    test
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-left px-3 border">
                                            2018-06-11-047-CHEDRO11-TECHNICAL ES
                                        </td>
                                        <td className="text-center px-3 border"></td>
                                    </tr>
                                    {/* index 1 */}
                                    {/* index 2 */}
                                    <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td className="text-center px-3 border">
                                            1
                                        </td>
                                        <td className="text-center px-3 border">
                                            PC
                                        </td>
                                        <td className="text-center px-3 border">
                                            5,400.00
                                        </td>
                                        <td className="text-left px-3 py-3 border">
                                            <div className="flex items-center">
                                                <div className="font-semibold mr-3">
                                                    PRINTER
                                                </div>
                                                <div>
                                                   test
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-left px-3 border">
                                            2018-06-11-047-CHEDRO11-TECHNICAL ES
                                        </td>
                                        <td className="text-center px-3 border"></td>
                                    </tr>
                                    {/* index 2 */}
                                    <tr className="text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td
                                            colSpan="6"
                                            className="text-xs px-2 h-fit text-center"
                                        >
                                            *nothing follows*
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Issued by:
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="Property_custodian_name"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Admin.Assist.III/Property
                                        Officer-Designate
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        February 19, 2022
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Received by:
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="user-employee"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        ES II
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        February 19, 2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default forwardRef(ICSprintable)
