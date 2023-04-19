import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SortedModal from "../Modals/Sorted";
import SingleModal from "../Modals/Single";
import MultiModal from "../Modals/Multi";
import Transfer from "../Modals/Transfer";
import Alert from "../Alerts/Alert";
import axios from "axios";

export default function Inventory({ className }) {
    const [openSortedModal, setOpenSortedModal] = useState("close");
    const [openSingleModal, setOpenSingleModal] = useState("close");
    const [openMultiModal, setOpenMultiModal] = useState("close");
    const [items, setItems] = useState();
    const [checkBoxItems, setCheckBoxItems] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [personSelected, setPersonSelected] = useState(1);
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

    const getInventorySorted = async () => {
        try {
            await axios
                .post("api/getInventorySorted", { id: personSelected })
                .then((res) => {
                    setItems(res.data.inventory_items);
                    setUsers(res.data.users);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getInventoryItems();
    }, []);

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

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const slicedData = items?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const loadingSkeleton = Array.from({ length: 9 }).map((_, index) => (
        <tr
            key={index}
            className="h-18 text-xs border dark:border-neutral-700 bg-white text-th dark:bg-darkColor-800 dark:text-white hover:bg-primary hover:bg-opacity-5 dark:hover:bg-darkColor-700 cursor-default transition duration-150 ease-in-out"
        >
            {/* name */}
            <td></td>
            {/* status */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1  w-full">
                        <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col w-full justify-center">
                        <span className="w-32 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* mobile no */}
            <td>
                <div className="flex pl-4 items-center w-full h-12 gap-3 cursor-pointer">
                    <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                </div>
            </td>
            {/* mobile no */}
            <td>
                <div className="flex justify-center items-center w-full h-12 gap-3 cursor-pointer">
                    <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                </div>
            </td>
        </tr>
    ));

    const pageCount = Math.ceil((items?.length || 0) / itemsPerPage);

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
                                type="checkbox"
                                className="u_items"
                                value={data.uri_id + "|" + data.tracking_id}
                                onChange={handleSelectItem}
                            />
                        </div>
                    </td>
                    {/* items */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[17px] font-medium text-text-black">
                                    {data.article}
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
                                    {data.description}
                                </h5>
                                <p className="text-[#878787] text-[14px]">
                                    {data.tracking_id.split("-")[0]} Code: {data.tracking_id}
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
                                    unselect(),
                                        clickModalSingle(toggleSort),
                                        handleSelectSingleItem(data.uri_id);
                                }}
                                value={data.uri_id}
                                className="text-sm font-medium btn-color-4 text-white w-fit px-5 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white rounded-full"
                            >
                                {toggleSort === "all" ? "Transfer" : "Return"}
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [allowed, setAllowed] = useState(true);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [checkboxIds, setCheckboxIds] = useState([]);
    const [selectSingleIds, setSelectSingleIds] = useState([]);
    const [selectedMultipleIds, setSelectedMultipleIds] = useState([]);
    const [selectedMultipleTrackIds, setSelectedMultipleTrackIds] = useState(
        []
    );
    const selectedIds =
        selectSingleIds != "" ? selectSingleIds : selectedMultipleIds;

    useEffect(() => {
        if (checkboxIds.length > 0) {
            const ids = [];
            const trackIds = [];
            checkboxIds.forEach((item) => {
                const [id, trackId] = item.split("|");
                const code = trackId.split("-")[0];
                ids.push(parseInt(id));
                trackIds.push(code);
            });
            setSelectedMultipleIds(ids);
            setSelectedMultipleTrackIds(trackIds);
        }
    }, [checkboxIds]);

    function clickModalSingle(index) {
        if (index === "sorted") {
            setOpenSortedModal("open-sorted");
        } else if (index === "all") {
            setOpenMultiModal("open-transfer");
        } else if (index === "close") {
            setOpenMultiModal(index);
        }
    }

    function clickSortedModal(index) {
        if (index === "open-sorted") {
            if (checkboxIds?.length !== 0) {
                setSelectSingleIds([]);
                setOpenSortedModal(index);
            } else {
                setOpenAlert(true);
                setAlertIcon("exclamation");
                setAlertHeader("No selected items.");
                setAlertDesc("Please select an item on the checkbox.");
                setAlertNoButton("Okay");
            }
        }

        if (index === "close") {
            setOpenSortedModal(index);
        }
    }

    function clickMultiModal(index) {
        if (index === "open-multi") {
            if (checkboxIds?.length !== 0) {
                setSelectSingleIds([]);
                setOpenMultiModal(index);
            } else {
                setOpenAlert(true);
                setAlertIcon("exclamation");
                setAlertHeader("No selected items.");
                setAlertDesc("Please select an item on the checkbox.");
                setAlertNoButton("Okay");
            }
        } else if (index === "open-transfer") {
            if (checkboxIds?.length !== 0) {
                if (checkboxIds?.length > 1) {
                    if (allowed) {
                        setSelectSingleIds([]);
                        setOpenMultiModal(index);
                    } else {
                        setOpenAlert(true);
                        setAlertIcon("exclamation");
                        setAlertHeader("Transfer restrictions.");
                        setAlertDesc("PAR Items must transfer individually.");
                        setAlertNoButton("Okay");
                    }
                } else {
                    setSelectSingleIds([]);
                    setOpenMultiModal(index);
                }
            } else {
                setOpenAlert(true);
                setAlertIcon("exclamation");
                setAlertHeader("No selected items.");
                setAlertDesc("Please select an item on the checkbox.");
                setAlertNoButton("Okay");
            }
        } else if (index === "close") {
            setOpenMultiModal(index);
        }
    }

    function clickAlert() {
        setOpenAlert(false);
    }

    function clickSingleModal(index) {
        setOpenSingleModal(index);
    }

    const unselect = () => {
        setCheckboxIds([]);
        const checkbox = document.querySelector("#select-all");
        checkbox.checked = false;
        const checkboxes = document.querySelectorAll(".u_items");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    //Select Only One
    const handleSelectSingleItem = (itemId) => {
        setSelectedMultipleTrackIds([]);
        setSelectSingleIds([itemId]);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Get all the checkboxes and their values
            const checkboxes = document.querySelectorAll(".u_items");
            const ids = [];
            checkboxes.forEach((checkbox) => {
                ids.push(checkbox.value);
                checkbox.checked = true;
            });
            setCheckboxIds(ids);
        } else {
            // Clear the selected IDs array and uncheck all the checkboxes
            setCheckboxIds([]);
            const checkboxes = document.querySelectorAll(".u_items");
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }

        // Update the individual checkboxes' state
        const individualCheckboxes = document.querySelectorAll(".u_items");
        individualCheckboxes.forEach((checkbox) => {
            checkbox.checked = event.target.checked;
        });

        setSelectSingleIds([]);
    };

    const handleSelectItem = (event) => {
        const itemId = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            // Add the selected item ID to the array
            setCheckboxIds([...checkboxIds, itemId]);
        } else {
            // Remove the selected item ID from the array
            setCheckboxIds(checkboxIds.filter((id) => id !== itemId));
        }

        // Check if all checkboxes are checked or not
        const checkboxes = document.querySelectorAll(".u_items");
        const allChecked = Array.from(checkboxes).every(
            (checkbox) => checkbox.checked
        );
        const selectAllCheckbox = document.querySelector("#select-all");

        // Update the select all checkbox accordingly
        if (allChecked) {
            selectAllCheckbox.checked = true;
        } else {
            selectAllCheckbox.checked = false;
        }

        setSelectSingleIds([]);
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("select-all");
        selectAllCheckbox.addEventListener("change", handleSelectAll);
    }, []);

    function parTransfer(code) {
        if (code.length > 1) {
            const hasPAR = code.includes("PAR");
            if (hasPAR == false) {
                setAllowed(true);
            }
        } else {
            setAllowed(false);
        }
    }

    useEffect(() => {
        parTransfer(selectedMultipleTrackIds);
    }, [selectedMultipleTrackIds]);

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

    return (
        <>
            {openSortedModal === "open-sorted" ? (
                <SortedModal
                    clickSortedModal={clickSortedModal}
                    selectedId={selectedIds}
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
                    selectedId={selectedIds}
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
                    selectedId={selectedIds}
                    unselect={unselect}
                />
            ) : (
                ""
            )}
            {openMultiModal === "open-transfer" ? (
                <Transfer
                    clickMultiModal={clickMultiModal}
                    getInventoryItems={getInventoryItems}
                    selectedId={selectedIds}
                    unselect={unselect}
                />
            ) : (
                ""
            )}
            {openAlert ? (
                <Alert
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertNoButton={alertNoButton}
                    clickAlert={clickAlert}
                    className={""}
                />
            ) : (
                ""
            )}
            <div className="w-full h-full relative">
                <div className="w-full flex items-center justify-between h-16">
                    <div className="flex justify-between items-center h-16">
                        <ul className="flex">
                            <li
                                onClick={() => {
                                    clickSort("all"), unselect();
                                }}
                                className={
                                    toggleSort === "all"
                                        ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                        : "text-[#707070] hover:text-[#4b4b4b]"
                                }
                            >
                                <div className="text-xs font-semibold cursor-pointer p-3 ">
                                    Transfer / Renew
                                </div>
                            </li>
                            <li
                                onClick={() => {
                                    clickSort("sorted"), unselect();
                                }}
                                className={
                                    toggleSort === "sorted"
                                        ? "text-pink-500 font-medium bg-pink-50 rounded-md"
                                        : "text-[#707070] hover:text-[#4b4b4b]"
                                }
                            >
                                <div className="text-xs font-semibold cursor-pointer p-3  ">
                                    {"Return (Previous Owner)"}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {toggleSort === "sorted" ? (
                        <>
                            <div className="">
                                <select
                                    onChange={changeUser}
                                    value={personSelected ? personSelected : ""}
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
                                                      {displayName(data, false)}
                                                  </option>
                                              );
                                          })}
                                </select>
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    <div className="w-56 flex justify-end gap-3">
                        <button
                            onClick={() => {
                                toggleSort === "all"
                                    ? clickMultiModal("open-transfer")
                                    : clickSortedModal("open-sorted");
                            }}
                            className="text-sm font-medium text-black w-fit px-4 py-2 flex gap-2 items-center cursor-pointer btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600 rounded-full"
                        >
                            <i className="fa-solid fa-box-archive text-sm"></i>
                            {toggleSort === "all" ? "Transfer" : "Return"}
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
                                        className=""
                                        id="select-all"
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
                        {loading ? (
                            loadingSkeleton
                        ) : items?.length === 0 ? (
                            <tr className="h-18 text-xs border dark:border-neutral-700 text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td colSpan={5}>
                                    <div className="flex text-sm justify-center item-center">
                                        There is no data yet.
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            itemMapper(slicedData)
                        )}
                    </tbody>
                </table>
                {loading ? (
                    ""
                ) : items?.length === 0 ? (
                    ""
                ) : (
                    <div className="absolute bottom-1 2xl:text-base xl:text-sm text-sm dark:text-neutral-200 w-full flex justify-center">
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"paginationButtons"}
                            previousLinkClassName={"previousButtons"}
                            nextLinkClassName={"nextButtons"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
