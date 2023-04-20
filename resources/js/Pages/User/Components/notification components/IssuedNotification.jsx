import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Alert from "../Alerts/WidgetAcceptAlert";
import { toUpper } from "lodash";

export default function IssuedNotification({
    listId,
    setOpenNotifSpecList,
    notifID,
    closer,
    confirmation,
}) {
    let modalBody = useRef();

    const [Loading, setLoading] = useState(false);
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
            await axios
                .post("api/getNotifSecListItems", {
                    listId: listId,
                    notifID: notifID,
                })
                .then((res) => {
                    setItems(res.data.items);
                });

            await axios
                .post("api/getFormDetails", {
                    listId: listId,
                })
                .then((res) => {
                    setFormDetails(res.data.form_details);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIssuedItems();
    }, []);

    //accepting and declining the issued forms

    const clickAlert = (val) => {
        setOpenAlert(val);
    };

    const itemsData = (item) => {
        let counter = 0;
        return item.map((data) => {
            counter++;
            return (
                <tr
                    key={counter}
                    className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white"
                >
                    <td className="text-center px-3 border">1</td>
                    <td className="text-center px-3 border">
                        {toUpper(data.unit)}
                    </td>
                    <td className="text-center px-3 border">
                        {parseInt(data.price)}
                    </td>
                    <td className="text-left border">
                        <div className="flex items-center">
                            <div className="font-semibold border-r py-3 px-3">
                                {toUpper(data.article)}
                            </div>
                            <div className="px-3 py-3">
                                {toUpper((data.make_model ? data.make_model : '') + (data.color ? ', ' + data.color : '') + (data.sku ? ', SN: ' + data.sku : ''))}
                            </div>
                        </div>
                    </td>
                    <td className="text-left px-3 border">
                        {data.inventory_no}
                    </td>
                    <td className="text-center px-3 border">
                        {toUpper(data.eul)}
                    </td>
                    <td className="text-center px-3 border">
                        {toUpper(
                            data.firstname +
                                " " +
                                (data.middlename == null
                                    ? ""
                                    : data.middlename.charAt(0) + "." + " ") +
                                " " +
                                data.surname +
                                (data.suffix == null ? "" : " " + data.suffix)
                        )}
                    </td>
                </tr>
            );
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

    const acceptHandler = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to accept it?");
        setAlertButtonColor("blue");
        setAlertYesButton("Accept");
        setAlertNoButton("Cancel");
        setAlertFunction("acceptIssuedForm");
        clickAlert(true);
    };

    const declineHandler = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to decline it?");
        setAlertButtonColor("red");
        setAlertYesButton("Decline");
        setAlertNoButton("Cancel");
        setAlertFunction("declineIssuedForm");
        clickAlert(true);
    };

    const feedback = (button, desc, icon) => {
        setAlertButtonColor(button);
        setAlertDesc(desc);
        setAlertIcon(icon);

        setAlertNoButton("Okay");
    };

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
                    feedback={feedback}
                    className={""}
                    closer={closer}
                />
            ) : (
                ""
            )}

            <div
                className="fixed inset-0 bg-neutral-700 bg-opacity-75 flex items-center justify-center z-30"
            >
                <div
                    ref={modalBody}
                    className="w-1/2 h-fit bg-white shadow-lg rounded-2xl px-8 py-6 z-20"
                >
                    <button
                        onClick={() => setOpenNotifSpecList(false)}
                        className="closeModal text-xl pb-2"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {formDetails.description === "ICS" ? (
                        <div className="bg-white dark:bg-darkColor-900 rounded-lg px-5 pt-2 ">
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
                                            {formDetails
                                                ? formDetails.description
                                                : ""}{" "}
                                            No:{" "}
                                            <span id="form_identifier"></span>
                                        </div>
                                        <div className="text-xs  dark:text-gray-400 font-semibold">
                                            {formDetails
                                                ? formDetails.tracking_id
                                                : ""}
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
                                            <th className="h-10 w-20 text-center font-medium border px-2">
                                                Qty
                                            </th>
                                            <th className="h-10 w-20 text-center font-medium border px-2">
                                                Unit
                                            </th>
                                            <th className="h-10 w-10 text-center font-medium border px-2">
                                                Amount
                                            </th>
                                            <th className="h-10 w-50 text-center font-medium border px-2">
                                                Description
                                            </th>
                                            <th className="h-10 w-40 text-center font-medium border px-2">
                                                Inventory Item No.
                                            </th>
                                            <th className="h-10 w-30 text-center font-medium border px-2">
                                                Estimated Useful Life
                                            </th>
                                            <th className="h-10 w-30 text-center font-medium border px-2">
                                                Assigned to
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="slip-table">
                                        {/* index 1 */}
                                        {itemsData(Object.values(items))}
                                        {/* index 2 */}
                                        <tr className="text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                            <td
                                                colSpan="7"
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
                                            Issued by:{" "}
                                            {formDetails
                                                ? formDetails.u1name +
                                                  " " +
                                                  formDetails.u1surname
                                                : ""}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="Property_custodian_name"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u1designation
                                                : ""}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u1role
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                    <div className="w-fit">
                                        <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                            Received by:{" "}
                                            {formDetails
                                                ? formDetails.u2name +
                                                  " " +
                                                  formDetails.u2surname
                                                : ""}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="user-employee"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u2designation
                                                : ""}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u2role
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-darkColor-900 rounded-lg px-5 pt-2 ">
                            <div className="text-center dark:text-white py-2">
                                <div className="text-sm font-semibold">
                                    PROPERTY ACKNOWLEDGEMENT RECEIPT
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
                                            {formDetails
                                                ? formDetails.description
                                                : ""}{" "}
                                            No:{" "}
                                            <span id="form_identifier"></span>
                                        </div>
                                        <div className="text-xs  dark:text-gray-400 font-semibold">
                                            {formDetails
                                                ? formDetails.tracking_id
                                                : ""}
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
                                            <th className="h-10 w-20 text-center font-medium border px-2">
                                                Qty
                                            </th>
                                            <th className="h-10 w-20 text-center font-medium border px-2">
                                                Unit
                                            </th>
                                            <th className="h-10 w-10 text-center font-medium border px-2">
                                                Amount
                                            </th>
                                            <th className="h-10 w-50 text-center font-medium border px-2">
                                                Description
                                            </th>
                                            <th className="h-10 w-40 text-center font-medium border px-2">
                                                Inventory Item No.
                                            </th>
                                            <th className="h-10 w-30 text-center font-medium border px-2">
                                                Estimated Useful Life
                                            </th>
                                            <th className="h-10 w-30 text-center font-medium border px-2">
                                                Assigned to
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="slip-table">
                                        {/* index 1 */}
                                        {itemsData(Object.values(items))}
                                        {/* index 2 */}
                                        <tr className="text-xs h-10 cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                            <td
                                                colSpan="7"
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
                                            Issued by:{" "}
                                            {formDetails
                                                ? formDetails.u1name +
                                                  " " +
                                                  formDetails.u1surname
                                                : ""}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="Property_custodian_name"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u1designation
                                                : ""}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u1role
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/2 flex-none flex-col items-center">
                                    <div className="w-fit">
                                        <div className="pt-4 text-left text-xs font-medium dark:text-white">
                                            Received by:{" "}
                                            {formDetails
                                                ? formDetails.u2name +
                                                  " " +
                                                  formDetails.u2surname
                                                : ""}
                                        </div>
                                        <div
                                            className="pt-1 text-left text-sm underline font-semibold dark:text-white"
                                            id="user-employee"
                                        ></div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u2designation
                                                : ""}
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            Position/Office
                                        </div>
                                        <div className="dark:text-gray-400 text-xs">
                                            {formDetails
                                                ? formDetails.u2role
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="pt-8">
                        {/* Hide this buttons if the form is already accepted */}
                        {confirmation === "accepted" ? (
                            <div className="flex gap-4 pb-4 justify-center">
                                <button className="2xl:h-12 xl:h-9 h-9 w-fit px-8 py-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] ">
                                    Accepted
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                        {confirmation === "declined" ? (
                            <div className="flex gap-4 pb-4 justify-center">
                                <button className="2xl:h-12 xl:h-9 h-9 w-fit px-8 py-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] ">
                                    Declined
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                        {confirmation === "TBD" ? (
                            <div className="flex gap-4 pb-4 justify-center">
                                {/* <button
                                    onClick={declineHandler}
                                    className="2xl:h-12 xl:h-9 h-9 w-fit px-8 py-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] "
                                >
                                    Decline
                                </button> */}
                                <button
                                    onClick={acceptHandler}
                                    className="2xl:h-12 xl:h-9 h-9 w-fit px-8 py-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                                >
                                    Accept
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
