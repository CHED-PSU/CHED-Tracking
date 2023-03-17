import axios from "axios";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";

export default function InspectionForm(props) {
    const ref = useRef();
    const defaultxt = "dummy value";

    const closerHandler = () => {
        props.clickForms("close");
    };

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
        documentTitle: "",
    });

    function clickSubForms(index) {
        setOpenSubForms(index);
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    const [Loading, setLoading] = useState();
    const [returnedItemsData, setReturnedItemsData] = useState();
    const [returnedItemsInfo, setReturnedItemsInfo] = useState();
    const [returnedUsersInfo, setReturnedUsersInfo] = useState();
    const [users, setUsers] = useState();

    const [preNature, setPreNature] = useState("Not yet inspected.");
    const [preParts, setPreParts] = useState("Not yet inspected.");
    const [PreDate, setPreDate] = useState("");
    const [PreInspection, setPreInspection] = useState("Not yet inspected.");
    const [PreApproved, setPreApproved] = useState("Not yet approved.");
    const [postfindings, setPostFindings] = useState("Not yet inspected.");
    const [postApproved, setPostApproved] = useState("Not yet approved.");
    const [PostDate, setPostDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                await axios
                    .post("api/getAdminReturnedItemsData", { id: props.id })
                    .then((response) => {
                        setStatus(response.data.adminReturnedItemsData.status);
                        setReturnedItemsData(
                            response.data.adminReturnedItemsData
                        );
                        setUsers(Object.values(response.data.users));
                        setPreNature(
                            response.data.adminReturnedItemsInfo.pre_nature
                        );
                        setPreParts(
                            response.data.adminReturnedItemsInfo.pre_parts
                        );
                        setReturnedItemsInfo(
                            response.data.adminReturnedItemsInfo
                        );
                        setReturnedUsersInfo(
                            response.data.return_items_users_info
                        );

                        setPreDate(
                            response.data.adminReturnedItemsInfo.updated_at
                        );
                        setPostDate(
                            response.data.adminReturnedItemsInfo.updated_at
                        );
                        setPostFindings(
                            response.data.adminReturnedItemsInfo.post_findings
                        );
                        setPreInspection(
                            response.data.adminReturnedItemsInfo.pre_inspected
                        );
                        setPreApproved(
                            response.data.adminReturnedItemsInfo.pre_approved
                        );
                        setPostApproved(
                            response.data.adminReturnedItemsInfo.post_approve
                        );
                    });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const userMapper = (user) => {
        return user.map((data) => {
            return (
                <option key={data.id} value={data.id}>
                    {data.firstname +
                        " " +
                        (data.middlename == null
                            ? ""
                            : data.middlename.charAt(0) + ". ") +
                        data.surname +
                        (data.suffix == null ? "" : " " + data.suffix)}
                </option>
            );
        });
    };

    const useUserInfo = (userIds, users) => {
        const userInfo = users?.find((user) => user.id === userIds);
        return userInfo
            ? [
                  `${userInfo.firstname} ${
                      userInfo.middlename == null
                          ? ""
                          : userInfo.middlename.charAt(0) + ". "
                  }${userInfo.surname}${
                      userInfo.suffix == null ? "" : " " + userInfo.suffix
                  }`,
                  userInfo.designation == null ? "N/A" : userInfo.designation,
              ]
            : ["Not yet inspected.", ""];
    };

    const [PreInspectionInfo, setPreInspectionInfo] = useState(
        useUserInfo(PreInspection, users)
    );
    const [PreApprovedInfo, setPreApprovedInfo] = useState(
        useUserInfo(PreApproved, users)
    );
    const [PostApprovedInfo, setPostApprovedInfo] = useState(
        useUserInfo(postApproved, users)
    );

    useEffect(() => {
        setPreInspectionInfo(useUserInfo(PreInspection, users));
    }, [PreInspection, users]);

    useEffect(() => {
        setPreApprovedInfo(useUserInfo(PreApproved, users));
    }, [PreApproved, users]);

    useEffect(() => {
        setPostApprovedInfo(useUserInfo(postApproved, users));
    }, [postApproved, users]);

    const preInspection = (e) => {
        setPreInspection(e.target.value);
    };

    const preApproved = (e) => {
        setPreApproved(e.target.value);
    };

    const PostApproved = (e) => {
        setPostApproved(e.target.value);
    };

    const natureScope = (e) => {
        setPreNature(e.target.value);
    };

    const prePartsChange = (e) => {
        setPreParts(e.target.value);
    };

    const preDate = (e) => {
        setPreDate(e.target.value);
    };

    const postFindings = (e) => {
        setPostFindings(e.target.value);
    };

    const postDate = (e) => {
        setPostDate(e.target.value);
    };

    const preSave = () => {
        const data = {
            pre_nature: preNature,
            pre_inspected: PreInspection,
            pre_approved: PreApproved,
            pre_parts: preParts,
            updated_at: PreDate,
        };

        axios
            .post("api/returnItemsPreSave", { data: data, id: props.id })
            .then((response) => {});
    };

    const postSave = () => {
        const data = {
            post_findings: postfindings,
            post_approve: postApproved,
            updated_at: PostDate,
        };

        axios
            .post("api/returnItemsPostSave", { data: data, id: props.id })
            .then((response) => {});
    };

    const changeStatus = (e) => {
        setStatus(e.target.value);
        const data = {
            status: e.target.value,
        };

        axios.post("api/returnedItemsChangeStatus", {
            id: props.id,
            data: data,
        });
    };

    //Date Format
    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
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

    const currentYear = new Date().getFullYear();

    return (
        <div className={props.className}>
            <div className="fixed inset-0 bg-[#FAFAFA] w-full h-full flex z-30">
                {/* form */}
                <div className="dark:bg-darkColor-800 w-[75%] flex justify-center p-10 overflow-y-auto">
                    <div className="bg-white dark:bg-darkColor-900 border w-fit h-fit border-[#C8C8C8] p-[0.5in]">
                        <div
                            ref={ref}
                            className="avoid w-[8.27in] h-[11.69in] px-10 py-3 space-y-5"
                        >
                            {/* header */}
                            <div className="text-center">
                                <div className="text-xs font-medium">
                                    Commission on Higher Education
                                </div>
                                <div className="text-xs font-medium">
                                    Regional Office XI
                                </div>
                                <div className="text-sm font-semibold">
                                    SUPPLY & PROCUREMENT UNIT
                                </div>
                                <div className="text-xs flex flex-col items-end text-right font-semibold mt-3 w-full">
                                    <div className="w-1/3">
                                        Control No.: RTRN-{currentYear}-
                                        {returnedItemsData
                                            ? returnedItemsData.uri_id
                                            : ""}
                                    </div>
                                    <div className="w-1/3">
                                        Date:{" "}
                                        {returnedItemsData
                                            ? formatDateDisplay(
                                                  returnedItemsData.created_at
                                              )
                                            : ""}
                                        <span id="request_date"></span>
                                    </div>
                                </div>
                                <div className="text-base font-semibold mt-3 mb-3">
                                    REQUEST FOR INSPECTION and REPAIR
                                </div>
                                <div className="text-left text-xs font-medium">
                                    Description of Property{" "}
                                </div>
                                <div className="text-left text-xs flex justify-between font-medium mb-2">
                                    <div className="">
                                        <div>
                                            Type:{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? generateArticle(returnedItemsData.description, true)
                                                    : ""}
                                            </font>
                                        </div>
                                        <div>
                                            Serial No.:{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? returnedItemsData.abbr
                                                    : ""}
                                            </font>
                                        </div>
                                        <div>
                                            Acquisition Cost:{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? "P " +
                                                      formattedAmount(
                                                          returnedItemsData.price
                                                      )
                                                    : ""}
                                            </font>
                                        </div>
                                        <div>
                                            Nature of last repair:{" "}
                                            {returnedItemsData
                                                ? returnedItemsData.nature ==
                                                  null
                                                    ? "N/A"
                                                    : returnedItemsData.nature
                                                : ""}
                                        </div>
                                    </div>
                                    <div className=" w-72">
                                        <div>
                                            Brand/Model:{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? generateArticle(returnedItemsData.description, false)
                                                    : ""}
                                            </font>
                                        </div>
                                        <div>
                                            Property No:{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? returnedItemsData.property_no
                                                    : ""}
                                            </font>
                                        </div>
                                        <div>
                                            Date of repair{" "}
                                            <font className="font-semibold">
                                                {returnedItemsData
                                                    ? returnedItemsData.nature ==
                                                      null
                                                        ? "N/A"
                                                        : returnedItemsData.lastRepair
                                                    : ""}
                                            </font>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left mb-2">
                                    <div className="font-semibold text-sm">
                                        DEFECT:
                                    </div>
                                    <div className="underline text-sm text-justify h-16">
                                        {returnedItemsData
                                            ? returnedItemsData.defect
                                            : ""}
                                    </div>
                                </div>
                                {/* personnel req */}
                                <div className="flex text-left">
                                    <div className="w-1/3 flex-none pr-6">
                                        <div className="font-semibold text-sm mb-6">
                                            Request by:
                                        </div>
                                        <div className="text-sm">
                                            <h5 className="font-semibold">
                                                {returnedItemsData
                                                    ? returnedItemsData.reqF +
                                                      " " +
                                                      (returnedItemsData.reqM ==
                                                      null
                                                          ? ""
                                                          : returnedItemsData.reqM.charAt(
                                                                0
                                                            ) +
                                                            "." +
                                                            " ") +
                                                      " " +
                                                      returnedItemsData.reqS +
                                                      (returnedItemsData.reqSuf ==
                                                      null
                                                          ? ""
                                                          : " " +
                                                            returnedItemsData.reqSuf)
                                                    : ""}
                                            </h5>
                                            <p>
                                                (
                                                {returnedItemsData
                                                    ? returnedItemsData.reqD
                                                    : ""}
                                                /User)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-1/3 flex-none flex flex-col text-sm items-center text-center justify-end">
                                        <div>
                                            {returnedItemsData
                                                ? formatDateDisplay(
                                                      returnedItemsData.created_at
                                                  )
                                                : ""}
                                        </div>
                                        <div className="font-base border-t-2 border-darkColor-700 w-52">
                                            Date
                                        </div>
                                    </div>
                                    <div className="w-1/3 flex-none pl-6 text-sm">
                                        <div className="font-semibold mb-6">
                                            Received by:
                                        </div>
                                        <div>
                                            <h5 className="font-semibold">
                                                {returnedItemsData
                                                    ? returnedItemsData.recF +
                                                      " " +
                                                      (returnedItemsData.recM ==
                                                      null
                                                          ? ""
                                                          : returnedItemsData.recM.charAt(
                                                                0
                                                            ) +
                                                            "." +
                                                            " ") +
                                                      " " +
                                                      returnedItemsData.recS +
                                                      (returnedItemsData.recSuf ==
                                                      null
                                                          ? ""
                                                          : " " +
                                                            returnedItemsData.recSuf)
                                                    : ""}
                                            </h5>
                                            <p>
                                                Date:{" "}
                                                <font className="font-semibold">
                                                    {returnedItemsData
                                                        ? formatDateDisplay(
                                                              returnedItemsData.created_at
                                                          )
                                                        : ""}
                                                </font>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* personnel req */}
                            </div>
                            {/* header */}

                            {/* pre inspection */}
                            <div className="pt-5 overflow-y-auto border-t-2 border-black">
                                <div className="content">
                                    <div className="text-base text-center font-semibold mb-2">
                                        PRE INSPECTION
                                    </div>

                                    <div className=" mb-2">
                                        <label
                                            htmlFor="natureScope"
                                            className="text-sm font-semibold"
                                        >
                                            Nature and Scope of work to be done:{" "}
                                        </label>
                                        <textarea
                                            disabled
                                            value={
                                                preNature == null
                                                    ? "Not yet inspected."
                                                    : preNature
                                            }
                                            name=""
                                            id="natureScope"
                                            className=" bg-white w-full rounded-lg underline h-16 text-sm outline-none resize-none"
                                        ></textarea>
                                    </div>
                                    <div className=" mb-2">
                                        <label
                                            htmlFor="natureScope"
                                            className="text-sm font-semibold"
                                        >
                                            Parts to be supplied / replaced:
                                        </label>
                                        <textarea
                                            disabled
                                            value={
                                                preParts == null
                                                    ? "Not yet inspected."
                                                    : preParts
                                            }
                                            name=""
                                            id="supplied"
                                            className=" bg-white w-full rounded-lg underline h-16 text-sm outline-none resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* personnel pre */}
                                <div className="flex">
                                    <div className="w-1/3 flex-none pr-6 text-sm">
                                        <div className="font-semibold mb-6">
                                            Inspected by:
                                        </div>
                                        <div>
                                            {PreInspection != null ? (
                                                <>
                                                    <h5 className="font-semibold">
                                                        {PreInspectionInfo[0]}
                                                    </h5>
                                                    <p>
                                                        {PreInspectionInfo[1]}
                                                    </p>
                                                </>
                                            ) : (
                                                "Not inspected yet."
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-1/3 flex-none flex flex-col items-center text-sm text-center justify-end">
                                        <div>
                                            {returnedItemsInfo
                                                ? formatDateDisplay(
                                                      returnedItemsInfo.updated_at
                                                  )
                                                : ""}
                                        </div>
                                        <div className="font-base border-t-2 border-darkColor-700 w-52">
                                            Date
                                        </div>
                                    </div>
                                    <div className="w-1/3 flex-none pl-6 text-sm">
                                        <div className="font-semibold mb-6">
                                            Approved by:{" "}
                                        </div>
                                        <div>
                                            {PreApprovedInfo != null ? (
                                                <>
                                                    <h5 className="font-semibold">
                                                        {PreApprovedInfo[0]}
                                                    </h5>
                                                    <p>{PreApprovedInfo[1]}</p>
                                                </>
                                            ) : (
                                                "Not inspected yet."
                                            )}
                                        </div>{" "}
                                    </div>
                                </div>
                                {/* personnel pre */}
                            </div>
                            {/* pre inspection */}

                            {/* post inspection */}
                            <div className="pt-5 overflow-y-auto border-t-2 border-black">
                                <div className="content">
                                    <div className="text-base text-center font-semibold">
                                        POST INSPECTION
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="natureScope"
                                            className="text-sm font-semibold"
                                        >
                                            Findings:
                                        </label>
                                        <textarea
                                            disabled
                                            name=""
                                            value={
                                                postfindings == null
                                                    ? "Not yet inspected."
                                                    : postfindings
                                            }
                                            id="natureScope"
                                            className=" bg-white w-full rounded-lg underline h-16 text-sm outline-none resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* personnel post */}
                                <div className="flex mt-2">
                                    <div className="w-2/3 flex flex-col items-center text-sm text-center justify-end">
                                        <div>
                                            {returnedItemsInfo
                                                ? formatDateDisplay(
                                                      returnedItemsInfo.updated_at
                                                  )
                                                : "Not yet inspected."}
                                        </div>
                                        <div className="font-base mb-4 border-t-2 border-darkColor-700 w-52">
                                            Date
                                        </div>
                                    </div>
                                    <div className="w-2/3 pl-16 text-sm">
                                        <div className="font-semibold mb-6">
                                            Pre-inspected by:{" "}
                                        </div>
                                        <div className="mb-6">
                                            {PreInspection != null ? (
                                                <>
                                                    <h5 className="font-semibold">
                                                        {PreInspectionInfo[0]}
                                                    </h5>
                                                    <p>
                                                        {PreInspectionInfo[1]}
                                                    </p>
                                                </>
                                            ) : (
                                                "Not inspected yet."
                                            )}
                                        </div>
                                        <div>
                                            {PostApprovedInfo != null ? (
                                                <>
                                                    <h5 className="font-semibold">
                                                        {PostApprovedInfo[0]}
                                                    </h5>
                                                    <p>{PostApprovedInfo[1]}</p>
                                                </>
                                            ) : (
                                                "Not inspected yet."
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* personnel post */}
                            </div>
                            {/* post inspection */}
                        </div>
                    </div>
                </div>
                {/* form */}

                {/* manage control */}
                <div className="w-[25%] bg-white overflow-y-auto border border-[#C8C8C8]">
                    <div className="content px-[8%] py-10 ">
                        {/* pre inspection */}
                        <div className="flex justify-end gap-3">
                            <div
                                onClick={handlePrint}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                            >
                                <i className="fa-solid fa-print mr-1"></i>Print
                            </div>
                            <div
                                onClick={closerHandler}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer"
                            >
                                Back
                            </div>
                        </div>
                        <div className="flex mt-2 mb-2">
                            <div className="text-2xl font-bold text-primary">
                                Pre Inspection
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <label
                                htmlFor="Status"
                                className="text-base font-semibold"
                            >
                                Status
                            </label>
                            <select
                                onChange={changeStatus}
                                name=""
                                value={status == null ? "None" : status}
                                id="Status"
                                className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                            >
                                <option id="" value="None" disabled>
                                    None
                                </option>
                                <option id="Received" value="Received">
                                    Received
                                </option>
                                <option id="Inspecting" value="Inspecting">
                                    Inspecting
                                </option>
                                <option id="Repairing" value="Repairing">
                                    Repairing
                                </option>
                                <option
                                    id="Ready for Return"
                                    value="Ready for Return"
                                >
                                    Ready for Return
                                </option>
                                <option id="Returned" value="Returned">
                                    Returned
                                </option>
                                <option
                                    id="Unserviceable"
                                    value="Unserviceable"
                                >
                                    Unserviceable
                                </option>
                            </select>
                        </div>

                        <div className="mt-5">
                            <label
                                htmlFor="natureScope"
                                className="text-base font-semibold"
                            >
                                Nature and Scope of work to be done:
                            </label>
                            <textarea
                                maxLength={255}
                                value={
                                    preNature == null
                                        ? "Not yet inspected."
                                        : preNature
                                }
                                name=""
                                id="pre_natureScope"
                                onChange={natureScope}
                                className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-base outline-none"
                            ></textarea>
                        </div>

                        <div className="mt-2">
                            <label
                                htmlFor="parts"
                                className="text-base font-semibold"
                            >
                                Parts to be supplied / replaced:
                            </label>
                            <textarea
                                maxLength={255}
                                value={
                                    preParts == null
                                        ? "Not yet inspected."
                                        : preParts
                                }
                                name=""
                                id="pre_parts"
                                onChange={prePartsChange}
                                className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-base outline-none"
                            ></textarea>
                        </div>

                        <div className="space-y-5 mt-5">
                            <div className="flex flex-col justify-between">
                                <label
                                    htmlFor="pre_inspectedByDropdown"
                                    className="text-base font-semibold"
                                >
                                    Inspected By
                                </label>
                                <select
                                    value={
                                        PreInspection == null
                                            ? "None"
                                            : PreInspection
                                    }
                                    onChange={preInspection}
                                    name=""
                                    id="pre_inspectedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                                >
                                    <option key={0} value="None" disabled>
                                        None
                                    </option>
                                    {users ? userMapper(users) : ""}
                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label
                                    htmlFor="pre_approvedByDropdown"
                                    className="text-base font-semibold"
                                >
                                    Approved By
                                </label>
                                <select
                                    value={
                                        PreApproved == null
                                            ? "None"
                                            : PreApproved
                                    }
                                    onChange={preApproved}
                                    name=""
                                    id="pre_approvedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                                >
                                    <option key={0} value="None" disabled>
                                        None
                                    </option>
                                    {users ? userMapper(users) : ""}
                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label
                                    htmlFor="inspectedByDropdown"
                                    className="text-base font-semibold"
                                >
                                    Date
                                </label>
                                <input
                                    value={PreDate}
                                    type="date"
                                    name=""
                                    onChange={preDate}
                                    id="pre_date"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                                ></input>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button
                                    onClick={preSave}
                                    id="save_changes"
                                    className="h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                                >
                                    Save
                                </button>
                            </div>

                            <div className="py-5 text-2xl font-bold text-primary">
                                Post Inspection
                            </div>

                            <div className="mt-10">
                                <label
                                    htmlFor="findings"
                                    className="text-base font-semibold"
                                >
                                    Findings:
                                </label>
                                <textarea
                                    maxLength={255}
                                    value={
                                        postfindings == null
                                            ? "Not yet inspected."
                                            : postfindings
                                    }
                                    name=""
                                    id="post_findings"
                                    onChange={postFindings}
                                    className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-base outline-none"
                                ></textarea>
                            </div>

                            <div className="space-y-4 mt-5">
                                <div className="flex flex-col justify-between">
                                    <label
                                        htmlFor="post_inspectedByDropdown"
                                        className="text-base font-semibold"
                                    >
                                        Approved By
                                    </label>
                                    <select
                                        value={
                                            postApproved == null
                                                ? "None"
                                                : postApproved
                                        }
                                        onChange={PostApproved}
                                        name=""
                                        id="post_inspectedByDropdown"
                                        className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                                    >
                                        <option key={0} value="None" disabled>
                                            None
                                        </option>
                                        {users ? userMapper(users) : ""}
                                    </select>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <label
                                        htmlFor="post_date"
                                        className="text-base font-semibold"
                                    >
                                        Date
                                    </label>
                                    <input
                                        value={PostDate}
                                        type="date"
                                        name=""
                                        onChange={postDate}
                                        id="post_date"
                                        className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"
                                    ></input>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button
                                    onClick={postSave}
                                    id="save_changes"
                                    className={
                                        0 === 0
                                            ? "h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-3 text-lightColor-800 font-semibold"
                                            : "h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                                    }
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* manage control */}
            </div>
        </div>
    );
}
