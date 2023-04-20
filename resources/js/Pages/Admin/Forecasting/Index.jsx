import axios from "axios";
import React, { useEffect, useState } from "react";
import Disposal from "./Tabs/Disposal";
import Newproposal from "./Tabs/Newproposal";
import Loader from "../../../components/Loader";

export default function Forecasting({ className }) {
    const [toggleTabs, setToggleTabs] = useState("newproposal");
    const domain = window.location.href;
    const url = new URL(domain);
    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [xAxis, setxAxis] = useState([]);
    const [pxAxis, setpxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [pyAxis, setpyAxis] = useState([]);
    const [predictedyAxis, setpredictedyAxis] = useState([]);
    const [predicted, setpredicted] = useState();
    const [ddata, dsetData] = useState([]);
    const [dxAxis, dsetxAxis] = useState([]);
    const [dyAxis, dsetyAxis] = useState([]);
    const [dpredictedyAxis, dsetpredictedyAxis] = useState([]);
    const [dpredicted, dsetpredicted] = useState();
    const [totalCostPerYear, settotalCostPerYear] = useState([]);

    function clickTabs(index) {
        setToggleTabs(index);
    }

    useEffect(() => {
        const forecast = async () => {
            setLoading(true);
            try {
                await axios.get("api/forecast").then((response) => {
                    setData(response.data.data);
                    setxAxis(response.data.xAxis);
                    setyAxis(response.data.yAxis);
                    setpxAxis(response.data.pxAxis);
                    setpyAxis(response.data.pyAxis);
                    setpredictedyAxis(response.data.predicted_data);
                    setpredicted(response.data.predicted);
                    settotalCostPerYear(response.data.data);
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        forecast();
    }, []);

    return (
        <div className={className + " flex justify-center"}>
            {/* Loader */}
            {Loading ? <Loader /> : ""}
            {/* Loader */}

            <div className="z-20 py-3 flex flex-col 2xl:px-10 xl:px-5 px-5">
                {/*tab buttons*/}
                <div className="pb-3">
                    <ul className="flex gap-4">
                        <li
                            onClick={() => clickTabs("newproposal")}
                            className={
                                toggleTabs === "newproposal"
                                    ? "btn-color-4 text-white dark:text-black font-semibold rounded-full"
                                    : "btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                            }
                        >
                            <div className="select-none h-10 text-xs w-fit px-5 flex items-center">
                                Annual Cost
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
                            pxAxis={pxAxis}
                            pyAxis={pyAxis}
                            totalCostPerYear={totalCostPerYear}
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
