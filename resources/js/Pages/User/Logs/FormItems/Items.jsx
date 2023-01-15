import React from "react";

export default function Items({ data, date }) {
    return (
        <tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
            <td className="text-center px-2 border">
                1
            </td>
            <td className="text-center px-2 border">
                {data.article}
            </td>
            <td className="text-left px-2 border">
                {data.description}
            </td>
            <td className="text-center px-2 border">
                {data.quantity}
            </td>
            <td className="text-center px-2 border"></td>
            <td className="text-center px-2 border">
                {data.property_no}
            </td>
            <td className="text-center px-2 border">
                16995.00
            </td>
            <td className="text-center px-2 border">
                {date.getMonth()+"/"+date.getDay()+'/'+date.getFullYear()}
            </td>
            <td className="text-center px-2 border">
                {data.status}
            </td>
            <td className="text-center px-2 border"></td>
        </tr>
    )
}