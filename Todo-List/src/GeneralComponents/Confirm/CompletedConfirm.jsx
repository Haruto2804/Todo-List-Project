export function CompletedConfirm({ setIsSelectAll, handleConfirmAction, handleCompletedConfirm, isOpenCompletedConfirm }) {
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
      ${isOpenCompletedConfirm ? "opacity-100 scale-100 transition-all duration-300 ease-in-out" : "pointer-events-none opacity-0 scale-100 transition-all duration-300 ease-in-out"}
      `}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <span className="material-symbols-outlined text-4xl text-green-500 dark:text-green-400">check_circle</span>
          </div>
        </div>
        <p className="text-2xl font-bold">Are you sure want to complete this task?</p>
        <p className="text-lg text-gray-400 font-bold">This action is permanent and cannot be undone.</p>
        <div className="flex w-full gap-5">
          <button
            onClick={() => {
              handleCompletedConfirm();
              setIsSelectAll(false);
            }}
            className="font-bold flex-1 px-10 w-full py-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-white/30 transition-all">
            Cancel
          </button>
          <button
            onClick={() => {
              handleConfirmAction();
            }}
            className={`font-bold 
          flex-1 
          px-10 
          py-3 
          rounded-lg 
          bg-blue-700 
          cursor-pointer 
          hover:bg-blue-500 
          transition-all`
            }>Completed</button>
        </div>
      </div>
    </>
  )
}