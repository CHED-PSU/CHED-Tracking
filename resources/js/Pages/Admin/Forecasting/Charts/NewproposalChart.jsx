import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function NewproposalChart(props) {
    return (
        <Line
            data={props.chartData}
            options={{ 
                elements: {
                    point:{
                        radius: 0
                    }
                },
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
