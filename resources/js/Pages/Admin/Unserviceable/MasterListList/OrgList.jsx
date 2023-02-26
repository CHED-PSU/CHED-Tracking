import react from "react";


export default function OrgList(props) {

    return (
        <tr className="h-18 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
            {/* no */}
            <td>
                <a className="text-left pl-6 text-[14px]">
                    1
                </a>
            </td>
            {/* organization */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[17px] font-medium text-text-black">Metropolitan University</h4>
                    </div>
                </a>
            </td>
            {/* address */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1 pr-4">
                        <h5 className="text-[14px] font-medium text-text-black">J.P. Laurel Ave, Bajada, Davao City, Davao del Sur</h5>
                    </div>
                </a>
            </td>
            {/* contact no */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1">
                        <h5 className="text-[14px] font-medium text-[#878787]">09123456789</h5>
                    </div>
                </a>
            </td>
            {/* email */}
            <td>
                <a className="text-left flex items-center w-full h-12 gap-3">
                    <div className="flex flex-col gap-1">
                        <h5 className="text-[14px] font-medium text-[#878787]">metropolitanuniversity@gmail.com</h5>
                    </div>
                </a>
            </td>
            <td>
                <div className="pr-6 flex items-center justify-end w-full h-12 gap-3 cursor-pointer">
                    <div className="">
                        <div 
                            onClick={() => props.clickForms(props.type)}
                            className="btn-color-3 rounded-full py-2 px-3 text-text-black"
                        >
                            <i className="fa-solid fa-eye"></i> View
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        
    )
}