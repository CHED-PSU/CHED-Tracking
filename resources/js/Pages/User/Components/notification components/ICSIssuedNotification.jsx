import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Alert from "../Alerts/WidgetAcceptAlert";
import { set } from "lodash";
import { data } from "autoprefixer";

export default function ICSIssuedNotification({
    listId,
    setOpenNotifSpecList
}) {
    let modalBody = useRef();

    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([]);
    const [formDetails, setFormDetails] = useState([]);
    




    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);


    //Notification Items
    async function getIssuedItems() {
        setLoading(true);
        try {
            await axios.post('api/getNotifSecListItems', {
                listId: listId
            }).then(res => {
                setItems(res.data.items)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    //Notification Form Details
    async function getFormDetails() {
        setLoading(true);
        try {
            await axios.post('api/getFormDetails', {
                listId: listId
            }).then(res => {
                setFormDetails(res.data.form_details)
                
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getIssuedItems()
        getFormDetails()
    }, [])


    //accepting and declining the issued forms

    const clickAlert = (val) =>{
        setOpenAlert(val);
    }

    

    const itemsData = (item) => {
        return item.map((data) => {
            return (
                <tr key={data.id} className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="text-center px-3 border">{data.quantity}</td>
                    <td className="text-center px-3 border">{data.unit}</td>
                    <td className="text-center px-3 border">{parseInt(data.price) * parseInt(data.quantity)}</td>
                    <td className="text-left px-3 py-3 border">
                        <div className="flex items-center">
                            <div className="font-semibold mr-3">{data.article}</div>
                            <div>{data.description}</div>
                        </div>
                    </td>
                    <td className="text-left px-3 border">{data.inventory_no}</td>
                    <td className="text-center px-3 border">{data.eul}</td>
                </tr>
            )
        });
    };

    //alert 
    const [openAlert, setOpenAlert] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();

    const acceptHandler = () =>{
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to accept it?");
        setAlertButtonColor("blue");
        setAlertYesButton("Accept");
        setAlertNoButton("Cancel");
        setAlertFunction('acceptIssuedForm')
        clickAlert(true)
    }

    const declineHandler = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to decline it?");
        setAlertButtonColor("red");
        setAlertYesButton("Decline");
        setAlertNoButton("Cancel");
        setAlertFunction('declineIssuedForm')
        clickAlert(true)
    }


    const feedback = (button,desc,icon) =>{
        setAlertButtonColor(button)
        setAlertDesc(desc)
        setAlertIcon(icon)
    }


    return (
        <div ref={modalBody}>
            {openAlert ? (
                <Alert
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    clickAlert={clickAlert}
                    listId={listId}
                    feedback = {feedback}
                    className={""}
                    
                />
            ) : (
                ""
            )}
            <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 flex items-center justify-center z-30">
                <div
                    ref={modalBody}
                    className="w-1/2 h-fit bg-white shadow-lg rounded-2xl px-12 py-8 z-20"
                >
                    <button
                        onClick={() => setOpenNotifSpecList(false)}
                        className="closeModal text-xl"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 px-5 py-6 ">
                        <div className="text-center dark:text-white py-2">
                            <div className="text-sm font-semibold">
                                INVENTORY CUSTODIAN SLIP
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        Commision on Higher Education
                                    </div>
                                </div>
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Fund Cluster:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        101
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        ICS No:{" "}
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        {formDetails ? formDetails.assign_no : 'Nan'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-2 overflow-y-hidden">
                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                        <th className="h-10 w-20 text-center font-medium border">
                                            Qty
                                        </th>
                                        <th className="h-10 w-20 text-center font-medium border">
                                            Unit
                                        </th>
                                        <th className="h-10 w-10 text-center font-medium border">
                                            Amount
                                        </th>
                                        <th className="h-10 w-50 text-center font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 text-center font-medium border">
                                            Inventory Item No.
                                        </th>
                                        <th className="h-10 w-30 text-center font-medium border">
                                            Estimated Useful Life
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    {/* index 1 */}
                                    {itemsData(Object.values(items))}
                                    {/* index 2 */}
                                    <tr className="text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                        <td
                                            colSpan="6"
                                            className="text-xs px-2 h-fit text-center"
                                        >
                                            *nothing follows*
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Issued by: {formDetails ? formDetails.u1name + ' ' + formDetails.u1surname : 'Nan'}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="Property_custodian_name"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u1designation : 'Nan'}/Property Officer-Designate
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u1role : 'Nan'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                <div className="w-fit">
                                    <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                        Received by: {formDetails ? formDetails.u2name + ' ' + formDetails.u2surname : 'Nan'}
                                    </div>
                                    <div
                                        className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                        id="user-employee"
                                    ></div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Signature Over Printed Name
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u2designation : 'Nan'}
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        Position/Office
                                    </div>
                                    <div className="dark:text-gray-400 text-xs">
                                        {formDetails ? formDetails.u2role : 'Nan'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        {/* Hide this buttons if the form is already accepted */}

                        <div className="flex flex-col space-y-3 ">
                                <button onClick={acceptHandler}
                                    className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                                >
                                    Accept
                                </button>
                                <button onClick={declineHandler}
                                    className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] "
                                >
                                    Decline
                                </button>
                            </div> 

                        {/* Accepted Button (unhide this button if the form is already accepted) */}
                    </div>
                </div>
            </div>
        </div>
    );
}