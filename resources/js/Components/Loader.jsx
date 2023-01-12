import React from "react";
import { MutatingDots } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="flex justify-center absolute bg-[#fafafa] items-center z-40 black w-full h-full inset-0 cursor-wait">
        <MutatingDots
            visible={true}
            height="80"
            width="80"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            color="#475df1"
            secondaryColor= '#fb5c8f'
        />
        </div>
    )
};