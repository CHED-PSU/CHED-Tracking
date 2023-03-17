import axios from "axios";
import SortedRenewal from "../../Alerts/SortedRenewal";
import React, { useRef, useState } from "react";

export default function Renewal({
    className,
    selectedId,
    users,
    clickSortedModal,
    user_id,
    getInventorySorted,
}) {
    const domain = window.location.href;
    const url = new URL(domain);

    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    const ref = useRef();

    const [openAlert, setOpenAlert] = useState(false);

    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();

    const setAlert = (index) => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Do you really want to return the items?");
        setAlertButtonColor("blue");
        setAlertNoButton("Cancel");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
        setOpenAlert(index);

        if (index === false) {
            getInventorySorted();
            clickSortedModal("close");
        }
    };

    console.log();

    const confirmation = (index) => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
    };

    return (
        <div className={className}>
            <div className="">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    {/* Dummy data
                    <img
                        src="./img/profile-pic.jpeg"
                        alt="profile"
                        className="rounded-full w-18 h-18 object-cover"
                    /> */}
                    <span className="bg-red-500 w-18 h-14 rounded-full"></span>

                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="pl-[10px] text-xl text-text-gray-2 font-semibold">
                                {users?.length !== 0
                                    ? users[user_id - 1].firstname +
                                      " " +
                                      users[user_id - 1].surname
                                    : ""}
                            </h2>
                        </div>
                        <p className="pl-[10px] text-sm text-red-500 font-medium">
                            {users?.length !== 0
                                ? users[user_id - 1].designation
                                : ""}CEPS
                        </p>
                    </div>
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button
                        onClick={() => setAlert(true)}
                        className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            {openAlert ? (
                <SortedRenewal
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    selectedId={selectedId}
                    user_id={user_id}
                    setAlert={setAlert}
                    confirmation={confirmation}
                />
            ) : (
                ""
            )}
        </div>
    );
}
