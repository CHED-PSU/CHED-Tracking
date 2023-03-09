import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PreOwner({ className, prevOwner,users, id, clickAssignModal, user_id }) {

   
    const domain = window.location.href;
    const url = new URL(domain)
    
    

    const closer =()=>{
        clickAssignModal("close")
    }

    return (
        <div className={className}>
            
            <div className="pb-16">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover" />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 border-gray-300 w-full">
                            <h2 className="text-2xl text-text-gray-2 font-semibold">{users?.length !== 0 ? users[user_id -1].firstname + ' ' + users[user_id -1].surname: ''}</h2>
                        </div>
                        <p className="text-sm text-text-gray-2 font-medium">{users?.length !== 0 ? users[user_id -1].designation : ''}</p>
                    </div>
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                        Confirm
                    </button>
                </div>
            </div>

        </div>
    )

}
