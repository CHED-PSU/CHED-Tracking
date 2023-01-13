import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function DisposalChart( props ) {
    return (
        <Line
            data={props.chartData}
            options={{
                plugins:{legend: { display: false }},
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display:false
                        }
                    },
                }
            }}
        />
    );
}
