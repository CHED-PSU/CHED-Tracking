import React from "react";

export default function RequistionItems(props) {
    function displayPhoto(profilePhoto, name, className) {
        if (profilePhoto == null || profilePhoto == "default.png") {
            return (
                <span
                    className={
                        className +
                        " bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full"
                    }
                >
                    {name.substring(0, 1)}
                </span>
            );
        } else {
            return (
                <img
                    draggable="false"
                    src="./img/profile-pic.jpeg"
                    className={
                        className + " rounded-full bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    return (
        <div className="flex flex-row w-full 2xl:p-3 xl:p-3 p-3 2xl:gap-4 xl:gap-3 gap-3 cursor-pointer rounded-lg text-[#6C6C6C] border border-[#DDDDDD] dark:border-[#434343] bg-white dark:bg-darkColor-800">
            <div className="w-fit h-full flex flex-none items-center">
                {displayPhoto(
                    props.data.rImg,
                    props.data.rfirstname,
                    "2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9"
                )}
            </div>
            <div className="flex flex-col w-full 2xl:space-y-1 truncate">
                <div className="w-full dark:text-white flex 2xl:gap-2 xl:gap-1 xl:pb-[2px] items-center">
                    <h4 className="font-semibold text-text-gray-2 dark:text-white 2xl:text-base xl:text-sm">
                        {props.data.rSurname}
                        {props.data.rSuffix == null
                            ? ""
                            : " " + props.data.rSuffix}
                        , {props.data.rfirstname.charAt(0)}
                    </h4>
                    <p className="2xl:text-sm xl:text-[13px] dark:text-[#c4c4c4] font-normal truncate">
                        {" "}
                        had been issued {props.data.tracking_id}
                    </p>
                </div>
                <div className="flex text-xs dark:text-gray-300 2xl:gap-6 xl:gap-4 gap-4">
                    <h4>
                        <font className="font-semibold text-text-gray-2 dark:text-white">
                            Form: {props.data.uSurname}
                            {props.data.uSuffix == null
                                ? ""
                                : " " + props.data.uSuffix}
                            , {props.data.ufirstname.charAt(0)}
                        </font>
                    </h4>
                    <h4>
                        <font className="font-semibold text-text-gray-2 dark:text-white">
                            Date: {props.data.date_received}
                        </font>
                    </h4>
                </div>
            </div>
        </div>
    );
}
