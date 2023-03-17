import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ICSControl from "../Forms/ICSControl";
import UserList from "../TableList/UserList";

export default function ICSTable({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [Loading, setLoading] = useState(true);
    const [UserLists, setUserLists] = useState();
    const [IcsControl, setIcsControl] = useState();
    const [IcsDetails, setIcsDetails] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [userName, setUserName] = useState();
    const [designation, setDesignation] = useState();

    function passDesignation(index) {
        setDesignation(index);
    }

    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

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

    function clickForms(index) {
        setOpenForms(index);
    }

    function passUserName(index) {
        setUserName(index);
    }

    async function getData(id) {
        try {
            const response = await axios.post("api/getUserIcsControls", {
                id: id,
            });
            const data = response.data;
            setIcsControl(data.ics_controls);
            setIcsDetails(data.ics_details);
            setTotalPrice(data.total_price);
        } catch (e) {
            console.log(e);
        }
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
                    designation={data.designation}
                    passUserName={passUserName}
                    passDesignation={passDesignation}
                    name={data.name}
                    id={data.id}
                    type={"ics-control"}
                    getData={getData}
                    clickForms={clickForms}
                />
            );
        });
    };

    return (
        <div className={className + " w-full h-full relative"}>
            {openForms === "ics-control" ? (
                <ICSControl
                    icsControl={IcsControl ? IcsControl : ""}
                    icsDetails={IcsDetails ? IcsDetails : ""}
                    totalPrice={totalPrice ? totalPrice : ""}
                    designation={designation}
                    userName={userName}
                    clickForms={clickForms}
                    className={""}
                />
            ) : (
                ""
            )}

            <table className="w-full">
                <thead className="">
                    <tr className="text-xs border dark:border-neutral-700 bg-primary bg-opacity-5 text-th dark:bg-darkColor-700 dark:text-white cursor-default">
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
