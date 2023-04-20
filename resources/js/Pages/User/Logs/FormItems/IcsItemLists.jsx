import { upperCase } from "lodash";
import React from "react";

export default function IcsItemLists({ data }) {
    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    return (
        <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
            <td className="text-center px-3 border">1</td>
            <td className="text-center px-3 border">{data.unit}</td>
            <td className="text-center px-3 border">
                {formattedAmount(
                    parseFloat(data.price)
                )}
            </td>
            <td className="text-left px-2 py-3 border">
                <div className="font-semibold">{upperCase(data.article)}</div>
            </td>
            <td className="text-left px-2 py-3 border">
                <div className="min-w-[100px]">
                    {upperCase((data.make_model ? data.make_model : '') + (data.color ? ', ' + data.color : '') + (data.sku ? ', SN: ' + data.sku : ''))}
                </div>
            </td>
            <td className="text-left px-3 border">{data.property_no}</td>
            <td className="text-center px-3 border">{data.eul}</td>
            <td className="text-center px-3 border">
                {upperCase(
                    data.firstname +
                        " " +
                        (data.middlename == null
                            ? ""
                            : data.middlename.charAt(0) + "." + " ") +
                        " " +
                        data.surname +
                        (data.suffix == null ? "" : " " + data.suffix)
                )}
            </td>
            <td className="text-left px-3 border">
                {upperCase(data.item_status)}
            </td>
        </tr>
    );
}
