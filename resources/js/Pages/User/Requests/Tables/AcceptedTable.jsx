import axios from "axios";
import PreviousMap from "postcss/lib/previous-map";
import React, { useEffect, useState } from "react";
import AcceptedData from "./data/AcceptedData";

export default function AcceptedTable({ className }) {
    const [acceptedData, setAcceptedData] = useState([]);

    const acceptedDataMapper = (data) => {
        if (data.length !== 0) {
            return data.map((data) => {
                return (
                    <AcceptedData
                        key={data.id}
                        button={"Accepted"}
                        article={data.article}
                        description={data.description}
                        date={data.created_at}
                        status={data.name}
                        value={data.id}
                        price={data.price}
                    />
                );
            });
        } else {
            return (
                <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    <td colspan="4" className="text-center h-12 bg-white border">
                        <small className="text-sm">No data available in table.</small>
                    </td>
                </tr>
            );
        }
    };

    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    useEffect(() => {

        fetch('http://' + url.hostname + ':8000/api/getAcceptedItems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: value.id
        })
            .then(response => response.json())
            .then((data) => {
                setAcceptedData(data.data);
            })
    }, []);
    return (
        <div className={className}>
            <table className="w-full">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 w-24 font-medium text-left pl-6">No</th>
                        <th className="h-10 w-80 font-medium text-left">Article</th>
                        <th className="h-10 w-80 font-medium text-left">Acquisition</th>
                        <th className="h-10 w-24 font-medium text-right pr-10">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {acceptedDataMapper(Object.values(acceptedData))}
                </tbody>
            </table>

        </div>
    );
}
