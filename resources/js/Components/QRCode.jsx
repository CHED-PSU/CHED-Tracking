import React from "react";
import Code from "qrcode.react";

export default function QRCode({ className, serial_no }) {
    if (serial_no) {
        const styles = {
            width: "100%",
            height: "100%",
            'object-fit': "cover",
        };

        return (
            <div className={className}>
                <Code draggable="false" value={serial_no} style={styles} />
            </div>
        );
    } else {
        return "";
    }
}
