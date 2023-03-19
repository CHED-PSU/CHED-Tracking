import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


export default function Dispose({
    className,
    clickDisposeModal,
    selectedIds,
    prevOwner,
    confirmHandler
}) {
    let modalBody = useRef();

    const [selected, setSelected] = useState();




    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);
    const domain = window.location.href;
    const url = new URL(domain)




    const selectionHandler = (e) => {
        setSelected(e.target.value)
    }



    return (
        <div className={className}>

            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
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
                                <option value="Donation">Donation</option>
                                <option value="Destruction">Destruction</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                    </form>

                    <div className="flex justify-center">
                        <button
                            onClick={() => confirmHandler(selected)}
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
