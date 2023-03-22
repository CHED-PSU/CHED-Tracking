import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DisposeModal from "../Modals/Dispose";
import DonationForm from "../Forms/DonationFormPre";
import DestructionSalesForm from "../Forms/DestructionFormPre";

export default function ItemTab({ className }) {
    const [Loading, setLoading] = useState(true);
    const [UnserviceableItems, setUnserviceableItems] = useState();
    const [openDisposeModal, setOpenDisposeModal] = useState("close");

    const [openDonationForm, setOpenDonationForm] = useState(false);
    const [openDestructionSalesForm, setOpenDestructionSalesForm] =
        useState(false);

    //Storage for IDs that is selected
    const [selectedIds, setSelectedIds] = useState([]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Get all the checkboxes and their values
            const checkboxes = document.querySelectorAll(".u_items");
            const ids = [];
            checkboxes.forEach((checkbox) => {
                ids.push(parseInt(checkbox.value));
                checkbox.checked = true;
            });
            setSelectedIds(ids);
        } else {
            // Clear the selected IDs array and uncheck all the checkboxes
            setSelectedIds([]);
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
    };

    const handleSelectItem = (event) => {
        const itemId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        if (isChecked) {
            // Add the selected item ID to the array
            setSelectedIds([...selectedIds, itemId]);
        } else {
            // Remove the selected item ID from the array
            setSelectedIds(selectedIds.filter((id) => id !== itemId));
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
    };

    useEffect(() => {
        const selectAllCheckbox = document.getElementById("select-all");
        selectAllCheckbox.addEventListener("change", handleSelectAll);
    }, []);

    function clickDisposeModal(index) {
        setOpenDisposeModal(index);
    }

    const getUnserviceableItems = async () => {
        setLoading(true);
        try {
            axios.get("api/getUnserviceableItems").then((res) => {
                setUnserviceableItems(res.data.unserviceableItems);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUnserviceableItems();
    }, []);

    const onSave = () => {
        const checkbox = document.querySelector(".u_items");
        const selected = checkbox.map((checkbox) => {});
    };

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

    const itemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr
                    key={data.id}
                    className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default"
                >
                    {/* checkbox */}
                    <td>
                        <div className="flex justify-center item-center">
                            <input
                                type="checkbox"
                                className="u_items"
                                value={data.id}
                                onChange={handleSelectItem}
                            />
                        </div>
                    </td>
                    {/* items */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3">
                            <div className="flex flex-col pr-2 gap-1">
                                <h4 className="text-[15px] font-medium text-text-black">
                                    {generateArticle(data.description, true)}
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
                                    {generateArticle(data.description, false)}
                                </h5>
                                <p className="text-[#878787] text-[14px]">
                                    Item Code: {data.code}
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* remarks */}
                    <td>
                        <a className="text-left flex items-center w-full h-12 gap-3 pr-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] text-[14px]">
                                    {data.remarks}
                                </p>
                            </div>
                        </a>
                    </td>
                    <td>
                        <div className="w-full flex justify-end pr-6">
                            <button
                                className="flex justify-center items-center w-10 h-10 p-2 text-[16px] text-text-black rounded-full default-btn"
                                onClick={() =>
                                    clickDisposeModal("open", data.uri_id)
                                }
                            >
                                <i className="fa-solid fa-file-export"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const confirmHandler = (index) => {
        if (index === "Donation") {
            setOpenDonationForm(true);
            clickDisposeModal("close");
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const slicedData = UnserviceableItems?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil(
        (UnserviceableItems?.length || 0) / itemsPerPage
    );

    return (
        <div className={className + " w-full h-full relative"}>
            {openDisposeModal === "open" ? (
                <DisposeModal
                    clickDisposeModal={clickDisposeModal}
                    selectedIds={selectedIds}
                    confirmHandler={confirmHandler}
                    className={""}
                />
            ) : (
                ""
            )}

            {openDonationForm ? (
                <DonationForm
                    selectedIds={selectedIds}
                    setOpenDonationForm={setOpenDonationForm}
                />
            ) : (
                ""
            )}
            {openDestructionSalesForm ? <DestructionSalesForm /> : ""}

            <div className="w-full flex justify-end  items-center h-16">
                <button
                    className="flex justify-center items-center gap-1 w-8 h-8 p-4 text-[14px] text-text-black rounded-full default-btn"
                    onClick={() => clickDisposeModal("open")}
                >
                    <i className="fa-solid fa-file-export"></i>
                </button>
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
                        <th className="h-10 w-72 font-medium text-left">
                            Items
                        </th>
                        <th className="h-10 w-64 font-medium text-left">
                            Description
                        </th>
                        <th className="h-10 w-80 font-medium text-left">
                            Remarks
                        </th>
                        <th className="h-10 font-medium text-right pr-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*item*/}
                    {Loading ? (
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <td
                                colSpan="5"
                                className="text-center h-12 bg-white border"
                            >
                                <small className="text-sm">Loading data.</small>
                            </td>
                        </tr>
                    ) : UnserviceableItems?.length === 0 ? (
                            <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                <td
                                    colSpan="5"
                                    className="text-center items-center w-full h-12"
                                >
                                    <small className="text-sm">
                                        No data available in table.
                                    </small>
                                </td>
                            </tr>
                    ) : (
                        itemsMapper(slicedData)
                    )}
                </tbody>
            </table>

            {Loading ? (
                ""
            ) : UnserviceableItems?.length === 0 ? (
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
    );
}
