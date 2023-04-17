import axios from "axios";
import SortedPrevOwnerAlert from "../../Alerts/SortedPrevOwnerAlert";
import React, { useEffect, useState } from "react";

export default function PreOwner({
    className,
    selectedId,
    users,
    clickSortedModal,
    user_id,
    getInventorySorted
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

        if(index === false){
            getInventorySorted()
            clickSortedModal('close')
        }
    };

    const confirmation = (index) => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
    }

    function displayPhoto(profilePhoto, name, className) {
        if (profilePhoto == null || profilePhoto == 'default.png') {
            return (
                <span
                    className={
                        className +
                        " bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full"
                    }
                >
                    {name.substring(0, 1)}
                </span>
            );
        } else {
            return (
                <img
                    draggable="false"
                    src="./img/profile-pic.jpeg"
                    className={
                        className + " rounded-full bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    return (
        <div className={className}>
            <div className="">
            <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    {displayPhoto(
                        users[user_id - 1].img,
                        users[user_id - 1].firstname,
                        "w-14 h-14"
                    )}
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="pl-[10px] text-xl text-text-gray-2 font-semibold">
                                {users?.length !== 0
                                    ? users[user_id - 1].firstname +
                                      " " +
                                      (users[user_id - 1].middlename
                                          ? users[
                                                user_id - 1
                                            ].middlename.substring(0, 1) + "."
                                          : "") +
                                      users[user_id - 1].surname +
                                      " " +
                                      (users[user_id - 1].suffix || "")
                                    : ""}
                            </h2>
                        </div>
                        <p className="pl-[10px] text-sm font-medium">
                            {users?.length !== 0
                                ? users[user_id - 1].designation
                                : "N/A"}
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
                    confirmation = { confirmation}
                />
            ) : (
                ""
            )}
        </div>
    );
}
