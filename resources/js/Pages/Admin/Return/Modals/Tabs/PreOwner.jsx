import axios from "axios";
import React, { useEffect, useState } from "react";

import Alert from "../../Alert/PrevOwnerAlert";

export default function PreOwner({ className, prevOwner,users, id, clickAssignModal, user_id }) {

   
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

    function clickAlert(index) {
        setOpenAlert(index);
        if(index===false){
            clickAssignModal('close')
        }
    }
    const closer =()=>{
        clickAssignModal("close")
    }

    const confirmHandler = () => {
        setOpenAlert(true)
    }

    const success = () => {
        setAlertIcon("check")
        setAlertHeader("Success")
        setAlertDesc("You've successfuly returned an item to its previous owner.")
        setAlertButtonColor('none')
        setAlertYesButton('Confirm')
        setAlertNoButton('Okay')
    }

    const confirmPrevOwner = () => {
        setAlertIcon("question")
        setAlertHeader("Confirmation")
        setAlertDesc("Are you sure you want to confirm?")
        setAlertButtonColor('blue')
        setAlertYesButton('Confirm')
        setAlertNoButton('Cancel')
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
                success = {success}
                clickAssignModal = {clickAssignModal}
                click
                id ={id}
                className={""}
            /> : ""}
            <div className="pb-16">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover" />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="text-2xl text-text-gray-2 font-semibold">{users != undefined ? users[user_id-1].firstname + ' ' + users[user_id -1].surname : ""}</h2>
                        </div>
                        <p className="text-sm text-text-gray-2 font-medium">{users != undefined ? users[user_id-1].name : ""}</p>
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
