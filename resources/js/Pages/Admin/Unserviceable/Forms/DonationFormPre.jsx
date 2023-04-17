import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";
import Alert from "../Alerts/Alert";
import { useReactToPrint } from "react-to-print";

export default function DonationForm(props) {
    const ref = useRef();

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState();
    const [users, setUsers] = useState();
    const [approvedSelected, setApprovedSelected] = useState(1);
    const [issuedSelected, setissuedSelected] = useState(1);

    const [fromOffice, setFromOffice] = useState();
    const [toOffice, setToOffice] = useState();
    const [PTRnumber, setPTRnumber] = useState();
    const [Ttype, setTtype] = useState();

    const fromOfficeHandler = (e) => {
        setFromOffice(e.target.value);
    };
    const toOfficeHandler = (e) => {
        setToOffice(e.target.value);
        console.log(e.target.value);
    };
    const PTRnumberHandler = (e) => {
        setPTRnumber(e.target.value);
    };
    const tTypeHandler = (e) => {
        setTtype(e.target.value);
        console.log(e.target.value);
    };

    const getUsers = async () => {
        setLoading(true);
        try {
            await axios.get("api/getUsers").then((res) => {
                setUsers(res.data.users);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const getItems = async () => {
        setLoading(true);
        try {
            await axios
                .post("api/getUnserviceableItemsDetails", {
                    item_ids: props.selectedIds,
                })
                .then((res) => {
                    setItems(res.data.items);
                });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getItems();
        getUsers();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        pageStyle: `
        @media print {
            @page {
              size: A4 portrait;
              margin-top: 0.5in;
              margin-bottom: 0.5in;
            }
          }`,
        documentTitle: "emp-data",
    });

    const today = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Manila",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        today
    );

    const approveChanger = (e) => {
        setApprovedSelected(e.target.value);
    };

    const issuedChanger = (e) => {
        setissuedSelected(e.target.value);
    };

    const itemsMapper = (items) => {
        return items?.map((data) => {
            return (
                <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                    <td className="text-center px-3 border">
                        {data.date_acquired}
                    </td>
                    <td className="text-center px-3 border">
                        {data.property_no}
                    </td>
                    <td className="text-left px-3 border">
                        {data.description}
                    </td>
                    <td className="text-center px-3 py-3 border">
                        {data.price}
                    </td>
                    <td className="text-left px-3 border">{data.ppe}</td>
                </tr>
            );
        });
    };

    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const [data, setData] = useState();

    const alertSaveHandler = (index) => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Do you really want to set the Items to donation?");
        setAlertButtonColor("blue");
        setAlertNoButton("Cancel");
        setAlertYesButton("Confirm");
        setAlertFunction(true);

        if (index === false) {
            props.confirmation(false);
        } else {
            const data = {
                From_office: fromOffice,
                To_office: toOffice,
                PTR_No: PTRnumber,
                Type: Ttype,
                issued_by: issuedSelected,
                issued_date: formattedDate,
            };
            setData(data);
            setOpenAlert(index);
        }
    };

    const acceptHandler = () => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
    };
    return (
        <div
            className={
                props.className +
                " fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40"
            }
        >
            {openAlert ? (
                <Alert
                    alertIcon={alertIcon}
                    alertHeader={alertHeader}
                    alertDesc={alertDesc}
                    alertButtonColor={alertButtonColor}
                    alertYesButton={alertYesButton}
                    alertNoButton={alertNoButton}
                    alertFunction={alertFunction}
                    selectedIds={props.selectedIds}
                    alertSaveHandler={alertSaveHandler}
                    acceptHandler={acceptHandler}
                    data={data}
                />
            ) : (
                ""
            )}
            <div className="dark:bg-darkColor-800 h-full w-fit border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                {/* header */}
                <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                    <div className="w-1/2">
                        <button
                            onClick={() => props.setOpenDonationForm(false)}
                            className="py-3 mt-4"
                        >
                            <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                        </button>
                        <div className="text-left cursor-default">
                            <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                Donation
                            </h4>
                            <p className="text-sm text-text-gray dark:text-neutral-300">
                                <b>Donation</b> / Metropolitan University
                            </p>
                        </div>
                    </div>
                    <div className="flex w-1/2 justify-end items-end">
                        <button
                            onClick={() => alertSaveHandler(true)}
                            className="h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                        >
                            Save
                        </button>
                    </div>
                </div>
                {/* header */}
                {/* data table */}
                <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10">
                    <div className="w-[8.27in] px-6 py-6">
                        <div className="flex justify-end text-ss font-medium italic pb-2">
                            Appendix 76
                        </div>
                        <div className="text-center dark:text-white pt-8 pb-2">
                            <div className="text-sm font-semibold">
                                PROPERTY TRANSFER REPORT
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        Commision on Higher Education XI
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-1 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Fund Cluster:
                                        <span id="form_identifier"></span>
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-2">
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs font-medium">
                                    From Accountable Officer/Agency/Fund
                                    Cluster:{" "}
                                    <font className="font-medium text-black">
                                        <input
                                            onKeyUp={fromOfficeHandler}
                                            type="text"
                                            name=""
                                            id=""
                                            className="border-b border-black font-semibold outline-none uppercase"
                                        />
                                    </font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs">
                                    PTR No:{" "}
                                    <font className="font-medium">
                                        <input
                                            onKeyUp={PTRnumberHandler}
                                            type="number"
                                            name=""
                                            id=""
                                            className="border-b w-28 border-black font-semibold outline-none uppercase"
                                        />
                                    </font>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs font-medium ">
                                    To Accountable Officer/Agency/Fund Cluster:{" "}
                                    <font className="font-medium text-black">
                                        <input
                                            onKeyUp={toOfficeHandler}
                                            type="text"
                                            name=""
                                            id=""
                                            className="border-b border-black font-semibold outline-none w-64 uppercase"
                                        />
                                    </font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs">
                                    Date:{" "}
                                    <font className="font-medium">
                                        {formattedDate}
                                    </font>
                                </div>
                            </div>
                            <div className="border border-b-0 py-4 space-y-3">
                                <div>
                                    <p className="ml-4 text-xs">
                                        Transfer Type: (check only one)
                                    </p>
                                </div>
                                <div className="flex gap-7 ml-40">
                                    <div className="">
                                        <div className="flex gap-1 pb-2">
                                            <input
                                                onClick={tTypeHandler}
                                                type="radio"
                                                name="transferType"
                                                id="donation"
                                                value="donation"
                                            />
                                            <label
                                                for="donation"
                                                className="text-black font-medium text-xs"
                                            >
                                                Donation
                                            </label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input
                                                onClick={tTypeHandler}
                                                type="radio"
                                                name="transferType"
                                                id="relocate"
                                                value="relocate"
                                            />
                                            <label
                                                for="relocate"
                                                className="text-black font-medium text-xs"
                                            >
                                                Relocate
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 pb-2">
                                            <input
                                                onClick={tTypeHandler}
                                                type="radio"
                                                name="transferType"
                                                id="reassignment"
                                                value="reassignment"
                                            />
                                            <label
                                                for="reassignment"
                                                className="text-black font-medium text-xs"
                                            >
                                                Reassignment
                                            </label>
                                        </div>
                                        <div className="flex gap-1 items-center w-full">
                                            <input
                                                onClick={tTypeHandler}
                                                type="radio"
                                                name="transferType"
                                                id="others"
                                                value="others"
                                            />
                                            <label
                                                for="others"
                                                className="text-black font-medium text-xs"
                                            >
                                                Others (Specify)
                                            </label>
                                            <input
                                                onKeyUp={tTypeHandler}
                                                disabled={
                                                    Ttype === "others" ||
                                                    (Ttype !== "donation" &&
                                                        Ttype !== "relocate" &&
                                                        Ttype !==
                                                            "reassignment")
                                                        ? false
                                                        : true
                                                }
                                                type="text"
                                                name=""
                                                id=""
                                                className="border-b border-black font-medium outline-none w-80"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <thead>
                                    <tr className="text-xs border dark:border-neutral-700 text-th dark:text-white cursor-default">
                                        <th className="h-10 w-32 font-medium border">
                                            Date Acquired
                                        </th>
                                        <th className="h-10 w-32 font-medium border">
                                            Property No
                                        </th>
                                        <th className="h-10 font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Amount
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Condition of PPE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="slip-table">
                                    {loading ? "" : itemsMapper(items)}
                                    <tr>
                                        <td
                                            className="text-xs border text-center py-4"
                                            colSpan={5}
                                        >
                                            *nothing follows*
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="text-xs border py-4"
                                            colSpan={5}
                                        >
                                            <div>
                                                <p className="ml-4">
                                                    Reason for Transfer:
                                                </p>
                                                <h5 className="text-center text-black font-medium py-10">
                                                    FOR DONATION.
                                                </h5>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border" colSpan={5}>
                                            <div className="flex py-5">
                                                <div className="w-[130px] px-4 text-xs flex flex-col justify-center gap-2 pt-6">
                                                    <h6>Signature:</h6>
                                                    <h6>Printed Name:</h6>
                                                    <h6>Designation:</h6>
                                                    <h6>Date:</h6>
                                                </div>
                                                <div className="flex w-5/6">
                                                    {/* Approved by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">
                                                            Approved by:
                                                        </h5>
                                                        <div className="flex flex-col justify-between">
                                                            <select
                                                                value={
                                                                    loading
                                                                        ? ""
                                                                        : approvedSelected
                                                                }
                                                                onChange={
                                                                    approveChanger
                                                                }
                                                                name=""
                                                                id="Status"
                                                                className="w-full rounded-md border border-neutral-500 px-2 outline-none cursor-pointer"
                                                            >
                                                                {loading
                                                                    ? ""
                                                                    : users?.map(
                                                                          (
                                                                              data
                                                                          ) => {
                                                                              return (
                                                                                  <option
                                                                                      value={
                                                                                          data.id
                                                                                      }
                                                                                  >
                                                                                      {data.firstname +
                                                                                          " " +
                                                                                          data.surname}
                                                                                  </option>
                                                                              );
                                                                          }
                                                                      )}
                                                            </select>
                                                            {/* <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-100 border-black font-semibold outline-none uppercase"
                                                            /> */}
                                                        </div>
                                                        <h6 className="text-xs">
                                                            {users
                                                                ? users[
                                                                      approvedSelected -
                                                                          1
                                                                  ].designation
                                                                : "None"}
                                                        </h6>
                                                        <h6 className="text-sm">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-28 border-black font-semibold outline-none uppercase"
                                                            />
                                                        </h6>
                                                    </div>
                                                    {/* Released/Issued by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">
                                                            Released/Issue by:
                                                        </h5>
                                                        <div className="flex flex-col justify-between">
                                                            <select
                                                                value={
                                                                    issuedSelected
                                                                }
                                                                onChange={
                                                                    issuedChanger
                                                                }
                                                                name=""
                                                                id="Status"
                                                                className="w-full rounded-md border border-neutral-500 px-2 outline-none cursor-pointer"
                                                            >
                                                                {loading
                                                                    ? ""
                                                                    : users?.map(
                                                                          (
                                                                              data
                                                                          ) => {
                                                                              return (
                                                                                  <option
                                                                                      value={
                                                                                          data.id
                                                                                      }
                                                                                  >
                                                                                      {data.firstname +
                                                                                          " " +
                                                                                          data.surname}
                                                                                  </option>
                                                                              );
                                                                          }
                                                                      )}
                                                            </select>
                                                            {/* <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-28 border-black font-semibold outline-none uppercase"
                                                            /> */}
                                                        </div>
                                                        <h6 className="text-xs">
                                                            {users
                                                                ? users[
                                                                      issuedSelected -
                                                                          1
                                                                  ].designation
                                                                : "None"}
                                                        </h6>
                                                        <h6 className="text-sm">
                                                            <input
                                                                value={
                                                                    formattedDate
                                                                }
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-40 border-black font-semibold outline-none uppercase"
                                                            />
                                                        </h6>
                                                    </div>
                                                    {/* Received by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">
                                                            Received by:
                                                        </h5>
                                                        <div className="flex flex-col justify-between">
                                                            {/* <select
                                                                name=""
                                                                id="Status"
                                                                className="w-full rounded-md border border-neutral-500 px-2 outline-none cursor-pointer"
                                                            >
                                                                <option value="none">
                                                                    None
                                                                </option>
                                                            </select> */}
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-28 border-black font-semibold outline-none uppercase"
                                                            />
                                                        </div>
                                                        <h6 className="text-xs">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-28 border-black font-semibold outline-none uppercase"
                                                            />
                                                        </h6>
                                                        <h6 className="text-sm">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="border-b w-28 border-black font-semibold outline-none uppercase"
                                                            />
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* data table */}
            </div>
        </div>
    );
}
