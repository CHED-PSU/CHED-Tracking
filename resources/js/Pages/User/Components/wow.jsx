<li onClick={() => clickICSNotification("open")} className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            W
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-white">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>
                                <li onClick={() => clickPARNotification("open")} className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            W
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-white">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center 2xl:py-3 xl:py-2 py-2 gap-1 border-sh dark:border-neutral-700 border hover:bg-slate-100 rounded-md dark:hover:bg-darkColor-700 cursor-pointer">
                                    <div className="flex h-full items-center justify-between gap-3 px-3">
                                        <div className="flex-none rounded-full 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-9 h-9 2xl:text-base xl:text-sm text-sm text-white text-center flex justify-center items-center bg-primary dark:bg-active-icon">
                                            W
                                        </div>
                                        <div className="w-fit flex flex-col justify-center dark:text-white">
                                            <div className="text-sm 2xl:leading-0 xl:leading-4">
                                                <span className="font-semibold">
                                                    Allan
                                                </span>{" "}
                                                <span className="">
                                                    {" "}
                                                    sent a request for return.
                                                </span>
                                            </div>
                                            <div className="text-xs text-blue-400">
                                                1 day ago
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ping Notif */}
                                    <div className="h-auto flex relative">
                                        <span className="flex h-4 w-4 mr-4 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </li>



//PAR NOTIFICATION

<div className="text-center">
                        <div className="text-sm font-semibold">
                            PROPERTY RETURN SLIP
                        </div>
                    </div>
                    <div className="pt-4 flex items-center gap-2">
                        <div className="text-xs">Name of Government Unit:</div>
                        <div className="text-xs font-semibold">
                            COMMISSION ON HIGHER EDUCATION RO XI
                        </div>
                    </div>
                    <div className="pt-1 flex items-center gap-2">
                        <div className="text-xs">Purpose:</div>
                        <div
                            className="text-xs font-semibold"
                            id="purpose_for_many_items"
                        ></div>
                    </div>
                    <div className="mt-4 mb-2 overflow-auto max-h-[400px]">
                        <table id="items" className="table-auto  w-full">
                            <thead>
                                <tr className="text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                                    <th className="h-10 w-12 font-medium">Qty</th>
                                    <th className="h-10 w-12 font-medium">Unit</th>
                                    <th className="h-10 font-medium">
                                        Description
                                    </th>
                                    <th className="h-10 w-24 font-medium">
                                        Date Acquired
                                    </th>
                                    <th className="h-10 w-24 font-medium">
                                        Property Acquired
                                    </th>
                                    <th className="h-10 w-32 font-medium">
                                        A.R.E No.
                                    </th>
                                    <th className="h-10 w-20 font-medium">
                                        Name of End User{" "}
                                    </th>
                                    <th className="h-10 w-20 font-medium">
                                        Total Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="many_items_table">
                                <tr className="text-xs h-fit cursor-default border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white hover:drop-shadow-dark dark:hover:drop-shadow-light">
                                    <td className="text-center px-2">1</td>
                                    <td className="text-center px-2">Unit</td>
                                    <td className=" px-1 py-2">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maxime debitis earum,
                                        nobis et itaque doloremque eveniet
                                        natus.
                                    </td>
                                    <td className="text-center px-2">
                                        November 1, 2021
                                    </td>
                                    <td className="text-center px-2">
                                        Rent-to-own
                                    </td>
                                    <td className="text-center px-2">
                                        2021-05-03-L037-CHEDROXI-TECHNICAL UNIT
                                    </td>
                                    <td className="text-center px-2">John Doe</td>
                                    <td className="text-center px-2">98, 799.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-2">
                        {/* Hide this buttons if the form is already accepted */}
                        <div className="flex flex-col space-y-3">
                            <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold">
                                Accept
                            </button>
                            <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] ">
                                Decline
                            </button>
                        </div>

                        {/* Accepted Button (unhide this button if the form is already accepted) */}
                        <button className="2xl:h-12 xl:h-9 h-9 w-full p-1 rounded-full font-semibold text-[#707070] bg-[#F5F5F5] border border-[#BBBBBB] disabled hidden">
                            Accepted
                        </button>
                    </div>


                    //for item logs
                    <tr className="bg-[#F5F5F5]">
                                <td className="text-center rounded-tableRow">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </td>
                                <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                                    Alcohol
                                </td>
                                <td className="text-sm">70% Ethyl Bottle</td>
                                <td className="text-sm">June 04, 2022</td>
                                <td className="text-center py-3 rounded-tableRow">
                                    <button className="h-9 w-24 text-sm rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-medium">
                                        Return
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-[#F5F5F5]">
                                <td className="text-center rounded-tableRow">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </td>
                                <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                                    All Purpose Glue, Paste
                                </td>
                                <td className="text-sm">70% Ethyl Bottle</td>
                                <td className="text-sm">June 04, 2022</td>
                                <td className="text-center py-3 rounded-tableRow">
                                    <button className="h-9 w-24 text-sm rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-medium">
                                        Return
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-[#F5F5F5]">
                                <td className="text-center rounded-tableRow">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </td>
                                <td className="2xl:text-[17px] xl:text-base text-base font-medium text-text-black">
                                    Bathroom Cleaner
                                </td>
                                <td className="text-sm">70% Ethyl Bottle</td>
                                <td className="text-sm">June 04, 2022</td>
                                <td className="text-center py-3 rounded-tableRow">
                                    <button className="h-9 w-24 text-sm rounded-full text-black font-medium btn-color-3 border border-border-iconLight dark:text-white hover:bg-neutral-200 dark:hover:bg-lightColor-600">
                                        Pending
                                    </button>
                                </td>
                            </tr>


//Individual table items

<tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border">
                                        EXECUTIVE TABLE
                                    </td>
                                    <td className="text-left px-2 border">
                                        3 SIDE DRAWER. W/COMPUTER TABLE
                                        (FREE/SEPARATE), CHOCOLATE BROWN
                                    </td>
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                    <td className="text-center px-2 border">
                                        CHED11-ET-005
                                    </td>
                                    <td className="text-center px-2 border">
                                        16995.00
                                    </td>
                                    <td className="text-center px-2 border">
                                        December 26, 2019
                                    </td>
                                    <td className="text-center px-2 border">
                                        3RD FLR PANTRY
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                </tr>
                                {/* /index 1 */}
                                {/* index 1 */}
                                <tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border">
                                        EXECUTIVE TABLE
                                    </td>
                                    <td className="text-left px-2 border">
                                        3 SIDE DRAWER. W/COMPUTER TABLE
                                        (FREE/SEPARATE), CHOCOLATE BROWN
                                    </td>
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                    <td className="text-center px-2 border">
                                        CHED11-ET-005
                                    </td>
                                    <td className="text-center px-2 border">
                                        16995.00
                                    </td>
                                    <td className="text-center px-2 border">
                                        December 26, 2019
                                    </td>
                                    <td className="text-center px-2 border">
                                        3RD FLR PANTRY
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                </tr>
                                {/*  /index 1 */}
                                {/*  index 1 */}
                                <tr className="text-xs text-darkColor-700 h-12 border dark:border-neutral-700 bg-white dark:bg-darkColor-800 dark:text-white">
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border">
                                        EXECUTIVE TABLE
                                    </td>
                                    <td className="text-left px-2 border">
                                        3 SIDE DRAWER. W/COMPUTER TABLE
                                        (FREE/SEPARATE), CHOCOLATE BROWN
                                    </td>
                                    <td className="text-center px-2 border">
                                        1
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                    <td className="text-center px-2 border">
                                        CHED11-ET-005
                                    </td>
                                    <td className="text-center px-2 border">
                                        16995.00
                                    </td>
                                    <td className="text-center px-2 border">
                                        December 26, 2019
                                    </td>
                                    <td className="text-center px-2 border">
                                        3RD FLR PANTRY
                                    </td>
                                    <td className="text-center px-2 border"></td>
                                </tr>


//ICS table ITems

<tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* ICS No. */}
                    <td>
                        <a className="text-left pl-6 flex items-center w-full gap-3">
                            <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                2022-001-14
                            </p>
                        </a>
                    </td>
                    {/* Description & Date Acquired */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                                    Printer
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    October 19, 2022
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Amount */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-primary">
                                    8,235.00
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    Php
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Remarks/Transferred */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    From John Doe
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Actions */}
                    <td>
                        <div
                            onClick={() => clickSubForms("open")}
                            className="flex items-center justify-center w-full gap-3 cursor-pointer"
                        >
                            <div className="">
                                <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                {/*item 1*/}
                {/*item 2*/}
                <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* ICS No. */}
                    <td>
                        <a className="text-left pl-6 flex items-center w-full gap-3">
                            <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                2022-001-14
                            </p>
                        </a>
                    </td>
                    {/* Description & Date Acquired */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                                    Printer
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    October 19, 2022
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Amount */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-primary">
                                    8,235.00
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    Php
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Remarks/Transferred */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    From John Doe
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Actions */}
                    <td>
                        <div
                            onClick={() => clickSubForms("open")}
                            className="flex items-center justify-center w-full gap-3 cursor-pointer"
                        >
                            <div className="">
                                <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                {/*item 2*/}
                {/*item 3*/}
                <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* ICS No. */}
                    <td>
                        <a className="text-left pl-6 flex items-center w-full gap-3">
                            <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                2022-001-14
                            </p>
                        </a>
                    </td>
                    {/* Description & Date Acquired */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                                    Printer
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    October 19, 2022
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Amount */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-primary">
                                    8,235.00
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    Php
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Remarks/Transferred */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    From John Doe
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Actions */}
                    <td>
                        <div
                            onClick={() => clickSubForms("open")}
                            className="flex items-center justify-center w-full gap-3 cursor-pointer"
                        >
                            <div className="">
                                <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                {/*item 3*/}
                {/*item 4*/}
                <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* ICS No. */}
                    <td>
                        <a className="text-left pl-6 flex items-center w-full gap-3">
                            <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                2022-001-14
                            </p>
                        </a>
                    </td>
                    {/* Description & Date Acquired */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                                    Printer
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    October 19, 2022
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Amount */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-primary">
                                    8,235.00
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    Php
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Remarks/Transferred */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    From John Doe
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Actions */}
                    <td>
                        <div
                            onClick={() => clickSubForms("open")}
                            className="flex items-center justify-center w-full gap-3 cursor-pointer"
                        >
                            <div className="">
                                <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                {/*item 4*/}
                {/*item 5*/}
                <tr className="h-14 text-xs border dark:border-neutral-700 bg-t-bg text-th dark:bg-darkColor-700 dark:text-white cursor-default">
                    {/* ICS No. */}
                    <td>
                        <a className="text-left pl-6 flex items-center w-full gap-3">
                            <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                2022-001-14
                            </p>
                        </a>
                    </td>
                    {/* Description & Date Acquired */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="2xl:text-[17px] xl:text-[15px] text-[15px] font-medium text-text-black">
                                    Printer
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    October 19, 2022
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Amount */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[16px] font-medium text-primary">
                                    8,235.00
                                </h4>
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    Php
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Remarks/Transferred */}
                    <td>
                        <a className="text-left flex items-center w-full gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#878787] 2xl:text-[14px] xl:text-[12px] text-[12px]">
                                    From John Doe
                                </p>
                            </div>
                        </a>
                    </td>
                    {/* Actions */}
                    <td>
                        <div
                            onClick={() => clickSubForms("open")}
                            className="flex items-center justify-center w-full gap-3 cursor-pointer"
                        >
                            <div className="">
                                <div className="btn-color-3 rounded-full py-2 px-3 text-text-black">
                                    <i className="fa-solid fa-eye"></i> View
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>