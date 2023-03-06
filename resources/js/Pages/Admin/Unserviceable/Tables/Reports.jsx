import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IIRUPMonthlyReport from "../Forms/Report/IIRUPMonthlyReport";

export default function Reports({ className , items }) {
    const [toggleTabs, setToggleTabs] = useState("donation");
    const [openIIRUPMonthlyReport, setOpenIIRUPMonthlyReport] = useState("close");

    function clickIIRUPMonthlyReport(index){
        setOpenIIRUPMonthlyReport(index);
    }

    function clickTabs(index) {
        setToggleTabs(index);
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-full h-full relative"}>

            {openIIRUPMonthlyReport === "open" ? <IIRUPMonthlyReport
                clickIIRUPMonthlyReport={clickIIRUPMonthlyReport}
                className={""}
            /> : ""}

            <div className="w-full flex justify-center items-center gap-4 h-16">
                <div className="">
                    <select name="" id="" className=" w-44 rounded-md text-sm border border-neutral-300 px-3 py-1 outline-none">
                        <option id="def" value="">Yearly</option>
                        <option id="def1" value="">Monthly</option>
                    </select>
                </div>

                {/* "Select a year dropdown" will only be visible if the first dropdown set as Monthly */}
                <div className="">
                    <select name="" id="" className=" w-44 rounded-md text-sm border border-neutral-300 px-3 py-1 outline-none">
                        <option id="def" value="">-- Select a year --</option>
                        <option id="def1" value="">2023</option>
                        <option id="def1" value="">2022</option>
                        <option id="def1" value="">2021</option>
                        <option id="def1" value="">2020</option>
                    </select>
                </div>
                
            </div>

            {/* Yearly table */}
            <table className="w-full">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 font-medium text-left pl-6">
                            Year
                        </th>
                        <th className="flex items-center justify-center h-10 w-auto font-medium text-left">
                            <div className="w-[500px]">
                                Reports
                            </div>
                        </th>
                        <th className="h-10 font-medium text-right pr-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        {/* items */}
                        <td>
                            <a className="text-left flex items-center w-full h-8 gap-3 pl-6">
                                <div className="">
                                    <h4 className="text-2xl font-medium text-text-black">
                                        2022
                                    </h4>

                                </div>
                            </a>
                        </td>
                        {/* description */}
                        <td>
                            <div className="text-left flex items-center justify-center w-full h-8 gap-3">
                                <div className="w-[500px]">
                                    <h5 className="text-[14px] font-medium text-text-black ">
                                    Inventory and Inspection Report of Unserviceable Property
                                    </h5>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div
                                className="flex justify-end items-center pr-6 w-full h-8 gap-3 cursor-pointer "
                            >
                                <div className="">
                                    <button 
                                        className="btn-color-3 rounded-full py-2 px-3 text-text-black"
                                        onClick={() => clickIIRUPMonthlyReport("open")}
                                    >
                                        <i className="fa-solid fa-eye"></i> View
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* Yearly table */}

            {/* Monthly table */}
            <table className="w-full hidden">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 font-medium text-left pl-6">
                            Montly
                        </th>
                        <th className="flex items-center justify-center h-10 w-auto font-medium text-left">
                            <div className="w-[500px]">
                                Reports
                            </div>
                        </th>
                        <th className="h-10 font-medium text-right pr-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        {/* items */}
                        <td>
                            <a className="text-left flex items-center w-full h-8 gap-3 pl-6">
                                <div className="">
                                    <h4 className="text-2xl font-medium text-text-black">
                                        Jan
                                    </h4>

                                </div>
                            </a>
                        </td>
                        {/* description */}
                        <td>
                            <div className="text-left flex items-center justify-center w-full h-8 gap-3">
                                <div className="w-[500px]">
                                    <h5 className="text-[14px] font-medium text-text-black ">
                                    Inventory and Inspection Report of Unserviceable Property
                                    </h5>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div
                                className="flex justify-end items-center pr-6 w-full h-8 gap-3 cursor-pointer "
                            >
                                <div className="">
                                    <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                        <i className="fa-solid fa-eye"></i> View
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* Monthly table */}

            <div className="absolute bottom-1 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButtons"}
                    nextLinkClassName={"nextButtons"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>

        </div>
    )
};
