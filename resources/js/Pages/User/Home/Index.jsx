import axios from "axios";
import React, { useEffect, useState } from "react";
import Accepted from "./AcceptedRequest/Accepted";

export default function Index(props) {

    const [numberOfItems, setNumberOfItems] = useState()
    const [acceptedItems, setAcceptedItems] = useState([])
    const [recentIssuance, setRecentIssuance] = useState([])
<<<<<<< HEAD
=======
    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    
>>>>>>> 82e13a17a0280e1a7e24331bed833aa54690e03a

    const recentIssuanceMapper = (items) => {
        return items?.map(data => {
            var created_at = new Date(data.created_at);

            let today = new Date();

            var distance = today.getTime() - created_at.getTime();

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            return (
                <div className="flex flex-row w-full gap-3 pb-4">
                    <div className="w-fit h-full flex flex-none items-center">
                        <img
                            src="./img/profile-pic.jpeg"
                            alt=""
                            className="rounded-full bg-gray-500 2xl:w-12 2xl:h-12 xl:w-10 xl:h-10 w-10 h-10 object-cover"
                        />
                    </div>
                    <div className="flex flex-col cursor-pointer 2xl:space-y-1">
                        <div className="flex text-sm justify-between text-text-gray">
                            <h4 className="">
                                {data.surname + ' ' + data.firstname.charAt(0)}. | {data.name}
                            </h4>
                            <p className="">{days === 1 || days === 0 ? "a day ago" : days + " days ago"}</p>
                        </div>
                        <div className="rounded-lg bg-[#F0F2F5]">
                            <h4 className="text-sm font-medium py-2 px-3">
                                <font className="font-bold">You</font> have
                                been issued an{" "}
                                <font className="font-bold">
                                    {data.totalItems === 1 ? "single item" : "many items"}
                                </font>{" "}
                                from Inventory
                            </h4>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const acceptedRequestMapper = (items) => {
        return items.map(data => {
            return <Accepted data={data} />
        })
    }
    return (
        <div className={props.className + " 2xl:px-10 xl:px-5 px-5 2xl:py-5 xl:py-3 py-3"}>
            <div className="flex flex-col 2xl:w-[70%] xl:w-[65%] w-[65%] h-full 2xl:space-y-5 xl:space-y-3 space-y-3 2xl:pr-10 xl:pr-5 pr-5">
                <div className="flex w-full 2xl:h-[320px] xl:h-[200px] h-[200px] rounded-2xl bg-center bg-cover bg-card-4"></div>
                <div className="flex flex-col gap-1">
                    <h4 className="2xl:text-lg xl:text-base text-base font-semibold">Menu</h4>
                    <div className="flex 2xl:gap-6 xl:gap-4 gap-4">
                        <div onClick={() => props.clickTabs('logs')} className="2xl:h-44 xl:h-36 h-36 w-64 rounded-xl bg-cover bg-center bg-card-5 text-white text-xl font-bold p-4 cursor-pointer">
                            Logs
                        </div>
                        <div onClick={() => props.clickTabs('items')} className="2xl:h-44 xl:h-36 h-36 w-64 rounded-xl bg-cover bg-center bg-card-6 text-white text-xl font-bold p-4 cursor-pointer">
                            Items
                        </div>
                        <div onClick={() => props.clickTabs('requests')} className="2xl:h-44 xl:h-36 h-36 w-64 rounded-xl bg-cover bg-center bg-card-7 text-white text-xl font-bold p-4 cursor-pointer">
                            Requests
                        </div>
                    </div>
                </div>
                <div className="flex flex-col 2xl:gap-1 xl:gap-0 gap-0">
                    <h4 className="2xl:text-lg xl:text-base text-base font-semibold">
                        Accepted Request
                    </h4>
                    <div className="">
                        <table className="w-full border-separate 2xl:border-spacing-y-3 xl:border-spacing-y-2 border-spacing-y-2 table-auto">
                            <thead className="text-xs text-th dark:text-white cursor-default">
                                <tr className="">
                                    <th className="px-4 font-medium text-center">
                                        No
                                    </th>
                                    <th className="font-medium text-left">
                                        Description
                                    </th>
                                    <th className="font-medium text-left">
                                        Defects
                                    </th>
                                    <th className="font-medium text-left">
                                        Status
                                    </th>
                                    <th className="text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedItems?.length === 0 ? <tr className="bg-white">
                                    <td colSpan={5} className=" text-center 2xl:text-base xl:text-sm text-sm rounded-tableRow">
                                        No Data
                                    </td>
                                </tr> : acceptedRequestMapper(Object.values(acceptedItems))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex flex-col 2xl:w-[30%] xl:w-[35%] w-[35%] h-full 2xl:space-y-5 xl:space-y-3 space-y-3">
                <div className="2xl:px-8 xl:py-6 xl:px-5 w-full bg-white rounded-2xl border border-neutral-200">
                    <div className="h-96">
                        <div className="flex items-center justify-between pb-5">
                            <div className="font-semibold 2xl:text-lg xl:text-base text-[#434343] dark:text-white">
                                Recent Issuance
                            </div>

                        </div>
                        {recentIssuance?.length != 0 ? recentIssuanceMapper(recentIssuance) : <div className="flex items-center justify-center pb-8 cursor-default">
                            <div className="flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-full w-[300px] h-[300px]">
                                <img src="./img/no_data.png" alt="no data" className="w-52" draggable="false" />
                                <strong className="text-text-gray-2 text-sm">You haven't been issued yet</strong>
                            </div>
                        </div>}
                        {/* no data */}

                        {/* no data */}
                    </div>
                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3 leading-3">
                            Total amount of items you currently own.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total Items
                        </div>
                        <div className="flex 2xl:h-52 xl:h-40 h-40 2xl:py-4 2xl:px-6 xl:py-3 xl:px-5 py-3 px-5 rounded-2xl bg-card-3 bg-cover bg-center">
                            <div className="w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Items
                                </div>
                                <div className="w-full 2xl:text-5xl xl:text-3xl text-3xl font-bold text-white">
                                    {numberOfItems}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
