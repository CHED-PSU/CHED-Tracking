import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import Alert from '../../Components/Alerts/itemsAlert'

export default function ReturnRequest(props) {
    const modalBody = useRef();
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState();

    useEffect(() => {
        const getItemRequestData = async () => {
            setLoading(true);
            try {
                await axios.post('/api/getItemRequestData', {
                    it_id: props.valueId
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
            }else{
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




    const bbcommenthandler = (e) => {
        setCommentHandler(e.target.value)
    }

    const bbdefectHandler = (e) => {
        setDefectHandler(e.target.value)
    }

    const optionHandler = (e) => {
        if (e.target.value === "Other") {
            setIsOther(true)
        } else {
            setIsOther(false)
        }
        setOptionHandler(e.target.value)
    }


    //Return Item handler
    


    return (
        <div>
            {openAlert ? <Alert
                alertIcon={alertIcon}
                alertHeader={alertHeader}
                alertDesc={alertDesc}
                alertButtonColor={alertButtonColor}
                alertYesButton={alertYesButton}
                alertNoButton={alertNoButton}
                clickAlert={clickAlert}
                defecthandler = {defecthandler}
                optionhandler = {optionhandler}
                valueId = {itemData ? itemData.id : 'N/A'}
                className={""}
            /> : ""}
            <div className="z-30 w-full h-full bg-neutral-800 bg-opacity-75 fixed top-0 right-0 flex justify-center items-center">
                <div ref={modalBody} className="bg-white w-[700px] p-8 space-y-6 rounded-2xl flex flex-col items-left">
                    <div className="cursor-pointer ">
                        <i onClick={props.openFormHandler} className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="text-center">
                        <h3>Commission on Higher Education</h3>
                        <h3>Regional Office XI</h3>
                        <h3 className="pb-5">SUPPLY & PROCUREMENT UNIT</h3>
                        <h2 className="font-semibold text-lg">REQUEST FOR INSPECTION and REPAIR</h2>
                    </div>

                    <div className="flex justify-between">
                        <div className="w-1/2 space-y-1">
                            <h6 className="text-[18px] pb-2">Description of Property</h6>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Type:</h6>
                                <h5 className="underline">{itemData ? itemData.type : 'N/A'}</h5>
                            </div>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Serial No:</h6>
                                <h5 className="underline">{ }</h5>
                            </div>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Acuisituin Cost:</h6>
                                <h5 className="underline">P{itemData ? itemData.price : 'N/A'}</h5>
                            </div>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Nature of last repair:</h6>
                                <h5></h5>
                            </div>
                        </div>
                        <div className="w-1/2 space-y-1">
                            <h6 className="text-[18px] pb-2">Control No:</h6>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Brand/Model:</h6>
                                <h5 className="underline">{itemData ? itemData.brand : 'N/A'}</h5>
                            </div>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Property No:</h6>
                                <h5 className="underline">{itemData ? itemData.property_no : 'N/A'}</h5>
                            </div>
                            <div className="flex gap-2">
                                <h6 className="font-semibold ">Date of last repair:</h6>
                                <h5 className="underline">N/A</h5>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-base font-semibold ">DEFECT:</h5>
                        <input onKeyUp={bbdefectHandler} type="textarea" className=" border border-neutral-500 rounded-lg w-full p-4 outline-none" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <label htmlFor="Status" className="text-base font-semibold">Status</label>
                        <select onChange={optionHandler} name="purpose" id="Status" className="w-full rounded-md border border-neutral-500 p-4 outline-none">
                            <option value="None">None</option>
                            <option value="Dispose">Dispose</option>
                            <option value="Return for Repair">Return for Repair</option>
                            <option value="Return for Renewal">Return for Renewal</option>
                            <option value="Return to Stock">Returned to stock</option>
                            <option value="Other">Other</option>
                        </select>
                        {isOther ?
                            <>
                                <label htmlFor="textareaopt" className="text-base font-semibold pt-6">Other</label>
                                <input onKeyUp={bbcommenthandler} type="textarea" id="textareaopt" className=" border border-neutral-500 rounded-lg w-full p-4 outline-none" /></> : ""}

                    </div>
                    <div className="flex gap-3 w-full justify-end">
                        <button onClick={props.openFormHandler} className="btn-color-5 text-white rounded-full px-4 py-2 font-medium">Cancel</button>
                        <button onClick={clickAlert} value={itemData ? itemData.id : 'N/A'} className="btn-color-4 text-white rounded-full px-4 py-2 font-medium">Send</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
