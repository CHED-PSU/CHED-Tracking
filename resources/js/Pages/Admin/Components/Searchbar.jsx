import React from "react";

export default function Searchbar({ className,search }) {

    const submitHandler = (e)=>{
        e.preventDefault()
    }


    return (
        <div className= {className} onSubmit={submitHandler}>
            <div className="flex w-full h-full justify-center">
                <form action="">
                    <div className="relative h-full flex flex-auto justify-center items-center">
                        <input
                            onChange={(e)=> search(e.target.value)}
                            type="text"
                            name="search"
                            placeholder="Search"
                            autoComplete="off"
                            aria-label="Search"
                            className={className + "2xl:h-12 xl:h-10 h-10 2xl:pl-6 xl:pl-5 pl-5 pr-14 w-96 rounded-full outline-none ring-2 ring-white dark:ring-darkColor-900 focus:ring-sky-500 hover:ring-sky-500 dark:focus:ring-sky-500 dark:hover:ring-sky-500 border border-sc bg-[#F5F5F5] dark:bg-darkColor-800 dark:border-darkColor-700 dark:text-white"}
                        />
                        <button
                            title="Search"
                            type="submit"
                            className="absolute rounded-r-full right-0 font-semibold text-sm flex-none pl-5 pr-6 h-10 w-fit text-black dark:text-lightColor-800 text-center cursor-pointer"
                        >
                            <svg
                                className="w-4 pointer-events-none dark:fill-white"
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M232.8 382.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6z"
                                    fillOpacity=".4"
                                />
                                <path d="M220 41.6c-30.8 3.5-49.8 8.8-72 19.9-18.5 9.3-32.3 19-47.3 33.4-60.6 58.2-76.5 148.9-39 223.6 41 81.6 131.9 123.2 219.9 100.5 24.2-6.3 45.1-16.5 70-34.5 1.1-.7 11.1 8.7 42.6 40.1 45.6 45.4 45.5 45.3 56 44.1 13.2-1.6 21.3-14.2 17.8-27.4-1.2-4.4-4.6-8.1-42.9-46.6-31.7-31.8-41.3-42.1-40.6-43.1 19.5-26.8 30.9-51.8 37.1-80.8 3.2-15.3 4.4-44 2.5-59.4-3.4-27.2-12.5-54.2-25.6-75.9-20.2-33.3-47.5-58.3-82-75-18.9-9.1-34.5-14-54.3-17-9.7-1.5-35.6-2.7-42.2-1.9zm43.3 45.3c39.2 8.3 71.8 30.2 93.8 62.9 34 50.6 34 115.5.2 166.6-9 13.6-27.3 31.9-40.9 40.9-28.4 18.8-61.4 27.4-94.7 24.7-52.6-4.3-98-34.7-121.4-81.3-34.6-69-11.8-152.2 53.3-193.9C170 96.3 193.3 87.9 214.1 85c10.9-1.5 38.1-.5 49.2 1.9z" />
                                <path
                                    d="M232.8 425.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6z"
                                    fillOpacity=".27"
                                />
                                <path
                                    d="M390.5 422c2.1 2.2 4.1 4 4.4 4 .3 0-1.3-1.8-3.4-4-2.1-2.2-4.1-4-4.4-4-.3 0 1.3 1.8 3.4 4z"
                                    fillOpacity=".02"
                                />
                                <path
                                    d="M353 384.4c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm5.5 5.6c1 1.1 2 2 2.3 2 .3 0-.3-.9-1.3-2s-2-2-2.3-2c-.3 0 .3.9 1.3 2zm3.5 3.4c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm8 8c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm25 24.9c0 .2 1.5 1.6 3.3 3.3l3.2 2.9-2.9-3.3c-2.8-3-3.6-3.7-3.6-2.9zm28.5 28.7c4.9 4.9 9.2 9 9.5 9 .2 0-3.6-4.1-8.5-9-4.9-5-9.2-9-9.5-9-.2 0 3.6 4 8.5 9z"
                                    fillOpacity=".01"
                                />
                                <path
                                    d="M412 381.5c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5zm40.5 40.5c2.1 2.2 4.1 4 4.4 4 .3 0-1.3-1.8-3.4-4-2.1-2.2-4.1-4-4.4-4-.3 0 1.3 1.8 3.4 4z"
                                    fillOpacity=".04"
                                />
                                <path
                                    d="M390.5 360c1 1.1 2 2 2.3 2 .3 0-.3-.9-1.3-2s-2-2-2.3-2c-.3 0 .3.9 1.3 2zm24.5 24.4c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm5.5 5.6c1 1.1 2 2 2.3 2 .3 0-.3-.9-1.3-2s-2-2-2.3-2c-.3 0 .3.9 1.3 2zm3.5 3.4c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm8 8c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3zm25 24.9c0 .2 1.5 1.6 3.3 3.3l3.2 2.9-2.9-3.3c-2.8-3-3.6-3.7-3.6-2.9z"
                                    fillOpacity=".05"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

};
