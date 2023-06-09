import axios from "axios";
import React, { useEffect, useState } from "react";
import SinglePrevOwner from "../../Alerts/singlePrevOwner";

export default function PreOwner({
    className,
    prevOwner,
    users,
    selectedId,
    clickSingleModal,
    personSelected,
    functionReloader
}) {
    const domain = window.location.href;
    const url = new URL(domain);

    console.log(users);

    const [openAlert, setOpenAlert] = useState(false);

    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();

    const confirmation = (index) => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
    };

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
            clickSingleModal("close");
            functionReloader();
        }
    };

    return (
        <div className={className}>
            <div className="">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img
                        src="./img/profile-pic.jpeg"
                        alt="profile"
                        className="rounded-full w-18 h-18 object-cover"
                    />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="pl-[10px] text-xl text-text-gray-2 font-semibold">
                                {users?.length !== 0
                                    ? users[personSelected - 1].firstname +
                                      " " +
                                      users[personSelected - 1].surname
                                    : ""}
                            </h2>
                        </div>
                        <p className="pl-[10px] text-sm text-red-500 font-medium">
                            {users?.length !== 0
                                ? users[personSelected - 1].designation
                                : ""}CEPS                      </p>
                    </div>
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button
                        onClick={() => {
                            setAlert(true);
                        }}
                        className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            {openAlert ? (
                <SinglePrevOwner
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    selectedId={selectedId}
                    personSelected={personSelected}
                    setAlert={setAlert}
                    confirmation={confirmation}
                />
            ) : (
                ""
            )}
        </div>
    );
}
