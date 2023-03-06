import React from "react";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function PendingReq({ className, chartData }) {
    return (
        <Doughnut
            className={className}
            options={{
                plugins: { legend: { display: false } },
            }}
            data={chartData} />
    )
}
