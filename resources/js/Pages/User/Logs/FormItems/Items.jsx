import { toUpper } from "lodash";
import React from "react";

export default function Items({ data, counter }) {
    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    return (
        <tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
            <td className="text-center px-2 border">{counter}</td>
            <td className="text-center px-2 border">{toUpper(data.article)}</td>
            <td className="text-left px-2 border">{toUpper(data.description)}</td>
            <td className="text-center px-2 border">1</td>
            <td className="text-center px-2 border"></td>
            <td className="text-center px-2 border">{data.code}</td>
            <td className="text-center px-2 border">
                {formattedAmount(data.amount)}
            </td>
            <td className="text-center px-2 border">
                {formatDateDisplay(data.date)}
            </td>
            <td className="text-center px-2 border">{toUpper(data.remarks)}</td>
            <td className="text-center px-2 border"></td>
        </tr>
    );
}
