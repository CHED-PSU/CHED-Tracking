import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import IcsItemLists from "../FormItems/IcsItemLists";

export default function ICSDetails({ className, clickSubForms, id }) {
    const ref = useRef();

    const [icsItemLists, setIcsItemLists] = useState("");
    const [form_no, setform_no] = useState("");
    const [issued, setIssued] = useState("");
    const [received, setReceived] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [receivedDate, setReceivedDate] = useState("");
    const [designation, setdesignation] = useState("");
    const [designation2, setdesignation2] = useState("");

    const [Loading, setLoading] = useState(true);

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
        documentTitle: "ICS",
    });

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    useEffect(() => {
        const getItemsIcs = async () => {
            try {
                const response = await axios.post("/api/getIcsDetails", {
                    id: id,
                });
                const data = await response.data.dataItems;
                const form_details = await response.data.form_details;

                setIcsItemLists(data);
                setform_no(form_details.ics_no);
                setReceived(
                    form_details.receiverF +
                        " " +
                        (form_details.receiverM == null
                            ? ""
                            : form_details.receiverM.charAt(0) + "." + " ") +
                        " " +
                        form_details.receiverS +
                        (form_details.receiverSuf == null
                            ? ""
                            : " " + form_details.receiverSuf)
                );
                setIssued(
                    form_details.issuerF +
                        " " +
                        (form_details.issuerM == null
                            ? ""
                            : form_details.issuerM.charAt(0) + "." + " ") +
                        " " +
                        form_details.issuerS +
                        (form_details.issuerSuf == null
                            ? ""
                            : " " + form_details.issuerSuf)
                );
                setReceivedDate(form_details.received_date);
                setIssuedDate(form_details.issued_date);
                setdesignation(form_details.designation1);
                setdesignation2(form_details.designation2);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        getItemsIcs();
    }, []);

    const icsItemListsMapper = (items) => {
        return items.map((data) => {
            return <IcsItemLists key={data.id} data={data} />;
        });
    };

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40">
                <div className="dark:bg-darkColor-800 h-full w-fit border border-[#C8C8C8]">
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
                                    ICS Details
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / ICS / {received} / {form_no}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-end">
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
                    <div className="bg-white w-fit dark:bg-darkColor-900 rounded-lg border mx-10 ">
                        <div ref={ref} className="w-[8.27in] px-5 py-6">
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
                                            {""}
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
                                            {form_no}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-2 overflow-y-hidden">
                                <table
                                    id="items"
                                    className="table-auto w-full min-w-[700px]"
                                >
                                    <tbody id="slip-table">
                                        <tr className="avoid text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <th className="h-10 px-2 font-medium border">
                                                Qty
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Unit
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Amount
                                            </th>
                                            <th
                                                colSpan={2}
                                                className="h-10 px-2 font-medium border"
                                            >
                                                Description
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Inventory Item No.
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Estimated Useful Life
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Assigned to
                                            </th>
                                            <th className="h-10 px-2 font-medium border">
                                                Remarks
                                            </th>
                                        </tr>
                                        {/* index 1 */}
                                        {Loading ? (
                                            <tr className="avoid text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                                <td
                                                    colSpan="6"
                                                    className="text-xs px-2 h-fit text-center"
                                                >
                                                    *nothing follows*
                                                </td>
                                            </tr>
                                        ) : (
                                            icsItemListsMapper(
                                                Object.values(icsItemLists)
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="avoid flex justify-between items-center">
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
                                            {designation}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formatDateDisplay(issuedDate)}
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
                                            {designation2}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formatDateDisplay(receivedDate)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
