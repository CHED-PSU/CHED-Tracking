import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 30

import {
    AnnualSumData,
    TotalDestructedData,
    TotalSoldData,
} from "./Charts/DashData";
import PendingReq from "./Charts/PendingReq";
import AnnualSum from "./Charts/AnnualSum";
import RequistionItems from "./RequisitionItems/RequisitionItems";
import Loader from "../../../components/Loader";


export default function Dashboard({ className }) { 
    // const [yearData, setYearData] = useState([])
    // const annualSum = {
    //     labels: yearData?.map((data) => data.year),
    //     datasets: [
    //         {
    //             label: "Annual for this Month",
    //             data: yearData?.map((data) => data.total_cost),
    //             backgroundColor: [
    //                 "rgba(251, 93, 145, 1)",
    //                 "rgba(99, 120, 254, 1)",
    //                 "rgba(30, 58, 138, 1)",
    //                 "rgba(255, 123, 163, 1)",
    //                 "rgba(99, 120, 255, 1)",
    //                 "rgba(251, 96, 148, 1)",
    //                 "rgba(255, 123, 163, 1)",
    //                 "rgba(71, 93, 241, 1)",
    //                 "rgba(99, 120, 255, 1)",
    //                 "rgba(30, 58, 138, 1)",
    //                 "rgba(250, 101, 155, 1)",
    //                 "rgba(255, 123, 163, 1)",
    //             ],
    //             hoverOffset: 10,
    //         },
    //     ],
    // };

    const [totalUser, setTotalUsers] = useState("N/A");
    const [Loading, setLoading] = useState(true);
    const [recentIssuance, setRecentIssuance] = useState();

    useEffect(()=>{
        const getAdminDashboardData = async () =>{
            setLoading(true)
            try{
                const response = await axios.get('api/getAdminDashboardData')
                const data = response.data
                setTotalUsers(data.total_users);
                setRecentIssuance(data.recent_issuance)
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
        }
        getAdminDashboardData()
    },[])

    const recentIssuanceMapper = (item) =>{
        return  item?.map(data =>{
            
            var created_at = new Date(data.created_at);

            let today = new Date();

            var distance = today.getTime() - created_at.getTime();

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));

            return <RequistionItems data ={data} date = {days} />
        })
    }

    // const [totalDonation] = useState();

    // const [totalDestructed] = useState(
    //     TotalDestructedData.total.toLocaleString()
    // );

    // const [totalSold] = useState(TotalSoldData.total.toLocaleString());

    // const pendingReq = {
    //     datasets: [
    //         {
    //             label: "Pending Requests",
    //             data: [countAccepted, countPending],
    //             backgroundColor: [
    //                 "rgba(255, 255, 255, 1)",
    //                 "rgba(206, 0, 62, 1)",
    //             ],
    //             borderWidth: 0,
    //             hoverOffset: 5,
    //         },
    //     ],
    // }



    return (
        <>
            <div className={className + "  2xl:px-10 xl:px-5 px-5"}>
                {/* Loader */}
                {/* {loader ? <Loader /> : ""} */}
                {/* Loader */}

                <div className="flex 2xl:w-2/3 xl:w-[70%] w-[65%] h-full flex-col 2xl:space-y-5 xl:space-y-3 space-y-3 2xl:py-5 xl:py-3 py-3 2xl:pr-10 xl:pr-5 pr-5 border-r border-neutral-200">
                    <div className="flex w-full 2xl:h-60 xl:h-40 h-40 flex-none 2xl:gap-6 xl:gap-4 gap-4">
                        <div className="flex w-1/2 justify-end 2xl:px-10 xl:px-6 px-6 items-center rounded-2xl bg-cover bg-center bg-card-1 gap-10 drop-shadow-card1">
                            <div className="w-full flex-none text-right flex flex-col items-end 2xl:truncate">
                                <div className="2xl:font-bold xl:font-semibold font-semibold text-white 2xl:text-xl xl:text-base text-lg">
                                    Total Users
                                </div>
                                <div className="text-xs text-white 2xl:w-fit xl:w-3/5 w-3/5">
                                    TracKagamitan's current users.
                                </div>
                                <div className="mt-2 2xl:text-5xl xl:text-4xl text-4xl font-bold text-white w-3/5">
                                    {Loading ? 'N/A' : totalUser}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-between xl:gap-2 2xl:px-10 xl:px-6 px-6 items-center rounded-2xl bg-cover bg-center bg-card-2 text-white drop-shadow-card2">
                            <div className="2xl:w-fit xl:w-[60%] w-[60%] flex-none 2xl:truncate">
                                <div className="2xl:font-bold xl:font-semibold font-semibold truncate 2xl:text-xl xl:text-base text-lg">
                                    Pending Requests
                                </div>
                                <div className="text-xs">
                                    Total Pending Request for today.
                                </div>
                                <div className="mt-2 xl:w-[64%] w-[64%] 2xl:text-5xl xl:text-4xl text-4xl font-bold truncate">
                                    {/* {countPending} */}
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-fit 2xl:space-y-4 xl:space-y-2 space-y-2">
                                <div className="2xl:h-40 2xl:w-40 xl:h-24 xl:w-24 h-24 w-24 flex-none">
                                    {/* <PendingReq chartData={pendingReq} /> */}
                                </div>
                                <div className="flex 2xl:flex-row xl:flex-col flex-col justify-center flex-none text-xs 2xl:gap-6 xl:gap-1 gap-1">
                                    <div className="flex 2xl:gap-3 xl:gap-2 gap-2 items-center">
                                        <div className="2xl:h-4 2xl:w-4 xl:h-3 xl:w-3 h-3 w-3 rounded-sm bg-[#CE003E]"></div>
                                        <div className="dark:text-white">
                                            Pending
                                        </div>
                                    </div>
                                    <div className="flex 2xl:gap-3 xl:gap-2 gap-2 items-center">
                                        <div className="2xl:h-4 2xl:w-4 xl:h-3 xl:w-3 h-3 w-3 rounded-sm bg-[#FFFFFF]"></div>
                                        <div className="dark:text-white">
                                            Accepted
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit flex justify-between 2xl:gap-5 xl:gap-3 gap-3 z-10">
                        <div className="w-1/3 2xl:p-6 xl:px-4 xl:py-3 p-4 text-[#434343] rounded-xl border border-[#DDDDDD] bg-white dark:bg-darkColor-800">
                            <div className="h-fit 2xl:space-y-1">
                                <div className="font-bold xl:text-sm truncate">Total Donated Items</div>
                                <div className="text-xs">
                                    Donated Unserviceable Equipment.
                                </div>
                            </div>
                            <div className="2xl:text-5xl xl:text-4xl text-4xl 2xl:pt-2 text-right font-bold text-[#1E3A8A]">
                                
                            </div>
                        </div>
                        <div className="w-1/3 2xl:p-6 xl:px-4 xl:py-2 p-4 text-[#434343] rounded-xl border border-[#DDDDDD] bg-white dark:bg-darkColor-800">
                            <div className="h-fit 2xl:space-y-1">
                                <div className="font-bold xl:text-sm truncate">
                                    Total Destructed Items
                                </div>
                                <div className="text-xs">
                                    Destructed Unserviceable Equipment.
                                </div>{" "}
                            </div>
                            <div className="2xl:text-5xl xl:text-4xl text-4xl 2xl:pt-2 text-right font-bold text-[#1E3A8A]">
                                
                            </div>
                        </div>
                        <div className="w-1/3 2xl:p-6 xl:px-4 xl:py-2 p-4 rounded-xl text-[#434343] border border-[#DDDDDD] bg-white dark:bg-darkColor-800">
                            <div className="h-fit 2xl:space-y-1">
                                <div className="font-bold xl:text-sm truncate">Total Sold Items</div>
                                <div className="text-xs">
                                    Sold Unserviceable Equipment.
                                </div>
                            </div>{" "}
                            <div className="2xl:text-5xl xl:text-4xl text-4xl 2xl:pt-2 text-right font-bold text-[#1E3A8A]">
                               
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-auto 2xl:space-y-2 xl:space-y-1 space-y-1 text-[#434343] dark:text-white 2xl:pt-1">
                        <div className="font-semibold">Annual Summary</div>
                        <div className="rounded-2xl border border-[#DDDDDD] h-full w-full bg-white dark:bg-darkColor-800 space-y-3">
                            <div className="relative w-full h-full 2xl:py-6 xl:py-4 py-4 2xl:px-8 xl:px-5 px-5">
                                {/* <AnnualSum chartData={annualSum} /> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col 2xl:w-1/3 xl:w-[30%] w-[35%] h-full 2xl:space-y-5 xl:space-y-3 space-y-3 2xl:py-5 xl:py-3 py-3 2xl:pl-10 xl:pl-5 pl-5">
                    <div className="h-96 rounded-xl 2xl:space-y-3 xl:space-y-2 space-y-2">
                        <div className="flex justify-between content-center">
                            <div className="font-semibold 2xl:text-lg xl:text-base text-[#434343] dark:text-white">
                                Recent Issuance
                            </div>
                        </div>
                        {Loading ? <div className="flex items-center justify-center cursor-default">
                                    <div className="flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-full w-[300px] h-[300px]">
                                        <img src="./img/no_data.png" alt="no data" className="w-52" draggable="false" />
                                        <strong className="text-text-gray-2 text-sm">You haven't been issued yet</strong>
                                    </div>
                                </div> : recentIssuanceMapper(recentIssuance)}
                        {/* no data */}
                        
                    </div>


                    <div className="2xl:space-y-1">
                        <div className="text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3">
                            Predicted Total Cost for this year.
                        </div>
                        <div className="font-bold text-[#434343] 2xl:text-2xl xl:text-lg text-lg xl:pb-1">
                            Total Cost
                        </div>
                        <div className="flex 2xl:h-64 xl:h-40 h-40 py-4 px-7 rounded-2xl bg-card-3 bg-cover bg-center">
                            <div className="2xl:mt-3 w-full gap-3">
                                <div className="2xl:text-xl xl:text-lg text-lg text-white">
                                    Php
                                </div>
                                <div className="w-full 2xl:text-5xl xl:text-3xl text-3xl font-bold text-white">
                                    P
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}