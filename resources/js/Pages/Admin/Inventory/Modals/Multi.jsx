import React, { useState, useEffect, useRef } from "react";
import PreOwner from "./Tabs/PreOwner";
import OtherUser from "./Tabs/OtherUser";

export default function Assign({ className,users, clickMultiModal, prevOwner, id, user_id }) {
    const [toggleTabs, setToggleTabs] = useState("pre-owner");
    
    
    

   


    function clickTabs(index) {
        setToggleTabs(index);
    }

    let modalBody = useRef();

    useEffect(() => {
        

        const handler = (event) => {
            if (!modalBody.current.contains(event.target)) {
                clickMultiModal("close");
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
                            <button onClick={() => clickMultiModal("close")} className="text-xl dark:text-white">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <img src="./img/assignto_icon.png" className="w-12 pb-3" />
                        <div className="text-2xl text-gray-800 font-semibold">Assign a Personnel</div>
                        <div className="text-xs">Choose which user do you want to assign the item</div>
                    </div>
                    
                    <div className={className}>
                        <div className="pb-16 space-y-3">
                            <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                                <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover"/>
                                <div className="w-full space-y-2">
                                    <div className="border-b-2 font-semibold pl-[10px] text-xl bg-gray-300 h-8 rounded-md w-full">default</div>
                                    <div className="border-b-2 font-medium pl-[10px] text-lg bg-gray-200 h-8 rounded-md w-56">default</div>
                                </div>
                            </div>
                            <form action="">
                                <div className="flex flex-col justify-between">
                                    <label htmlFor="Status" className="text-base font-semibold">Select a User:</label>
                                    <select name="" id="Status" className="w-full rounded-md border border-neutral-500 p-4 outline-none cursor-pointer">
                                        <option value="none">None</option>
                                        default
                                    </select>
                                </div>
                                <div className="flex justify-center mt-[50px]">
                                <button className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                                    Confirm
                                </button>
                            </div>
                            </form>
                        </div>
                        
                    </div>


                </div>
            </div>
        </div>
    );
}
