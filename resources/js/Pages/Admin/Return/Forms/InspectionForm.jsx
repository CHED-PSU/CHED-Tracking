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

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                await axios.post('api/getAdminReturnedItemsData', { id: props.id }).then(response => {

                    setReturnedItemsData(response.data.adminReturnedItemsData)

                    setReturnedItemsInfo(response.data.adminReturnedItemsInfo)
                })
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getData()
    },[])

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
                                <div className="w-1/3">Control No.: RTRN-2023-{returnedItemsData ? returnedItemsData[0].uri_id : ''}</div>
                                <div className="w-1/3">Date: {returnedItemsData ? returnedItemsData[0].created_at : ''}<span id="request_date"></span></div>
                            </div>
                            <div className="text-base font-semibold mt-3 mb-3">REQUEST FOR INSPECTION and REPAIR</div>
                            <div className="text-left text-sm flex justify-between font-medium mb-4">
                                <div className="">
                                    <div>Description of Property </div>
                                    <div>Type No: <font className="font-semibold">{returnedItemsData ? returnedItemsData[0].abbr : ''}</font></div>
                                    <div>Acquisition Cost: <font className="font-semibold">{returnedItemsData ? returnedItemsData[0].price : ''}</font></div>
                                    <div>Nature of last repair: N/A</div>
                                </div>
                                <div className=" w-72">
                                    <div>Brand/Model: <font className="font-semibold">{returnedItemsData ? returnedItemsData[0].article : ''}</font></div>
                                    <div>Property No: <font className="font-semibold">{returnedItemsData ? returnedItemsData[0].property_no : ''}</font></div>
                                    <div>Date of repair <font className="font-semibold">N/A</font></div>
                                </div>
                            </div>
                            <div className="text-left mb-3">
                                <div className="font-semibold text-base">DEFECT:</div>
                                <div className="underline text-justify">{returnedItemsData ? returnedItemsData[0].defect : ''}</div>
                            </div>
                            {/* personnel req */}
                            <div className="flex text-left">
                                <div className="w-1/3">
                                    <div className="font-semibold mb-10">Request by:</div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsData ? returnedItemsData[0].reqF + ' ' + returnedItemsData[0].reqS : ''}</h5>
                                        <p>({returnedItemsData ? returnedItemsData[0].reqD : ''}/User)</p>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-col items-center text-center justify-end">
                                    <div>{returnedItemsData ? returnedItemsData[0].created_at : ''}</div>
                                    <div className="font-base mb-4 border-t-2 border-darkColor-700 w-52">Date</div>
                                </div>
                                <div className="w-1/3 pl-8">
                                    <div className="font-semibold mb-10">Received by:</div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsData ? returnedItemsData[0].recF + ' ' + returnedItemsData[0].recS : ''}</h5>
                                        <p>Date:  <font className="font-semibold">{returnedItemsData ? returnedItemsData[0].created_at : ''}</font></p>
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
                                    <textarea disabled value={returnedItemsInfo ? returnedItemsInfo.pre_nature : ''} name="" id="natureScope" className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-base outline-none resize-none"></textarea>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="natureScope" className="text-base font-semibold">Parts to be supplied / replaced:</label>
                                    <textarea disabled value={returnedItemsInfo ? returnedItemsInfo.pre_parts : ''} name="" id="supplied" className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-base outline-none resize-none"></textarea>
                                </div>
                            </div>
                            {/* personnel pre */}
                            <div className="flex mt-5">

                                <div className="w-1/3">
                                    <div className="font-semibold mb-10">Inspected by:</div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsInfo ? returnedItemsInfo.pre_inspected : ''}</h5>
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
                                        <h5 className="font-semibold">{returnedItemsInfo ? returnedItemsInfo.pre_approved : ''}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                </div>

                            </div>
                            {/* personnel pre */}
                        </div>
                        {/* pre inspection */}

                        {/* post inspection */}
                        <div className="py-5 overflow-y-auto border-t-2 border-black">
                            <div className="content">
                                <div className="text-base text-center font-semibold">POST INSPECTION</div>
                                <div className="mt-5">
                                    <label htmlFor="natureScope" className="text-base font-semibold">Findings:</label>
                                    <textarea disabled name="" value={returnedItemsInfo ? returnedItemsInfo.post_findings : ''} id="natureScope" className="border border-sc w-full rounded-lg h-24 py-2 px-3 text-lg outline-none resize-none"></textarea>
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
                                        <h5 className="font-semibold">{returnedItemsInfo ? returnedItemsInfo.pre_inspected : ''}</h5>
                                        <p>{defaultxt}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold">{returnedItemsInfo ? returnedItemsInfo.pre_inspected : ''}</h5>
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
                            <select onChange={defaultxt} name="" value='' id="Status" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
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
                            <textarea value={returnedItemsInfo ? returnedItemsInfo.pre_nature : ''} name="" id="pre_natureScope" onChange={defaultxt} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                        </div>

                        <div className="mt-2">
                            <label htmlFor="parts" className="text-base font-semibold">Parts to be supplied / replaced:</label>
                            <textarea value={returnedItemsInfo ? returnedItemsInfo.pre_parts : ''} name="" id="pre_parts" onChange={defaultxt} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                        </div>

                        <div className="space-y-5 mt-5">
                            <div className="flex flex-col justify-between">
                                <label htmlFor="pre_inspectedByDropdown" className="text-base font-semibold">Inspected By</label>
                                <select value={returnedItemsInfo ? returnedItemsInfo.pre_inspected : ''} onChange={defaultxt} name="" id="pre_inspectedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                    <option value="none">None</option>
                                    {defaultxt}
                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label htmlFor="pre_approvedByDropdown" className="text-base font-semibold">Approved By</label>
                                <select value={returnedItemsInfo ? returnedItemsInfo.pre_approved : ''} onChange={defaultxt} name="" id="pre_approvedByDropdown"
                                    className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                    <option value="none">None</option>
                                    {defaultxt}
                                </select>
                            </div>

                            <div className="flex flex-col justify-between">
                                <label htmlFor="inspectedByDropdown" className="text-base font-semibold">Date</label>
                                <input value={defaultxt} type="date" name="" onChange={defaultxt} id="pre_date" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"></input>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button onClick={defaultxt} id="save_changes"
                                    className="h-10 w-24 p-1 btn-sm bg-primary rounded-full dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">Save</button>
                            </div>


                            <div className="py-5 text-2xl font-bold text-primary">Post Inspection</div>

                            <div className="mt-10">
                                <label htmlFor="findings" className="text-base font-semibold">Findings:</label>
                                <textarea disabled={defaultxt} value={returnedItemsInfo ? returnedItemsInfo.post_findings : ''} name="" id="post_findings" onChange={defaultxt} className="border border-sc w-full rounded-lg h-24 py-2 px-4 text-base outline-none"></textarea>
                            </div>

                            <div className="space-y-4 mt-5">
                                <div className="flex flex-col justify-between">
                                    <label htmlFor="post_inspectedByDropdown" className="text-base font-semibold">Approved By</label>
                                    <select disabled={defaultxt} value={returnedItemsInfo ? returnedItemsInfo.post_approved : ''} onChange={defaultxt} name="" id="post_inspectedByDropdown"
                                        className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none">
                                        <option value="none">None</option>
                                        {defaultxt}
                                    </select>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <label htmlFor="post_date" className="text-base font-semibold">Date</label>
                                    <input value={returnedItemsInfo ? returnedItemsInfo.updated_ats : ''} disabled={true} type="date" name="" onChange={defaultxt} id="post_date" className="w-full rounded-md border border-neutral-500 py-3 px-3 outline-none"></input>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-14">
                                <button onClick={defaultxt} disabled={true} id="save_changes"
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
