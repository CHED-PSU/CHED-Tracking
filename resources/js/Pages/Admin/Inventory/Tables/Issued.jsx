import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ViewIssuedForm from "../Modals/ViewIssuedForm";
import axios from "axios";

export default function Issued({ className }) {
    const [loading, setLoading] = useState(true);
    const [toggleSort, setToggleSort] = useState("pending");
    const [openView, setOpenView] = useState(false);
    const [items, setItems] = useState();
    const [itemsControl, setItemsControl] = useState();
    const [itemsControlDetails, setItemsControlDetails] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    function clickView(index) {
        setOpenView(index);
    }

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const slicedData = itemsControl?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const loadingSkeleton = Array.from({ length: 9 }).map((_, index) => (
        <tr
            key={index}
            className="h-18 text-xs border dark:border-neutral-700 bg-white text-th dark:bg-darkColor-800 dark:text-white hover:bg-primary hover:bg-opacity-5 dark:hover:bg-darkColor-700 cursor-default transition duration-150 ease-in-out"
        >
            {/* status */}
            <td>
                <a className="text-left flex items-center w-full pl-6 h-12 gap-3">
                    <div className="flex flex-col gap-1  w-full">
                        <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col w-full justify-center">
                        <span className="w-32 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* mobile no */}
            <td>
                <div className="flex pl-2 items-center w-full h-12 gap-3 cursor-pointer">
                    <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                </div>
            </td>
            {/* mobile no */}
            <td>
                <div className="flex justify-center items-center w-full h-12 gap-3 cursor-pointer">
                    <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                </div>
            </td>
        </tr>
    ));

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

    const issuedMapper = (items, toggleSort) => {
        return items?.map((data) => {
            return (
                <tr
                    key={data.tracking_id}
                    className="text-xs h-16 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 text-text-gray dark:text-white"
                >
                    <td className="text-left pl-6 pr-3 text-text-gray text-2base">
                        {data.tracking_id}
                    </td>
                    <td className="text-left">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-base text-text-black font-semibold"></h5>
                            <h6 className="text-text-gray text-2base">
                                Date Created:{" "}
                                {formatDateDisplay(data.created_at)}
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
                        {displayName(data, true)}
                    </td>
                    <td className="text-left px-3 text-2base">
                        {toggleSort.charAt(0).toUpperCase() +
                            toggleSort.slice(1)}
                    </td>
                    <td className="text-right">
                        <div
                            onClick={() => {
                                clickView(true),
                                    getFormDetails(data.trackings_id);
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

    const pageCount = Math.ceil((itemsControl?.length || 0) / itemsPerPage);

    const getAccepted = async () => {
        setLoading(true);
        try {
            await axios
                .post("api/getIssuedForm", { status: "accepted" })
                .then((res) => {
                    setItemsControl(res.data.issued_forms_control);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    function getFormDetails(index) {
        setLoading(true);
        try {
            axios
                .post("api/getIssuedFormDetails", { id: index })
                .then((res) => {
                    setItems(res.data.issued_forms_details);
                    setItemsControlDetails(res.data.issued_forms_details_info);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const getPending = async () => {
        setLoading(true);
        try {
            await axios
                .post("api/getIssuedForm", { status: "TBD" })
                .then((res) => {
                    setItemsControl(res.data.issued_forms_control);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const getDeclined = async () => {
        setLoading(true);
        try {
            await axios
                .post("api/getIssuedForm", { status: "declined" })
                .then((res) => {
                    setItemsControl(res.data.issued_forms_control);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPending();
    }, []);

    function clickTabs(index) {
        if (index === "pending") {
            getPending();
            setToggleSort(index);
        } else if (index === "accepted") {
            getAccepted();
            setToggleSort(index);
        } else if (index === "declined") {
            getDeclined();
            setToggleSort(index);
        }
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    return (
        <>
            {openView ? (
                <ViewIssuedForm
                    items={items}
                    clickView={clickView}
                    itemsControlDetails={itemsControlDetails}
                    loading={loading}
                />
            ) : (
                ""
            )}

            <div className="w-full h-full relative">
                <div className="w-full flex items-center justify-between h-16">
                    <div className="flex justify-between items-center h-16">
                        <ul className="flex">
                            <li
                                onClick={() => {
                                    clickTabs("pending");
                                }}
                                className={
                                    toggleSort === "pending"
                                        ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                        : "text-[#707070] hover:text-[#4b4b4b]"
                                }
                            >
                                <div className="text-xs font-semibold cursor-pointer p-3 ">
                                    Pending
                                </div>
                            </li>
                            <li
                                onClick={() => {
                                    clickTabs("accepted");
                                }}
                                className={
                                    toggleSort === "accepted"
                                        ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                        : "text-[#707070] hover:text-[#4b4b4b]"
                                }
                            >
                                <div className="text-xs font-semibold cursor-pointer p-3  ">
                                    Accepted
                                </div>
                            </li>
                            {/* <li
                                onClick={() => {
                                    clickTabs("declined");
                                }}
                                className={
                                    toggleSort === "declined"
                                        ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                        : "text-[#707070] hover:text-[#4b4b4b]"
                                }
                            >
                                <div className="text-xs font-semibold cursor-pointer p-3  ">
                                    Declined
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-left pl-6">
                                ICS No.
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
                            <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-left px-3">
                                Form Status
                            </th>
                            <th className="h-10 2xl:w-40 xl:w-10 w-10 font-medium text-right pr-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            loadingSkeleton
                        ) : itemsControl?.length === 0 ? (
                            <tr className="h-18 text-xs border dark:border-neutral-700 text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td colSpan={5}>
                                    <div className="flex text-sm justify-center item-center">
                                        There is no data yet.
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            issuedMapper(Object.values(slicedData), toggleSort)
                        )}
                    </tbody>
                </table>
                {loading ? (
                    ""
                ) : itemsControl?.length === 0 ? (
                    ""
                ) : (
                    <div className="absolute bottom-1 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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
        </>
    );
}
