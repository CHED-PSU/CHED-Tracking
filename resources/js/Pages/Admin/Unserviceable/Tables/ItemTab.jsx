import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function ItemTab({ className }) {

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-fit h-full relative"}>
                <div className="w-full flex justify-end  items-center pb-2">
                    <button
                        className="flex justify-center items-center gap-1 w-8 h-8 p-3 text-[14px] text-text-black rounded-full default-btn"
                        onClick={() => clickDisposeModal("open")}

                    >
                        <i className="fa-solid fa-file-export"></i>
                    </button>
                </div>
                <table className =" ">
                    <thead>
                        <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <th className="h-10 w-16 font-medium text-left pl-6">
                                <div className="flex item-center"><input type="checkbox" className=""/></div>
                            </th>
                            <th className="h-10 w-72 font-medium text-left">Items</th>
                            <th className="h-10 w-96 font-medium text-left">Description</th>
                            <th className="h-10 w-80 font-medium text-left">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*item*/}
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            {/* checkbox */}
                            <td>
                                <div className="flex justify-center item-center"><input type="checkbox" className=""/></div>
                            </td>
                            {/* items */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[17px] font-medium text-text-black">Laptop</h4>
                                        <p className="text-[#878787] text-[14px]">Previous owner: Will Smith</p>
                                    </div>
                                </a>
                            </td>
                            {/* description */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h5 className="text-[14px] font-medium text-text-black w-72 truncate">Lorem ipsum dolor sit amet sed do eiusmod sed do eiusmod</h5>
                                        <p className="text-[#878787] text-[14px]">Date Accepted: 26 Sept 2022</p>
                                    </div>
                                </a>
                            </td>
                            {/* remarks */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[#878787] text-[14px]">Equipment donated to XYZ organization.</p>
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
            <div className="absolute 2xl:bottom-2 xl:bottom-2 bottom-2 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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