import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function AnnualSum({ className, chartData }) {
    return (
        <Bar
            className={className}
            data={chartData}
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
