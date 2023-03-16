import react from "react";


export default function UserList(props) {
    const data = props.data;

    return (
        <tr className="h-18 text-xs border dark:border-neutral-700 bg-white hover:bg-primary hover:bg-opacity-5 text-th dark:bg-darkColor-800 dark:text-white dark:hover:bg-darkColor-700 cursor-default transition duration-150 ease-in-out">
            {/* name */}
            <td>
                <a className="text-left pl-6 flex items-center w-full h-12 gap-3">
                    <div className="flex flex-none items-center">
                        <img
                            src="./img/profile-pic.jpeg"
                            alt=""
                            className="rounded-full bg-gray-500 w-9 h-9 object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium w-60 text-text-black dark:text-white truncate">
                            {props.firstname + ' ' + props.surname}
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
                            <h5 className="p-1 px-2 w-fit text-[14px] dark:text-neutral-400 dark:bg-[#434343] offlineUser rounded-full flex items-center gap-1">
                                <i className="fa-solid fa-circle text-[7px]"></i>
                                Offline
                            </h5>
                        </div>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3 pl-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-primary dark:text-[#476aca] text-[14px] font-medium truncate w-72">
                            willsmith@example.com
                        </p>
                        <p className="text-[#878787] text-[14px]">
                            (+63) 9123254678
                        </p>
                    </div>
                </a>
            </td>
            {/* mobile no */}
            <td>
                <div
                    onClick={() => {props.clickForms(props.type), props.getData(props.id)}}
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
