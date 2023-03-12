import React, { useState, useEffect, useRef } from "react";
import PreOwner from "./Tabs/sortedPrevOwner";
import Renewal from "./Tabs/Renewal";

export default function Assign({
    className,
    users,
    clickSortedModal,
    personSelected,
    selectedId,
    user_id,
    getInventorySorted,
}) {
    const [toggleTabs, setToggleTabs] = useState("pre-owner");

    function clickTabs(index) {
        setToggleTabs(index);
    }

    let modalBody = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!modalBody.current.contains(event.target)) {
                clickSortedModal("close");
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
                <div
                    ref={modalBody}
                    className="w-1/3 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20"
                >
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default">
                        <div className="w-full text-left">
                            <button
                                onClick={() => clickSortedModal("close")}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <img
                            src="./img/assignto_icon.png"
                            className="w-12 pb-3"
                        />
                        <div className="text-2xl text-gray-800 font-semibold">
                            Assign a Personnel
                        </div>
                        <div className="text-xs">
                            Choose which user do you want to assign the item
                        </div>
                    </div>
                    <div className="flex justify-center pb-5">
                        <div className="flex bg-gray-200 rounded-full">
                            <button
                                onClick={() => clickTabs("pre-owner")}
                                className={
                                    toggleTabs === "pre-owner"
                                        ? "outline-none rounded-full bg-primary py-2 px-3 text-white font-semibold"
                                        : "outline-none rounded-full py-2 px-3 font-medium"
                                }
                            >
                                Previous Owner
                            </button>
                            <button
                                onClick={() => clickTabs("renewal")}
                                className={
                                    toggleTabs === "renewal"
                                        ? "outline-none rounded-full bg-primary py-2 px-3 text-white font-semibold"
                                        : "outline-none rounded-full py-2 px-3 font-medium"
                                }
                            >
                                Renewal
                            </button>
                        </div>
                    </div>

                    {toggleTabs === "pre-owner" ? (
                        <PreOwner
                            clickSortedModal={clickSortedModal}
                            users={users}
                            user_id={personSelected}
                            selectedId={selectedId}
                            className={""}
                            getInventorySorted={getInventorySorted}
                        />
                    ) : (
                        ""
                    )}
                    {toggleTabs === "renewal" ? (
                        <Renewal
                            clickSortedModal={clickSortedModal}
                            users={users}
                            user_id={personSelected}
                            selectedId={selectedId}
                            className={""}
                            getInventorySorted={getInventorySorted}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
