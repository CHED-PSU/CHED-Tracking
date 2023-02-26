import React, { createRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function DestructionForm(props) {
    const ref = useRef();
    
    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'emp-data',
    })

    return (

        <div className={props.className + "fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40"}>
            <div className="dark:bg-darkColor-800 h-full w-[70%] border-x border-[#C8C8C8] overflow-y-auto">
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
                                Destruction
                            </h4>
                            <p className="text-sm text-text-gray dark:text-neutral-300">
                                <b>Destruction</b> / 0
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
                <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 ">
                    <div ref={ref} className="p-8">
                        <div className="flex justify-end text-ss font-medium italic pb-2">Appendix 65</div>
                        <div className="text-center dark:text-white py-2">
                            <div className="text-sm font-semibold">
                                WASTE MATERIALS REPORT
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white text-black font-semibold">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-medium">
                                        Commision on Higher Education
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white text-black font-semibold">
                                        Fund Cluster:
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-medium">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs text-th">
                                    Place of Storage: <font className="font-medium text-black">CHEDRO XI Stock Room</font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs">
                                    Date :  <font className="font-medium">0</font>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="border border-b-0 w-full p-2 text-xs text-th">
                                    <font className="font-medium text-black">ITEMS FOR DISPOSAL</font>
                                </div>
                            </div>
                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 text-th dark:text-white cursor-default">
                                        <th rowSpan={4} className="h-10 w-20 font-medium border">
                                            Item
                                        </th>
                                        <th rowSpan={4} className="h-10 w-20 font-medium border">
                                            Quantity
                                        </th>
                                        <th rowSpan={4} className="h-10 w-40 font-medium border">
                                            Unit
                                        </th>
                                        <th rowSpan={4} className="h-10 font-medium border">
                                            Description
                                        </th>
                                    </tr>
                                    <tr className="text-xs">
                                        <th colSpan={3} className="h-10 w-40 font-medium border text-center">
                                            Record of Sales
                                        </th>
                                    </tr>
                                    <tr className="text-xs">
                                        <th colSpan={3} className="h-10 w-40 font-medium border text-center">
                                            Official Receipt
                                        </th>
                                    </tr>
                                    <tr className="h-10 w-40 text-center text-xs">
                                        <th className="border">No</th>
                                        <th className="border">Date</th>
                                        <th className="border">Amount</th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    
                                    <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                        <td className="text-left px-3 py-3 border">
                                            <div className="flex items-center">
                                                <div className="font-semibold mr-3">
                                                    default
                                                </div>
                                                <div>
                                                    default
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                        <td className="text-center px-3 border">
                                            default
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-left py-3 border"><div className="ml-3 text-sm font-medium">Total</div></td>
                                        <td className="text-center px-3 border text-sm font-medium">15,610.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center border border-t-0">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2">
                                <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                    Certified Correct:
                                </div>
                                <div className="text-center py-4">
                                    
                                    <div
                                        className="pt-1 text-center text-sm underline font-semibold dark:text-white"
                                        
                                    >CHERYL A. TAGALOG</div>
                                    <div className="dark:text-gray-400 w-80 text-xs">
                                        Signature Over Printed Name of Supply and/or Property Custodian
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2">
                                <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                Disposal Approved:
                                </div>
                                <div className="text-center py-4">
                                    
                                    <div
                                        className="pt-1 text-center text-sm underline font-semibold dark:text-white"
                                        
                                    >RAUL C. ALVAREZ JR. CESO III</div>
                                    <div className="dark:text-gray-400 w-80 text-xs">
                                        Signature Over Printed Name of Head of Agency/Entity of his/her Authorized Representative
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-center text-sm font-medium py-3 border border-t-0">CERTIFICATE OF INSPECTION</div>
                        <div className="w-full text-sm py-3 border border-t-0">
                            <h6 className="ml-10 text-xs font-medium">I Hereby certify that the property enumerated above was disposed of as follows:</h6>
                            <ul className="ml-28 text-xs py-4 space-y-2">
                                <li className="flex gap-4">
                                    Item
                                    <div className="w-20 border-b"></div>
                                    Destroyed
                                </li>
                                <li className="flex gap-4">Item
                                    <div className="w-20 border-b"></div>
                                    Sold at private sale
                                </li>
                                <li className="flex gap-4">Item
                                    <div className="w-20 border-b"></div>
                                    Sold at public auction
                                </li>
                                <li className="flex gap-4">Item
                                    <div className="w-20 border-b"></div>
                                    Transferred without cost to 
                                    <div className="w-20 border-b"></div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-between items-center border border-t-0">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2 border-r">
                                <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                    Certified Correct:
                                </div>
                                <div className="text-center py-4">
                                    
                                    <div
                                        className="pt-1 text-center text-sm underline font-semibold dark:text-white"
                                        
                                    >MYRIAM B. FLORES</div>
                                    <div className="dark:text-gray-400 w-80 text-xs">
                                        Signature Over Printed Name of Inspection Officer
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2">
                                <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                Witness to Disposal:
                                </div>
                                <div className="text-center py-4">
                                    <div
                                        className="pt-1 text-center text-sm underline font-semibold dark:text-white"
                                        
                                    >HELENA L. VALDEZ</div>
                                    <div className="dark:text-gray-400 w-80 text-xs">
                                    Signature Over Printed Name of Witness
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* data table */}
            </div>
        </div>

    );
}


