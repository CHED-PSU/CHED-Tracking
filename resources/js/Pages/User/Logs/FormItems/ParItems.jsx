import React, { useState } from "react";

import PARDetails from "../Forms/PARDetails";

export default function ParItems(props) {
    const [openSubForms, setOpenSubForms] = useState("close");
    function clickSubForms(index) {
        setOpenSubForms(index);
    }

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    return (
        <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
            {openSubForms === "open" ? (
                <PARDetails
                    id={props.data.trackings_id}
                    clickSubForms={clickSubForms}
                    className={""}
                />
            ) : (
                ""
            )}

            {/* ICS No. */}
            <td>
                <a className="text-left pl-6 flex items-center w-full gap-3">
                    <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                        {props.data.tracking_id}
                    </p>
                </a>
            </td>
            {/* Description & Date Acquired */}
            <td>
                <a className="text-left flex items-center w-full gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                            {formatDateDisplay(props.data.created_at)}
                        </h4>
                        <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]"></p>
                    </div>
                </a>
            </td>
            {/* Amount */}
            <td>
                <a className="text-left flex items-center w-full gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[16px] font-medium text-primary">
                            {formattedAmount(props.data.total)}
                        </h4>
                        <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                            Php
                        </p>
                    </div>
                </a>
            </td>
            {/* Remarks/Transferred */}
            <td>
                <a className="text-left flex items-center w-full gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                            From John Doe
                        </p>
                    </div>
                </a>
            </td>
            {/* Actions */}
            <td>
                <div
                    onClick={() => clickSubForms("open")}
                    className="flex items-center justify-center w-full gap-3 cursor-pointer"
                >
                    <div className="">
                        <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                            <i className="fa-solid fa-eye"></i> View
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}
