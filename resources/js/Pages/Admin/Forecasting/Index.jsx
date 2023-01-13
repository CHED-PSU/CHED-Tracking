import axios from "axios";
import React, { useEffect, useState } from "react";

import AdminBg from "../../../Components/AdminBg";
import Disposal from "./Tabs/Disposal";
import Newproposal from "./Tabs/Newproposal";

export default function Forecasting({ className }) {
    const [toggleTabs, setToggleTabs] = useState("disposal");

    const domain = window.location.href;
    const url = new URL(domain);

    function clickTabs(index) {
        setToggleTabs(index);
    }
    const [data, setData] = useState([]);
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [predictedyAxis, setpredictedyAxis] = useState([]);
    const [predicted, setpredicted] = useState();

    const [ddata, dsetData] = useState([]);
    const [dxAxis, dsetxAxis] = useState([]);
    const [dyAxis, dsetyAxis] = useState([]);
    const [dpredictedyAxis, dsetpredictedyAxis] = useState([]);
    const [dpredicted, dsetpredicted] = useState();

    useEffect(() => {
        fetch("http://" + url.hostname + ":8000/api/forecast", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data.data);
                setxAxis(data.xAxis);
                setyAxis(data.yAxis);
                setpredictedyAxis(data.predicted_data);
                setpredicted(data.predicted);
            });


    }, []);

    useEffect(()=>{
        fetch("http://" + url.hostname + ":8000/api/disposalForecast", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dsetData(data.data);
                dsetxAxis(data.xAxis);
                dsetyAxis(data.yAxis);
                dsetpredictedyAxis(data.predicted_data);
                dsetpredicted(data.predicted);
            });
    },[])

    return (
        <div className={className + " flex justify-center"}>
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>

            <div className="z-20 py-3 flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3">
                    <ul className="flex gap-4">
                        <li className="btn-color-4 text-white dark:text-black font-semibold rounded-full">
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                Disposal
                            </div>
                        </li>
                        <li className="btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full">
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center cursor-pointer">
                                New Proposal
                            </div>
                        </li>
                    </ul>
                </div>
                {/*tab buttons*/}

                {/*Tabs*/}
                <div className="flex flex-col">
                    {/*Disposal graph*/}
                    {toggleTabs === "disposal" ? (
                        <Disposal
                            className={""}
                            data={ddata}
                            xAxis={dxAxis}
                            yAxis={dyAxis}
                            predictedyAxis={dpredictedyAxis}
                            predicted={dpredicted}
                        />
                    ) : (
                        <Newproposal
                            className={""}
                            data={data}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            predictedyAxis={predictedyAxis}
                            predicted={predicted}
                        />
                    )}

                </div>
                {/*Tabs*/}
            </div>
        </div>
    );
}
