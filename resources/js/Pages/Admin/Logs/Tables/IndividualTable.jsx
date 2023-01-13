import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndividualInventory from "../Forms/IndividualInventory";
import UserList from "../TableList/UserList";

export default function IndividualTable({ className }) {
    const [openForms, setOpenForms] = useState("close");

    const [users, setUsers] = useState();
    const [items, setItems] = useState('NONE');
    const [total, setTotal] = useState();

    const domain = window.location.href;
    const url = new URL(domain)


    function clickForms(index, id) {
        if (id === undefined) {
            setOpenForms(index);
        } else {
            axios.post('api/getIndividualItemsForAdmin', id).then(res => {
                setItems(res.data.items)
                setTotal(res.data.totalPrice)
                setOpenForms(index);
            })

            fetch('http://' + url.hostname + ':8000/api/getIndividualItemsForAdmin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: id
            })
                .then(response => response.json())
                .then((data) => {
                    setItems(data.items)
                    setTotal(data.totalPrice)
                    setOpenForms(index);
                })
        }
    }
    

    return (
        <div className={className + " w-fit h-full relative"}>
            {openForms === "in-in" ? <IndividualInventory
                clickForms={clickForms}
                items={items}
                total={total}
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
                        <th className="h-10 w-32 font-medium text-right pr-6">
                            Actions
                        </th>
                    </tr>
                    {/*item 1*/}
                    <UserList type={"in-in"} clickForms={clickForms} />
                    {/*item 2*/}
                </thead>
            </table>

            <div className="absolute bottom-10 w-full flex justify-center">
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={'pageCount'}
                    onPageChange={'changePage'}
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
