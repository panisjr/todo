import React, { useState } from "react";
import { GoPlus, GoPencil } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import Swal from "sweetalert2";
import { CiTrash } from "react-icons/ci";

const Todolist = () => {
  let i = 0;
  const [addTodo, setAddTodo] = useState("");
  const [description, setDescription] = useState("");
  const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState(false);
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
    if (addTodo && description) {
      setLists([
        ...lists,
        {
          id: i++,
          todo: addTodo,
          description: description,
        },
      ]);
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
  // Update Todo List
  const update = (updateTodo, updateDescription) => {
    const myList = [...lists];
    const updateList = myList.find((a) => a.todo === updateTodo);
    updateList.todo = updateTodo;
    updateList.description = updateDescription;
    Toast.fire({
      icon: "success",
      title: "Update successfully!",
    });
    // setAddTodo("");
    // setDescription("");
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
  };
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen ">
        <div className="flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-5 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-slate-400 hover:-x-6 duration-500">
          <div className="text-white ">
            <div className="flex items-center justify-between pb-5">
              <div className="pt-4">
                <p className="text-3xl">Todo List</p>
                <p className="text-xs pt-2">
                  Get things done, one item at a time.
                </p>
              </div>
              <p className="text-xs items-start justify-start">
                {`${
                  months[new Date().getMonth()]
                } ${new Date().getDate()}, ${new Date().getFullYear()}`}
              </p>
            </div>
            <div className="border-[1px] border-b-slate-300 "></div>

            {/* Content */}
            {lists.length > 0 ? (
              <div className="flex flex-col items-start my-5 p-2 rounded-md overflow-y-auto snap-center h-64">
                {lists.map((list, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm border-[1px] border-white rounded-sm mb-2 w-full p-2"
                  >
                    <input type="checkbox" />
                    <div className="text-[11px] mx-2 w-full flex flex-col">
                      <p>{list.todo}</p>
                      <p className="ms-5">{list.description}</p>
                    </div>
                    <GoPencil
                      className="text-2xl cursor-pointer hover:text-yellow-500 m-2"
                      onClick={() => {
                        selectedTodo(list);
                      }}
                    />
                    <CiTrash
                      className="text-2xl cursor-pointer hover:text-red-600"
                      onClick={() => {
                        setLists(lists.filter((a) => a.id !== list.id));
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <p>Time to chill! You have no todos.</p>
                <img className="w-20" src="/latte-art.png" alt="Latte" />
              </div>
            )}
            {/* Add Todo List */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="w-full flex gap-2">
                <label
                  htmlFor="Todo"
                  className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="text"
                    id="Todo"
                    className="h-8 p-3 w-full text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                    placeholder="Todo"
                    value={addTodo}
                    onChange={(e) => setAddTodo(e.target.value)}
                  />

                  <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1a2437] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Title
                  </span>
                </label>
                {selected === true ? (
                  <button
                    className="text-sm flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-md hover:bg-green-500 duration-300"
                    onClick={() => update(addTodo, description)}
                  >
                    Update
                    <IoMdCheckmark />
                  </button>
                ) : (
                  <button
                    className="text-sm flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-md hover:bg-blue-950 duration-300"
                    onClick={() => submit(addTodo, description)}
                  >
                    Add
                    <GoPlus />
                  </button>
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
