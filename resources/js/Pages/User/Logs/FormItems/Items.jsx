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
                {data.qty}
            </td>
            <td className="text-center px-2 border"></td>
            <td className="text-center px-2 border">
                {data.code}
            </td>
            <td className="text-center px-2 border">
                {data.qty * data.amount}
            </td>
            <td className="text-center px-2 border">
                {date.getMonth()+"/"+date.getDay()+'/'+date.getFullYear()}
            </td>
            <td className="text-center px-2 border">
                {data.remarks}
            </td>
            <td className="text-center px-2 border"></td>
        </tr>
    )
}