import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestData from "./data/RequestData";
import io from "socket.io-client";
import Loader from "../../../../components/Loader";
//const socket = io.connect("http://127.0.0.1:8001");

export default function PendingTable({ className }) {
    const [pendingData, setPendingData] = useState([]);

    const sendMessage = () => {
        //socket.emit("User_Accept", { message: "test" });
    };

    const pendingDataMapper = (data) => {
        if (data?.length !== 0) {
            return data.map((data) => {
                return (
                    <RequestData
                        key={data.id}
                        button={"Pending"}
                        article={data.article}
                        description={data.description}
                        date={data.created_at}
                        value={data.id}
                        buttoN={sendMessage}
                    />
                );
            });
        } else {
            return (
                <div className="flex flex-col items-center justify-center gap-6 pt-20">
                    <img
                        src="./img/no_data.png"
                        alt="no data"
                        className="w-96"
                        draggable="false"
                    />
                    <strong className="text-text-gray-2 cursor-default">
                        No request yet
                    </strong>
                </div>
            );
        }
    };

    const domain = window.location.href;
    const url = new URL(domain);
    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const getPendingRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.post("/api/getPendingRequests", {
                    id: value.id,
                });

                const data = await response.data.data;
                setPendingData(data);
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
            {Loading ? <Loader /> : ''}
            <ul className="flex flex-col w-full justify-center space-y-3 z-20">
                {pendingData?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-6 pt-20">
                        <img
                            src="./img/no_data.png"
                            alt="no data"
                            className="w-96"
                            draggable="false"
                        />
                        <strong className="text-text-gray-2 cursor-default">
                            No request yet
                        </strong>
                    </div>
                ) : (
                    pendingDataMapper(Object.values(pendingData))
                )}
            </ul>
        </div>
    );
}
