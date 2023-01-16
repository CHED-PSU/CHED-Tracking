import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NewproposalData } from '../Charts/ForecastData';
import NewproposalChart from '../Charts/NewproposalChart';

export default function Newproposal({ className, data, xAxis, yAxis, predictedyAxis, predicted }) {
   const domain = window.location.href;
   const url = new URL(domain)

   const predictRef = useRef(null)
   const [projectedValue, setProjectedValue] = useState(predicted);
   const [totalCostPerYear, settotalCostPerYear] = useState([]);
   const predictHandler = (e) => {
      e.preventDefault()

      fetch('http://' + url.hostname + ':8000/api/forecastSpecific', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: predictRef.current.value
        })
            .then(response => response.json())
            .then((data) => {
               setProjectedValue(data.predicted)
            })

   }

   useEffect(() => {

      fetch('http://' + url.hostname + ':8000/api/totalCostPerYear', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
               settotalCostPerYear(data.data)
            })
   }, [])


   var data = {
      labels: xAxis.map((data) => data.year),
      datasets: [
         {
            label: "Actual Data",
            data: yAxis.map((data) => parseInt(data.total_cost)),
            fill: true,
            backgroundColor: [
               "rgba(220, 232, 255, 0.4)"
            ],
            pointBackgroundColor: "rgba(34, 127, 255, 1)",
            borderColor: 'rgba(34, 127, 255, 1)',
            borderWidth: 2,
            hoverOffset: 10,
            tension: 0.2,
         },
         {
            label: "Forecasted Data",
            data: predictedyAxis.map((data) => parseInt(data)),
            fill: true,
            backgroundColor: [
               "rgba(222, 212, 255, 0.4)"
            ],
            pointBackgroundColor: "rgba(179,41,127,1.00)",
            borderColor: 'rgba(179,41,140,1.00)',
            borderWidth: 2,
            hoverOffset: 10,
            tension: 0.2,
         },
      ],
   }
   
   return (
      <div className={className + " flex"}>
         <div>
            <div className='flex gap-7'>
               <div className='w-[880px] h-96 bg-white border p-8 rounded-lg'>
                  <NewproposalChart chartData={data} />
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
                              <th className="w-64 font-medium text-left">No</th>
                              <th className="w-96 font-medium text-left">Date</th>
                              <th className="w-40 font-medium text-left">Defects</th>
                           </tr>
                        </thead>
                        <tbody className="block h-[250px] w-fit overflow-scroll space-y-3">
                            <tr className="bg-white h-12">
                                <td className="w-80 pl-16 text-left 2xl:text-base xl:text-sm text-sm rounded-tableRow">
                                    0
                                </td>
                                <td className="w-96 2xl:text-base xl:text-sm text-sm font-semibold text-text-black">
                                    0
                                </td>
                                <td className="w-40 text-sm rounded-tableRow">
                                    <div className="flex gap-2 items-center text-c-inspecting font-medium">
                                        <h5 className="2xl:text-sm xl:text-[13px] text-[13px]">
                                            ₱ 0
                                        </h5>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         <div className='bg-white h-fit border py-8 px-8 rounded-lg space-y-2'>
            <form action="">
               <div className="">
                  <h1 className='font-semibold text-text-black'>Predict Year:</h1>
                  <div className='flex gap-3'>
                     <input type="number" name="" id="numberInput" className='w-full rounded-md border border-neutral-500 p-3 outline-none cursor-pointer' />
                     <button className='border bg-col btn-color-1 px-5 rounded-lg text-white text-lg'><i className="fa-solid fa-check"></i></button>
                  </div>
               </div>
            </form>
            <div className="2xl:pt-6 2xl:space-y-1">
               <div className="w-72 text-[#011284] 2xl:text-sm xl:text-xs font-semibold 2xl:leading-0 xl:leading-3">
                  Estimated total disposal cost for the year 2022
               </div>
               <div className="font-bold text-[#434343] 2xl:text-xl xl:text-lg text-lg xl:pb-1">
                  Disposal/Total Cost 2022
               </div>
               <div className="flex 2xl:h-46 xl:h-40 h-40 py-4 px-7 rounded-2xl bg-card-8 bg-cover bg-center">
                  <div className="w-full">
                     <div className="2xl:text-lg xl:text-lg text-lg text-white">
                        Php
                     </div>
                     <div className="w-full 2xl:text-4xl xl:text-3xl text-3xl font-bold text-white">
                        ₱0
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* data */}
      </div>
   )
}
