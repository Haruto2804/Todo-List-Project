import { IoArrowBackSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { DeleteConfirm } from "../GeneralComponents/Confirm/DeleteConfirm";
import { useCallback, useState } from "react";
import { UpdateConfirm } from "../GeneralComponents/Confirm/UpdateConfirm";
import { UpdateTask } from "../GeneralComponents/UpdateTask/UpdateTask";
import { InputError } from '../GeneralComponents/Error/InputError';
export function DetailsTodoPage({ updateTask, deleteTask, todo }) {
  // Ban đầu đặt là false để dialog không mở ngay lập tức
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isOpenUpdateConfirm, setIsOpenUpdateConfirm] = useState(false);
  const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [error, setError] = useState("");
  const [isErrorInputOpen, setIsErrorInputOpen] = useState(false);
  console.log('task de cap nhat detail todo',taskToUpdate)
  const { taskId } = useParams();
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  // Tìm task
  const foundTask = todo.find((task) => task.id === taskId);

  // Xử lý mở/đóng confirm dialog
  const handleDeleteConfirm = useCallback(() => {
    setIsOpenDeleteConfirm(isOpen => !isOpen);
  }, [])
  const handleUpdateConfirm = useCallback(() => {
    setIsOpenUpdateConfirm(isOpen => !isOpen);
  }, [])
  const handleUpdateTask = useCallback(() => {
    setIsOpenUpdateTask(isOpen => !isOpen);
  }, [])
  // Hàm mới để xử lý xóa và chuyển hướng
  const handleDeleteAndNavigate = useCallback((taskId) => {
    // 1. Thực hiện xóa task
    deleteTask(taskId);
    // 2. Chuyển hướng về trang chủ
    navigate('/');
  }, [deleteTask, navigate]); // Đưa dependency vào useCallback
  // Nếu không tìm thấy task, có thể trả về một thông báo hoặc chuyển hướng
  if (!foundTask) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl font-bold text-red-500">Task Not Found</h1>
        <Link to="/" className="mt-4 text-4xl text-blue-500 hover:text-blue-700">Go to Homepage</Link>
      </div>
    );
  }
  return (
    <>
      <div key={taskId} className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">

        <div className={`overlay fixed top-0 right-0 z-20 left-0 bottom-0 bg-black/50
          ${isOpenDeleteConfirm || isOpenUpdateConfirm || isOpenUpdateTask || isErrorInputOpen
            ? 'opacity-100 transition-all duration-300 ease-in-out'
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}
          onClick={() => {
            if (isOpenDeleteConfirm) handleDeleteConfirm();
            else if (isOpenUpdateConfirm) handleUpdateConfirm();
            else if (isOpenUpdateTask) handleUpdateTask();
            else if (isErrorInputOpen) setIsErrorInputOpen(false);

          }}></div>
        <main className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Chi tiết công việc</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Xem thông tin chi tiết và quản lý công việc của bạn.</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg border border-slate-200">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="text-xl font-medium text-gray-500 ">Tên công việc</label>
                  <p className="mt-1 text-3xl font-semibold ">{foundTask.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày hết hạn</label>
                  <p className="mt-1">{foundTask.date}</p>
                </div>
                <div >
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <div className="mt-3">
                    <span className={foundTask.priority === "High" ? " text-red-800 bg-red-200 font-medium rounded-xl text-center py-1 px-5 " :
                      foundTask.priority === "Medium" ? "text-yellow-800 bg-yellow-200 font-medium rounded-xl text-center p-2" :
                        foundTask.priority === "Low" ? "text-gray-800 bg-gray-200 font-medium rounded-xl text-center p-2"
                          : "text-green-800 bg-green-200 font-medium rounded-xl text-center p-2"

                    }>{foundTask.priority}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 ">Trạng thái hoàn thành</label>
                  <div className={`mt-1
                    flex 
                    items-center 
                    gap-2 
                    ${foundTask.completed ? "text-green-500" : "text-red-500"} `}>

                    <IoMdCloseCircle className="size-5"></IoMdCloseCircle>
                    <span className="font-medium">{foundTask.completed ? "Completed" : "InCompleted"}</span>
                  </div>
                </div>
                <div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500 ">Description</label>
                  <p className="mt-1 ">
                    {foundTask.description}
                  </p>
                </div>
                <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-700 my-2"></div>
                <div>
                  <label className="text-sm font-medium text-gray-500 ">ID Task</label>
                  <p className="mt-1 font-mono text-sm ">{foundTask.id}</p>
                </div>

              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row-reverse items-center gap-3 rounded-b-lg">
              <button 
              onClick = {handleUpdateTask}
              className="w-full 
              sm:w-auto 
              inline-flex 
              items-center 
              justify-center 
              gap-2 
              px-4 
              py-2 
              text-sm 
              font-semibold 
              text-white 
              bg-blue-500
              rounded 
              shadow-sm 
              hover:bg-blue-700 
              transition-all
              cursor-pointer
              " type="button">

                <FaPen className="size-5"></FaPen>
                Update
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="w-full 
              sm:w-auto 
              inline-flex 
              items-center 
              justify-center 
              gap-2 
              px-4 
              py-2 
              text-sm 
              font-semibold 
              text-white
              bg-red-500
              rounded shadow-sm 
              hover:bg-red-700
              transition-all
              cursor-pointer
              duration-200" type="button">
                <IoTrashOutline className="size-5"></IoTrashOutline>
                Delete
              </button>
              <Link to="/" className="w-full sm:w-auto sm:mr-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 rounded shadow-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors duration-200" href="#">

                <IoArrowBackSharp className="size-5"></IoArrowBackSharp>
                Back
              </Link>
            </div>
          </div>
        </main>
      </div>
      <DeleteConfirm
        taskIdToDelete={foundTask.id}
        handleDeleteConfirm={handleDeleteConfirm}
        deleteTask={handleDeleteAndNavigate}
        isOpenDeleteConfirm={isOpenDeleteConfirm}
      />
      <UpdateConfirm
        updateTask={updateTask}
        taskToUpdate={taskToUpdate}
        handleUpdateConfirm={handleUpdateConfirm}
        isOpenUpdateConfirm={isOpenUpdateConfirm}
        handleUpdateTask = {handleUpdateTask}

      ></UpdateConfirm>


      <UpdateTask
        setIsErrorInputOpen={setIsErrorInputOpen}
        setError={setError}
        taskToUpdate={foundTask}
        setTaskToUpdate={setTaskToUpdate}
        isOpenUpdateTask={isOpenUpdateTask}
        handleUpdateTask={handleUpdateTask}
        handleUpdateConfirm={handleUpdateConfirm}
      >
      </UpdateTask>

      <InputError
        isErrorInputOpen={isErrorInputOpen}
        setIsErrorInputOpen={setIsErrorInputOpen}
        error={error}
      />
    </>
  )
}