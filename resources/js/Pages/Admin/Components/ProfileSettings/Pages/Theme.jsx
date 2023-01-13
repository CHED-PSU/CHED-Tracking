import React from "react";

export default function Theme({ className }) {

    return (
        <div className={ className + " flex justify-center pt-3"}>
            
            <div className="relative flex flex-col flex-auto w-auto h-full pt-9 px-10">
                
            </div>
            <div className="flex w-full justify-between pt-10">
                <div className="w-1/2 pr-10 space-y-8">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium pl-3 cursor-default">Color Theme</h4>
                        <form action="">
                            <div className="flex flex-col space-y-3 pt-4">
                                <div className="flex gap-2 pl-5">
                                    <input type="radio" id="light" name="colortheme" value="Light Theme" className="cursor-pointer" defaultChecked/>
                                    <label htmlFor="light" className="cursor-pointer font-medium">Light Theme</label>
                                </div>
                                <div className="flex gap-2 pl-5">
                                    <input type="radio" id="dark" name="colortheme" value="Dark Theme" className="cursor-pointer" />
                                    <label htmlFor="dark" className="cursor-pointer font-medium">Dark Theme</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                        
            </div>

        </div>
    )
}