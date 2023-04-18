import { toUpper } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import Alert from "../Alerts/MultiModalAlert";
import axios from "axios";

export default function Transfer({
    className,
    clickMultiModal,
    selectedId,
    getInventoryItems,
    unselect,
}) {
    const [toggleTabs, setToggleTabs] = useState("pre-owner");
    const [openAlert, setOpenAlert] = useState(false);

    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();

    const confirmation = (index) => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
    };

    const setAlert = (index) => {
        setAlertIcon("question");
        setAlertHeader("Confirmation");
        setAlertDesc("Do you really want to return the items?");
        setAlertButtonColor("blue");
        setAlertNoButton("Cancel");
        setAlertYesButton("Confirm");
        setAlertFunction(true);
        setOpenAlert(index);

        if (index === false) {
            getInventoryItems();
            unselect();
            clickMultiModal("close");
        }
    };

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [usersJO, setUsersJO] = useState();
    const [selectedPerson, setSelectedPerson] = useState(1);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.get("api/getUserLists").then((res) => {
                    setUsers(res.data.user_lists);
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        const getUserJO = async () => {
            setLoading(true);
            try {
                await axios.get("api/getUserListsJO").then((res) => {
                    setUsersJO(res.data.user_lists);
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getUser();
        getUserJO();
    }, []);

    const confirmHandler = (event) => {
        event.preventDefault();
        setAlert(true);
    };

    function clickTabs(index) {
        setToggleTabs(index);
    }

    let modalBody = useRef();

    const personChanger = (e) => {
        setSelectedPerson(e.target.value);
    };

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

    const [items, setItems] = useState([]);

    useEffect(() => {
        function getInventory(index) {
            try {
                axios.post("api/getItemsofInventoriesById", { id: index }).then((response) => {
                    setItems(response.data.inventory_items_all);
                });
            } catch (e) {
                console.log(e);
            }
        }
        getInventory(selectedId);
    }, [selectedId]);

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
    }

    const itemsMapper = (items) => {
        return items?.map((data, index) => {
            return (
                <tr key={index}>
                    <td className="text-center p-2 border text-sm w-20">1</td>
                    <td className="text-center p-2 border text-sm">
                        {toUpper(data.unit)}
                    </td>
                    <td className="text-center p-2 border text-sm">
                        {formattedAmount(data.price)}
                    </td>
                    <td className="text-center p-2 border text-sm">
                        {toUpper(data.article)}
                    </td>
                    <td className="text-center p-2 border text-sm">
                        <p className="w-28 truncate">
                            {toUpper(data.description)}
                        </p>
                    </td>
                    <td className="text-center p-2 border text-sm">
                        {data.code}
                    </td>
                    <td className="p-2 border">
                        <div className="flex flex-col justify-between items-center">
                            <select
                                name=""
                                id="Assigned-to"
                                className="w-full text-sm rounded-md border border-neutral-500 p-2 outline-none cursor-pointer"
                            >
                                <option value="None">None</option>
                                {loading
                                    ? ""
                                    : usersJO?.map((data) => {
                                          return (
                                              <option
                                                  key={data.id}
                                                  value={data.id}
                                              >
                                                  {data.firstname +
                                                      " " +
                                                      data.surname}
                                              </option>
                                          );
                                      })}
                            </select>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
                <div
                    ref={modalBody}
                    className="w-2/5 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20"
                >
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default">
                        <div className="w-full text-left">
                            <button
                                onClick={() => clickMultiModal("close")}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <img
                            src="./img/assignto_icon.png"
                            className="w-12 pb-3"
                        />
                        <div className="text-2xl text-gray-800 font-semibold">
                            Assign a Personnel
                        </div>
                        <div className="text-xs">
                            Choose which user do you want to assign the item
                        </div>
                    </div>

                    <div className={className}>
                        <div className="space-y-3">
                            <div className="flex bg-gray-100 rounded-xl py-5 px-6 gap-3 cursor-default items-center">
                                {loading ? (
                                    <img
                                        draggable="false"
                                        src="./img/profile-pic.jpeg"
                                        className="w-18 h-18 rounded-full bg-gray-500 object-cover"
                                    />
                                ) : (
                                    displayPhoto(
                                        users[selectedPerson - 1].img,
                                        users[selectedPerson - 1].firstname,
                                        "w-18 h-18"
                                    )
                                )}
                                <div className="w-full space-y-2">
                                    <div className="border-b-2 border-gray-300 font-semibold pl-[10px] text-lg h-8 w-full">
                                        {loading
                                            ? ""
                                            : users[selectedPerson - 1]
                                                  .firstname +
                                              " " +
                                              (users[selectedPerson - 1]
                                                  .middlename
                                                  ? users[
                                                        selectedPerson - 1
                                                    ].middlename.substring(
                                                        0,
                                                        1
                                                    ) + "."
                                                  : "") +
                                              users[selectedPerson - 1]
                                                  .surname +
                                              " " +
                                              (users[selectedPerson - 1]
                                                  .suffix || "")}
                                    </div>
                                    <div className="font-medium pl-[10px] text-sm h-8 rounded-md w-56">
                                        {loading
                                            ? ""
                                            : users[selectedPerson - 1]
                                                  .designation
                                            ? users[selectedPerson - 1]
                                                  .designation
                                            : "N/A"}
                                    </div>
                                </div>
                            </div>
                            <form action="">
                                <div className="flex flex-col justify-between">
                                    <label
                                        htmlFor="Status"
                                        className="text-sm font-semibold"
                                    >
                                        Select a Receiver:
                                    </label>
                                    <select
                                        onChange={personChanger}
                                        name=""
                                        id="Status"
                                        className="w-full text-sm rounded-md border border-neutral-500 p-2 outline-none cursor-pointer"
                                    >
                                        {loading
                                            ? ""
                                            : users?.map((data) => {
                                                  return (
                                                      <option
                                                          key={data.id}
                                                          value={data.id}
                                                      >
                                                          {data.firstname +
                                                              " " +
                                                              data.surname}
                                                      </option>
                                                  );
                                              })}
                                    </select>
                                </div>

                                <table className="w-full my-8">
                                    <thead>
                                        <tr>
                                            <th className="font-medium p-2 border text-xs">
                                                Qty
                                            </th>
                                            <th className="font-medium p-2 border text-xs">
                                                Unit
                                            </th>
                                            <th className="font-medium p-2 border text-xs">
                                                Amount
                                            </th>
                                            <th
                                                className="font-medium p-2 border text-xs"
                                                colSpan={2}
                                            >
                                                Description
                                            </th>
                                            <th className="font-medium p-2 border text-xs w-80">
                                                Inventory Item No.
                                            </th>
                                            <th className="font-medium p-2 border text-xs w-64">
                                                Assign to
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{itemsMapper(items)}</tbody>
                                </table>

                                <div className="flex justify-center mt-[50px]">
                                    <button
                                        onClick={confirmHandler}
                                        className="w-28 h-10 p-1 rounded-full bg-primary dark:bg-active-icon hover:btn-color-2 text-lightColor-800 font-semibold"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {openAlert ? (
                        <Alert
                            alertIcon={alertIcon}
                            alertHeader={alertHeader}
                            alertDesc={alertDesc}
                            alertButtonColor={alertButtonColor}
                            alertYesButton={alertYesButton}
                            alertNoButton={alertNoButton}
                            alertFunction={alertFunction}
                            selectedId={selectedId}
                            selectedPerson={selectedPerson}
                            setAlert={setAlert}
                            confirmation={confirmation}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
