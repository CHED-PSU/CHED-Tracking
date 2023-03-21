import React, { useEffect, useState } from "react";

import Searchbar from "../Components/Searchbar";
import PendingTable from "./Tables/PendingTable";
import AcceptedTable from "./Tables/AcceptedTable";
import axios from "axios";

export default function Index({ className }) {
    const [toggleTabs, setToggleTabs] = useState("pending");
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [Loading, setLoading] = useState(true);

    function clickTabs(index) {
        setToggleTabs(index);
    }

    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    useEffect(()=>{
       const getPendingAcceptedRequests = async () => {
        setLoading(true);
            try{
                const response = await axios.post('api/getPendingAcceptedRequestsById',{
                    id: value.id
                })

                const data = response.data;
                setPendingCount(data.pending)
                setAcceptedCount(data.accepted)
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
       }
       getPendingAcceptedRequests()
       
    },[])

    return (
        <div className={className + "  2xl:px-10 xl:px-5 px-5"}>
            <div className="relative flex  2xl:w-[73%] xl:w-[70%] w-[70%] h-full flex-col 2xl:space-y-5 xl:space-y-3 space-y-3 2xl:py-5 xl:py-3 py-3 2xl:pr-10 xl:pr-5 pr-5">
                {/*tab buttons*/}
                <div className="flex justify-between">
                    <ul className="flex flex-none 2xl:gap-4 xl:gap-2 gap-2 h-10">
                        <li
                            onClick={() => clickTabs("pending")}
                            className={
                                toggleTabs === "pending"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Pending Requests
                            </div>
                        </li>
                        <li
                            onClick={() => clickTabs("accepted")}
                            className={
                                toggleTabs === "accepted"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Accepted Requests
                            </div>
                        </li>
                    </ul>
                    <Searchbar className="h-10" />
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col w-full">
                    {/*ICS Table*/}
                    {toggleTabs === "pending" ? <PendingTable className={ "w-full"}  />: <AcceptedTable className={ "w-full" } />}

                    {/*ICS Table*/}

                    {/*PAR Table*/}

                    {/*PAR Table*/}
                </div>
                {/*Tabs*/}
            </div>

            <div className="flex flex-col 2xl:w-[27%] xl:w-[30%] w-[30%] h-full 2xl:py-5 xl:py-3 py-3">
                <div className="2xl:py-8 2xl:px-8 xl:py-6 xl:px-5 2xl:space-y-14 xl:space-y-8 space-y-8 rounded-2xl border border-neutral-200">
                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3">
                            Total number of pending requests you have requested so far.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total Pending Requests
                        </div>
                        <div className="flex 2xl:h-52 xl:h-40 h-40 2xl:py-4 2xl:px-6 xl:py-3 xl:px-5 py-3 px-5 rounded-2xl bg-card-3 bg-cover bg-center">
                            <div className="w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Items
                                </div>
                                <div className="w-full 2xl:text-5xl xl:text-3xl text-3xl font-bold text-white">
                                    {pendingCount}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3 leading-3">
                            Total number of accepted requests you have requested so far.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total Accepted Requests
                        </div>
                        <div className="flex 2xl:h-52 xl:h-40 h-40 2xl:py-4 2xl:px-6 xl:py-3 xl:px-5 py-3 px-5 rounded-2xl bg-card-3 bg-cover bg-center">
                            <div className="w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Items
                                </div>
                                <div className="w-full 2xl:text-5xl xl:text-3xl text-3xl font-bold text-white">
                                    {acceptedCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
