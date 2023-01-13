import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ICSControl from "../Forms/ICSControl";
import UserList from "../TableList/UserList";

export default function ICSTable({ className }) {
    const [openForms, setOpenForms] = useState("close");
    const [users, setUsers] = useState();
    const [ics, setICS] = useState();
    const [total, setTotal] = useState(0);
    const domain = window.location.href;
    const url = new URL(domain)
    const user = localStorage.getItem('localSession');
    const value = JSON.parse(user);

    const [name, setName] = useState('')
    function clickForms(index, id) {
        if (id === undefined) {
            setOpenForms(index);
        } else {
            fetch('http://' + url.hostname + ':8000/api/getICSList', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: id
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.allIcs != null) {
                        setICS(data.allIcs)
                        setTotal(data.total)
                        setOpenForms(index);
                    } else {
                        setICS(null)
                        setTotal(null)
                        setOpenForms(index);
                    }
                })

            fetch('http://' + url.hostname + ':8000/api/getSpecificUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: id
            })
                .then(response => response.json())
                .then((data) => {
                    setName(data.name)
                })

        }

    }

   
    useEffect(() => {

        fetch('http://' + url.hostname + ':8000/api/getUserList', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: value.id
        })
            .then(response => response.json())
            .then((data) => {
                setUsers(data.userList)
            })
    }, [])

    return (
        <div className={className + " w-fit h-full relative"}>
            {openForms === "ics-control" ? <ICSControl
                clickForms={clickForms}
                data={ics != null ? Object.values(ics) : null}
                total={total}
                name={name}
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
                    <UserList type={'ics-control'} clickForms={clickForms} key={data.id} value={data.id} name={data.firstname + ' ' + data.surname} role={data.name} />
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
