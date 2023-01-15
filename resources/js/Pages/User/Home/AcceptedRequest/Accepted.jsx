import react from "react";


export default function Accepted(props) {
    return (<>
        <tr className="bg-white">
            <td className="text-center 2xl:text-base xl:text-sm text-sm rounded-tableRow">
                3
            </td>
            <td className="2xl:text-base xl:text-sm text-sm font-semibold text-text-black">
                {props.data.article}
            </td>
            <td className="2xl:text-sm xl:text-[13px] text-[13px]">
                {props.data.description}
            </td>
            <td className="text-sm">
                <div className="flex gap-2 items-center text-c-inspecting font-medium">
                    <i className="fa-solid fa-circle text-[7px]"></i>
                    <h5 className="2xl:text-sm xl:text-[13px] text-[13px]">
                        {props.data.name}
                    </h5>
                </div>
            </td>
            <td className="py-3 rounded-tableRow 2xl:text-sm xl:text-[13px] text-[13px] font-medium">
                {props.data.updated_at}
            </td>
        </tr>
        
        </>
        

    )
}