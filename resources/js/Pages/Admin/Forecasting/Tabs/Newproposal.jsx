import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NewproposalChart from "../Charts/NewproposalChart";

export default function Newproposal({
    className,
    data,
    xAxis,
    yAxis,
    pxAxis,
    pyAxis,
    predictedyAxis,
    predicted,
}) {    

    const domain = window.location.href;
    const url = new URL(domain);

    const predictRef = useRef(null);
    const [totalCostPerYear, settotalCostPerYear] = useState([]);
    const [projectedValue, setProjectedValue] = useState("");
    const [year, setYear] = useState("");
    const [Loading, setLoading] = useState(true);

    const predictHandler = (e) => {
        let year;
        if (predictRef.current.value > 0) {
            year = predictRef.current.value;
        } else {
            year = currentYear + 1;
        }

        e.preventDefault();
        axios.post("api/forecastSpecific", { value: year }).then((response) => {
            setProjectedValue(response.data.predicted);
            setYear(year);
        });
    };

    // useEffect(() => {
    //     predictHandler();
    // }, []);

    // const predictHandler = async () => {
    //     const currentYear = new Date().getFullYear();
    //     const yearToPredict = currentYear + 3;
    //     try {
    //         const response = await axios.post("api/forecastSpecific", {
    //             value: yearToPredict,
    //         });
    //         setProjectedValue(response.data.predicted);
    //         setYear(yearToPredict);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        const getTotalCost = async () => {
            setLoading(true);
            try {
                const response = await axios.get("api/totalCostPerYear");
                const data = response.data;
                settotalCostPerYear(data.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getTotalCost();
    }, []);

    const dataMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr key={data.id} className="bg-white h-12">
                    <td className="w-80 pl-16 text-left 2xl:text-base xl:text-sm text-sm rounded-tableRow">
                        {data.id}
                    </td>
                    <td className="w-96 2xl:text-base xl:text-sm text-sm font-semibold text-text-black">
                        {data.year}
                    </td>
                    <td className="w-40 text-sm rounded-tableRow">
                        <div className="flex gap-2 items-center text-c-inspecting font-medium">
                            <h5 className="2xl:text-sm xl:text-[13px] text-[13px]">
                                ₱ {data.total_cost}
                            </h5>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    var data = {
        labels: [...xAxis.map((data) => data.year), ...pxAxis.map((data) => data.year)],
        datasets: [
            {
                label: "Actual Data",
                data: [...yAxis.map((data) => parseInt(data.total_cost)), ...pyAxis.map((data) => parseInt(data.total_cost))],
                fill: true,
                backgroundColor: ["rgba(220, 232, 255, 0.4)"],
                pointBackgroundColor: "rgba(34, 127, 255, 1)",
                borderColor: "rgba(34, 127, 255, 1)",
                borderWidth: 2,
                hoverOffset: 10,
                tension: 0.2,
            },
        ],
    };

    // var data = {
    //     labels: xAxis.map((data) => data.year),
    //     datasets: [
    //         {
    //             label: "Actual Data",
    //             data: yAxis.map((data) => parseInt(data.total_cost)),
    //             fill: true,
    //             backgroundColor: ["rgba(220, 232, 255, 0.4)"],
    //             pointBackgroundColor: "rgba(34, 127, 255, 1)",
    //             borderColor: "rgba(34, 127, 255, 1)",
    //             borderWidth: 2,
    //             hoverOffset: 10,
    //             tension: 0.2,
    //         },
    //     ],
    // };

    var currentYear = new Date().getFullYear();

    return (
        <div className={className + " flex"}>
            <div>
                <div className="flex gap-7">
                    <div className="w-[880px] bg-white border pt-8 px-8 pb-4 space-y-3 rounded-lg">
                        <div className=" h-80">
                            <NewproposalChart chartData={data} />
                        </div>
                        <div className="w-full justify-center flex items-center gap-2 py-2">
                            <div className="2xl:h-4 2xl:w-6 xl:h-3 xl:w-6 h-3 w-6 rounded-sm bg-[#227fff]"></div>
                            <div className="dark:text-white font-semibold leading-3">
                                Disposal Cost
                            </div>
                        </div>
                    </div>
                </div>

                {/* data */}
                <div>
                    <div className="flex flex-col 2xl:gap-1 xl:gap-0 gap-0 pt-5">
                        <h4 className="2xl:text-lg xl:text-base text-base font-semibold">
                            New Proposal Data
                        </h4>
                        <div className="w-full">
                            <table className="w-full border-separate 2xl:border-spacing-y-3 xl:border-spacing-y-2 border-spacing-y-2 table-auto">
                                <thead className="text-xs text-th dark:text-white cursor-default block pb-3">
                                    <tr className="flex px-16 items-center ">
                                        <th className="w-64 font-medium text-left">
                                            No
                                        </th>
                                        <th className="w-96 font-medium text-left">
                                            Date
                                        </th>
                                        <th className="w-40 font-medium text-left">
                                            Defects
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="block h-[250px] w-fit overflow-scroll space-y-3">
                                    {totalCostPerYear?.length != 0 ? (
                                        dataMapper(totalCostPerYear)
                                    ) : (
                                        <tr className="bg-white h-12">
                                            <td className="w-80 pl-16 text-left 2xl:text-base xl:text-sm text-sm rounded-tableRow"></td>
                                            <td className="w-96 2xl:text-base xl:text-sm text-sm font-semibold text-text-black">
                                                No data yet.
                                            </td>
                                            <td className="w-40 text-sm rounded-tableRow">
                                                <div className="flex gap-2 items-center text-c-inspecting font-medium">
                                                    <h5 className="2xl:text-sm xl:text-[13px] text-[13px]"></h5>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white h-fit border py-8 px-8 rounded-lg space-y-14">
                <form action="">
                    <div className="">
                        <h1 className="font-semibold text-text-black">
                            Predict Year:
                        </h1>
                        <div className="flex gap-3">
                            <input
                                ref={predictRef}
                                min={currentYear + 1}
                                max={currentYear + 3}
                                placeholder={currentYear + 1}
                                type="number"
                                name=""
                                id="numberInput"
                                className="w-full rounded-md border border-neutral-500 p-3 outline-none cursor-pointer"
                            />
                            <button
                                onClick={predictHandler}
                                className="border bg-col btn-color-1 px-5 rounded-lg text-white text-lg"
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="2xl:space-y-1">
                    <div className="w-72 text-[#011284] 2xl:text-xs xl:text-xs font-semibold 2xl:leading-0 xl:leading-3">
                        Estimated total disposal cost for the year
                    </div>
                    <div className="font-bold text-[#434343] 2xl:text-lg xl:text-lg text-lg xl:pb-1">
                        Disposal/Total Cost {year}
                    </div>
                    <div className="flex 2xl:h-46 xl:h-40 h-40 py-4 px-7 rounded-2xl bg-card-8 bg-cover bg-center">
                        <div className="w-full">
                            <div className="2xl:text-lg xl:text-lg text-lg text-white">
                                Php
                            </div>
                            <div className="w-full 2xl:text-4xl xl:text-3xl text-3xl font-bold text-white">
                                ₱{" "}
                                {projectedValue
                                    ? projectedValue
                                          .toString()
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* data */}
        </div>
    );
}
