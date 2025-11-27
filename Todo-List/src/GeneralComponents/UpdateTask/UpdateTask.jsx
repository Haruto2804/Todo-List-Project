/* eslint-disable react-hooks/set-state-in-effect */
import { ModalPriority } from "../AddNewTaskModalComponent/ModalPriority";
import { ModalInput } from "../AddNewTaskModalComponent/ModalInput";
import { UpdateTaskHeader } from "./UpdateTaskHeader";
import { ModalDescription } from "../AddNewTaskModalComponent/ModalDescription";
import { useState, useEffect } from "react";
import { getTaskDateStamp, getTodayStamp } from "../../utils/DateUtils";
import React from 'react'

export const UpdateTask = React.memo(function UpdateTask({ 
  setIsErrorInputOpen, 
  setError, 
  taskToUpdate, 
  setTaskToUpdate, 
  handleUpdateConfirm, 
  isOpenUpdateTask, 
  handleUpdateTask 
}) {
  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (taskToUpdate && taskToUpdate.id) {
      setTodoName(taskToUpdate.name || "");  // ĐỔI từ .todo thành .name
      setDescription(taskToUpdate.description || "");
      setPriority(taskToUpdate.priority || "");
      setDate(taskToUpdate.date || "");
    }
  }, [taskToUpdate]);

  const handleSaveUpdateTask = () => {
    setError(null);
    
    // Validation
    if (todoName.trim() === '' && date.trim() === '') {
      setError('Task Name and Due Date cannot be empty')
      setIsErrorInputOpen(true);
      return false;  // Trả về false nếu có lỗi
    }
    else if (todoName.trim() === '') {
      setError('Task Name cannot be empty');
      setIsErrorInputOpen(true);
      return false;
    } 
    else if (date.trim() === '') {
      setError('Task Due Date cannot be empty');
      setIsErrorInputOpen(true);
      return false;
    }

    const todayStamp = getTodayStamp();
    const taskDateStamp = getTaskDateStamp(date);
    if (taskDateStamp < todayStamp) {
      setError('Task Date cannot be in the past');
      setIsErrorInputOpen(true);
      return false;
    }

    // Tạo object hoàn chỉnh với tất cả thông tin
    const updatedTask = {
      ...taskToUpdate,  // Giữ lại id và completed
      name: todoName,
      description: description,
      priority: priority,
      date: date,
    }

    console.log('Updated task:', updatedTask);
    
    // Cập nhật taskToUpdate
    setTaskToUpdate(updatedTask);
    
    return true;  // Trả về true nếu thành công
  }

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
        ${isOpenUpdateTask ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "pointer-events-none opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      `}>
        <div className="flex flex-col gap-12">
          <UpdateTaskHeader handleUpdateConfirm={handleUpdateConfirm}></UpdateTaskHeader>
          <ModalInput todoName={todoName} setTodoName={setTodoName} date={date} setDate={setDate}></ModalInput>
          <ModalDescription description={description} setDescription={setDescription}></ModalDescription>
          <ModalPriority priority={priority} setPriority={setPriority}></ModalPriority>
          <div className="flex gap-5 self-end">
            <button
              onClick={handleUpdateTask}
              className="cursor-pointer hover:bg-slate-300 transition-all text-font rounded-lg bg-slate-500 px-6 py-3 font-bold">
              Cancel
            </button>
            <button
              onClick={() => {
                const success = handleSaveUpdateTask();
                if (success) {
                  handleUpdateTask();    // Đóng UpdateTask modal
                  handleUpdateConfirm(); // Mở UpdateConfirm modal
                }
              }}
              className="text-white cursor-pointer hover:bg-blue-600 transition-all text-font rounded-lg bg-blue-500 px-6 py-3 font-bold">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  )
})