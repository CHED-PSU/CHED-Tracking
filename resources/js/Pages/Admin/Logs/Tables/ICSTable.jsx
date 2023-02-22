import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ICSControl from "../Forms/ICSControl";
import UserList from "../TableList/UserList";

export default function ICSTable({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [Loading, setLoading] = useState(true);
    const [UserLists, setUserLists] = useState()
    const [IcsControl, setIcsControl] = useState();
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const response = await axios.get('api/getUserLists')
                const data = response.data
                setUserLists(data.user_lists)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getUsers()
    }, [])

    function clickForms(index) {
        setOpenForms(index);
    }

    async function getData(id) {
        try {
            const response = await axios.post('api/getUserIcsControls', { id: id })
            const data = response.data
            setIcsControl(data.ics_controls)
            setTotalPrice(data.total_price)
        } catch (e) {
            console.log(e)
        }
    }

    const pageCount = 5;
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    const userMapper = (items) => {
        return items?.map(data => {
            return <UserList firstname={data.firstname} surname={data.surname} designation={data.designation} name={data.name} id={data.id} type={'ics-control'} getData={getData} clickForms={clickForms} />
        })
    }

    return (
        <div className={className + " w-fit h-full relative"}>
            {openForms === "ics-control" ? <ICSControl
                icsControl = {IcsControl ? IcsControl : ''}
                totalPrice = {totalPrice ? totalPrice : ''}
                clickForms={clickForms}
                className={""}
            /> : ""}

            <table className="flex">
                <thead>
                    <tr className="text-xs border dark:border-neutral-700 bg-[#F5F5F5] text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                        <th className="h-10 2xl:w-80 xl:w-72 w-72 font-medium text-left pl-6">
                            Name
                        </th>
                        <th className="h-10 w-56 font-medium text-left">
                            User Status
                        </th>
                        <th className="h-10 w-56 font-medium text-left">
                            Email & Mobile No
                        </th>
                        <th className="h-10 w-32 font-medium text-center">
                            Actions
                        </th>
                    </tr>
                    {/*item 1*/}
                    {Loading ? '' : userMapper(UserLists)}
                    {/*item 2*/}
                </thead>
            </table>

            <div className="absolute bottom-10 w-full flex justify-center">
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
