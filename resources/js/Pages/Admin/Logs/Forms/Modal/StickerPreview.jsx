import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function StickerPreview(props) {
    const ref = useRef();

    return (
        <div className={props.className}>
            <div className="fixed inset-0 bg-white w-full h-screen flex flex-col items-center justify-center space-y-10 z-50">
                <div className="dark:bg-darkColor-800 h-full w-fit border-x border-[#C8C8C8] pb-10 overflow-y-auto">
                    <div className="flex justify-between py-5 mb-5 mx-10 border-b-2">
                        <div className="w-full flex gap-6 py-3 mt-4">
                            <button
                                onClick={() => props.clickPreview("close")}
                                className=""
                            >
                                <i className="fa-solid fa-arrow-left text-2xl text-darkColor-800 dark:text-white"></i>
                            </button>
                            <div className="text-left cursor-default">
                                <h4 className="text-primary dark:text-white text-2xl font-semibold">
                                    Inventory Sticker
                                </h4>
                                <p className="text-sm text-text-gray dark:text-neutral-300">
                                    This page is hidden. For layout preview only.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-darkColor-900 rounded-lg border mx-10 p-[0.5in]">
                        <div ref={ref} className="w-[11.69in] h-[8.27in]">
                                <div className="text-2xl w-full h-full flex justify-center items-center">Test</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
