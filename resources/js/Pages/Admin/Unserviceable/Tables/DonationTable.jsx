import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function DonationTable({ className }) {

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-fit h-full relative"}>
                <table className="">
                    <thead>
                        <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <th className="h-10 w-16 font-medium text-left pl-6">No</th>
                            <th className="h-10 w-72 font-medium text-left">Item</th>
                            <th className="h-10 w-80 font-medium text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*item*/}
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            {/* no */}
                            <td>
                                <a className="text-left pl-6 text-[14px]">
                                    0
                                </a>
                            </td>
                            {/* requested by */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[17px] font-medium text-text-black">Previous owner: 0</h4>
                                        <p className="text-[#878787] text-[14px]">Role: 0</p>
                                    </div>
                                </a>
                            </td>
                            {/* defect */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h5 className="text-[14px] font-medium text-text-black w-72 truncate">Item: 0</h5>
                                        <p className="text-[#878787] text-[14px]">Date Accepted: 0</p>
                                    </div>
                                </a>
                            </td>
                        </tr>
                        {/*
                            <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td colspan="3" className="text-center h-12 bg-white border">
                                    <small className="text-sm">No data available in table.</small>
                                </td>
                            </tr>*/}

                        {/*item*/}
                    </tbody>
                </table>
            <div className="absolute 2xl:bottom-10 xl:bottom-4 bottom-4 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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