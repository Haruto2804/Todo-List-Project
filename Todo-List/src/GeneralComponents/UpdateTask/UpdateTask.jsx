
import { ModalPriority } from "../AddNewTaskModalComponent/ModalPriority";
import { ModalInput } from "../AddNewTaskModalComponent/ModalInput";
import { UpdateTaskHeader } from "./UpdateTaskHeader";
import { ModalDescription } from "../AddNewTaskModalComponent/ModalDescription";
import { useState } from "react";
import React from 'react'
export const UpdateTask = React.memo(function UpdateTask({ handleUpdateConfirm, isOpenUpdateConfirm, handleUpdateTask }) {
  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("sdsd");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  return (
    <>
      <div className={`
      z-30
      flex 
      flex-col 
      bg-slate-900
      text-white 
      p-8
      fixed 
      left-1/2 
      top-1/2 
      -translate-x-1/2 
      -translate-y-1/2 
      rounded-sm
      w-3/6
        ${isOpenUpdateConfirm ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "pointer-events-none opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      `}>
        <div className="flex flex-col gap-12">
          <UpdateTaskHeader handleUpdateConfirm={handleUpdateConfirm}></UpdateTaskHeader>
          <ModalInput todoName={todoName} date={date}></ModalInput>
          <ModalDescription description={description}></ModalDescription>
          <ModalPriority priority={priority}></ModalPriority>
          <div className="flex gap-5 self-end">
            <button
              onClick={handleUpdateTask}
              className=" cursor-pointer hover:bg-slate-300 transition-all text-font rounded-lg  bg-slate-500 px-6 py-3 font-bold">
              Cancel
            </button>
            <button
              onClick={() => {
                handleUpdateTask();
                handleUpdateConfirm();
              }

              }
              className=" text-white cursor-pointer hover:bg-blue-600 transition-all text-font rounded-lg  bg-blue-500 px-6 py-3 font-bold">
              Update
            </button>
          </div>

        </div>
      </div>
    </>
  )
})