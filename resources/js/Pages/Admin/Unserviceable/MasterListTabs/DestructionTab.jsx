import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import EditDestructionForm from "../Forms/Editable/DestructionForm";
import ViewDestructionForm from "../Forms/Viewable/DestructionForm";
import OrgList from "../MasterListList/OrgList";

export default function DestructionTab({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [btnType, setBtnType] = useState("");

    function clickForms(index) {
        setOpenForms(index);
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-fit h-full relative"}>
            {btnType === 'view-destruction-form' ? <ViewDestructionForm
                setBtnType={setBtnType}
                clickForms={clickForms}
                className={""}
            /> : ""}

            {btnType === 'edit-destruction-form' ? <EditDestructionForm
                setBtnType={setBtnType}
                clickForms={clickForms}
            className={""}
        /> : ""}

            <table className="">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 w-16 font-medium text-left pl-6">No</th>
                        <th className="h-10 w-64 font-medium text-left">Organization</th>
                        <th className="h-10 w-64 font-medium text-left">Address</th>
                        <th className="h-10 w-32 font-medium text-left">Contact No.</th>
                        <th className="h-10 w-52 font-medium text-left">Email</th>
                        <th className="h-10 w-32 font-medium text-right pr-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <OrgList type={'destruction-form'} clickForms={clickForms} setBtnType={setBtnType} />
                </tbody>
            </table>
            <div className="absolute  2xl:bottom-14 xl:bottom-14 bottom-14 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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
