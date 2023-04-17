import React from "react";

export default function QRCode({ className, serial_no }) {
    if (serial_no) {
        return (
            <img
                draggable="false"
                src="./img/QRcodo.png"
                className={className}
            />
        );
    } else {
        return '';
    }
}
