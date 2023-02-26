import axios from "axios";
import React, {useRef, useState} from "react";
import Alert from "../../Alert/OtherUserAlert";

export default function Other({ className,users,id }) {

    const domain = window.location.href;
    const url = new URL(domain)

    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    const ref = useRef()
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
    }
    

    const [current, setCurrent] = useState();
    const [currentRole, setCurrentRole] = useState();
    const [user_id, setUser_id] = useState();


    const optionMapper = (items) => {
        return items?.map(data =>{
            return <option title={data.name} id={data.firstname + ' ' + data.surname} value={data.id}>{data.firstname + ' ' + data.surname}</option>
        })
    }

    const closer =()=>{
        clickAssignModal("close")
    }

    const success = () => {
        setAlertIcon("check")
        setAlertHeader("Success")
        setAlertDesc("You've successfuly returned an item to its previous owner.")
        setAlertButtonColor('none')
        setAlertYesButton('Confirm')
        setAlertNoButton('Okay')
    }

    const confirmHandler = () => {
        if (user_id !== undefined && current !==undefined) {
            const data = [id, user_id, value.id]
            setOpenAlert(true)
        }

    }
    
    const confirmOtherUser = () => {
        setAlertIcon("question")
        setAlertHeader("Confirmation")
        setAlertDesc("Are you sure you want to confirm?")
        setAlertButtonColor('blue')
        setAlertYesButton('Confirm')
        setAlertNoButton('Cancel')
        setAccept('acceptNotif')
        setOpenAlert(true)
    }

    const selectUserHandler = (event) => {
        setCurrent(event.currentTarget.options[event.currentTarget.selectedIndex].id)
        setCurrentRole(event.currentTarget.options[event.currentTarget.selectedIndex].title)
        setUser_id(event.currentTarget.options[event.currentTarget.selectedIndex].value)
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
                current = {value.id}
                user_id = {user_id}
                success = {success}
                id = {id}
                className={""}
            /> : ""}
            <div className="pb-16 space-y-3">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover"/>
                    <div className="w-full space-y-2">
                        <div className="border-b-2 font-semibold pl-[10px] text-xl bg-gray-300 h-8 rounded-md w-full">{current}</div>
                        <div className="border-b-2 font-medium pl-[10px] text-lg bg-gray-200 h-8 rounded-md w-56">{currentRole}</div>
                    </div>
                </div>
                <form action="">
                    <div className="flex flex-col justify-between">
                        <label htmlFor="Status" className="text-base font-semibold">Select a User:</label>
                        <select ref={ref} onChange={selectUserHandler} name="" id="Status" className="w-full rounded-md border border-neutral-500 p-4 outline-none cursor-pointer">
                            <option value="none">None</option>
                            {optionMapper((users))}
                        </select>
                    </div>
                    <div className="flex justify-center mt-[50px]">
                    <button onClick={confirmOtherUser} className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                        Confirm
                    </button>
                </div>
                </form>
            </div>
            
        </div>
    )

}