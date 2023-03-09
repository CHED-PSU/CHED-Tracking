import axios from "axios";
import React, { useRef, useState } from "react";

export default function Other({ className, users, id }) {

    const domain = window.location.href;
    const url = new URL(domain)

    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    const ref = useRef()
    const [selectedPerson, setSelectedPerson] = useState(1)

    const optionMapper = (items) => {
        return items?.map(data => {
            return <option value={data.id}>{data.firstname + ' ' + data.surname}</option>
        })
    }

    const personChanger = (e) => {
        setSelectedPerson(e.target.value)
    }

    return (
        <div className={className}>
            <div className="pb-16 space-y-3">
                <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default">
                    <img src="./img/profile-pic.jpeg" alt="profile" className="rounded-full w-18 h-18 object-cover" />
                    <div className="w-full space-y-2">
                        <div className="border-b-2 font-semibold pl-[10px] text-xl bg-gray-300 h-8 rounded-md w-full">{users[selectedPerson -1].firstname + ' ' + users[selectedPerson-1].surname}</div>
                        <div className="border-b-2 font-medium pl-[10px] text-lg bg-gray-200 h-8 rounded-md w-56">{users[selectedPerson-1].designation}</div>
                    </div>
                </div>
                <form action="">
                    <div className="flex flex-col justify-between">
                        <label htmlFor="Status" className="text-base font-semibold">Select a User:</label>
                        <select onChange={personChanger} name="mapper" id="Status" className="w-full rounded-md border border-neutral-500 p-4 outline-none cursor-pointer">
                            {optionMapper(users)}
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
    )

}