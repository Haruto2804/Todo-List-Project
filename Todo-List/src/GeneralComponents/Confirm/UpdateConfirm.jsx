import React from 'react'

export const UpdateConfirm = React.memo(function UpdateConfirm({ updateTask, taskToUpdate, handleUpdateConfirm, isOpenUpdateConfirm, handleUpdateTask }) {
  return (
    <>
      <div className={`
      z-30
      flex 
      flex-col 
      bg-gray-800 
      text-white 
      p-12 
      gap-5 
      items-center 
      fixed 
      left-1/2 
      top-1/2 
      -translate-x-1/2 
      -translate-y-1/2 
      rounded-sm
      ${isOpenUpdateConfirm ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "pointer-events-none opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      `}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <span className="material-symbols-outlined text-3xl text-blue-500 dark:text-blue-400 ">check_circle</span>
          </div>
        </div>
        <p className="text-2xl font-bold">Are you sure want to update this task?</p>
        <p className="text-lg text-gray-400 font-bold">This action is permanent and cannot be undone.</p>
        <div className="flex w-full gap-5">
          <button
            onClick={() => {
              updateTask(taskToUpdate);
              handleUpdateConfirm();
              handleUpdateTask();
            }}
            className="font-bold flex-1 px-10 w-full py-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-white/30 transition-all">
            Cancel
          </button>
          <button

            className={`font-bold 
          flex-1 
          px-10 
          py-3 
          rounded-lg 
          bg-blue-700 
          cursor-pointer 
          hover:bg-blue-500 
          transition-all`
            }
            onClick={() => {
              updateTask(taskToUpdate);
              handleUpdateConfirm();
            }}
          >Update</button>
        </div>
      </div>
    </>
  )
})