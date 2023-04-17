import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DisplayUserInfo({
    className,
    user_id,
    withPrefix,
    displayPhoto,
}) {
    const [fullName, setFullName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [fullNamePrefix, setFullNamePrefix] = useState("");
    const id = user_id;
    const prefix = withPrefix;
    const isPhoto = displayPhoto;

    async function getUsersById(id) {
        try {
            const response = await axios.post("api/getUsersById", { id: id });
            const data = response.data.users;
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
            const profilePhoto = data.img;

            setProfilePhoto(profilePhoto);
            setFullNamePrefix(fullNamePrefixArr.filter(Boolean).join(" "));
            setFullName(fullNameArr.filter(Boolean).join(" "));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (id) {
            getUsersById(id);
        }
    }, [id]);

    function displayData(name, profilePhoto, nameWithPrefix, prefix, isPhoto) {
        if (isPhoto == true) {
            if (profilePhoto == null || profilePhoto == 'default.png') {
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
        } else {
            if (prefix == false) {
                return name;
            } else {
                return nameWithPrefix;
            }
        }
    }

    return displayData(fullName, profilePhoto, fullNamePrefix, prefix, isPhoto);
}
