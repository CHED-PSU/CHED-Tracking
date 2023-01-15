import React, { useEffect, useState } from "react";

import AdminBg from "../../../components/AdminBg";
import Searchbar from "../Components/Searchbar";
import IndividualItems from "./IndividualItems/IndividualItems";

import ReturnRequest from "./Forms/ReturnRequest";
import { set } from "lodash";
import axios from "axios";

export default function Index({ className }) {

    const [checkedData, setCheckedData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [individualData, setIndividualData] = useState([]);

    const [itemsData, setItemsData] = useState([])
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    const [openForms, setOpenForms] = useState(false);

    useEffect(() => {
        if (itemsData.length === 0) {

            fetch('http://' + url.hostname + ':8000/api/getIndividualItems', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: value.id
            })
                .then(response => response.json())
                .then((data) => {
                    setItemsData(data.data)
                })
        }

        setFilteredItemsData(itemsData)
    }, [itemsData])


    const closeFormHandler = () => {
        setOpenForms(!openForms)
        fetch('http://' + url.hostname + ':8000/api/getIndividualItems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: value.id
        })
            .then(response => response.json())
            .then((data) => {
                setItemsData(data.data)
            })
    }

    const openFormHandler = (e) => {

       

        fetch('http://' + url.hostname + ':8000/api/getIndividualItemReturn', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: e.target.value
            })
                .then(response => response.json())
                .then((data) => {
                    setIndividualData(data.data)
                    setOpenForms(!openForms)
                })


    }

    const checkHandler = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setCheckedData([...checkedData, value])
        }
        else {
            setCheckedData(checkedData.filter((e) => e !== value))
        }
    }

    const selectAllHandler = () => {
        if (selectAll) {
            setSelectAll(false)
        } else {
            setSelectAll(true)
        }
    }






    const renderItems = (itemsData) => {
        return itemsData.map(data => {

            return <IndividualItems checkHandler={checkHandler} openFormHandler={openFormHandler} article={data.article} description={data.description} date={data.created_at} value={data.id} key={data.id} />
        })
    }


    const search = (value) => {
        setSearchTerm(value)

        if (searchTerm !== '') {
            const filterData = itemsData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
            })

            setFilteredItemsData(filterData)
        } else {
            setFilteredItemsData(itemsData)
        }
    }

    return (
        <div
            className={
                className +
                "  flex-col 2xl:px-10 xl:px-5 px-5 2xl:py-5 xl:py-3 py-3 items-center"
            }
        >
            {openForms ? <ReturnRequest
                data={individualData}
                openFormHandler={openFormHandler}
                closeFormHandler={closeFormHandler}
            /> : ""}
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="w-[80%] space-y-5 z-20">
                <div className="flex justify-between w-full">
                    <button onClick={selectAllHandler} className="h-10 text-sm font-medium text-black w-fit px-5 flex items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full">
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                    <div className="flex gap-4">
                        <Searchbar setSearchTerm={setSearchTerm} search={search} className="h-10" />
                        <button className="h-10 text-sm font-medium text-black w-fit px-4 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full">
                            <i className="fa-solid fa-box-archive text-base"></i>
                            Return
                        </button>
                    </div>
                </div>
                <div className="">
                    <table className="w-full border-separate border-spacing-y-3">
                        <thead className="text-xs text-th dark:text-white cursor-default">
                            <tr className="">
                                <th className="w-24"></th>
                                <th className="font-medium text-left">
                                    Item Name
                                </th>
                                <th className="font-medium text-left">
                                    Description
                                </th>
                                <th className="font-medium text-left">Date</th>
                                <th className="w-58"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* no data */}

                            {/* no data */}

                            {itemsData != undefined ? renderItems(Object.values(filteredItemsData)) : <tr className="bg-[#F5F5F5]">
                                <td colSpan="5" className="h-12 text-center rounded-full">
                                    No data available in table
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
