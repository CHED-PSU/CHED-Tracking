import axios from "axios";
import React, { useState } from "react";

import Alert from "../../../../../components/Alert";

export default function PreOwner({ className, prevOwner, id, clickAssignModal }) {

    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);
    const domain = window.location.href;
    const url = new URL(domain)


    const [openAlert, setOpenAlert] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [accept, setAccept] = useState(false);

    function clickAlert(index, page, indic) {
        if (page === 'return') {
            if (indic === 'none') {
                setOpenAlert(index);
            } else {
                if (indic === 'acceptNotif') {
                    setOpenAlert(index);
                    confirmHandler()
                } else if (indic === 'declineNotif') {
                    setOpenAlert(index);
                }

            }
        }
    }
    const closer =()=>{
        clickAssignModal("close")
    }

    const confirmHandler = () => {
        if (prevOwner[0].id !== undefined) {
            const data = [id, prevOwner[0].id,value.id]
            setOpenAlert(true)

            fetch('http://' + url.hostname + ':8000/api/assignToPrevOwner', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success === 'success') {
                            setOpenAlert(false)

                        }
                        setAlertIcon("check")
                        setAlertHeader("Success!")
                        setAlertDesc("You have successfully returned the item to its previouse owner!")
                        setAlertButtonColor('none')
                        setAlertYesButton('Okay')
                        setAlertNoButton('Okay')
                        setAccept('acceptNotif')
                        setOpenAlert(true)
                        setTimeout(closer,2000)
                    })
        }

    }

    const confirmPrevOwner = () => {
        setAlertIcon("question")
        setAlertHeader("Confirmation")
        setAlertDesc("Are you sure you want to confirm?")
        setAlertButtonColor('blue')
        setAlertYesButton('Confirm')
        setAlertNoButton('Cancel')
        setAccept('acceptNotif')
        setOpenAlert(true)
    }


    return (
        <div className={className}>
            {openAlert ? <Alert
                alertIcon={alertIcon}
                alertHeader={alertHeader}
                alertDesc={alertDesc}
                alertButtonColor={alertButtonColor}
                alertYesButton={alertYesButton}
                alertNoButton={alertNoButton}
                clickAlert={clickAlert}
                destination={"return"}
                accept={accept}
                className={""}
            /> : ""}
            <div className="pb-16">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover" />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="text-2xl text-text-gray-2 font-semibold">{prevOwner != undefined ? prevOwner[0].firstname + ' ' + prevOwner[0].surname : ""}</h2>
                        </div>
                        <p className="text-sm text-text-gray-2 font-medium">{prevOwner != undefined ? prevOwner[0].name : ""}</p>
                    </div>
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button onClick={confirmPrevOwner} className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                        Confirm
                    </button>
                </div>
            </div>

        </div>
    )

}
