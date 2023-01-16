import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ICSControl from "../Forms/ICSControl";
import UserList from "../TableList/UserList";

export default function ICSTable({ className }) {
    const [openForms, setOpenForms] = useState("close");
   
    function clickForms(index) {
        setOpenForms(index);
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-fit h-full relative"}>
            {openForms === "ics-control" ? <ICSControl
                clickForms={clickForms}
                className={""}
            /> : ""}

            <table className="flex">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 2xl:w-80 xl:w-72 w-72 font-medium text-left pl-6">
                            Name
                        </th>
                        <th className="h-10 w-56 font-medium text-left">
                            User Status
                        </th>
                        <th className="h-10 w-56 font-medium text-left">
                            Email & Mobile No
                        </th>
                        <th className="h-10 w-32 font-medium text-center">
                            Actions
                        </th>
                    </tr>
                    {/*item 1*/}
                    <UserList type={'ics-control'} clickForms={clickForms} />
                    {/*item 2*/}
                </thead>
            </table>

            <div className="absolute bottom-10 w-full flex justify-center">
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
    );
}
