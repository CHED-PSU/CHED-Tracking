import React, { useState, useEffect } from "react";
import AdminBg from "../../../Components/AdminBg";
import ReactPaginate from "react-paginate";
import Searchbar from "../Components/Searchbar";
import SortedModal from "./Modals/Sorted";
import SingleModal from "./Modals/Single";
import MultiModal from "./Modals/Multi";
import axios from "axios";
30;

export default function Inventory({ className }) {
    const [openSortedModal, setOpenSortedModal] = useState("close");
    const [openSingleModal, setOpenSingleModal] = useState("close");
    const [openMultiModal, setOpenMultiModal] = useState("close");
    const [items, setItems] = useState();
    const [checkBoxItems, setCheckBoxItems] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [personSelected, setPersonSelected] = useState(1);

    const [selectedId, setSelectedId] = useState([]);
    const [id, setId] = useState();
    const [userId, setUserId] = useState();
    const getInventoryItems = async () => {
        setLoading(true);
        try {
            await axios.get("api/getItemsofInventories").then((res) => {
                setItems(res.data.inventory_items);
                setCheckBoxItems(res.data.inventory_items);
                setUsers(res.data.users);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCheckBox = (e) => {
        checkBoxItems.map((item) => {
            if (item.uri_id == e.target.value) {
                if (e.target.checked === true) {
                    const value = e.target.value;
                    const newArray = [...selectedId, value];
                    setSelectedId(newArray);
                } else {
                    const originalArray = [...selectedId];
                    const index = originalArray.indexOf(e.target.value);
                    originalArray.splice(index, 1);
                    setSelectedId(originalArray);
                }
            }
        });
    };

    const getInventorySorted = async () => {
        setLoading(true);
        try {
            await axios
                .post("api/getInventorySorted", { id: personSelected })
                .then((res) => {
                    setItems(res.data.inventory_items);
                    setUsers(res.data.users);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInventoryItems();
    }, []);

    const [pageNumber, setPageNumber] = useState();
    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [toggleSort, setToggleSort] = useState("all");

    useEffect(() => {
        if (toggleSort === "all") {
            setPersonSelected(1);
        }
    }, [toggleSort]);

    function clickSort(index) {
        if (index === "all") {
            getInventoryItems();
            setToggleSort(index);
        } else if (index === "sorted") {
            getInventorySorted();
            setToggleSort(index);
        }
    }

    function clickSortedModal(index) {
        if (index === "open-sorted") {
            if (selectedId?.length !== 0) {
                setOpenSortedModal(index);
            } else {
                alert("select items");
            }
        }

        if (index === "close") {
            setOpenSortedModal(index);
        }
    }

    function clickSingleModal(index) {
        setOpenSingleModal(index);
    }

    function clickMultiModal(index) {
        if (index === "open-multi") {
            if (selectedId?.length !== 0) {
                setOpenMultiModal(index);
            } else {
                alert("select items");
            }
        }

        if (index === "close") {
            setOpenMultiModal(index);
        }
    }

    const unselect = () => {
        setSelectedId([]);
        const checkbox = document.querySelector(".select_all");
        checkbox.checked = false;
        const checkboxes = document.querySelectorAll(".i_items");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Get all the checkboxes and their values
            const checkboxes = document.querySelectorAll(".i_items");
            const ids = [];
            checkboxes.forEach((checkbox) => {
                ids.push(parseInt(checkbox.value));
                checkbox.checked = true;
            });
            setSelectedId(ids);
        } else {
            // Clear the selected IDs array and uncheck all the checkboxes
            setSelectedId([]);
            const checkboxes = document.querySelectorAll(".i_items");
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }

        // Update the individual checkboxes' state
        const individualCheckboxes = document.querySelectorAll(".i_items");
        individualCheckboxes.forEach((checkbox) => {
            checkbox.checked = event.target.checked;
        });
    };

    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    const itemMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr
                    key={data.uri_id}
                    className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default"
                >
                    {/* checkbox */}
                    <td>
                        <div className="flex justify-center item-center">
                            <input
                                onClick={handleChangeCheckBox}
                                type="checkbox"
                                className="i_items"
                                value={data.uri_id}
                            />
                        </div>
                    </td>
                    {/* items */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[17px] font-medium text-text-black">
                                    {generateArticle(data.article, true)}
                                </h4>
                                <p className="text-[#878787] text-[14px]">
                                    Previous owner: {displayName(data, true)}
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* description */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-col gap-1">
                                <h5 className="text-[14px] font-medium text-text-black w-72 truncate">
                                    {generateArticle(data.article, false)}
                                </h5>
                                <p className="text-[#878787] text-[14px]">
                                    Item Code: {data.code}
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* date */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3 pl-3 pr-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] text-[14px]">
                                    {formatDateDisplay(data.created_at)}
                                </p>
                            </div>
                        </a>
                    </td>
                    <td>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={() => {
                                    setOpenSingleModal("open-single"),
                                        setPersonSelected(data.id),
                                        setSelectedId(data.uri_id);
                                }}
                                value={data.uri_id}
                                className="text-sm font-medium btn-color-4 text-white w-fit px-5 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white rounded-full"
                            >
                                Return
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const changeUser = (e) => {
        setPersonSelected(e.target.value);
        try {
            axios
                .post("api/getInventorySorted", { id: e.target.value })
                .then((res) => {
                    setItems(res.data.inventory_items);
                    setUsers(res.data.users);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    function generateArticle(data, isArticle) {
        const firstCommaIndex = data.indexOf(",");
        let article, description;

        if (firstCommaIndex === -1) {
            // No comma found
            if (isArticle == true) {
                return data;
            } else {
                return "";
            }
        } else {
            // Comma found
            article = data.substring(0, firstCommaIndex);
            description = data.substring(firstCommaIndex + 1) ?? "";

            if (isArticle == true) {
                return article;
            } else {
                return description;
            }
        }
    }

    return (
        <div className={className + " flex justify-center relative"}>
            {openSortedModal === "open-sorted" ? (
                <SortedModal
                    clickSortedModal={clickSortedModal}
                    selectedId={selectedId}
                    personSelected={personSelected}
                    users={users}
                    getInventorySorted={getInventorySorted}
                />
            ) : (
                ""
            )}

            {openSingleModal === "open-single" ? (
                <SingleModal
                    clickSingleModal={clickSingleModal}
                    functionReloader={
                        toggleSort === "sorted"
                            ? getInventorySorted
                            : getInventoryItems
                    }
                    selectedId={selectedId ? selectedId : ""}
                    personSelected={personSelected}
                    users={users}
                />
            ) : (
                ""
            )}

            {openMultiModal === "open-multi" ? (
                <MultiModal
                    clickMultiModal={clickMultiModal}
                    getInventoryItems={getInventoryItems}
                    selectedId={selectedId}
                    unselect={unselect}
                />
            ) : (
                ""
            )}

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
                                    {toggleSort === "all" ? (
                                        <div
                                            onClick={() => clickSort("all")}
                                            className="w-[80px] py-2 bg-pink-500 text-white text-center rounded-full cursor-pointer"
                                        >
                                            All
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => clickSort("all")}
                                            className="w-[80px] py-2 rounded-full text-center cursor-pointer"
                                        >
                                            All
                                        </div>
                                    )}
                                    {toggleSort === "sorted" ? (
                                        <div
                                            onClick={() => clickSort("sorted")}
                                            className="w-[80px] py-2 bg-pink-500 text-white text-center rounded-full cursor-pointer"
                                        >
                                            Sorted
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => clickSort("sorted")}
                                            className="w-[80px] py-2 rounded-full text-center cursor-pointer"
                                        >
                                            Sorted
                                        </div>
                                    )}
                                </div>
                            </div>

                            {toggleSort === "sorted" ? (
                                <>
                                    <div className="">
                                        <select
                                            onChange={changeUser}
                                            value={
                                                personSelected
                                                    ? personSelected
                                                    : ""
                                            }
                                            name=""
                                            id=""
                                            className=" w-80 rounded-md text-sm border border-neutral-300 px-3 py-1 outline-none"
                                        >
                                            <option id="1" value="1">
                                                Jermine R. Basister
                                            </option>

                                            {loading
                                                ? ""
                                                : users.map((data) => {
                                                      return (
                                                          <option
                                                              key={data.id}
                                                              value={data.id}
                                                          >
                                                              {displayName(
                                                                  data,
                                                                  false
                                                              )}
                                                          </option>
                                                      );
                                                  })}
                                        </select>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            <div className="w-56 flex justify-end">
                                <button
                                    onClick={() => {
                                        toggleSort === "all"
                                            ? clickMultiModal("open-multi")
                                            : clickSortedModal("open-sorted");
                                    }}
                                    className="text-sm font-medium text-black w-fit px-4 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                                >
                                    <i className="fa-solid fa-box-archive text-sm"></i>
                                    {toggleSort === "all"
                                        ? "Assign"
                                        : "Return/Renew"}
                                </button>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    <th className="h-10 w-16 font-medium text-left pl-6">
                                        <div className="flex item-center">
                                            <input
                                                type="checkbox"
                                                className="select_all"
                                                onChange={handleSelectAll}
                                            />
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
                                {loading ? "" : itemMapper(items)}
                                {items?.length === 0 ? (
                                    <>
                                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                            {/* checkbox */}
                                            <td colSpan={5}>
                                                <div className="flex text-sm justify-center item-center">
                                                    There is no data yet.
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    ""
                                )}
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
