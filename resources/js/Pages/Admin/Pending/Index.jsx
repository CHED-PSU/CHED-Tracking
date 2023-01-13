import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ICSModal from "./Modals/ICSModal";
import PARModal from "./Modals/PARModal";
import AdminBg from "../../../components/AdminBg";
import axios from "axios";
import Loader from "../../../components/Loader";
import Searchbar from "../Components/Searchbar";

export default function Pending({ className }) {

    const [openICSModal, setOpenICSModal] = useState("close");
    const [openPARModal, setOpenPARModal] = useState("close");

    function clickICSModal(index, ids) {
        if (ids === undefined) {
            setOpenICSModal(index);
        } else {

            fetch("http://" + url.hostname + ":8000/api/getPendingInformation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ids,
        })
            .then((response) => response.json())
            .then((data) => {
                setpendingData(data.pendingData)
                setOpenICSModal(index);
            });

        }

    }

    function clickPARModal(index) {
        setOpenPARModal(index);
    }

    return (
        <div className={className + " 2xl:px-10 xl:px-5 px-5"}>

            <div className="absolute -right-14 bottom-0 w-1/3 -z-10">
                <AdminBg />
            </div>

            {/* Modals */}
            {openICSModal === "open" ? <ICSModal
                clickICSModal={clickICSModal}
            /> : ""}
            <PARModal
                clickPARModal={clickPARModal}
                className={openPARModal === "open" ? "" : "hidden"}
            />

            {/* Contents */}
            <div className="relative flex w-full flex-col 2xl:py-5 xl:py-3 py-3">
                <div className="h-full">
                    <Searchbar className={"w-full mb-5"} />
                    {/* Display pagination */}
                    <ul className="h-5/6 flex flex-col w-full items-center space-y-3 z-30">
                    <li className="min-w-1/2 mx-auto">
                        <div className="card flex w-full 2xl:px-6 xl:px-4 px-4 2xl:py-4 xl:py-3 py-3 gap-6 rounded-lg bg-white border border-[#DDDDDD] dark:border-darkColor-700">
                            <div onClick={() => { clickICSModal("open") }} className="flex flex-row w-full gap-5">
                                <div className="flex flex-none py-1">
                                    <img
                                        src="./img/profile-pic.jpeg"
                                        alt=""
                                        className="rounded-full bg-gray-500 w-12 h-12 object-cover"
                                    />
                                </div>
                                <div className="w-[500px] truncate flex flex-col cursor-pointer">
                                    <div className=" dark:text-white gap-1 items-center">
                                        <h4 className="2xl:text-lg xl:text-base text-base font-semibold 2xl:mb-0 xl:-mb-1 -mb-1">
                                            0
                                        </h4>
                                        <p className="text-sm text-[#434343]">
                                            0
                                        </p>
                                    </div>

                                    <div className="text-xs dark:text-gray-300 2xl:mt-2 mt-1">
                                        <div className="text-xs text-[#888888] dark:text-gray-400 truncate">
                                            "Defect: "0
                                        </div>
                                        <h4 className="text-[#888888]">
                                            "Form: "Many Items/Single Items
                                        </h4>
                                        <h4 className="text-[#888888]">
                                            "Date: " 0
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-fit 2xl:gap-3 xl:gap-2 gap-2 justify-end items-center text-sm">
                                <button
                                    onClick={() => {
                                        clickICSModal('open')
                                    }}
                                    className="2xl:h-9 xl:h-9 h-9 w-24 p-1  rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </li>
                            
                    {/* No data
                    <div className="flex flex-col items-center justify-center gap-6 pt-20">
                        <img src="./img/no_data.png" alt="no data" className="w-96" draggable="false" />
                        <strong className="text-text-gray-2 cursor-default">No request yet</strong>
                    </div>
                    */}
                      
                    </ul>
                    <div className="absolute bottom-10 w-full flex justify-center">
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationButtons"}
                            previousLinkClassName={"previousButtons"}
                            nextLinkClassName={"nextButtons"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                </div>

                {/* hidden unordered list */}
            </div>
        </div>
    );
}
