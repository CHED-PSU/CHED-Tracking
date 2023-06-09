import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Alert from "../Alerts/Alert";
import io from "socket.io-client";
//const socket = io.connect("http://127.0.0.1:8001");

export default function Landing() {
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("Connected to server");
    //     });
    // }, [socket]);

    const user = localStorage.getItem("localSession");
    const value = JSON.parse(user);

    const [linked, setLinked] = useState(false);

    const handleClick = () => {
        setLinked(true);
    };

    const [tokenOnly, setTokenOnly] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const getToken = localStorage.getItem("token");
            if (getToken !== null) {
                const token = getToken.split("|");
                setTokenOnly(token);
                setToken(getToken);
                setLoading(false);
            } else {
                setTimeout(checkToken, 500);
            }
        };
        checkToken();
    }, []);

    function displayPhoto(profilePhoto, name, className) {
        if (profilePhoto == null || profilePhoto == "default.png") {
            return (
                <span
                    className={
                        className +
                        " bg-blue-900 flex-none dark:bg-blue-600 flex justify-center items-center 2xl:text-xl xl:text-base text-base text-white font-semibold rounded-full"
                    }
                >
                    {name.substring(0, 1)}
                </span>
            );
        } else {
            return (
                <img
                    draggable="false"
                    src="./img/profile-pic.jpeg"
                    className={
                        className + " rounded-full bg-gray-500 object-cover"
                    }
                />
            );
        }
    }

    function displayName(data, prefix) {
        const middleInitial = data.middlename
            ? data.middlename.substring(0, 1) + "."
            : "";
        const fullNamePrefixArr = [
            data.prefix || "",
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];
        const fullNameArr = [
            data.firstname || "",
            middleInitial,
            data.surname || "",
            data.suffix || "",
        ];

        if (prefix == false) {
            return fullNameArr.filter(Boolean).join(" ");
        } else {
            return fullNamePrefixArr.filter(Boolean).join(" ");
        }
    }

    const nav = useNavigate();
    const headers = () => {
        return {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };
    };

    const handleLogOut = () => {
        axios({
            url: "/api/logoutToken",
            method: "post",
            headers: headers(),
        }).then((response) => {
            if (response.data.status === true) {
                localStorage.removeItem("localSession");
                localStorage.removeItem("token");
                nav("/");
            }
        });

        // localStorage.removeItem("localSession");
        // localStorage.removeItem("token");
        // nav("/");
    };

    const [openAlert, setOpenAlert] = useState("question"); // none, check, question, or exclamation
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");

    function clickLogout(index) {
        setOpenAlert(index);
        setAlertHeader("Logout");
        setAlertIcon("question");
        setAlertDesc("Are you sure you want to logout?");
        setAlertNoButton("No");
        setAlertYesButton("Yes");
    }

    function clickProcure(role, index) {
        if (role == "Accounting" || role == 'COS/JO') {
            setOpenAlert(index);
            setAlertHeader("Unavailable");
            setAlertIcon("exclamation");
            setAlertDesc("You don't have permission to access this feature.");
            setAlertYesButton("None");
            setAlertNoButton("Okay");
        } else {
            window.location.href =
                "http://10.41.3.10:80/CHED-Procurement/token-checker.php?token=" +
                tokenOnly;
        }
    }

    function clickInventory(role, index) {
        window.location.href = "http://10.41.3.10:8080/login-page/" + token;
    }

    if (value) {
        if (value.Authenticated) {
            return (
                <div className="flex w-full h-screen bg-[#011284] flex-col items-center justify-center">
                    {/* Loader */}
                    {loading == true ? <Loader /> : ""}
                    {/* Loader */}

                    {openAlert === "open" ? (
                        <Alert
                            handleLogOut={handleLogOut}
                            clickLogout={clickLogout}
                            alertIcon={alertIcon}
                            alertHeader={alertHeader}
                            alertDesc={alertDesc}
                            alertButtonColor={alertButtonColor}
                            alertYesButton={alertYesButton}
                            alertNoButton={alertNoButton}
                        />
                    ) : (
                        ""
                    )}

                    <div
                        className="w-full fixed top-0 z-30 flex gap-4 items-center justify-end
                    xl:py-14 md:py-10 py-20
                    xl:px-20 md:px-10 px-28"
                    >
                        {/* Profile Button */}
                        <p className="text-white font-medium 2xl:text-base xl:text-xs md:text-[10px]">
                            {displayName(value, false)}
                        </p>
                        <button
                            onClick={() => clickLogout("open")}
                            title="Log Out"
                            className="outline-none flex dark:border-darkColor-800 bg-bg-iconLight dark:bg-bg-iconDark hover:bg-bg-iconLightHover dark:hover:bg-bg-iconDarkHover active:bg-bg-iconLightActive dark:active:bg-bg-iconDarkActive dark:text-lightColor-900 rounded-full justify-between transition duration-300 ease-in-out
                            2xl:h-12 xl:h-10 md:h-8 h-10
                            2xl:w-12 xl:w-10 md:w-8 w-10"
                        >
                            <div className="flex relative w-full justify-between xl:items-center items-center xl:h-full h-full rounded-xl ">
                                <div className="bg-black/30 w-full h-full opacity-0 hover:opacity-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition ease-in-out delay-150">
                                    <i className="fa-solid text-xl fa-arrow-right-from-bracket text-darkColor-800"></i>
                                </div>
                                {displayPhoto(
                                    value.img,
                                    value.firstname,
                                    "w-full h-full border-white"
                                )}
                            </div>
                        </button>
                    </div>

                    <div
                        className="z-0 bg-cover bg-center bg-circle-huge absolute right-0 mt-10
                        2xl:w-[850px] xl:w-[500px] lg:w-[600px] md:w-[540px] w-[540px]
                        2xl:h-[800px] xl:h-[550px] lg:h-[600px] md:h-[540px] h-[540px]
                    "
                    ></div>
                    <div
                        className="flex flex-col z-10
                     xl:gap-4 md:gap-1 gap-14
                     "
                    >
                        <div className="flex flex-col gap-5 mt-18 w-full items-left cursor-default">
                            <h5
                                className="text-white font-medium
                            2xl:text-base xl:text-sm lg:text-sm md:text-ss
                            "
                            >
                                CHEDRO XI
                            </h5>
                            <h2
                                className="font-bold text-white
                            2xl:text-7xl xl:text-4xl lg:text-5xl md:text-4xl
                            "
                            >
                                Make Your Operations
                            </h2>
                            <h2
                                className="font-bold text-[#F9D909]
                            2xl:text-7xl xl:text-4xl lg:text-5xl md:text-4xl
                            "
                            >
                                Smoother
                            </h2>
                        </div>
                        <div
                            className="flex rounded-2xl bg-white mt-6 border-2 border-[#0E37FD]
                        2xl:gap-10 lg:gap-5 gap-4
                        2xl:p-10 xl:p-5 p-10
                        "
                        >
                            <div
                                className="flex-col gap-6 font-extrabold text-xl pt-10
                                2xl:pr-14 xl:pr-4 lg:pr-5
                                2xl:flex xl:flex lg:flex md:hidden hidden
                                2xl:w-[300px] xl:w-[225px] md:w-[200px] w-[300px]
                                2xl:h-[400px] xl:h-[300px] md:h-[250px] h-[400px]
                                "
                            >
                                <h1
                                    className="leading-16 text-[#242526]
                                2xl:text-5xl xl:text-4xl md:text-4xl text-5xl
                                "
                                >
                                    Efficient systems{" "}
                                </h1>
                                <h4
                                    className="font-medium text-[#434343] leading-8
                                2xl:text-lg xl:text-base md:text-sm text-lg
                                "
                                >
                                    To streamline the supply chain and ensure
                                    optimal inventory levels.
                                </h4>
                            </div>
                            <div
                                onClick={() => clickProcure(value.role, "open")}
                                className="cursor-pointer hover:bg-[#FFD7D7] bg-[#FF9FBF] text-white flex flex-col justify-center items-center font-extrabold text-xl rounded-2xl transition ease-in-out delay-150
                                2xl:w-[300px] xl:w-[225px] md:w-[200px] w-[300px]
                                2xl:h-[400px] xl:h-[300px] md:h-[250px] h-[400px]
                                2xl:gap-10 xl:gap-8 lg:gap-4 md:gap-3 gap-5
                                2xl:text-lg xl:text-base lg:text-sm md:text-xs"
                            >
                                <div
                                    className="bg-cover bg-center bg-procurement-icon
                                2xl:w-[200px] xl:w-[140px] md:w-[150px] w-[200px]
                                2xl:h-[200px] xl:h-[140px] md:h-[150px] h-[200px]
                                "
                                ></div>
                                <p>Procurement</p>
                            </div>
                            <div
                                onClick={() =>
                                    clickInventory(value.role, "open")
                                }
                                className="cursor-pointer hover:bg-[#FDFF83] bg-[#FFDE6A] text-white flex flex-col justify-center items-center font-extrabold text-xl rounded-2xl transition ease-in-out delay-150
                                2xl:w-[300px] xl:w-[225px] md:w-[200px] w-[300px]
                                2xl:h-[400px] xl:h-[300px] md:h-[250px] h-[400px]
                                xl:gap-8 lg:gap-4 md:gap-3 gap-10
                                2xl:text-lg xl:text-base lg:text-sm md:text-xs"
                            >
                                <div
                                    className="bg-cover bg-center bg-inventory-icon
                                2xl:w-[200px] xl:w-[140px] md:w-[150px] w-[200px]
                                2xl:h-[200px] xl:h-[140px] md:h-[150px] h-[200px]
                                "
                                ></div>
                                <p>Inventory</p>
                            </div>
                            <div
                                onClick={handleClick}
                                className="cursor-pointer bg-[#2F52FF] hover:bg-[#82B4FF] text-white flex flex-col justify-center items-center font-extrabold text-xl rounded-2xl transition ease-in-out delay-150
                                2xl:w-[300px] xl:w-[225px] md:w-[200px] w-[300px]
                                2xl:h-[400px] xl:h-[300px] md:h-[250px] h-[400px]
                                xl:gap-8 lg:gap-4 md:gap-3 gap-10
                                2xl:text-lg xl:text-base lg:text-sm md:text-xs"
                            >
                                <div
                                    className="bg-cover bg-center bg-tracking-icon
                                2xl:w-[185px] xl:w-[130px] md:w-[135px] w-[200px]
                                2xl:h-[200px] xl:h-[140px] md:h-[150px] h-[200px]
                                "
                                ></div>
                                <p>Tracking</p>
                            </div>
                        </div>
                    </div>
                    {linked && (
                        <Navigate
                            to="/Trackagamitan"
                            state={{ linked: "success" }}
                        />
                    )}
                </div>
            );
        } else {
            return <Navigate to="/Login" />;
        }
    } else {
        return <Navigate to="/Login" />;
    }
}
