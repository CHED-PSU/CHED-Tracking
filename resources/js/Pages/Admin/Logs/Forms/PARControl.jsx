import axios from "axios";
import React, { useEffect, useState } from "react";
import Searchbar from "../../Components/Searchbar";
import ReactPaginate from "react-paginate";
import PARDetails from "../Forms/PARDetails";

export default function PARControl(props) {
    const [openSubForms, setOpenSubForms] = useState("close");
    const [parItems, setParItems] = useState();
    const [formDetails, setFormDetails] = useState();
    const [Loading, setLoading] = useState();

    function clickSubForms(index, id) {
        setOpenSubForms(index);
    }

    function getParDetails(index) {
        setLoading(true);
        try {
            axios.post("api/getParDetails", { id: index }).then((response) => {
                setParItems(response.data.dataItems);
                setFormDetails(response.data.form_details);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const slicedData = props.parControl?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil((props.parControl?.length || 0) / itemsPerPage);

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    function displayName(data, prefix) {
        const middleInitial = data.issuerM
            ? data.issuerM.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.issuerPre || "",
            data.issuerf || "",
            middleInitial,
            data.issuerS || "",
            data.issuerSuf || "",
        ];
        const fullNameArr = [
            data.issuerf || "",
            middleInitial,
            data.issuerS || "",
            data.issuerSuf || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    const parItemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr key={data.id} className="text-xs h-16 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 text-text-gray dark:text-white">
                    <td className="text-left pl-6 pr-3 text-text-gray text-2base">
                        {data.tracking_id}
                    </td>
                    <td className="text-left px-3">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-base text-text-black font-semibold"></h5>
                            <h6 className="text-text-gray text-2base">
                                Date Acquired: {formatDateDisplay(props.parDetails.receiverDate)}
                            </h6>
                        </div>
                    </td>
                    <td className="text-left px-3">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-base font-semibold text-text-blue">
                                {formattedAmount(data.total)}
                            </h5>
                            <h6 className="text-text-gray text-2base">Php</h6>
                        </div>
                    </td>
                    <td className="text-left px-3 text-2base">
                        {displayName(props.parDetails, true)}
                    </td>
                    <td className="text-right">
                        <div
                            onClick={() => {
                                clickSubForms("par-details"),
                                    getParDetails(data.trackings_id);
                            }}
                            className="pr-6 flex items-center justify-end w-full h-12 gap-3"
                        >
                            <div className="">
                                <button className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={props.className}>
            {openSubForms === "par-details" ? (
                <PARDetails
                    parItems={parItems ? parItems : ""}
                    formDetails={formDetails ? formDetails : ""}
                    userName={props.userName}
                    dateAcquired={formatDateDisplay(props.parDetails.receiverDate)}
                    Loading={Loading}
                    setLoading={setLoading}
                    clickSubForms={clickSubForms}
                />
            ) : (
                ""
            )}

            <div className="fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-30">
                <div className=" h-full w-3/5 border-x border-[#C8C8C8]">
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
                                    PAR Control
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    <b>Logs</b> / PAR / {props.userName}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-end">
                            <Searchbar />
                        </div>
                    </div>
                    {/* header */}
                    {/* table */}
                    <div className="flex flex-col h-fit px-10">
                        <div className="overflow-y-hidden pb-4">
                            <table
                                id="items"
                                className="table-auto custom-t w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-left pl-6">
                                            PAR No.
                                        </th>
                                        <th className="h-10 2xl:w-80 xl:w-10 w-10 font-medium text-left px-3">
                                            Description
                                        </th>
                                        <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-left px-3">
                                            Amount
                                        </th>
                                        <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-left px-3">
                                            Issued By
                                        </th>
                                        <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-right pr-6">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="logs-ics-slips-table">
                                    {props.Loading ? (
                                        <tr className="h-16 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <td
                                                colSpan="5"
                                                className="text-center items-center w-full h-12"
                                            >
                                                <small className="text-sm">
                                                    Loading data.
                                                </small>
                                            </td>
                                        </tr>
                                    ) : props.parControl?.length != 0 ? (
                                        parItemsMapper(
                                            Object.values(slicedData)
                                        )
                                    ) : (
                                        <tr className="h-16 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            <td
                                                colSpan="5"
                                                className="text-center items-center w-full h-12"
                                            >
                                                <small className="text-sm">
                                                    No data available in table.
                                                </small>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="mt-5 text-sm">
                                <font className="text-text-gray">
                                    Total PAR Amount:{" "}
                                </font>
                                P {props.totalPrice}
                            </div>
                        </div>
                    </div>
                    {/* table */}
                </div>
                {props.parControl?.length == 0 ? (
                    ""
                ) : (
                    <div className="absolute bottom-10 w-full flex justify-center z-40">
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"paginationButtons"}
                            previousLinkClassName={"previousButtons"}
                            nextLinkClassName={"nextButtons"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
