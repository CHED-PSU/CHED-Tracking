import React, { useState, useEffect } from "react";
import AdminBg from "../../../Components/AdminBg";
import ReactPaginate from "react-paginate";
import Searchbar from "../Components/Searchbar";
import axios from "axios";
30;

export default function Inventory({ className }) {

    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        const getInventoryItems = async () => {
            setLoading(true)
            try{
                await axios.get('api/getItemsofInventories').then(res => {
                    setItems(res.data.inventory_items)
                })
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
        }
        getInventoryItems()
    },[])

    const [pageNumber, setPageNumber] = useState();
    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    const [toggleSort, setToggleSort] = useState('all')

    function clickSort(index) {
        setToggleSort(index);
    }

    return (
        <div className={className + " flex justify-center relative"}>
            <div className="absolute -right-14 bottom-0 w-1/3">
                <AdminBg />
            </div>
            <div className="z-20 pt-[14px] flex flex-col items-center 2xl:px-10 xl:px-5 px-5">
                <div className="pb-3 h-14 items-center w-full">
                    <div className="">
                        <Searchbar />
                    </div>
                </div>
                <div className="flex flex-col h-full w-[1100px] items-center mb-12 pb-2 pt-0 px-4 border rounded-lg bg-white">
                    <div className="w-full h-full relative">
                        <div className="w-full flex items-center justify-between h-16">

                            <div className="w-56">
                                <div className="w-fit h-fit flex items-center text-xs rounded-full bg-gray-100 -space-x-2">
                                    {toggleSort === "all" ? <div onClick={() => clickSort("all")} className="w-[80px] py-2 bg-pink-500 text-white text-center rounded-full cursor-pointer">All</div> : <div onClick={() => clickSort("all")} className="w-[80px] py-2 rounded-full text-center cursor-pointer">All</div>}
                                    {toggleSort === "sorted" ? <div onClick={() => clickSort("sorted")} className="w-[80px] py-2 bg-pink-500 text-white text-center rounded-full cursor-pointer">Sorted</div> : <div onClick={() => clickSort("sorted")} className="w-[80px] py-2 rounded-full text-center cursor-pointer">Sorted</div>}
                                </div>
                            </div>

                            {toggleSort === "sorted" ? <>
                            <div className="">
                                <select name="" id="" className=" w-80 rounded-md text-sm border border-neutral-300 px-3 py-1 outline-none">
                                    <option id="1" value="">Jermine Basister</option>
                                    <option id="def1" value="">Opt 1</option>
                                    <option id="def2" value="">Opt 2</option>
                                </select>
                            </div>
                            </> : ''}

                            <div className="w-56 flex justify-end">
                                <button className="text-sm font-medium text-black w-fit px-4 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full">
                                    <i className="fa-solid fa-box-archive text-sm"></i>
                                    Return
                                </button>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    <th className="h-10 w-16 font-medium text-left pl-6">
                                        <div className="flex item-center">
                                            <input type="checkbox" className="" />
                                        </div>
                                    </th>
                                    <th className="h-10 w-64 font-medium text-left">
                                        Items
                                    </th>
                                    <th className="h-10 font-medium text-left">
                                        Description
                                    </th>
                                    <th className="h-10 w-48 font-medium pl-3 text-left">
                                        Date
                                    </th>
                                    <th className="h-10 w-44 font-medium text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    {/* checkbox */}
                                    <td>
                                        <div className="flex justify-center item-center">
                                            <input type="checkbox" className="u_items" value='' />
                                        </div>
                                    </td>
                                    {/* items */}
                                    <td>
                                        <a className="text-left flex items-center w-full h-12 gap-3">
                                            <div className="flex flex-col gap-1">
                                                <h4 className="text-[17px] font-medium text-text-black">
                                                    default
                                                </h4>
                                                <p className="text-[#878787] text-[14px]">
                                                    Previous owner: default
                                                </p>

                                            </div>
                                        </a>
                                    </td>
                                    {/* description */}
                                    <td>
                                        <a className="text-left flex items-center w-full h-12 gap-3">
                                            <div className="flex flex-col gap-1">
                                                <h5 className="text-[14px] font-medium text-text-black w-72 truncate">
                                                    default
                                                </h5>
                                                <p className="text-[#878787] text-[14px]">
                                                    Date Accepted: default
                                                </p>
                                            </div>
                                        </a>
                                    </td>
                                    {/* date */}
                                    <td>
                                        <a className="text-left flex items-center w-full h-12 gap-3 pl-3 pr-2">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[#878787] text-[14px]">
                                                    January 5, 2021
                                                </p>
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        <div className="w-full flex justify-center">
                                            <button className="text-sm font-medium btn-color-4 text-white w-fit px-5 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white rounded-full">
                                                Return
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="absolute bottom-1 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
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
                </div>
            </div>
        </div>
    );
}
