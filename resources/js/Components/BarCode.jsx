import React from "react";
import Code from "react-barcode";

export default function BarCode({ className, serial_no }) {
    if (serial_no) {
        const styles = {
            height: "100%",
            objectFit: "cover",
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
