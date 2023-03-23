import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ViewDonationForm from "../Forms/Viewable/DonationForm";
import EditDonationForm from "../Forms/Editable/DonationForm";
import OrgList from "../MasterListList/OrgList";
import { upperCase } from "lodash";

export default function DonationTab({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [btnType, setBtnType] = useState("");
    const [id, setId] = useState();

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

    const [loading, setLoading] = useState(true)
    const [orgList, setOrgList] = useState()


    const getDonationMasterList = async () => {
        setLoading(true)
        try {
            await axios.get('api/getDonationMasterList').then(res => {
                console.log(res.data.orgList)
                setOrgList(res.data.orgList)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getDonationMasterList()
    }, [])

    return (
        <div className={className + " w-full h-full relative"}>
            {btnType === 'view-donation-form' ? <ViewDonationForm
                clickForms={clickForms}
                setBtnType={setBtnType}
                id = {id}
                className={""}
            /> : ""}

            {btnType === 'edit-donation-form' ? <EditDonationForm
                setBtnType={setBtnType}
                clickForms={clickForms}
                id = {id}
                className={""}
            /> : ""}

            <table className="w-full">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 w-16 font-medium text-left pl-6">No</th>
                        <th className="h-10 w-32 font-medium text-left">PTR Number</th>
                        <th className="h-10 w-96 font-medium text-left">Organization</th>
                        <th className="h-10 w-32 font-medium text-left">Issued By:</th>
                        <th className="h-10 w-52 font-medium text-left">Issued Date</th>
                        <th className="h-10 w-32 font-medium text-right pr-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? '' : Object.values( orgList )?.map(data => {
                        return <><tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">


                            {/* no */}
                            <td>
                                <a className="text-left pl-6 text-[14px]">
                                    1
                                </a>
                            </td>
                            {/* organization */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[17px] font-medium text-text-black">{data.PTR_No }</h4>
                                    </div>
                                </a>
                            </td>
                            {/* address */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1 pr-4">
                                        <h5 className="text-[14px] font-medium text-text-black">{upperCase(data.To_office) }</h5>
                                    </div>
                                </a>
                            </td>
                            {/* contact no */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h5 className="text-[14px] font-medium text-[#878787]">{data.firstname + ' ' + data.surname}</h5>
                                    </div>
                                </a>
                            </td>
                            {/* email */}
                            <td>
                                <a className="text-left flex items-center w-full h-12 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h5 className="text-[14px] font-medium text-[#878787]">{data.issued_date}</h5>
                                    </div>
                                </a>
                            </td>
                            <td>
                                <div className="pr-6 flex items-center justify-end w-full h-12 gap-3 cursor-pointer">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {setBtnType("edit-" + 'donation-form'),setId(data.donation_info_id)}}
                                            className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn"
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <div
                                            onClick={() => {setBtnType("view-" + 'donation-form'),setId(data.donation_info_id)}}
                                            className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </>
                        })}
                    {/* {orgList ? '' : orgList?.map(data => { return <OrgList data={data} type={'donation-form'} clickForms={clickForms} setBtnType={setBtnType} />})} */}
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
