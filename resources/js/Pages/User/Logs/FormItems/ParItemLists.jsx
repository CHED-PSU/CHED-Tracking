import React from "react";

export default function ParItemLists(props) {
    return (
        <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
            <td className="text-center px-3 border">
            {props.data.quantity}
            </td>
            <td className="text-center px-3 border">
            {props.data.unit}
            </td>
            <td className="text-left px-3 py-3 border">
                <div className="flex flex-col gap-1">
                    <div className="font-semibold mr-3">
                    {props.data.article}
                    </div>
                    <div>
                    {props.data.description}
                    </div>
                    <div className="text-center">
                        *nothing follows*
                    </div>
                </div>
            </td>
            <td className=" px-3 border">
            {props.data.property_no}
            </td>
            <td className="text-center px-3 border">
            {props.data.created_at}
            </td>
            <td className="text-center px-3 border">
            {parseFloat(props.data.quantity) * parseFloat(props.data.price)}
            </td>
        </tr>
    )
}