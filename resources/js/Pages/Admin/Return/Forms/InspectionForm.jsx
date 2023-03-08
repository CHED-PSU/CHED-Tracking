import axios from "axios";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";

export default function InspectionForm(props) {

    function clickSubForms(index) {
        setOpenSubForms(index);
    }
    const [Loading, setLoading] = useState();
    const [returnedItemsData, setReturnedItemsData] = useState();
    const [returnedItemsInfo, setReturnedItemsInfo] = useState();
    const [returnedUsersInfo, setReturnedUsersInfo] = useState();
    const [users, setUsers] = useState();

    const [preNature, setPreNature] = useState();
    const [preParts, setPreParts] = useState();
    const [PreDate, setPreDate] = useState();
    const [PreInspection, setPreInspection] = useState();
    const [PreApproved, setPreApproved] = useState();
    const [postfindings, setPostFindings] = useState();
    const [postApproved, setPostApproved] = useState();
    const [PostDate, setPostDate] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                await axios.post('api/getAdminReturnedItemsData', { id: props.id }).then(response => {

                    setReturnedItemsData(response.data.adminReturnedItemsData)
                    setUsers(Object.values(response.data.users))
                    setReturnedItemsInfo(response.data.adminReturnedItemsInfo)
                    setReturnedUsersInfo(response.data.return_items_users_info)
                    setPreInspection(response.data.return_items_users_info.pre_inspected)
                    setPreApproved(response.data.return_items_users_info.pre_approved)
                    setPostApproved(response.data.return_items_users_info.post_approve)
                })
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getData()
    },[])

    const userMapper = (user) => {
        return user.map(data => {
            return <>
                <option value={data.id}>{data.firstname + ' ' + data.surname}</option>
            </>
        })
    }

    console.log(returnedItemsInfo)

    const ref = useRef();
    const defaultxt = "dummy value";

    const closerHandler = () => {
        props.clickForms("close")
    }

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'emp-data',
    })



    const natureScope = (e) => {
        setPreNature(e.target.value)
    }

    const prePartsChange = (e) => {
        setPreParts(e.target.value)
    }

    const preInspection = (e) =>{
        setPreInspection(e.target.value)
    }

    const preApproved = (e) =>{
        setPreApproved(e.target.value)
    }

    const PostApproved = (e) =>{
        setPostApproved(e.target.value)
    }

    const preDate = (e) => {
        setPreDate(e.target.value)
    }

    const postFindings = (e) => {
        setPostFindings(e.target.value)
    }

    const postDate = (e) => {
        setPostDate(e.target.value)
    }

    const preSave = () => {

        const data = {
            'pre_nature': preNature,
            'pre_inspected': PreInspection,
            'pre_approved': PreApproved,
            'pre_parts': preParts,
            'updated_at': PreDate
        }

        axios.post('api/returnItemsPreSave', {data: data, id: props.id}).then(response => {

        })
    }

    const postSave = () => {
        const data = {
            'post_findings': postfindings,
            'post_approve' : postApproved,
            'updated_at' : PostDate
        }

        axios.post('api/returnItemsPostSave', {data: data, id: props.id}).then(response => {

        })
    }

    const changeStatus = (e) => {
        setStatus(e.target.value)
        const data = {
            'status': e.target.value
        }

        axios.post('api/returnedItemsChangeStatus',{id: props.id, data: data})
    }

    return (
        <div className={props.className}>

            <div className="fixed inset-0 bg-[#FAFAFA] w-full h-full flex z-30">

                {/* form */}
                <div className="dark:bg-darkColor-800 w-[75%] flex justify-center p-10 h-screen overflow-y-auto">
                    <div ref={ref} className="bg-white dark:bg-darkColor-900 border border-[#C8C8C8] w-[995px] h-fit px-18 py-14 space-y-5">
                        {/* header */}
                        <div className="text-center">
                            <div className="text-sm font-medium">Commission on Higher Education</div>
                            <div className="text-sm font-medium">Regional Office XI</div>
                            <div className="text-sm font-semibold">SUPPLY & PROCUREMENT UNIT</div>
                            <div className="text-xs flex flex-col items-end text-right font-semibold mt-3 w-full">
                                <div className="w-1/3">Control No.: RTRN-2023-{returnedItemsData ? returnedItemsData.uri_id : ''}</div>
                                <div className="w-1/3">Date: {returnedItemsData ? returnedItemsData.created_at : ''}<span id="request_date"></span></div>
                            </div>
                            <div className="text-base font-semibold mt-3 mb-3">REQUEST FOR INSPECTION and REPAIR</div>
                            <div className="text-left text-sm flex justify-between font-medium mb-4">
                                <div className="">
                                    <div>Description of Property </div>
                                    <div>Type No: <font className="font-semibold">{returnedItemsData ? returnedItemsData.abbr : ''}</font></div>
                                    <div>Acquisition Cost: <font className="font-semibold">{returnedItemsData ? returnedItemsData.price : ''}</font></div>
                                    <div>Nature of last repair: N/A</div>
                                </div>
                                <div className=" w-72">
                                    <div>Brand/Model: <font className="font-semibold">{returnedItemsData ? returnedItemsData.article : ''}</font></div>
                                    <div>Property No: <font className="font-semibold">{returnedItemsData ? returnedItemsData.property_no : ''}</font></div>
                                    <div>Date of repair <font className="font-semibold">N/A</font></div>
                                </div>
                            </div>
                            <div className="text-left mb-3">
                                <div className="font-semibold text-base">DEFECT:</div>
                                <div className="underline text-justify h-20">{returnedItemsData ? returnedItemsData.defect : ''}</div>
                            </div>
                            {/* personnel req */}
                            <div className="flex text-left">
                                <div className="w-1/3">
                                    <div className="font-semibold mb-10">Request by:</div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsData ? returnedItemsData.reqF + ' ' + returnedItemsData.reqS : ''}</h5>
                                        <p>({returnedItemsData ? returnedItemsData.reqD : ''}/User)</p>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-col items-center text-center justify-end">
                                    <div>{returnedItemsData ? returnedItemsData.created_at : ''}</div>
                                    <div className="font-base mb-4 border-t-2 border-darkColor-700 w-52">Date</div>
                                </div>
                                <div className="w-1/3 pl-8">
                                    <div className="font-semibold mb-10">Received by:</div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsData ? returnedItemsData.recF + ' ' + returnedItemsData.recS : ''}</h5>
                                        <p>Date:  <font className="font-semibold">{returnedItemsData ? returnedItemsData.created_at : ''}</font></p>
                                    </div>
                                </div>
                            </div>
                            {/* personnel req */}
                        </div>
                        {/* header */}

                        {/* pre inspection */}
                        <div className="py-5 overflow-y-auto border-t-2 border-black">
                            <div className="content">
                                <div className="text-base text-center font-semibold">PRE INSPECTION</div>

                                <div className="mt-3">
                                    <label htmlFor="natureScope" className="text-base font-semibold">Nature and Scope of work to be done: </label>
                                    <textarea disabled value={returnedItemsInfo ? returnedItemsInfo.pre_nature : ''} name="" id="natureScope" className=" bg-white w-full rounded-lg h-20 py-2 text-base outline-none resize-none"></textarea>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="natureScope" className="text-base font-semibold">Parts to be supplied / replaced:</label>
                                    <textarea disabled value={returnedItemsInfo ? returnedItemsInfo.pre_parts : ''} name="" id="supplied" className=" bg-white   w-full rounded-lg h-20 py-2 text-base outline-none resize-none"></textarea>
                                </div>
                            </div>
                            {/* personnel pre */}
                            <div className="flex mt-5">

                                <div className="w-1/3">
                                    <div className="font-semibold mb-10">Inspected by:</div>
                                    <div>
                                        <h5 className="font-semibold">{PreInspection}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-col items-center text-center justify-end">
                                    <div>{defaultxt}</div>
                                    <div className="font-base mb-4 border-t-2 border-darkColor-700 w-52">Date</div>
                                </div>
                                <div className="w-1/3 pl-8">
                                    <div className="font-semibold mb-10">Approved by: </div>
                                    <div>
                                        <h5 className="font-semibold">{PreApproved}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                </div>

                            </div>
                            {/* personnel pre */}
                        </div>
                        {/* pre inspection */}

                        {/* post inspection */}
                        <div className="pt-5 overflow-y-auto border-t-2 border-black">
                            <div className="content">
                                <div className="text-base text-center font-semibold">POST INSPECTION</div>
                                <div className="mt-5">
                                    <label htmlFor="natureScope" className="text-base font-semibold">Findings:</label>
                                    <textarea disabled name="" value={returnedItemsInfo ? returnedItemsInfo.post_findings : ''} id="natureScope" className=" bg-white w-full rounded-lg h-20 py-2 px-3 text-lg outline-none resize-none"></textarea>
                                </div>
                            </div>
                            {/* personnel post */}
                            <div className="flex mt-5">
                                <div className="w-2/3 flex flex-col items-center text-center justify-end">
                                    <div>{returnedItemsInfo ? returnedItemsInfo.created_at : ''}</div>
                                    <div className="font-base mb-4 border-t-2 border-darkColor-700 w-52">Date</div>
                                </div>
                                <div className="w-2/3 pl-16">
                                    <div className="font-semibold mb-4">Pre-inspected by: </div>
                                    <div className="mb-6">
                                        <h5 className="font-semibold">{PreInspection}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold">{postApproved}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                </div>

                            </div>
                            {/* personnel post */}
                        </div>
                        {/* post inspection */}
                    </div>
                </div>
                {/* form */}

                {/* manage control */}
                <div className="w-[25%] bg-white overflow-y-auto border border-[#C8C8C8]">
                    <div className="content px-[8%] py-10 ">
                        {/* pre inspection */}
                        <div className="flex justify-end gap-3">
                            <div onClick={handlePrint} className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">
                                <i className="fa-solid fa-print mr-1"></i>Print
                            </div>
                            <div
                                onClick={closerHandler}
                                className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">Back</div>
                        </div>
                        <div className="flex mt-2 mb-2">
                            <div className="text-2xl font-bold text-primary">Pre Inspection</div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="Status" className="text-base font-semibold">Status</label>
                            <select onChange={changeStatus} name="" value={status} id="Status" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                <option id="" value="" disabled>None</option>
                                <option id="Received" value="Received">Received</option>
                                <option id="Inspecting" value="Inspecting">Inspecting</option>
                                <option id="Repairing" value="Repairing">Repairing</option>
                                <option id="Ready for Return" value="Ready for Retur">Ready for Return</option>
                                <option id="Returned" value="Returned">Returned</option>
                                <option id="Unserviceable" value="Unserviceable">Unserviceable</option>

                            </select>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="natureScope" className="text-base font-semibold">Nature and Scope of work to be
                                done:</label>
                            <textarea value={preNature}  name="" id="pre_natureScope" onChange={natureScope} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                        </div>

                        <div className="mt-2">
                            <label htmlFor="parts" className="text-base font-semibold">Parts to be supplied / replaced:</label>
                            <textarea value={preParts} name="" id="pre_parts" onChange={prePartsChange} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                        </div>

                        <div className="space-y-5 mt-5">
                            <div className="flex flex-col justify-between">
                                <label htmlFor="pre_inspectedByDropdown" className="text-base font-semibold">Inspected By</label>
                                <select value={PreInspection} onChange={preInspection} name="" id="pre_inspectedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                    <option value="none">None</option>
                                    {users ? userMapper(users) : ''}

                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label htmlFor="pre_approvedByDropdown" className="text-base font-semibold">Approved By</label>
                                <select value={returnedItemsInfo ? returnedItemsInfo.pre_approved : ''} onChange={preApproved} name="" id="pre_approvedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                    <option value="none">None</option>
                                    {users ? userMapper(users) : ''}
                                    {defaultxt}
                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label htmlFor="inspectedByDropdown" className="text-base font-semibold">Date</label>
                                <input value={returnedItemsInfo ? returnedItemsInfo.updated_at : ''} type="date" name="" onChange={preDate} id="pre_date" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"></input>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button onClick={preSave} id="save_changes"
                                    className="h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">Save</button>
                            </div>


                            <div className="py-5 text-2xl font-bold text-primary">Post Inspection</div>

                            <div className="mt-10">
                                <label htmlFor="findings" className="text-base font-semibold">Findings:</label>
                                <textarea value={returnedItemsInfo ? returnedItemsInfo.post_findings : ''} name="" id="post_findings" onChange={postFindings} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                            </div>

                            <div className="space-y-4 mt-5">
                                <div className="flex flex-col justify-between">
                                    <label htmlFor="post_inspectedByDropdown" className="text-base font-semibold">Approved By</label>
                                    <select  value={returnedItemsInfo ? returnedItemsInfo.post_approved : ''} onChange={PostApproved} name="" id="post_inspectedByDropdown"
                                        className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                        <option value="none">None</option>
                                        {users ? userMapper(users) : ''}
                                        {defaultxt}
                                    </select>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <label htmlFor="post_date" className="text-base font-semibold">Date</label>
                                    <input   type="date" name="" onChange={postDate} id="post_date" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"></input>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button onClick={postSave}  id="save_changes"
                                    className={0 === 0 ? "h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-3 text-lightColor-800 font-semibold" : "h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"}>Save</button>
                            </div>


                        </div>

                    </div>
                </div>
                {/* manage control */}

            </div>
        </div>
    );
}
