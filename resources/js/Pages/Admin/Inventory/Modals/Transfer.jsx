import { toUpper } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import MultiModalAlert from "../Alerts/MultiModalAlert";
import Alert from "../Alerts/Alert";
import axios from "axios";

export default function Transfer({
    className,
    clickMultiModal,
    selectedId,
    getInventoryItems,
    unselect,
}) {
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [alertIcon, setAlertIcon] = useState("question"); // none, check, question, or exclamation
    const [alertHeader, setAlertHeader] = useState("Please set Alert Header");
    const [alertDesc, setAlertDesc] = useState("Please set Alert Description");
    const [alertButtonColor, setAlertButtonColor] = useState("blue"); // none, blue, or red
    const [alertYesButton, setAlertYesButton] = useState("Yes");
    const [alertNoButton, setAlertNoButton] = useState("No");
    const [alertFunction, setAlertFunction] = useState();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [usersJO, setUsersJO] = useState();

    useEffect(() => {
        function getInventory(index) {
            try {
                axios
                    .post("api/getItemsofInventoriesById", { id: index })
                    .then((response) => {
                        setItems(response.data.inventory_items_all);
                    });
            } catch (e) {
                console.log(e);
            }
        }
        getInventory(selectedId);
    }, [selectedId]);

    function clickAlert(index) {
        setOpenAlertSuccess(index);

        if (index == false) {
            clickMultiModal("close");
        }
    }

    const confirmation = (index) => {
        setAlertIcon("check");
        setAlertHeader("Success");
        setAlertDesc("");
        setAlertButtonColor("none");
        setAlertNoButton("okay");
        setAlertYesButton("Confirm");
        setOpenAlert(false);
        clickAlert(true);
        setAlertFunction(true);
        getInventoryItems();
    };

    const setAlert = (index) => {
        if (selectedPerson == 0) {
            setAlertIcon("exclamation");
            setAlertHeader("Receiver not found");
            setAlertDesc("Please choose a receiver on the dropdown.");
            setAlertButtonColor("none");
            setAlertNoButton("Okay");
            setAlertFunction(true);
            setOpenAlert(index);
        } else {
            setAlertIcon("question");
            setAlertHeader("Confirmation");
            setAlertDesc("Do you really want to return the items?");
            setAlertButtonColor("blue");
            setAlertNoButton("Cancel");
            setAlertYesButton("Confirm");
            setAlertFunction(true);
            setOpenAlert(index);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.get("api/getUserLists").then((res) => {
                    setUsers(res.data.user_lists);
                    setUsersJO(res.data.user_lists_jo);
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    const confirmHandler = (event) => {
        event.preventDefault();
        setAlert(true);
    };

    let modalBody = useRef();

    const [selectedPerson, setSelectedPerson] = useState(0);
    const [selectedPersonJO, setSelectedPersonJO] = useState([]);

    const personChanger = (e) => {
        setSelectedPerson(e.target.value);
    };

    const personChangerJO = (index, e) => {
        const selectedPersonId = parseInt(e.target.value);
        setSelectedPersonJO((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = selectedPersonId;
            return updatedState;
        });
    };

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
                            {toUpper(
                                (data.make_model ? data.make_model : "") +
                                    (data.color ? ", " + data.color : "") +
                                    (data.sku ? ", SN: " + data.sku : "")
                            )}
                        </p>
                    </td>
                    <td className="text-center p-2 border text-sm">
                        {data.code}
                    </td>
                    <td className="p-2 border">
                        <div className="flex flex-col justify-between items-center">
                            <select
                                onChange={(e) => personChangerJO(index, e)}
                                name=""
                                id="Assigned-to"
                                className="w-full text-sm rounded-md border border-neutral-500 p-2 outline-none cursor-pointer"
                            >
                                <option value={0}>None</option>
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

    useEffect(() => {
        const defaultValues = items.map(() => 0);
        setSelectedPersonJO(defaultValues);
        defaultValues.forEach((value, index) => {
            personChangerJO(index, { target: { value } });
        });
    }, [items]);

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

    function formattedAmount(index) {
        const amount = index;
        const formattedAmount = Math.abs(amount).toLocaleString();
        return formattedAmount;
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

    return (
        <div className={className}>
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 h-full flex items-center justify-center z-50">
                <div
                    ref={modalBody}
                    className="w-2/5 bg-white dark:bg-darkColor-800 shadow-lg rounded-2xl px-12 py-10 space-y-4 z-20"
                >
                    <div className="flex flex-col items-center text-center dark:text-white cursor-default pb-2">
                        <div className="w-full text-left">
                            <button
                                onClick={() => clickMultiModal("close")}
                                className="text-xl dark:text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="text-2xl text-gray-800 font-semibold">
                            Transfer to other user
                        </div>
                        <div className="text-xs">
                            Choose which user do you want to assign the item
                        </div>
                    </div>
                    <div className={className}>
                        <div className="space-y-3">
                            <div className="flex bg-gray-100 rounded-xl py-4 px-5 gap-3 cursor-default items-center">
                                {selectedPerson == 0 ? (
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
                                <div className="w-full space-y-1">
                                    <div className="border-b-2 border-gray-300 font-semibold pl-[10px] text-lg h-8 w-full">
                                        {selectedPerson == 0
                                            ? "Please select a user"
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
                                    <div className="font-medium pl-[10px] text-sm h-8 rounded-md">
                                        {selectedPerson == 0
                                            ? "Select on the dropdown menu"
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
                                        <option value={0}>None</option>
                                        {loading
                                            ? ""
                                            : users?.map((data) => {
                                                  return (
                                                      <option
                                                          key={data.id}
                                                          value={data.id}
                                                      >
                                                          {displayName(
                                                              data,
                                                              false
                                                          )}
                                                      </option>
                                                  );
                                              })}
                                    </select>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto my-6">
                                    <table className="w-full">
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
                                </div>

                                <div className="flex justify-center">
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
                        <MultiModalAlert
                            alertIcon={alertIcon}
                            alertHeader={alertHeader}
                            alertDesc={alertDesc}
                            alertButtonColor={alertButtonColor}
                            alertYesButton={alertYesButton}
                            alertNoButton={alertNoButton}
                            alertFunction={alertFunction}
                            selectedId={selectedId}
                            selectedPerson={selectedPerson}
                            selectedPersonJO={selectedPersonJO}
                            setAlert={setAlert}
                            confirmation={confirmation}
                        />
                    ) : (
                        ""
                    )}
                    {openAlertSuccess ? (
                        <Alert
                            alertIcon={alertIcon}
                            alertHeader={alertHeader}
                            alertDesc={alertDesc}
                            alertButtonColor={alertButtonColor}
                            alertYesButton={alertYesButton}
                            alertNoButton={alertNoButton}
                            clickAlert={clickAlert}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
