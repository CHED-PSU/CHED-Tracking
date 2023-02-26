import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../../../../components/Alert";

export default function Dispose({
    className,
    clickDisposeModal,
    id,
    prevOwner,
}) {
    let modalBody = useRef();

    const [selected, setSelected] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [accept, setAccept] = useState(false);

    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);
    const domain = window.location.href;
    const url = new URL(domain)

    function clickAlert(index, page, indic) {
        if (page === "return") {
            if (indic === "none") {
                setOpenAlert(index);
            } else {
                if (indic === "acceptNotif") {
                    confirmHandler();
                    setOpenAlert(index);
                } else if (indic === "declineNotif") {
                    setOpenAlert(index);
                }
            }
        }
    }

    const closer = () => {
        clickDisposeModal("close");
    };

    const confirmHandler = () => {
        if (prevOwner != undefined && id != undefined) {
            const data = [id, prevOwner[0].id, selected];
            setOpenAlert(true);


            fetch("http://" + url.hostname + ":8000/api/setToDispose", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success === "success") {
                        setOpenAlert(false);
                    }
                    setAlertIcon("check");
                    setAlertHeader("Success!");
                    setAlertDesc(
                        "You have successfully set the item to unserviceable!"
                    );
                    setAlertButtonColor("none");
                    setAlertYesButton("Okay");
                    setAlertNoButton("Okay");
                    setAccept("acceptNotif");
                    setOpenAlert(true);
                });
        }
    };

    const confirmDispose = () => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Are you sure you want to confirm?");
        setAlertButtonColor("blue");
        setAlertYesButton("Confirm");
        setAlertNoButton("Cancel");
        setAccept("acceptNotif");
        setOpenAlert(true);
    };

    const selectionHandler = (e) => {
        setSelected(e.target.value);
    };

    // useEffect(() => {
    //     const handler = (event) => {
    //         if (!modalBody.current.contains(event.target)) {
    //             clickDisposeModal("close");
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     };
    // });

    return (
        <div className={className}>
            {openAlert ? (
                <Alert
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
                />
            ) : (
                ""
            )}
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-30">
                <div
                    ref={modalBody}
                    className="w-1/3 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20"
                >
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default">
                        <div className="w-full text-left">
                            <button
                                onClick={() =>
                                    clickDisposeModal("close", "return")
                                }
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <img
                            src="./img/dispose_icon.png"
                            className="w-12 pb-3"
                        />
                        <div className="text-2xl text-gray-800 font-semibold">
                            Unserviceable
                        </div>
                        <div className="text-xs">
                            Choose the right category for the unserviceable item
                        </div>
                    </div>

                    <form action="" className="pb-5">
                        <div className="flex flex-col justify-between">
                            <label
                                htmlFor="Status"
                                className="text-base font-semibold"
                            >
                                Select a Category:
                            </label>
                            <select
                                onChange={selectionHandler}
                                name=""
                                id="Status"
                                className="w-full rounded-md border border-neutral-500 p-4 outline-none cursor-pointer"
                            >
                                <option value="none">None</option>
                                <option value="1">Donation</option>
                                <option value="2">Destruction</option>
                                <option value="3">Sales</option>
                            </select>
                        </div>
                    </form>

                    <div className="flex justify-center">
                        <button
                            onClick={confirmDispose}
                            className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
    