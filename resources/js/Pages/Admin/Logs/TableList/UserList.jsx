import react from "react";


export default function UserList(props) {
    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    function displayPhoto(profilePhoto, name) {
        if (profilePhoto == null || profilePhoto == 'default.png') {
            return (
                <span
                    className={
                        "w-9 h-9 bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center text-base text-white font-semibold rounded-full"
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
                        "w-9 h-9 rounded-full flex-none bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    return (
        <tr className="h-18 text-xs border dark:border-neutral-700 bg-white hover:bg-primary hover:bg-opacity-5 dark:hover:bg-darkColor-700 dark:bg-darkColor-800 dark:text-white text-th cursor-default transition duration-150 ease-in-out">
            {/* name */}
            <td>
                <a className="text-left pl-6 flex items-center w-full h-12 gap-3">
                    <div className="flex flex-none items-center">
                        {displayPhoto(props.img, props.firstname)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium w-60 text-text-black dark:text-white leading-5 truncate">
                            {displayName(props, true)}
                        </h4>
                        <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                            {props.name}
                        </p>
                    </div>
                </a>
            </td>
            {/* status */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1 items-center w-full">
                        <div className="">
                            <h5 className="p-1 px-2 w-fit text-[14px] text-red-500 dark:text-neutral-400 dark:bg-[#434343] offlineUser rounded-full flex items-center gap-1">
                                <i className="fa-solid fa-circle text-[7px]"></i>
                                Offline
                            </h5>
                        </div>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="text-center flex items-center w-full h-12 gap-3 pl-4">
                    <div className="flex flex-col gap-2">
                        <p className=" text-[14px] font-medium truncate w-72">
                            {props.designation == null ? "N/A" : props.designation}
                        </p>
                    </div>
                </a>
            </td>
            {/* mobile no */}
            <td>
                <div
                    onClick={() => {props.clickForms(props.type), props.passDesignation(props.designation), props.getData(props.id), props.passUserName((props.prefix == null ? "" : (props.prefix + " ")) + props.firstname + " " + (props.middlename == null ? "" : ((props.middlename.charAt(0) + ".") + " ")) + " " + props.surname + (props.suffix == null ? "" : (" " + props.suffix)))}}
                    className="flex justify-center items-center w-full h-12 gap-3 cursor-pointer"
                    value = {0}
                >
                    <div className="">
                        <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                            <i className="fa-solid fa-eye"></i> View
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
