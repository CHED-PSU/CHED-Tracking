import { toUpper } from "lodash";
import React from "react";

export default function ParItemLists(props) {
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
        <>
        <tr className="text-xs font-medium h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
            <td rowSpan={2} className="text-center px-3 border border-darkColor-700">1</td>
            <td rowSpan={2}  className="text-center px-3 border border-darkColor-700">
                {toUpper(props.data.unit)}
            </td>
            <td className="text-left font-semibold px-3 border border-darkColor-700">
                {toUpper(props.data.article)}
            </td>
            <td className=" px-3 border border-darkColor-700"></td>
            <td className="text-center border border-darkColor-700"></td>
            <td className="text-center border border-darkColor-700"></td>
        </tr>
        <tr className="font-medium text-ss">
            <td className="text-left font-medium p-3 border border-darkColor-700">{toUpper(props.data.description)}</td>
            <td className="text-center border border-darkColor-700">{props.data.property_no}</td>
            <td className="text-center border border-darkColor-700">{formatDateDisplay(props.receivedDate)}</td>
            <td className="text-center border border-darkColor-700">
                {formattedAmount(
                    parseFloat(props.data.price)
                )}
            </td>
        </tr>
        <tr>
            <td className="border border-darkColor-700"></td>
            <td className="border border-darkColor-700"></td>
            <td className="text-center font-semibold text-ss border border-darkColor-700">*nothing follows*</td>
            <td className="border border-darkColor-700"></td>
            <td className="border border-darkColor-700"></td>
            <td className="border border-darkColor-700"></td>
        </tr>
        </>
    );
}
