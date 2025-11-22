export function ModalDescription() {
  return (
    <>
      <div className="flex flex-col gap-3 focus:outline-blue-500 ">
        <p className="font-bold">Description
          <span className="text-gray-400 text-sm font-semibold">  (optional)</span>
        </p>
        <textarea
          placeholder="Add more details about the task..."
          // THÊM align-top VÀO ĐÂY
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
           focus:ring-blue-500
          "
        ></textarea>
      </div>
    </>
  )
}