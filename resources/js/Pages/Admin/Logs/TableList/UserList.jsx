import react from "react";


export default function UserList(props) {
    const data = props.data;

    return (
        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
            {/* name */}
            <td>
                <a className="text-left pl-6 flex items-center w-full h-12 gap-3">
                    <div className="flex items-center">
                        <img
                            src="./img/profile-pic.jpeg"
                            alt=""
                            className="rounded-full bg-gray-500 w-9 h-9 object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
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
                    <div className="flex flex-col gap-1">
                        <h5 className="p-1 px-2 w-fit text-[14px] offlineUser rounded-full flex items-center gap-1">
                            <i className="fa-solid fa-circle text-[7px]"></i>
                            Offline
                        </h5>
                        <p className="text-[#878787] text-[14px]">
                            {props.designation}
                        </p>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-primary text-[14px] font-medium">
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
                    className="pr-6 flex items-center justify-end w-full h-12 gap-3 cursor-pointer"
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