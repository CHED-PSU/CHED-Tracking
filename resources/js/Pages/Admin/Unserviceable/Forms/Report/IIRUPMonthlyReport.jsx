import React, { createRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function IIRUPMonthlyReport(props) {
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'emp-data',
    })


    return (

        <div className={props.className + "fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40"}>
            <div className="dark:bg-darkColor-800 h-full w-[90%] border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                {/* header */}
                <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                    <div className="w-1/2">
                        <button
                            onClick={() => props.clickIIRUPMonthlyReport("close")}
                            className="py-3 mt-4"
                        >
                            <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                        </button>
                        <div className="text-left cursor-defaul">
                            <h4 className="text-primary dark:text-white text-xl font-semibold">
                                INVENTORY AND INSPECTION REPORT OF UNSERVICEABLE PROPERTY
                            </h4>
                            <p className="text-sm text-text-gray dark:text-neutral-300">
                                <b>Unserviceable / Reports </b> / Inventory and Inspection Report of Unserviceable Property
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
                <div className="bg-white dark:bg-darkColor-900 border border-text-gray mx-10">
                    <div ref={ref} className="p-8">
                        <div className="flex justify-end text-ss font-medium italic pb-2">Appendix 74</div>
                        <div className="text-center dark:text-white pt-8 pb-2">
                            <div className="text-sm font-semibold">
                                INVENTORY AND INSPECTION REPORT OF UNSERVICEABLE PROPERTY
                            </div>
                            <p>As of March 2022</p>
                        </div>
                        <div className="flex items-center pt-6">
                            <div className="w-1/2">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white font-semibold">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs dark:text-gray-400">
                                        Commision on Higher Education XI
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="pt-1 flex items-center justify-end gap-2">
                                    <div className="text-xs dark:text-white font-semibold">
                                        Fund Cluster:
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-center pt-4">
                            <div className="w-[900px] flex justify-between">
                                <div className="w-1/3 flex flex-col items-center">
                                    <span className="border-b border-text-black font-semibold text-[0.77rem]">MARICAR R. CASQUEJO,Ph.D. CESO III</span>
                                    <span className="text-xs">(Name of Accountable Officer)</span>
                                </div>
                                <div className="w-1/3 flex flex-col items-center">
                                    <span className="border-b border-text-black font-semibold text-[0.77rem]">Director IV</span>
                                    <span className="text-xs">(Designation)</span>
                                </div>
                                <div className="w-1/3 flex flex-col items-center">
                                    <span className="border-b border-text-black font-semibold text-[0.77rem]">CHEDRO XI</span>
                                    <span className="text-xs">(Station)</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 mb-2">
                            
                            <table
                                id="items"
                                className="table-auto"
                            >
                                <thead>
                                    <tr className="text-xs">
                                        <th colSpan={10} className="border border-text-gray">INVENTORY</th>
                                        <th colSpan={8} className="border border-text-gray">INSPECTION and DISPOSAL</th>
                                    </tr>
                                    <tr className="text-xs dark:border-neutral-700 font-medium dark:text-white cursor-default">
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Date Acquired
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Particulars/Articles
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Property No.
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Qty
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Unit Cost
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Total Cost
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Accumulated Depreciation
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Accumulated Impairedment Losses
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Carrying Amount
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Remarks
                                        </th>
                                        <th colSpan={5} className="h-10 font-medium border border-text-gray">
                                            Disposal
                                        </th>
                                        <th rowSpan={2} className="h-10 font-medium border border-text-gray">
                                            Appraised Value
                                        </th>
                                        <th colSpan={2} className="h-10 font-medium border border-text-gray">
                                            RECORD OF SALES
                                        </th>
                                    </tr>
                                    <tr className="text-xs">
                                        <th className="border border-text-gray">Sale</th>
                                        <th className="border border-text-gray">Transfer</th>
                                        <th className="border border-text-gray">Deduction</th>
                                        <th className="border border-text-gray">Others (Donation)</th>
                                        <th className="border border-text-gray">Total</th>
                                        <th className="border border-text-gray">OR No.</th>
                                        <th className="border border-text-gray">Amount</th>
                                    </tr>
                                    <tr className="text-xs ">
                                        <th className="h-10 font-medium border border-text-gray">(1)</th>
                                        <th className="h-10 font-medium border border-text-gray">(2)</th>
                                        <th className="h-10 font-medium border border-text-gray">(3)</th>
                                        <th className="h-10 font-medium border border-text-gray">(4)</th>
                                        <th className="h-10 font-medium border border-text-gray">(5)</th>
                                        <th className="h-10 font-medium border border-text-gray">(6)</th>
                                        <th className="h-10 font-medium border border-text-gray">(7)</th>
                                        <th className="h-10 font-medium border border-text-gray">(8)</th>
                                        <th className="h-10 font-medium border border-text-gray">(9)</th>
                                        <th className="h-10 font-medium border border-text-gray">(10)</th>
                                        <th className="h-10 font-medium border border-text-gray">(11)</th>
                                        <th className="h-10 font-medium border border-text-gray">(12)</th>
                                        <th className="h-10 font-medium border border-text-gray">(13)</th>
                                        <th className="h-10 font-medium border border-text-gray">(14)</th>
                                        <th className="h-10 font-medium border border-text-gray">(15)</th>
                                        <th className="h-10 font-medium border border-text-gray">(16)</th>
                                        <th className="h-10 font-medium border border-text-gray">(17)</th>
                                        <th className="h-10 font-medium border border-text-gray">(18)</th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    <tr className="text-xs h-fit cursor-default dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td className="text-center border border-text-gray">
                                            2012
                                        </td>
                                        <td className=" border border-text-gray">
                                            PRINTER: HP Deskjet 2060 Colored Printer SN: 
                                        </td>
                                        <td className="text-left border border-text-gray">
                                            2012-05-11-002-CHEDRO11-SUPPLY UNIT
                                        </td>
                                        <td className="text-center border border-text-gray">
                                            1
                                        </td>
                                        <td className="text-right border border-text-gray">
                                            0.00
                                        </td>
                                        <td className="text-right border border-text-gray">
                                            0.00
                                        </td>
                                        <td className="text-right border border-text-gray">
                                            0.00
                                        </td>
                                        <td className="text-right border border-text-gray">
                                            
                                        </td>
                                        <td className="text-right border border-text-gray">
                                            0.00
                                        </td>
                                        <td className="text-center border border-text-gray">
                                            UNSERVICEABLE
                                        </td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                        <td className="text-center border border-text-gray"></td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs font-medium h-8 border border-text-gray text-right pr-2" colSpan={3}>TOTAL</td>
                                        <td className="text-xs font-medium text-center border border-text-gray"></td>
                                        <td className="text-xs font-medium text-right border border-text-gray">677,294.00</td>
                                        <td className="text-xs font-medium text-right border border-text-gray">677,294.00</td>
                                        <td className="text-xs font-medium text-right border border-text-gray">677,294.00</td>
                                        <td className="text-xs font-medium text-center border border-text-gray"></td>
                                        <td className="text-xs font-medium text-right border border-text-gray">677,294.00</td>
                                        <td className="text-xs font-medium text-center border border-text-gray"></td>
                                        <td colSpan={8} className="text-xs font-medium text-center border border-text-gray"></td>
                                        
                                    </tr>
                                    <tr>
                                        <td className="text-xs font-medium border border-text-gray" colSpan={10}>
                                            <div className="pl-5 pt-5 pb-10 font-semibold">I HEREBY request inspection and disposition, pursuant to Section  79 of PD 1445, of the property enumerated above.</div>
                                            <div className="flex justify-between items-center border border-t-0">
                                                <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2">
                                                    <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                                        Requested by:
                                                    </div>
                                                    <div className="text-center py-4">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">JERMINE BASISTER</div>
                                                        <div className="dark:text-gray-400 w-80 text-xs">
                                                            (Signature over Printed Name of Accountable Officer)
                                                        </div>

                                                    </div>
                                                    <div className="text-center py-4">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">Admin. Asst. III/Supply Officer Designate</div>
                                                        <div className="dark:text-gray-400 w-80 text-xs">
                                                            (Designation of Accountable Officer)
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="flex justify-center w-1/2 flex-none flex-col items-center py-2">
                                                    <div className="text-left text-xs font-medium dark:text-white w-full ml-6">
                                                        Approved by:
                                                    </div>
                                                    <div className="text-center py-4">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">MARICAR R. CASQUEJO, Ph. D., CESO IIIt</div>
                                                        <div className="dark:text-gray-400 w-80 text-xs">
                                                            (Signature over Printed Name of Authorized Official)
                                                        </div>
                                                    </div>
                                                    <div className="text-center py-4">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">Director IV</div>
                                                        <div className="dark:text-gray-400 w-80 text-xs">
                                                            (Designation of Authorized Official)		 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan={8} className="border border-text-gray">
                                            <div className="h-64 w-[500px] p-2">
                                                <div className="flex gap-6 h-1/2 ">
                                                    <div className=" w-1/2"><h6 className="text-xs font-medium leading-4">I CERTIFY that I have inspected each and every article enumerated in this report, and that the disposition made thereof was, in my judgment, the best for the public interest.</h6></div>
                                                    <div className=" w-1/2"><h6 className="text-xs font-medium leading-4">I CERTIFY that I have witnessed the disposition of the articles enumerated on this report this ____day of _____________, _____.</h6></div>
                                                </div>
                                                <div className="flex h-1/2">
                                                    <div className="text-center py-4 w-1/2">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">Director IV</div>
                                                        <div className="dark:text-gray-400 text-xs">
                                                            (Designation of Authorized Official)		 
                                                        </div>
                                                    </div>
                                                    <div className="text-center py-4 w-1/2">
                                                        <div className="pt-1 text-center text-sm underline font-semibold dark:text-white">Director IV</div>
                                                        <div className="dark:text-gray-400 text-xs">
                                                            (Designation of Authorized Official)		 
                                                        </div>
                                                    </div>
                                                </div>
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

    );
}
