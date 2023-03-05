import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function ReturnRequest(props) {

    const [openForm, setOpenForm] = useState(false)

    const openFormHandler = (e) => {
        setValueId(e.target.value)
        setOpenForm(!openForm);
    }

    return (
        <div>
            
            <div className="z-30 w-full h-full bg-neutral-800 bg-opacity-75 fixed top-0 right-0 flex justify-center items-center">
                <div className="bg-white w-[350px] p-8 space-y-6 rounded-2xl flex flex-col items-left">
                    <div className="cursor-pointer ">
                        <i onClick={props.openModalHandler} className="fa-solid fa-xmark"></i>
                        <div className="flex justify-center items-center gap-3">
                            <span className="w-12 h-12 rounded-full bg-blue-900 flex justify-center items-center text-3xl text-white font-semibold">?</span>
                        </div>
                    </div>
                    
                    <form action="">
                        <div className="flex justify-center items-center gap-3">
                            <h5 className="text-base font-semibold ">Quantity:</h5>
                            <input type="number" className="border border-neutral-500 rounded-lg w-40 p-4 outline-none"/>
                        </div>
                    </form>

                    <div className="flex gap-3 w-full justify-center">
                        <button onClick={props.openFormHandler} className="btn-color-4 text-white rounded-full px-4 py-2 font-medium">Proceed</button>
                    </div>

                </div>
            </div>
            
        </div>
    );
}
