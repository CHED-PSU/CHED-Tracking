import { data } from "autoprefixer";
import React from "react";

export default function AcceptedData(props) {
    return (
        <>
        <tr className="relative h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
            {/* no */}
            <td>
                <a className="text-left pl-6 text-[14px]">
                    {props.id}
                </a>
            </td>
            {/* requested by */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex items-center">
                        <img src="./img/profile-pic.jpeg" alt="" className="rounded-full bg-gray-500 w-9 h-9 object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[17px] font-medium text-text-black">{props.article}</h4>
                        <p className="text-[#878787] text-[14px] truncate w-80">{props.description}</p>
                    </div>
                </a>
            </td>
            {/* defect */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1">
                        <h5 className="text-[14px] font-medium text-text-black w-[220px] truncate">P{props.price}</h5>
                        <p className="text-[#878787] text-[14px]">Date Accepted: {props.date}</p>
                    </div>
                </a>
            </td>
            {/* item status */}
            <td className="">
                <a className="flex items-center w-full h-12 gap-3">
                    <h5 className="p-1 px-2 w-fit text-[14px] receivedItem rounded-full flex items-center gap-1">
                        <i className="fa-solid fa-circle text-[7px]"></i>
                        {props.status}
                    </h5>
                </a>
            </td>

        </tr>
        </>
    );
}
