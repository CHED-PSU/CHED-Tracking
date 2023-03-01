import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function ReturnRequest(props) {
    const modalBody = useRef();
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState();

    useEffect(() => {
        const getItemRequestData = async () => {
            setLoading(true);
            try {
                await axios.post('/api/getItemRequestData', {
                    ui_id: props.valueId
                }).then(res => {
                    setItemData(res.data.itemData)
                })
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getItemRequestData()
    }, [])

    const [openAlert, setOpenAlert] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [optionhandler, setOptionHandler] = useState();
    const [defecthandler, setDefectHandler] = useState();
    const [commenthandler, setCommentHandler] = useState("None");


    //alert
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");

    function clickAlert(index) {
        setOpenAlert(index);
        if (defecthandler === undefined || defecthandler === "") {
            setAlertIcon('exclamation')
            setAlertHeader('Warning')
            setAlertDesc('Defect must be filled out')
            setAlertButtonColor('none')
            setAlertNoButton('Okay')
        } else {
            if (optionhandler === undefined) {
                setAlertIcon('exclamation')
                setAlertHeader('Warning')
                setAlertDesc('Status must be filled out')
                setAlertButtonColor('none')
                setAlertNoButton('Okay')
            } else {
                setAlertIcon('question')
                setAlertHeader('Confirmation')
                setAlertDesc('Are you sure you want return the item?')
                setAlertButtonColor('blue')
                setAlertYesButton('Yes')
                setAlertNoButton('No')
            }
        }
    }

    //end of alert
    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);


    const success = (data) => {
        if (data === 'success') {
            setAlertIcon("check")
            setAlertHeader("Success")
            setAlertDesc("You've successfuly returned an item to its previous owner.")
            setAlertButtonColor('none')
            setAlertYesButton('Confirm')
            setAlertNoButton('Okay')
            props.openFormHandler()
        }
    }


    return (
        <div>
            
            <div className="z-30 w-full h-full bg-neutral-800 bg-opacity-75 fixed top-0 right-0 flex justify-center items-center">
                <div ref={modalBody} className="bg-white w-[350px] p-8 space-y-6 rounded-2xl flex flex-col items-left">
                    <div className="cursor-pointer ">
                        <i onClick={props.openFormHandler} className="fa-solid fa-xmark"></i>
                        <div className="flex justify-center items-center gap-3">
                            <span className="w-12 h-12 rounded-full bg-blue-900 flex justify-center items-center text-3xl text-white font-semibold">?</span>
                        </div>
                    </div>
                    
                    <form action="">
                        <div className="flex justify-center items-center gap-3">
                            <h5 className="text-base font-semibold ">Quantity:</h5>
                            <input type="number" className="border border-neutral-500 rounded-lg w-40 p-4 outline-none"/>
                        </div>
                    </form>

                    <div className="flex gap-3 w-full justify-center">
                        <button onClick={clickAlert} value={itemData ? itemData.id : 'N/A'} className="btn-color-4 text-white rounded-full px-4 py-2 font-medium">Proceed</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
