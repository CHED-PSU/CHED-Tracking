import React from "react";

export default function Userprofile({ className, clickForms }) {

    return (
        <div className={className}>
            <div className="relative flex flex-col flex-auto w-auto h-full pt-9 px-10">
                <div className="flex justify-between pb-5">
                    <div className="w-[450px] space-y-2">
                        <h3 className="text-2xl text-primary font-semibold cursor-default">Know your current information</h3>
                        <p className="text-sm text-[#878787] cursor-default">Your basic information can be seen here. You cannot alter it, please be guided by your property custodian.</p>
                    </div>
                </div>
                <div className="flex w-full justify-between pt-10">
                    <div className="w-1/2 pr-10 space-y-8">
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium pl-3 cursor-default">Display Name</h4>
                            <div className="border rounded-full px-4 py-2">
                                <h6 className="text-[17px] text-[#434343] font-semibold">John Doe</h6>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium pl-3 cursor-default">Email</h4>
                            <div className="border rounded-full px-4 py-2">
                                <h6 className="text-[17px] text-[#434343] font-semibold">johndoe@example.com</h6>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium pl-3 cursor-default">Phone number</h4>
                            <div className="border rounded-full px-4 py-2">
                                <h6 className="text-[17px] text-[#434343] font-semibold">*******95</h6>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium pl-3 cursor-default">Password</h4>
                            <div className="border rounded-full px-4 py-2">
                                <h6 className="text-[17px] text-[#434343] font-semibold">************</h6>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                        <img className="rounded-full shadow-xl object-cover w-60 h-60 " src="./img/profile-pic.jpeg" alt="Profile picture" />
                    </div>
                </div>

            </div>
        </div>
    )
}