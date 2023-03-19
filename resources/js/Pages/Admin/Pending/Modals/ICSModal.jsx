import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Alert from "../Alert/Alert";

export default function ICSModal(props) {
    let modalBody = useRef();
    const [Loading, setLoading] = useState(true);
    const [returnedItemsData, setReturnedItemsData] = useState();
    const [returnedItemsInfo, setReturnedItemsInfo] = useState();
    const [openAlert, setOpenAlert] = useState(false);

    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();

    const setAlert = (index) => {
        setOpenAlert(index);
    };

    const closer = (data) => {
        props.clickICSModal("close");
    };

    const confirmation = (index) => {
        if (index === "accept") {
            setAlertIcon("check");
            setAlertHeader("Done");
            setAlertDesc("You've successfuly accepted a pending request.");
            setAlertButtonColor("none");
            setAlertNoButton("okay");
            setOpenAlert(true);
            setAlertFunction(true);
            props.LoadPendingData();
        } else {
            setAlertIcon("check");
            setAlertHeader("Done");
            setAlertDesc("You've successfuly declined a pending request.");
            setAlertButtonColor("none");
            setAlertNoButton("okay");
            setOpenAlert(true);
            setAlertFunction(true);
            props.LoadPendingData();
        }

        if (index === false) {
            if (alertFunction === true) {
                closer();
                setOpenAlert(false);
            } else {
                setOpenAlert(false);
            }
        }
    };

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    const clickAccept = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to accept it?");
        setAlertButtonColor("blue");
        setAlertYesButton("Accept");
        setAlertNoButton("Cancel");
        setOpenAlert(true);
    };

    const clickDecline = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to decline it?");
        setAlertButtonColor("red");
        setAlertYesButton("Decline");
        setAlertNoButton("Cancel");
        setOpenAlert(true);
    };

    useEffect(() => {
        const getPendingitems = async () => {
            setLoading(true);
            try {
                const response = await axios.post("api/getReturnedItemsData", {
                    id: props.id,
                });
                const data = response.data;
                setReturnedItemsData(data.returnedItemsData);
                setReturnedItemsInfo([data.returnedItemsInfo]);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getPendingitems();
    }, []);

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    function generateArticle(data, isArticle) {
        const firstCommaIndex = data.indexOf(",");
        let article, description;

        if (firstCommaIndex === -1) {
            // No comma found
            if (isArticle == true) {
                return data;
            } else {
                return "";
            }
        } else {
            // Comma found
            article = data.substring(0, firstCommaIndex);
            description = data.substring(firstCommaIndex + 1) ?? "";

            if (isArticle == true) {
                return article;
            } else {
                return description;
            }
        }
    }

    return (
        <div>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-30">
                <div
                    ref={modalBody}
                    className="w-1/3 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-8 space-y-4 z-20"
                >
                    <div className="text-center dark:text-white pb-3">
                        <div className="w-full text-left">
                            <button
                                onClick={() => props.clickICSModal("close")}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="text-xs -mt-5">
                            Commission on Higher Education
                        </div>
                        <div className="text-xs">Regional Office XI</div>
                        <div className="text-sm font-medium">
                            SUPPLY & PROCUREMENT UNIT
                        </div>
                    </div>
                    <div className="dark:text-white">
                        <div className="text-sm">Description of Property</div>
                        <div className="text-sm flex justify-between">
                            <div className="">
                                <div className="">
                                    Type :{" "}
                                    <font className="dark:text-gray-400 font-medium text-sm">
                                        {Loading
                                            ? "N/A"
                                            : generateArticle(returnedItemsData[0].brand, true)}
                                    </font>
                                </div>
                                <div className="">
                                    Serial No:{" "}
                                    <font className="dark:text-gray-400">
                                        {""}
                                    </font>
                                </div>
                                <div className="">
                                    Acquisition:{" "}
                                    <font className="dark:text-gray-400 font-medium text-sm">
                                        P{" "}
                                        {Loading
                                            ? "N/A"
                                            : formattedAmount(
                                                  returnedItemsData[0]
                                                      .acquisition
                                              )}
                                    </font>
                                </div>
                                <div className="">
                                    Nature of last repair:{" "}
                                    {Loading
                                        ? "N/A"
                                        : returnedItemsInfo[0].pre_nature == null
                                        ? "Not yet repaired."
                                        : returnedItemsInfoa[0].pre_nature}
                                    <font className="dark:text-gray-400"></font>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    Brand/Model:{" "}
                                    <font className="dark:text-gray-400 font-medium text-sm">
                                        {Loading
                                            ? "N/A"
                                            : generateArticle(returnedItemsData[0].brand, false)}
                                    </font>
                                </div>
                                <div className="">
                                    Property No:{" "}
                                    <font className="dark:text-gray-400">
                                        {Loading
                                            ? "N/A"
                                            : returnedItemsData[0].property_no}
                                    </font>
                                </div>
                                <div className="">
                                    Date of last repair:{" "}
                                    <font className="dark:text-gray-400">
                                        {Loading
                                            ? "N/A"
                                            : returnedItemsInfo[0].pre_nature ==
                                              null
                                            ? "Not yet repaired."
                                            : formatDateDisplay(
                                                  returnedItemsInfo[0]
                                                      .updated_at
                                              )}
                                    </font>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dark:text-white">
                        <div className="text-sm">DEFECT:</div>
                        <div className="text-sm dark:text-gray-400 max-h-20 mb-4">
                            {Loading ? "N/A" : returnedItemsData[0].defect}
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="dark:text-white">Request by:</div>
                        <div className="dark:text-gray-400">
                            {Loading
                                ? "N/A"
                                : displayName(returnedItemsData[0], false)}
                        </div>
                    </div>
                    <div className="text-xs dark:text-gray-300">
                        <div className=""></div>
                    </div>
                    <div className="">
                        {/* Hide this buttons if the form is already accepted */}
                        <div className="flex pt-5 gap-4 justify-center">
                            <button
                                onClick={() => clickDecline()}
                                className="2xl:h-12 xl:h-9 h-9 w-fit px-8 p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] "
                            >
                                Decline
                            </button>
                            <button
                                onClick={clickAccept}
                                className="2xl:h-12 xl:h-9 h-9 w-fit px-8 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                            >
                                Accept
                            </button>
                        </div>

                        {/* Accepted Button (unhide this button if the form is already accepted) */}
                        <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] disabled hidden">
                            Accepted
                        </button>
                    </div>
                </div>
            </div>
            {openAlert ? (
                <Alert
                    id={props.id}
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    confirmation={confirmation}
                    closer={closer}
                />
            ) : (
                ""
            )}
        </div>
    );
}
