import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import AdminBg from "../../../Components/AdminBg";
import InspectionForm from "./Forms/InspectionForm";
import AssignModal from "./Modals/Assign";
import DisposeModal from "./Modals/Dispose";
import DisposalAlert from "../Return/Alert/DisposalAlert";
import InventoryAlert from "../Return/Alert/InventoryAlert";
import Searchbar from "../Components/Searchbar";

export default function Return({ className }) {

    const [openAssignModal, setOpenAssignModal] = useState("close");
    const [openDisposeModal, setOpenDisposeModal] = useState("close");
    const [openForms, setOpenForms] = useState("");



    const [pageNumber, setPageNumber] = useState();
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
        try {
            await axios.get('api/getUsers').then(response => {
                setUsers(response.data.users)
            })
        } catch (e) {
            console.log(e)
        } finally {
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
        setAlertDesc("You've successfully returned an item to its previous owner.")
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

    function clickAssignModal(index, id) {
        setAlertIcon("question")
        setAlertHeader("Confirmation")
        setAlertDesc("Are you sure you want to move the item to Inventories?")
        setAlertButtonColor('blue')
        setAlertYesButton('Confirm')
        setAlertNoButton('Cancel')
        setOpenAlert(true)
        setOpenAssignModal(index);
        setId(id)
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
                <tr key={data.uri_id} className="relative h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* no */}
                    <td>
                        <a className="text-left pl-6 text-[14px]">
                            {data.uri_id}
                        </a>
                    </td>
                    {/* requested by */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-none items-center">
                                <img src="./img/profile-pic.jpeg" alt="" className="rounded-full bg-gray-500 w-9 h-9 object-cover" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-text-black w-64 truncate">{data.article}</h4>
                                <p className="text-[#878787] text-[14px]">{data.firstname + ' ' + data.surname}</p>
                            </div>
                        </a>
                    </td>
                    {/* defect */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3 pl-2">
                            <div className="flex flex-col gap-1">
                                <h5 className="text-[14px] font-medium text-text-black w-72 truncate">{data.defect}</h5>
                                <p className="text-[#878787] text-[14px]">Date Accepted: {data.created_at}</p>
                            </div>
                        </a>
                    </td>
                    {/* item status */}
                    <td>
                        <a className="text-left flex justify-center items-center w-full h-12 gap-3">
                            <h5 className="p-1 px-2 w-fit text-[14px] receivedItem rounded-full flex items-center gap-1">
                                <i className="fa-solid fa-circle text-[7px]"></i>
                                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                            </h5>
                        </a>
                    </td>
                    {/* actions */}
                    <td>
                        <div className="flex gap-4 justify-center">
                            <button value={data.id}
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn cursor-pointer"
                                onClick={() => { clickForms("ins-form"), getReturnedItemsData(data.uri_id) }}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>

                            <button
                                disabled = {data.status === 'Ready for Return' ? false : true}
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn "
                                onClick={() => { clickAssignModal("open", data.uri_id) }}
                            >
                                <i className="fa-solid fa-box"></i>
                            </button>

                            <button
                                disabled = {data.status !== 'Unserviceable' &&  data.status !== 'Ready for Return'? false : true}
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
        <div className={className + "  flex justify-center"}>

            {openForms === "ins-form" ? <InspectionForm
                clickForms={clickForms}
                openForms={openForms}
                id={id ? id : ''}
                setOpenForms={setOpenForms}
                className={""}
            /> : ""}

            {openAssignModal === "open" ? <InventoryAlert
                clickAssignModal={clickAssignModal}
                alertIcon={alertIcon}
                alertHeader={alertHeader}
                alertDesc={alertDesc}
                alertButtonColor={alertButtonColor}
                alertYesButton={alertYesButton}
                alertNoButton={alertNoButton}
                id={id ? id : ''}
                className={""}
                success={success}
            /> : ""}

            {openDisposeModal === "open" ? <DisposalAlert
                clickDisposeModal={clickDisposeModal}
                alertIcon={alertIcon}
                alertHeader={alertHeader}
                alertDesc={alertDesc}
                alertButtonColor={alertButtonColor}
                alertYesButton={alertYesButton}
                alertNoButton={alertNoButton}
                id={id ? id : ''}
                className={""}
                success={success}
            /> : ""}

            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="z-20 pt-[14px] flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                <div className="pb-3 h-14 items-center w-full">
                    <div className="">
                        <Searchbar />
                    </div>
                </div>
                <div className="flex flex-col h-full w-[1100px] items-center pt-6 mb-12 py-2 px-4 border dark:border-[#434343] rounded-lg bg-white dark:bg-darkColor-800">
                    {/*table 1*/}
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <th className="h-10 w-16 font-medium text-left pl-6">No</th>
                                <th className="h-10 w-80 font-medium text-left">Requested By</th>
                                <th className="h-10 font-medium pl-2 text-left">Defect</th>
                                <th className="h-10 w-52 font-medium text-center">Item Status</th>
                                <th className="h-10 w-48 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Loading ? <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td colSpan="5" className="text-center h-12 bg-white border">
                                    <small className="text-sm">No data available in table.</small>
                                </td>
                            </tr> : returnItemsMapper(returnedItems)}
                        </tbody>
                    </table>
                    {/*table 1*/}
                    <div className="absolute bottom-[61px]  w-full flex justify-center">
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
        </div>
    )
}
