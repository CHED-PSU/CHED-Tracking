import React from "react";

export default function RequistionItems(props) {
    
    return (
        <div className="flex flex-row w-full 2xl:p-5 xl:p-3 p-3 2xl:gap-4 xl:gap-3 gap-3 rounded-lg text-[#6C6C6C] border border-[#DDDDDD] bg-white dark:bg-darkColor-800">
            <div className="w-fit h-full flex flex-none items-center">
                <img
                    src="./img/profile-pic.jpeg"
                    alt=""
                    className="rounded-full bg-gray-500 2xl:w-12 2xl:h-12 xl:w-10 xl:h-10 w-10 h-10 object-cover"
                />
            </div>
            <div className="flex flex-col w-full cursor-pointer 2xl:space-y-1 truncate">
                <div className="w-full dark:text-white flex 2xl:gap-2 xl:gap-1 xl:pb-[2px] items-center">
                    <h4 className="font-semibold text-text-gray-2 2xl:text-base xl:text-sm"></h4>
                    <p className="2xl:text-sm xl:text-[13px] font-normal truncate">
                    </p>
                </div>
                <div className="flex text-xs dark:text-gray-300 2xl:gap-6 xl:gap-4 gap-4">
                    <h4>
                        <font className="font-semibold text-text-gray-2">
                            Form:
                        </font>
                      
                    </h4>
                    <h4>
                        <font className="font-semibold text-text-gray-2">
                            Date:
                        </font>
                     
                    </h4>
                </div>
            </div>
        </div>
    )
}