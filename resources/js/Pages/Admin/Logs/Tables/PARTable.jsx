import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PARControl from "../Forms/PARControl";
import UserList from "../TableList/UserList";

export default function PARTable({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [Loading, setLoading] = useState(true);
    const [parControl, setParControl] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [UserLists, setUserLists] = useState();
    const [userName, setUserName] = useState();
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
                const response = await axios.get("api/getUserLists");
                const data = response.data;
                setUserLists(data.user_lists);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

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

    const userMapper = (items) => {
        return items?.map((data) => {
            return (
                <UserList
                    key={data.id}
                    firstname={data.firstname}
                    surname={data.surname}
                    middlename={data.middlename}
                    suffix={data.suffix}
                    prefix={data.prefix}
                    passUserName={passUserName}
                    passDesignation={passDesignation}
                    designation={data.designation}
                    name={data.name}
                    id={data.id}
                    type={"par-control"}
                    getData={getData}
                    clickForms={clickForms}
                />
            );
        });
    };

    async function getData(id) {
        try {
            const response = await axios.post("api/getUserParControls", {
                id: id,
            });
            const data = response.data;
            setParControl(data.ics_controls);
            setTotalPrice(data.total_price);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={className + " w-full h-full relative"}>
            {openForms === "par-control" ? (
                <PARControl
                    parControl={parControl ? parControl : ""}
                    totalPrice={totalPrice ? totalPrice : ""}
                    designation={designation}
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
                        <th className="h-10 w-42 font-medium text-center">
                            User Status
                        </th>
                        <th className="h-10 w-20 pl-4 font-medium text-center">
                            Position
                        </th>
                        <th className="h-10 font-medium text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*item 1*/}
                    {Loading ? (
                        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                            <td
                                colSpan="100"
                                className="text-center h-12 bg-white border"
                            >
                                <small className="text-sm">Loading data.</small>
                            </td>
                        </tr>
                    ) : (
                        userMapper(slicedData)
                    )}
                    {UserLists?.length === 0 ? (
                        <>
                            <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                {/* checkbox */}
                                <td colSpan={4}>
                                    <div className="flex text-sm justify-center item-center">
                                        There is no user yet.
                                    </div>
                                </td>
                            </tr>
                        </>
                    ) : (
                        ""
                    )}
                    {/*item 2*/}
                </tbody>
            </table>

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
        </div>
    );
}
