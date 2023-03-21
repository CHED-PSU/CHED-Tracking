import react from "react";


export default function Accepted(props) {
    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <tr key={props.data.uri_id} className="bg-white">
            <td className="text-center 2xl:text-base xl:text-sm text-sm rounded-tableRow">
                {props.data.uri_id}
            </td>
            <td className="2xl:text-base xl:text-sm text-sm font-semibold text-text-black">
                {props.data.description}
            </td>
            <td className="2xl:text-sm xl:text-[13px] text-[13px]">
                {props.data.defect}
            </td>
            <td className="text-sm">
                <div className="flex gap-2 items-center text-c-inspecting font-medium">
                    <i className="fa-solid fa-circle text-[7px]"></i>
                    <h5 className="2xl:text-sm xl:text-[13px] text-[13px]">
                        {props.data.status}
                    </h5>
                </div>
            </td>
            <td className="py-3 rounded-tableRow 2xl:text-sm xl:text-[13px] text-[13px] font-medium">
                {formatDateDisplay(props.data.updated_at)}
            </td>
        </tr>
    )
}