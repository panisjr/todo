import React, { useEffect, useState } from "react";
import { GoPlus, GoPencil } from "react-icons/go";
import { IoMdCheckmark, IoIosLogOut } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

let id = 0;
const Todolist = ({ lists, setLists, users, userID }) => {
  const [addTodo, setAddTodo] = useState("");
  const [description, setDescription] = useState("");
  const [ID, setID] = useState(0);
  const [selected, setSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();
  // To get the current Date and Time
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const today = new Date();
      const locale = "en";

      const formattedTime = today.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: true,
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  // Submit Todo List
  const submit = (addTodo, description) => {
    if (addTodo === "" || description === "") {
      Toast.fire({
        icon: "error",
        title: "Error: Make sure you filled all the fields!",
      });
    } else if (users.id) {
      Toast.fire({
        icon: "error",
        title: "Error: User ID is missing!",
      });
    } else if (addTodo && description) {
      setLists([
        ...lists,
        {
          id: id++,
          userID: userID,
          todo: addTodo,
          description: description,
        },
      ]);
      console.log(lists);
      Toast.fire({
        icon: "success",
        title: "Added successfully!",
      });
      setAddTodo("");
      setDescription("");
    } else {
      Toast.fire({
        icon: "error",
        title: "Error: Adding todo!",
      });
    }
  };
  // Delete Todo List
  const deleteTodo = (id) => {
    const myLists = [...lists];
    const findID = myLists.find((a) => a.id === id);
    if (findID !== "") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        draggable: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setLists(myLists.filter((a) => a.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    }
  };
  // Update Todo List
  const update = (updateTodo, updateDescription) => {
    const myList = [...lists];
    const updateList = myList.find((a) => a.id === ID);
    updateList.todo = updateTodo;
    updateList.description = updateDescription;
    setLists(myList);
    Toast.fire({
      icon: "success",
      title: `ID: ${updateList.id} Update successfully!`,
    });
    setAddTodo("");
    setDescription("");
    setSelected(false);
  };
  // Cancel Update
  const cancelUpdate = () => {
    setAddTodo("");
    setDescription("");
    setSelected(false);
  };
  useEffect(() => {
    setFilteredItems(lists);
  }, [lists]);

  // Search function
  const searchItems = (searchInput) => {
    setSearchTerm(searchInput);
    if (!searchInput.trim()) {
      setFilteredItems(lists);
    } else {
      setFilteredItems(
        lists.filter(
          (item) =>
            item.todo.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.description.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  };
  // To get the word type of Month instead of numbers
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedTodo = (list) => {
    setSelected(true);
    setAddTodo(list.todo);
    setDescription(list.description);
    setID(list.id);
  };
  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes ✔`,
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen">
        <div className=" flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-10 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-slate-400 hover:-x-6 duration-500">
          <div className="text-white ">
            <div className="flex items-start justify-between w-full">
              <div className="text-sm ">
                <p className="items-start justify-start text-cyan-300">
                  {`${
                    months[new Date().getMonth()]
                  } ${new Date().getDate()}, ${new Date().getFullYear()}`}
                </p>
                <p>{time}</p>
              </div>
              <IoIosLogOut
                className="text-2xl hover:text-red-500 cursor-pointer items-start"
                onClick={() => logout()}
              />
            </div>
            <div className="flex items-center justify-between pb-3">
              <div className="pt-4">
                <p className="text-4xl">Todo List</p>
                <p className="text-sm pt-2">
                  Get things done, one item at a time.
                </p>
              </div>
            </div>
            <div className="border-[1px] border-b-slate-300 "></div>

            {/* Content */}
            {lists.length > 0 ? (
              <>
                <div className="flex flex-col items-start my-5 p-2 rounded-md overflow-y-auto snap-center h-64">
                  <div className="pb-3 w-full">
                    <input
                      className="h-8 p-3 text-sm peer w-full border border-gray-300 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={searchTerm}
                      onChange={(e) => searchItems(e.target.value)}
                      placeholder="Search todo..."
                    />
                  </div>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      if (item.userID === userID) {
                        return (
                          <>
                            <div
                              key={item.id}
                              className="flex items-center text-sm border-[1px] border-white rounded-sm mb-2 w-full px-5 py-2"
                            >
                              <div className="text-sm w-full flex flex-row space-x-5">
                                <input type="checkbox" className="peer" />
                                <div className="peer-checked:line-through peer-checked:text-green-500">
                                  <p className="font-bold">{item.todo}</p>
                                  <div>
                                    <p>{item.description}</p>
                                  </div>
                                </div>
                              </div>
                              <GoPencil
                                className="text-2xl cursor-pointer hover:text-yellow-500 m-2"
                                onClick={() => {
                                  selectedTodo(item);
                                }}
                              />
                              <CiTrash
                                className="text-2xl cursor-pointer hover:text-red-600"
                                onClick={() => {
                                  deleteTodo(item.id);
                                }}
                              />
                            </div>
                          </>
                        );
                      }
                    })
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <i>No results found</i>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center py-10">
                  <i className="pb-5">Time to chill! You have no todos.</i>
                  <img className="w-20" src="/latte-art.png" alt="Latte" />
                </div>
              </>
            )}

            {/* Add Todo List */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="w-full flex gap-2">
                {selected === true ? (
                  <>
                    <label
                      htmlFor="Todo"
                      className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Todo"
                        className="h-8 p-3 w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Todo"
                        value={addTodo}
                        onChange={(e) => setAddTodo(e.target.value)}
                      />

                      <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1a2437] p-0.5 text-sm text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Title
                      </span>
                    </label>
                    <button
                      className="text-sm flex items-center justify-center gap-2 bg-green-500 p-2 rounded-md hover:bg-green-600 duration-300"
                      onClick={() => update(addTodo, description)}
                    >
                      Update
                      <IoMdCheckmark />
                    </button>
                    <button
                      className="text-sm flex items-center justify-center bg-slate-900 p-2 gap-2 hover:bg-red-500 duration-300 rounded-md"
                      onClick={() => cancelUpdate()}
                    >
                      Cancel <RxCross1 />
                    </button>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="Todo"
                      className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Todo"
                        className="h-8 p-3 w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Todo"
                        value={addTodo}
                        onChange={(e) => setAddTodo(e.target.value)}
                      />

                      <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1a2437] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Title
                      </span>
                    </label>
                    <button
                      className="text-sm flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-md hover:bg-blue-950 duration-300"
                      onClick={() => submit(addTodo, description)}
                    >
                      Add
                      <GoPlus className="text-2xl" />
                    </button>
                  </>
                )}
              </div>
              <textarea
                type="text-area"
                id="Todo"
                className="w-full border-2 border-gray-200 h-20 p-3 text-sm text-black"
                placeholder="Add Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
