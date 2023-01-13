import React, { useEffect, useRef } from "react";

export default function PARModal({ className, clickPARModal }) {
    let modalBody = useRef();

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 flex items-center justify-center z-50">
                <div ref={modalBody} className="w-1/2 h-fit bg-white shadow-lg rounded-2xl px-12 py-8 z-20">
                    <button onClick={() => clickPARModal("close")} className="closeModal text-xl">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="text-center">
                        <div className="text-sm font-semibold">
                            PROPERTY RETURN SLIP
                        </div>
                    </div>
                    <div className="pt-4 flex items-center gap-2">
                        <div className="text-xs">Name of Government Unit:</div>
                        <div className="text-xs font-semibold">
                            COMMISSION ON HIGHER EDUCATION RO XI
                        </div>
                    </div>
                    <div className="pt-1 flex items-center gap-2">
                        <div className="text-xs">Purpose:</div>
                        <div
                            className="text-xs font-semibold"
                            id="purpose_for_many_items"
                        ></div>
                    </div>
                    <div className="mt-4 mb-2 overflow-auto max-h-[400px]">
                        <table id="items" className="table-auto  w-full">
                            <thead>
                                <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    <th className="h-10 w-12 font-medium">Qty</th>
                                    <th className="h-10 w-12 font-medium">Unit</th>
                                    <th className="h-10 font-medium">
                                        Description
                                    </th>
                                    <th className="h-10 w-24 font-medium">
                                        Date Acquired
                                    </th>
                                    <th className="h-10 w-24 font-medium">
                                        Property Acquired
                                    </th>
                                    <th className="h-10 w-32 font-medium">
                                        A.R.E No.
                                    </th>
                                    <th className="h-10 w-20 font-medium">
                                        Name of End User{" "}
                                    </th>
                                    <th className="h-10 w-20 font-medium">
                                        Total Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="many_items_table">
                                <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white hover:drop-shadow-dark dark:hover:drop-shadow-light">
                                    <td className="text-center px-2">1</td>
                                    <td className="text-center px-2">Unit</td>
                                    <td className=" px-1 py-2">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maxime debitis earum,
                                        nobis et itaque doloremque eveniet
                                        natus.
                                    </td>
                                    <td className="text-center px-2">
                                        November 1, 2021
                                    </td>
                                    <td className="text-center px-2">
                                        Rent-to-own
                                    </td>
                                    <td className="text-center px-2">
                                        2021-05-03-L037-CHEDROXI-TECHNICAL UNIT
                                    </td>
                                    <td className="text-center px-2">John Doe</td>
                                    <td className="text-center px-2">98, 799.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-2">
                        {/* Hide this buttons if the form is already accepted */}
                        <div className="flex flex-col space-y-3">
                            <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                                Accept
                            </button>
                            <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] ">
                                Decline
                            </button>
                        </div>

                        {/* Accepted Button (unhide this button if the form is already accepted) */}
                        <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] disabled hidden">
                            Accepted
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
