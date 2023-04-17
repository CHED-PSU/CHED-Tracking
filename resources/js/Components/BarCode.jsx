import React from "react";

export default function BarCode({className, serial_no}) {
    if (serial_no) {
        return (
            <img
                draggable="false"
                src="./img/barcode.png"
                className={className}
            />
        );
    } else {
        return "";
    }
};
