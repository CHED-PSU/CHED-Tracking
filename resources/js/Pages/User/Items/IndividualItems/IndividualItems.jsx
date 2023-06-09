import { data } from "autoprefixer";
import { toUpper } from "lodash";
import React, {useState} from "react";

export default function IndividualItems(props) {



    return (
        <>
        <tr className="bg-[#F5F5F5]">
            <td className="text-center rounded-tableRow">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    check = {props.check}
                    value={props.value}
                    onChange={props.handleChangeCheckBox(props.value)}
                />
            </td>
            <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                1
            </td>
            <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                {props.code}
            </td>
            <td className="text-sm">{toUpper((props.make_model ? props.make_model : '') + (props.color ? ', ' + props.color : '') + (props.sku ? ', SN: ' + props.sku : ''))}</td>
            <td className="text-sm">{props.date}</td>
            <td className="text-center py-3 rounded-tableRow">
                <button value={props.value}
                onClick={props.openFormHandler}
                className="h-9 w-24 text-sm rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-medium">
                    Return
                </button>
            </td>

        </tr>
        </>
    )
}
