import React, { createRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function DonationForm(props) {
    const ref = useRef();
    
    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'emp-data',
    })

    return (

        <div className={props.className + "fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40"}>
            <div className="dark:bg-darkColor-800 h-full w-[70%] border-x border-[#C8C8C8] pb-10 overflow-y-auto">
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
                                Donation
                            </h4>
                            <p className="text-sm text-text-gray dark:text-neutral-300">
                                <b>Donation</b> / Metropolitan University
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
                <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10">
                    <div ref={ref} className="p-8">
                        <div className="flex justify-end text-ss font-medium italic pb-2">Appendix 76</div>
                        <div className="text-center dark:text-white pt-8 pb-2">
                            <div className="text-sm font-semibold">
                                PROPERTY TRANSFER REPORT
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        Commision on Higher Education XI
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Fund Cluster:
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-2">
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs text-th">
                                    From Accountable Officer/Agency/Fund Cluster: <font className="font-medium text-black">CHEDRO XI</font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs">
                                    PTR No:  <font className="font-medium">2021-001-001</font>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs text-th">
                                To Accountable Officer/Agency/Fund Cluster: <font className="font-medium text-black">DAVAO DEL SUR STATE COLLEGE</font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs">
                                    Date:  <font className="font-medium">0</font>
                                </div>
                            </div>
                            <div className="border border-b-0 py-4 space-y-3">
                                <div>
                                    <p className="ml-4 text-xs">Transfer Type: (check only one)</p>
                                </div>
                                <div className="flex gap-7 ml-40">
                                    <div className="">
                                        <div className="flex gap-1 pb-2">
                                            <input type="radio" name="transferType" id="donation" value="Donation" checked/>
                                            <label for="donation" className="text-black font-medium text-xs">Donation</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="radio" name="transferType" id="relocate" value="Relocate" disabled/>
                                            <label for="relocate" className="text-black font-medium text-xs">Relocate</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 pb-2">
                                            <input type="radio" name="transferType" id="reassignment" value="Donation" disabled/>
                                            <label for="reassignment" className="text-black font-medium text-xs">Reassignment</label>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <input type="radio" name="transferType" id="others" value="Relocate" disabled/>
                                            <label for="others" className="text-black font-medium text-xs">Others (Specify)</label>
                                            <input type="text" name="" id="" className="border-b-2 border-darkColor-800 outline-none" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 text-th dark:text-white cursor-default">
                                        <th className="h-10 w-32 font-medium border">
                                            Date Acquired
                                        </th>
                                        <th className="h-10 w-32 font-medium border">
                                            Property No
                                        </th>
                                        <th className="h-10 font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Amount
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Condition of PPE
                                        </th>
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
                                        <td className="text-left px-3 border">
                                            default
                                        </td>
                                        <td className="text-center px-3 py-3 border">
                                            default
                                        </td>
                                        <td className="text-left px-3 border">
                                            default
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs border text-center py-4" colSpan={5}>*nothing follows*</td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs border py-4" colSpan={5}>
                                            <div>
                                                <p className="ml-4">Reason for Transfer:</p>
                                                <h5 className="text-center text-black font-medium py-10">FOR DONATION.</h5>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border" colSpan={5}>
                                            <div className="flex py-5">
                                                <div className="w-1/6 px-4 text-xs flex flex-col justify-center gap-2 pt-6">
                                                    <h6>Signature:</h6>
                                                    <h6>Printed Name:</h6>
                                                    <h6>Designation:</h6>
                                                    <h6>Date:</h6>
                                                </div>
                                                <div className="flex w-5/6">
                                                    {/* Approved by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Approved by:</h5>
                                                        <div className="flex flex-col justify-between text-xs">
                                                            MARICAR R. CASQUEJO,Ph.D.CESOIII		
                                                        </div>
                                                        <h6 className="text-xs">Director IV</h6>
                                                        <h6 className="text-sm">March 25, 2022</h6>
                                                    </div>
                                                    {/* Released/Issued by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Released/Issue by:</h5>
                                                        <div className="flex flex-col justify-between text-xs">
                                                            JERMINE R. BASISTER			
                                                        </div>
                                                        <h6 className="text-xs">AAVI, Supply Officer Designate</h6>
                                                        <h6 className="text-sm">March 25, 2022</h6>
                                                    </div>
                                                    {/* Received by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Received by:</h5>
                                                        <div className="flex flex-col justify-between text-xs">
                                                            AUGIE E. FUENTES, PhD.			
                                                        </div>
                                                        <h6 className="text-xs">College President</h6>
                                                        <h6 className="text-sm">March 25, 2022</h6>
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
