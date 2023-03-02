import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ViewDonationForm from "../Forms/Viewable/DonationForm";
import EditDonationForm from "../Forms/Editable/DonationForm";
import OrgList from "../MasterListList/OrgList";

export default function DonationTab({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [btnType, setBtnType] = useState("");

    function clickForms(index) {
        setOpenForms(index);
    }

    function clickForms(index) {
        setOpenForms(index);
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <div className={className + " w-full h-full relative"}>
            {btnType === 'view-donation-form' ? <ViewDonationForm
                clickForms={clickForms}
                setBtnType={setBtnType}
                className={""}
            /> : ""}

            {btnType === 'edit-donation-form' ? <EditDonationForm
                setBtnType={setBtnType}
                clickForms={clickForms}
                className={""}
            /> : ""}

            <table className="w-full">
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
                    <OrgList type={'donation-form'} clickForms={clickForms} setBtnType={setBtnType} />
                </tbody>
            </table>
            <div className="absolute bottom-18 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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
