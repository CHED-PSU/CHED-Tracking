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

    const userMapper = (items) => {
        return items?.map((data) => {
            return (
                <UserList
                    firstname={data.firstname}
                    surname={data.surname}
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

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected);
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
                        <th className="h-10 font-medium text-center">
                            User Status
                        </th>
                        <th className="h-10 w-80 pl-4 font-medium text-left">
                            Email & Mobile No
                        </th>
                        <th className="h-10 font-medium text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*item 1*/}
                    {Loading ? "" : userMapper(UserLists)}
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
                    onPageChange={changePage}
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
