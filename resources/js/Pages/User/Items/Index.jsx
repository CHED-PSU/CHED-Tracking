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
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false)
    const [valueId, setValueId] = useState();

    const [itemsData, setItemsData] = useState([])
    const [checkboxData, setCheckBoxData] = useState([])
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);


    useEffect(() => {
        const getIndividualItems = async () => {
            setLoading(true)
            try {
                await axios.post('api/getuserIndividualItems', {
                    user_id: value.id
                }).then(res => {
                    setItemsData(res.data.itemsData)
                    setFilteredItemsData(res.data.itemsData)
                    setCheckBoxData(res.data.itemsData)
                })
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        getIndividualItems()
    }, [])



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

            let date = new Date(data.created_at)
            let date_text = date.toString()
            return (
                <tr className="bg-[#F5F5F5]">
                    <td className="text-center rounded-tableRow">
                        <input
                            type="checkbox"
                            className="h-4 w-4"
                            check={data.check}
                            value={data.ui_id}
                            onClick={handleChangeCheckBox}
                        />
                    </td>
                    <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                        {data.quantity}
                    </td>
                    <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                        {data.code}
                    </td>
                    <td className="text-sm">{data.description}</td>
                    <td className="text-sm">{data.date}</td>
                    <td className="text-center py-3 rounded-tableRow">
                        <button value={data.ui_id}
                            onClick={openFormHandler}
                            className="h-9 w-24 text-sm rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-medium">
                            Return
                        </button>
                    </td>

                </tr>
            )
        })
    }

    const handleChangeCheckBox = (e) => {
        setCheckBoxData(prev => {
            
            return prev.map(item=>{
                
                if(item.ui_id == e.target.value){
                    return {...item, check: !item.check}
                }else{
                    return {...item}
                }
            })
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

    //for Form functions

    const openFormHandler = (e) => {
        setValueId(e.target.value)
        setOpenForm(!openForm);
    }

    return (
        <div
            className={
                className +
                "  flex-col 2xl:px-10 xl:px-5 px-5 2xl:py-5 xl:py-3 py-3 items-center"
            }
        >

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
                                <th className="font-medium text-left w-24">
                                    Quantity
                                </th>
                                <th className="font-medium text-left">
                                    Item Code
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
            {openForm ? <ReturnRequest openFormHandler={openFormHandler} valueId={valueId ? valueId : ''} /> : ""}
        </div>
    );
}
