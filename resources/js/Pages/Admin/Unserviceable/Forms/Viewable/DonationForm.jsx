import axios from "axios";
import { upperCase } from "lodash";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function DonationForm(props) {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState()
    const [info, setInfo] = useState()

    const donationInformation = async () => {
        setLoading(true)
        try {
            await axios.post('api/getDonationInformation', { id: props.id }).then(res => {
                setItems(res.data.items)
                setInfo(res.data.info)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        donationInformation()
    }, [])

    const ref = useRef();
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
        documentTitle: "PTR"
    })

    function clickBtn(index) {
        props.setBtnType(index);
    }

    return (

        <div className={props.className + "fixed inset-0 bg-white w-full h-full flex flex-col items-center space-y-10 z-40"}>
            <div className="dark:bg-darkColor-800 h-full border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                {/* header */}
                <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                    <div className="w-1/2">
                        <button
                            onClick={() => clickBtn("close")}
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
                        <button onClick={handlePrint} className="btn-color-3 rounded-full py-2 px-3 text-text-black text-sm cursor-pointer">
                            <i className="fa-solid fa-print mr-1"></i>
                            Print
                        </button>
                    </div>
                </div>
                {/* header */}
                {/* data table */}
                <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10">
                    <div ref={ref} className="w-[8.27in] p-6">
                        <div className="flex justify-end text-ss font-medium italic pb-2">Appendix 76</div>
                        <div className="text-center dark:text-white pt-8 pb-2">
                            <div className="text-sm font-semibold">
                                PROPERTY TRANSFER REPORT
                            </div>
                        </div>
                        <div className="flex items-center pt-6">
                            <div className="w-1/2">
                                <div className="pt-4 flex items-center gap-2">
                                    <div className="text-xs dark:text-white">
                                        Entity Name:
                                    </div>
                                    <div className="text-xs  dark:text-gray-400 font-semibold">
                                        Commision on Higher Education XI
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
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
                                    From Accountable Officer/Agency/Fund Cluster: <font className="font-medium text-black">CHEDRO XI</font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs font-medium">
                                    PTR No:  <font className="font-medium">{loading ? ' ' :info.PTR_No}</font>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="border border-r-0 border-b-0 w-3/4 p-2 text-xs font-medium">
                                    To Accountable Officer/Agency/Fund Cluster: <font className="font-medium text-black">{loading ? ' ' : upperCase(info.To_office)}</font>
                                </div>
                                <div className="border border-b-0 w-1/4 p-2 text-xs font-medium">
                                    Date:  <font className="font-medium">{loading ? ' ' : info.issued_}</font>
                                </div>
                            </div>
                            <div className="border border-b-0 py-4 space-y-3">
                                <div>
                                    <p className="ml-4 text-xs">Transfer Type: (check only one)</p>
                                </div>
                                <div className="flex gap-7 ml-40">
                                    <div className="">
                                        <div className="flex gap-1 pb-2">
                                            {loading ? ' ' : <input type="radio" name="transferType" id="donation" value="Donation" disabled checked={info.Type === 'donation' ? true : false} />}
                                            <label for="donation" className="text-black font-medium text-xs">Donation</label>
                                        </div>
                                        <div className="flex gap-1">
                                            {loading ? ' ' : <input type="radio" name="transferType" id="relocate" value="Relocate" disabled checked={info.Type === 'relocate' ? true : false} />}
                                            <label for="relocate" className="text-black font-medium text-xs">Relocate</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 pb-2">
                                            {loading ? ' ' : <input type="radio" name="transferType" id="reassignment" value="Donation" disabled checked={loading &&info.Type === 'reassignment' ? true : false} />}
                                            <label for="reassignment" className="text-black font-medium text-xs">Reassignment</label>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            {loading ? ' ' : <input type="radio" name="transferType" id="others" value="Relocate" disabled checked={loading &&info.Type === 'others' ? true : false} />}
                                            <label for="others" className="text-black font-medium text-xs">Others (Specify)</label>
                                            <input type="text" name="" id="" className="border-b-2 border-darkColor-800 outline-none" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table
                                id="items"
                                className="table-auto w-full min-w-[700px]"
                            >
                                <tbody id="slip-table">
                                    <tr className="text-xs border dark:border-neutral-700 font-medium dark:text-white cursor-default">
                                        <th className="h-10 w-32 font-medium border">
                                            Date Acquired
                                        </th>
                                        <th className="h-10 w-32 font-medium border">
                                            Property No
                                        </th>
                                        <th className="h-10 w-80 font-medium border">
                                            Description
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Amount
                                        </th>
                                        <th className="h-10 w-40 font-medium border">
                                            Condition of PPE
                                        </th>
                                    </tr>
                                    {loading ? '' : items?.map(data => {
                                        return <tr className="avoid text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
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
                                                P{data.price}
                                            </td>
                                            <td className="text-left px-3 border">
                                            {data.ppe}
                                            </td>
                                        </tr>
                                    })}




                                    <tr className="avoid ">
                                        <td className="text-xs border text-center py-4" colSpan={5}>*nothing follows*</td>
                                    </tr>
                                    <tr className="avoid ">
                                        <td className="text-xs font-medium border py-4" colSpan={5}>
                                            <div>
                                                <p className="ml-4">Reason for Transfer:</p>
                                                <h5 className="text-base text-center text-black font-medium py-10">FOR DONATION.</h5>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="avoid ">
                                        <td className="border" colSpan={5}>
                                            <div className="flex py-5">
                                                <div className="w-[130px] px-4 text-xs flex flex-col justify-center gap-2 pt-6 font-medium">
                                                    <h6>Signature:</h6>
                                                    <h6>Printed Name:</h6>
                                                    <h6>Designation:</h6>
                                                    <h6>Date:</h6>
                                                </div>
                                                <div className="flex w-full">
                                                    {/* Approved by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Approved by:</h5>
                                                        <div className="flex flex-col justify-between text-xs font-medium">
                                                            MARICAR R. CASQUEJO,Ph.D.CESOIII
                                                        </div>
                                                        <h6 className="text-xs">Director IV</h6>
                                                        <h6 className="text-sm">March 25, 2022</h6>
                                                    </div>
                                                    {/* Released/Issued by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Released/Issue by:</h5>
                                                        <div className="flex flex-col justify-between text-xs font-medium">
                                                            {loading ? ' ' : info.firstname + ' ' + info.surname}
                                                        </div>
                                                        <h6 className="text-xs">{loading ? ' ' : info.designation}</h6>
                                                        <h6 className="text-sm">{loading ? ' ' : info.issued_date}</h6>
                                                    </div>
                                                    {/* Received by */}
                                                    <div className="flex flex-col gap-1 w-1/3 px-4">
                                                        <h5 className="pb-6 text-sm font-medium">Received by:</h5>
                                                        <div className="flex flex-col justify-between text-xs font-medium">
                                                            AUGIE E. FUENTES, PhD.
                                                        </div>
                                                        <h6 className="text-xs">College President</h6>
                                                        <h6 className="text-sm">March 25, 2022</h6>
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
