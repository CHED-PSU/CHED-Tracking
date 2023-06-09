import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PARControl from "../Forms/PARControl";
import UserList from "../TableList/UserList";

export default function PARTable({ className, toggleTabs }) {
    const [openForms, setOpenForms] = useState("close");
    const [Loading, setLoading] = useState(true);
    const [parControl, setParControl] = useState();
    const [parDetails, setParDetails] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [UserLists, setUserLists] = useState();
    const [userName, setUserName] = useState();
    const [totalPriceList, setTotalPriceList] = useState();
    const [designation, setDesignation] = useState();

    function passDesignation(index) {
        setDesignation(index);
    }

    function passUserName(index) {
        setUserName(index);
    }

    function clickForms(index) {
        setOpenForms(index);
    }

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("api/getUserListsPAR");
                const data = response.data;
                setUserLists(data.user_lists);
                setTotalPriceList(data.total_price);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        if (toggleTabs == "par") {
            getUsers();
        }
    }, [toggleTabs]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const slicedData = UserLists?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil((UserLists?.length || 0) / itemsPerPage);

    const userMapper = (items, totalPrices) => {
        return items?.map((data) => {
            if (data.role_id != 5) {
                const totalPrice = totalPrices[data.id] || 0; // get the total price for the current user, default to 0 if not found
                return (
                    <UserList
                        key={data.id}
                        firstname={data.firstname}
                        surname={data.surname}
                        img={data.img}
                        middlename={data.middlename}
                        suffix={data.suffix}
                        prefix={data.prefix}
                        passUserName={passUserName}
                        passDesignation={passDesignation}
                        designation={data.designation}
                        name={data.name}
                        getID={getID}
                        id={data.id}
                        totalPrice={totalPrice} // pass the total price as a prop to the UserList component
                        type={"par-control"}
                        getData={getData}
                        clickForms={clickForms}
                    />
                );
            }
        });
    };

    async function getData(id) {
        try {
            const response = await axios.post("api/getUserParControls", {
                id: id,
            });
            const data = response.data;
            setParControl(data.par_controls);
            setParDetails(data.par_details);
            setTotalPrice(data.total_price);
        } catch (e) {
            console.log(e);
        }
    }

    const [getPAR, setPAR] = useState();

    async function getID(id) {
        setLoading(true);
        try {
            const response = await axios.post("api/getUserICS", {
                id: id,
            });
            const data = response.data;
            setPAR(data.ics_details);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const loadingSkeleton = Array.from({ length: 9 }).map((_, index) => (
        <tr
            key={index}
            className="h-18 text-xs border dark:border-neutral-700 bg-white text-th dark:bg-darkColor-800 dark:text-white dark:hover:bg-darkColor-700 cursor-default transition duration-150 ease-in-out"
        >
            {/* name */}
            <td>
                <a className="text-left pl-6 flex items-center w-full h-12 gap-3">
                    <div className="flex flex-none items-center">
                        <span className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="w-36 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                        <span className="w-20 h-3 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* status */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1 items-center w-full">
                        <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="text-center flex items-center w-full h-12 gap-3 pl-4">
                    <div className="flex flex-col items-center w-full justify-center">
                        <span className="w-32 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                    </div>
                </a>
            </td>
            {/* mobile no */}
            <td>
                <div className="flex justify-center items-center w-full h-12 gap-3 cursor-pointer">
                    <span className="w-20 h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></span>
                </div>
            </td>
        </tr>
    ));

    return (
        <div className={className + " w-full h-full relative"}>
            {openForms === "par-control" ? (
                <PARControl
                    parControl={parControl ? parControl : ""}
                    parDetails={parDetails ? parDetails : ""}
                    totalPrice={totalPrice ? totalPrice : ""}
                    designation={designation}
                    Loading={Loading}
                    setLoading={setLoading}
                    userName={userName}
                    clickForms={clickForms}
                />
            ) : (
                ""
            )}

            <table className="w-full">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 w-80 font-medium text-left pl-6">
                            Name
                        </th>
                        <th className="h-10 w-20 pl-4 font-medium text-center">
                            Position
                        </th>
                        <th className="h-10 w-42 font-medium text-center">
                            Issued Items
                        </th>
                        <th className="h-10 font-medium text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*item 1*/}
                    {Loading ? (
                        loadingSkeleton
                    ) : UserLists?.length === 0 ? (
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            {/* checkbox */}
                            <td colSpan={4}>
                                <div className="flex text-sm justify-center item-center">
                                    There is no user yet.
                                </div>
                            </td>
                        </tr>
                    ) : (
                        userMapper(slicedData, totalPriceList)
                    )}
                    {/*item 2*/}
                </tbody>
            </table>

            {Loading ? (
                ""
            ) : UserLists?.length === 0 ? (
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
