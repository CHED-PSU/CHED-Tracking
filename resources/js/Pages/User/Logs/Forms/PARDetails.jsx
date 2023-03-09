import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ParItemLists from "../FormItems/ParItemLists";

import { useReactToPrint } from "react-to-print";

export default function PARDetails({ className, clickSubForms, id }) {
    const ref = useRef();
    const [parItemLists, setParItemLists] = useState("");
    const [form_no, setform_no] = useState("");
    const [issued, setIssued] = useState("");
    const [received, setReceived] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [receivedDate, setReceivedDate] = useState("");
    const [designation, setdesignation] = useState("");
    const [designation2, setdesignation2] = useState("");

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
        docunentTitle: "PAR",
    });

    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios.post("api/get_items", id).then((res) => {
                setParItemLists(res.data.items);
                setform_no(res.data.ics_no);
                setReceived(res.data.received);
                setIssued(res.data.issued);
                setReceivedDate(res.data.received_date);
                setIssuedDate(res.data.issued_date);
                setdesignation(res.data.designation1);
                setdesignation2(res.data.designation2);
            });
        });
    }, []);

    const parItemListsMapper = (items) => {
        return items.map((data) => {
            return <ParItemLists key={data.id} data={data} />;
        });
    };

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40">
                <div className="dark:bg-darkColor-800 h-full w-[70%] border border-[#C8C8C8]">
                    {/* header */}
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-1/2">
                            <button
                                onClick={() => clickSubForms("close")}
                                className="py-3 mt-4"
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-defaul">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    PAR Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / PAR / Will Smith / {form_no}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-end">
                            <div
                                onClick={handlePrint}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                            >
                                <i className="fa-solid fa-print mr-1"></i>
                                Print
                            </div>
                        </div>
                    </div>
                    {/* header */}
                    {/* data table */}
                    <div className="bg-white dark:bg-darkColor-900 rounded-lg mx-10">
                        <div ref={ref} className="w-[8.27in] px-12 py-6">
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
                                            {form_no}
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
                                        {parItemListsMapper(
                                            Object.values(parItemLists)
                                        )}
                                        {/* index 2 */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                    <div className="w-fit">
                                        <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                            Issued by: {issued}
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
                                            {designation}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {issuedDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                    <div className="w-fit">
                                        <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                            Received by: {received}
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
                                            {designation2}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {receivedDate}
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
