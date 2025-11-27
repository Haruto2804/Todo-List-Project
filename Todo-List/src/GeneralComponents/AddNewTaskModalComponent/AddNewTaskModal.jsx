import { ModalHeader } from './ModalHeader'
import { ModalInput } from './ModalInput'
import { ModalPriority } from './ModalPriority'
import { ModalDescription } from './ModalDescription'
import { useCallback, useState } from 'react'
import React from 'react'
import { getTaskDateStamp,getTodayStamp } from '../../utils/DateUtils'
export const AddNewTaskModal = React.memo(function AddNewTaskModal({ setIsErrorInputOpen, setError, addTasks, isOpen, handleAddNewTask }) {
  const [todoName, setTodoName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const currentDate = new Date();
  // Lấy ngày hôm nay ở định dạng YYYY-MM-DD (cần cho logic lọc)
  const defaultDateString = currentDate.toISOString().split('T')[0];
  const handleSaveTodo = useCallback(() => {
    setError(null);
    if (todoName.trim() === '' && date.trim() === '') {
      setError('Task Name and Due Date cannot be empty')
      setIsErrorInputOpen(true);
      return;
    }
    else if (todoName.trim() === '') {
      setError('Task Name cannot be empty');
      setIsErrorInputOpen(true);
      return;
    } else if (date.trim() === '') {
      setError('Task Due Date cannot be empty');
      setIsErrorInputOpen(true);
      return;
    }
    const todayStamp = getTodayStamp();
    const taskDateStamp = getTaskDateStamp(date);
    if (taskDateStamp < todayStamp) {
      setError('Task Date cannot be in the past');
      setIsErrorInputOpen(true);
      return;
    }
    const newTaskData = {
      name: todoName,
      completed: false,
      userId: crypto.randomUUID(),
      priority: priority || 'Medium',
      date: date || defaultDateString,
      isDeleted: false,
      description: description,
      id: crypto.randomUUID(),
    }
    addTasks(newTaskData);
    handleAddNewTask();
  },[addTasks, date, defaultDateString, description, handleAddNewTask, priority, setError, setIsErrorInputOpen, todoName])

  const modalClasses = `
        fixed 
        pt-5 
        px-10 
        pb-20 
        absolute 
        justify-around
        top-1/2 
        left-1/2 
        -translate-x-1/2 
        -translate-y-1/2 
        bg-opacity-50 
        flex 
        flex-col 
        gap-4
        shadow-xl 
        bg-white rounded-xl w-1/2 z-30
        ${isOpen ? 'opacity-100 scale-100 transition-all duration-300 ease-in-out' : 'opacity-0 scale-95 pointer-events-none transition-all duration-300 ease-in-out'} `;
  return (
    <>
      <div className={`${modalClasses} select-none`} >
        <ModalHeader header="Add new task" subtitle="Fill in the details below to add a new task."></ModalHeader>
        <hr className=" border-t border-gray-300 w-full" />
        <ModalInput setTodoName={setTodoName} setDate={setDate} defaultDateString={defaultDateString}></ModalInput>
        <ModalPriority setPriority={setPriority}></ModalPriority>
        <hr className=" border-t border-gray-300 w-full" />
        <ModalDescription setDescription={setDescription}></ModalDescription>
        <div className="flex gap-5 self-end">
          <button onClick={handleAddNewTask}
            className=" cursor-pointer hover:bg-slate-300 transition-all text-font rounded-lg  bg-slate-200 px-6 py-3 font-bold">Cancel</button>
          <button onClick={handleSaveTodo}
            className=" text-white cursor-pointer hover:bg-blue-600 transition-all text-font rounded-lg  bg-blue-500 px-6 py-3 font-bold">Add Task</button>
        </div>
      </div>
    </>
  )
})