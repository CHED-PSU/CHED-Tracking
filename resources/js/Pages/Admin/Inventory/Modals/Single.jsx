import React, { useState, useEffect, useRef } from "react";
import PreOwner from "./Tabs/PreOwner";
import OtherUser from "./Tabs/OtherUser";
import axios from "axios";


export default function Assign({ className, users, clickSingleModal, selectedId, personSelected, functionReloader }) {
    const [toggleTabs, setToggleTabs] = useState("pre-owner");
    const [loading, setLoading] = useState(true)

    function clickTabs(index) {
        setToggleTabs(index);
    }

    console.log(selectedId)

    let modalBody = useRef();

    useEffect(() => {


        const handler = (event) => {
            if (!modalBody.current.contains(event.target)) {
                clickSingleModal("close");
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

   return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
                <div ref={modalBody} className="w-1/3 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20">
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default">
                        <div className="w-full text-left">
                            <button onClick={() => clickSingleModal("close")} className="text-xl dark:text-white">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <img src="./img/assignto_icon.png" className="w-12 pb-3" />
                        <div className="text-2xl text-gray-800 font-semibold">Assign a Personnel</div>
                        <div className="text-xs">Choose which user do you want to assign the item</div>
                    </div>
                    <div className="flex justify-center pb-5">
                        <div className="flex bg-gray-200 rounded-full">
                            <button
                            onClick={() => clickTabs("pre-owner")}
                            className={
                                toggleTabs === "pre-owner"
                                    ? "outline-none rounded-full bg-primary py-2 px-3 text-white font-semibold"
                                    : "outline-none rounded-full py-2 px-3 font-medium"
                            }
                            >
                                Previous Owner
                            </button>
                            <button
                            onClick={() => clickTabs("other-user")}
                            className={
                                toggleTabs === "other-user"
                                    ? "outline-none rounded-full bg-primary py-2 px-3 text-white font-semibold"
                                    : "outline-none rounded-full py-2 px-3 font-medium"
                            }
                            >
                                Other User
                            </button>
                        </div>
                    </div>

                    {toggleTabs === "pre-owner" ? <PreOwner
                    clickSingleModal={clickSingleModal}
                    selectedId={selectedId}
                    personSelected={personSelected}
                    users = {users}
                    functionReloader = {functionReloader}
                    className={ ""}
                    />: ""}
                    {toggleTabs === "other-user" ? <OtherUser
                    users = {users}
                    selectedID={selectedId}
                    className={ "" }
                    />: ""}

                </div>
            </div>
        </div>
    );
}
