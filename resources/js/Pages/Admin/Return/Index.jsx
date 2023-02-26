import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import AdminBg from "../../../Components/AdminBg";
import InspectionForm from "./Forms/InspectionForm";
import AssignModal from "./Modals/Assign";
import DisposeModal from "./Modals/Dispose";
import DisposalAlert from "../Return/Alert/DisposalAlert";

export default function Return({ className }) {

    const [openAssignModal, setOpenAssignModal] = useState("close");
    const [openDisposeModal, setOpenDisposeModal] = useState("close");
    const [openForms, setOpenForms] = useState("");

    const [Loading, setLoading] = useState(true);
    const [returnedItems, setReturnedItems] = useState();
    const [id, setId] = useState()
    const [user_id, setUserId] = useState();
    const [users, setUsers] = useState();

    const [openAlert, setOpenAlert] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");

    const getReturnedItems = async () => {
        setLoading(true)
        try {
            await axios.get('api/getReturnedItems').then(response => {
                setReturnedItems(response.data.returnedItems)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const getUsers = async () => {
        setLoading(true)
        try{
            await axios.get('api/getUsers').then(response => {
                setUsers(response.data.users)
            })
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getReturnedItems()

        getUsers()
    }, [])

    const success = () => {
        setAlertIcon("check")
        setAlertHeader("Success")
        setAlertDesc("You've successfuly returned an item to its previous owner.")
        setAlertButtonColor('none')
        setAlertYesButton('Confirm')
        setAlertNoButton('Okay')
    }

    async function getReturnedItemsData(index) {
        setId(index)
    }
    function clickForms(index) {
        getReturnedItems()
        getUsers()
        setOpenForms(index);

    }

    function clickAssignModal(index, id, user_id) {

        setOpenAssignModal(index);
        setId(id)
        setUserId(user_id)
    }

    function clickDisposeModal(index, id) {
        setAlertIcon("question")
        setAlertHeader("Confirmation")
        setAlertDesc("Are you sure you want to move the item to unserviceable?")
        setAlertButtonColor('blue')
        setAlertYesButton('Confirm')
        setAlertNoButton('Cancel')
        setOpenAlert(true)
        setOpenDisposeModal(index);
        setId(id)
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };




    const returnItemsMapper = (items) => {
        return items?.map(data => {
            return (
                <tr className="relative h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* no */}
                    <td>
                        <a className="text-left pl-6 text-[14px]">
                            0
                        </a>
                    </td>
                    {/* requested by */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex items-center">
                                <img src="./img/profile-pic.jpeg" alt="" className="rounded-full bg-gray-500 w-9 h-9 object-cover" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[17px] font-medium text-text-black">{data.article}</h4>
                                <p className="text-[#878787] text-[14px]">{data.firstname + ' ' + data.surname}</p>
                            </div>
                        </a>
                    </td>
                    {/* defect */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-col gap-1">
                                <h5 className="text-[14px] font-medium text-text-black w-[220px] truncate">{data.defect}</h5>
                                <p className="text-[#878787] text-[14px]">Date Accepted: {data.created_at}</p>
                            </div>
                        </a>
                    </td>
                    {/* item status */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <h5 className="p-1 px-2 w-fit text-[14px] receivedItem rounded-full flex items-center gap-1">
                                <i className="fa-solid fa-circle text-[7px]"></i>
                                {data.status}
                            </h5>
                        </a>
                    </td>
                    {/* actions */}
                    <td>
                        <div className="flex gap-4 justify-end pr-6">
                            <button value = {data.id}
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn cursor-pointer"
                                onClick={() => { clickForms("ins-form"), getReturnedItemsData(data.uri_id) }}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>

                            <button
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn "
                                onClick={() => {clickAssignModal("open", data.uri_id, data.id)}}
                            >
                                <i className="fa-solid fa-box"></i>
                            </button>

                            <button
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn"
                                onClick={() => clickDisposeModal("open", data.uri_id)}
                            >
                                <i className="fa-solid fa-trash-can-arrow-up"></i>
                            </button>
                        </div>
                    </td>

                </tr>
            )
        })
    }

    return (
        <div className={className + " 2xl:px-10 xl:px-5 px-5"}>

            {openForms === "ins-form" ? <InspectionForm
                clickForms={clickForms}
                openForms={openForms}
                id = {id ? id : ''}
                setOpenForms={setOpenForms}
                className={""}
            /> : ""}

            {openAssignModal === "open" ? <AssignModal
                clickAssignModal={clickAssignModal}
                id = {id ? id : ''}
                user_id = {user_id ? user_id : ''}
                users = {users ? users : ''}
                className={""}
            /> : ""}

            {openDisposeModal === "open" ? <DisposalAlert
                clickDisposeModal={clickDisposeModal}
                alertIcon={alertIcon}
                alertHeader={alertHeader}
                alertDesc={alertDesc}
                alertButtonColor={alertButtonColor}
                alertYesButton={alertYesButton}
                alertNoButton={alertNoButton}
                id = {id ? id : ''}
                className={""}
                success = {success}
            /> : ""}

            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="relative flex items-center w-full flex-col 2xl:py-5 xl:py-3 py-3">

                <div className="w-fit h-5/6 flex flex-col">
                    {/*table 1*/}
                    <table>
                        <thead>
                            <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <th className="h-10 w-16 font-medium text-left pl-6">No</th>
                                <th className="h-10 w-72 font-medium text-left">Requested By</th>
                                <th className="h-10 w-64 font-medium text-left">Defect</th>
                                <th className="h-10 w-48 font-medium text-left">Item Status</th>
                                <th className="h-10 w-32 font-medium text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Loading ? <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td colspan="5" className="text-center h-12 bg-white border">
                                    <small className="text-sm">No data available in table.</small>
                                </td>
                            </tr> : returnItemsMapper(returnedItems)}
                            {/*
                                <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    <td colspan="5" className="text-center h-12 bg-white border">
                                        <small className="text-sm">No data available in table.</small>
                                    </td>
                                </tr>
                                */}
                            {/*no data*/}

                            {/*no data*/}
                        </tbody>
                    </table>
                    {/*table 1*/}
                </div>
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
        </div>
    )
}
