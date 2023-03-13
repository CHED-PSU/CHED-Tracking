import axios from "axios";
import SortedPrevOwnerAlert from "../../Alerts/SortedPrevOwnerAlert";
import React, { useEffect, useState } from "react";

export default function PreOwner({
    className,
    selectedId,
    users,
    clickSortedModal,
    user_id,
}) {
    const domain = window.location.href;
    const url = new URL(domain);

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
    };

    console.log();



    return (
        <div className={className}>
            <div className="pb-16">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img
                        src="./img/profile-pic.jpeg"
                        alt="profile"
                        className="rounded-full w-18 h-18 object-cover"
                    />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="text-2xl text-text-gray-2 font-semibold">
                                {users?.length !== 0
                                    ? users[user_id - 1].firstname +
                                      " " +
                                      users[user_id - 1].surname
                                    : ""}
                            </h2>
                        </div>
                        <p className="text-sm text-text-gray-2 font-medium">
                            {users?.length !== 0
                                ? users[user_id - 1].designation
                                : ""}
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
                <SortedPrevOwnerAlert
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    selectedId ={selectedId}
                    user_id = {user_id}
                    setAlert = {setAlert}
                />
            ) : (
                ""
            )}
        </div>
    );
}
