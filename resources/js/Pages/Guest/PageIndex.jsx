import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Layouts/Login";
import InputError from "../../components/InputError";
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default function GuestIndex() {
    const navigate = useNavigate();

    const [formData, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const [alertUsername, setAlertUsername] = useState("");
    const [alertPass, setAlertPass] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            username: formData.username,
            password: formData.password,
        };

        if (data.username === "" && data.password !== "") {
            setAlertUsername("Please enter username.");
            setAlertPass("");
        } else if (data.username !== "" && data.password === "") {
            setAlertUsername("");
            setAlertPass("Please enter password.");
        } else if (data.username === "" && data.password === "") {
            setAlertUsername("Please enter username.");
            setAlertPass("Please enter password.");
        } else {
            axios
                .get("http://10.41.3.10:8080/sanctum/csrf-cookie")
                .then((response) => {
                    axios
                        .post("http://10.41.3.10:8080/api/login", {
                            username: formData.username,
                            password: formData.password,
                        })
                        .then((response) => {
                            const item = {
                                prefix: response.data.data.user.prefix,
                                firstname: response.data.data.user.firstname,
                                middlename: response.data.data.user.middlename,
                                surname: response.data.data.user.surname,
                                suffix: response.data.data.user.suffix,
                                img: response.data.data.user.img,
                                role: response.data.data.user.role,
                                id: response.data.data.user.id,
                            };
                            localStorage.setItem(
                                "token",
                                response.data.data.token
                            );
                        });
                });

            axios
                .post("/api/login", {
                    data: data,
                })
                .then((response) => {
                    const item = {
                        prefix: response.data.prefix,
                        firstname: response.data.firstname,
                        middlename: response.data.middlename,
                        surname: response.data.surname,
                        suffix: response.data.suffix,
                        img: response.data.img,
                        role: response.data.role,
                        Authenticated: response.data.Authenticated,
                        Path: response.data.destinations,
                        id: response.data.id,
                    };

                    if (item.Authenticated === "true") {
                        navigate("/Portal");
                        localStorage.setItem(
                            "localSession",
                            JSON.stringify(item)
                        );
                    } else {
                        if (item.Authenticated === "Username not found.") {
                            console.log(item.Authenticated);
                            setAlertUsername(item.Authenticated);
                            setAlertPass("");
                        }
                        if (item.Authenticated === "Password is incorrect.") {
                            console.log(item.Authenticated);
                            setAlertUsername("");
                            setAlertPass(item.Authenticated);
                        }
                    }
                });
        }
    };

    return (
        <Login>
            <form
                onSubmit={submitHandler}
                className="flex flex-col justify-center 2xl:space-y-5 xl:space-y-4 space-y-4 dark:text-lightColor-800"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="2xl:text-sm xl:text-[13px] text-[13px] text-[434343] font-semibold mb-1 select-none"
                    >
                        Username/Email Address
                    </label>
                    <input
                        maxLength={12}
                        type="text"
                        name="username"
                        id="username"
                        className="w-full h-12 bg-lightColor-800 py-2 px-4 dark:bg-darkColor-900 border-none outline-sky-300 dark:outline-none rounded-lg ring-2 ring-white focus:ring-sky-500 hover:ring-sky-500"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <InputError
                        message={alertUsername}
                        className="mt-1 -mb-1 text-sm text-red-500"
                    />
                </div>

                <div className="">
                    <label
                        htmlFor="password"
                        className="2xl:text-sm xl:text-[13px] text-[13px] mb-1 text-[434343] font-semibold select-none"
                    >
                        Password
                    </label>
                    <input
                        maxLength={12}
                        type="password"
                        name="password"
                        autoComplete="off"
                        id="password"
                        className="w-full h-12 bg-lightColor-800 py-2 px-4 dark:bg-darkColor-900 border-none outline-sky-300 dark:outline-none rounded-lg ring-2 ring-white focus:ring-sky-500 hover:ring-sky-500"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <InputError
                        message={alertPass}
                        className="mt-1 text-sm text-red-500"
                    />
                </div>

                <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            className="rounded"
                        />
                        <label
                            htmlFor="remember"
                            className="cursor-pointer select-none 2xl:text-sm xl:text-[13px] text-[13px]"
                        >
                            Remember me
                        </label>
                    </div>

                    <a
                        href=""
                        className="text-darkColor-800 2xl:text-sm xl:text-[13px] text-[13px] dark:text-lightColor-800 font-semibold"
                    >
                        Forgot your password?
                    </a>
                </div>

                <div className="">
                    {

                        <button className="flex flex-none justify-center items-center btn-sm my-3 p-3 bg-primary rounded-full text-white 2xl:text-base xl:text-sm text-sm w-full cursor-pointer">
                            Log In
                        </button>
                    }
                </div>
            </form>
        </Login>
    );
}
