import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestData from "./data/RequestData";

export default function PendingTable({ className }) {
    const [pendingData, setPendingData] = useState([]);

    const pendingDataMapper = (data) => {
        if (data.length !== 0) {
            return data.map((data) => {
                return (
                    <RequestData
                        key={data.id}
                        button={"Pending"}
                        article={data.article}
                        description={data.description}
                        date={data.created_at}
                        value={data.id}
                    />
                );
            });
        } else {
            return (
                <div className="flex flex-col items-center justify-center gap-6 pt-20">
                    <img src="./img/no_data.png" alt="no data" className="w-96" draggable="false" />
                    <strong className="text-text-gray-2 cursor-default">No request yet</strong>
                </div>
            );
        }
    };

    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    useEffect(() => {
       
        fetch('http://' + url.hostname + ':8000/api/getPendingItems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: value.id
        })
            .then(response => response.json())
            .then((data) => {
                setPendingData(data.data);
            })
    }, []);

    return (
        <div className={className}>
            <ul className="flex flex-col w-full justify-center space-y-3 z-20">
                {pendingDataMapper(Object.values(pendingData))}
            </ul>
        </div>
    );
}
