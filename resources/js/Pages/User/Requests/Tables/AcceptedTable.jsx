import axios from "axios";
import PreviousMap from "postcss/lib/previous-map";
import React, { useEffect, useState } from "react";
import AcceptedData from "./data/AcceptedData";

export default function AcceptedTable({ className }) {
    const [acceptedData, setAcceptedData] = useState([]);
    const [Loading, setLoading] = useState();

    const acceptedDataMapper = (data) => {
        if (data.length !== 0) {
            return data.map((data) => {
                return (
                    <AcceptedData
                        key={data.uri_id}
                        button={"Accepted"}
                        article={data.article}
                        description={data.description}
                        date={data.created_at}
                        status={data.status}
                        value={data.uri_id}
                        price={data.price}
                    />
                );
            });
        } else {
            return (
                <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    <td
                        colSpan="4"
                        className="text-center h-12 bg-white border"
                    >
                        <small className="text-sm">
                            No data available in table.
                        </small>
                    </td>
                </tr>
            );
        }
    };

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    useEffect(() => {
        const getPendingRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.post(
                    "api/getUsersAcceptedRequests",
                    {
                        id: value.id,
                    }
                );

                const data = await response.data;
                setAcceptedData(data.acceptedRequest);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getPendingRequests();
    }, []);

    return (
        <div className={className}>
            <table className="w-full">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 w-24 font-medium text-left pl-6">
                            No
                        </th>
                        <th className="h-10 w-80 font-medium text-left">
                            Article
                        </th>
                        <th className="h-10 w-80 font-medium text-left">
                            Acquisition
                        </th>
                        <th className="h-10 w-24 font-medium text-right pr-10">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Loading ? (
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <td
                                colSpan="4"
                                className="text-center h-12 bg-white border"
                            >
                                <small className="text-sm">Loading data.</small>
                            </td>
                        </tr>
                    ) : (
                        ""
                    )}
                    {acceptedDataMapper(Object.values(acceptedData))}
                </tbody>
            </table>
        </div>
    );
}
