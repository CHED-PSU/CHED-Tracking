import { data } from "autoprefixer";
import React from "react";

export default function RequestData(props) {
    return (
        <li key={props.id} className="min-w-[70%] mx-auto">
            <div className="flex h-fit w-full 2xl:px-6 xl:px-4 px-4 2xl:py-4 xl:py-3 py-3 rounded-lg bg-white border border-[#DDDDDD] dark:border-darkColor-700">
                <div className="flex flex-row w-full pb-2">
                    <div className="max-w-[550px] truncate flex flex-col cursor-pointer">
                        <div className=" dark:text-white gap-1 items-center">
                            <h4 className="2xl:text-lg xl:text-base text-base font-semibold 2xl:mb-0 xl:-mb-1 -mb-1">
                                {props.article}
                            </h4>
                            <p className="text-sm text-[#434343] truncate">
                                {props.description}
                            </p>
                        </div>

                        <div className="text-xs dark:text-gray-300 2xl:mt-2 mt-1">
                            <h4 className="text-[#888888]">
                                Date: {props.date}
                            </h4>
                            <h4 className="text-[#888888]">
                                Acquisition: Php 45,742.52
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="flex my-auto w-fit 2xl:gap-3 xl:gap-2 gap-2 2xl:text-sm xl:text-xs text-xs">
                    <button value={props.id} className="2xl:h-10 xl:h-9 h-9 px-4 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] ">
                        {props.button}
                    </button>
                </div>
            </div>
        </li>
    );
}
