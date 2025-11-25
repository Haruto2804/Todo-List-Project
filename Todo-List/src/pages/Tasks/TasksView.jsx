import { useLocation } from 'react-router-dom'
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import React from 'react'
export const TasksView = React.memo(function TasksView({ isOpenCompletedConfirm, isSelectAll, handleSelectAllClick, handleUpdateTask, handleDeleteConfirm, handleToggleCompleted, todo }) {
  console.log('render task view')
  const location = useLocation();
  const currentView = location.pathname.split('/').pop();
  const tasksToDisplay = todo || [];
  console.log('todo: sau khi add redner taskview',tasksToDisplay);
  const getTodayStart = () => {
    const now = new Date();
    // Đặt giờ, phút, giây, mili-giây về 00:00:00.000
    now.setHours(0, 0, 0, 0);
    // Trả về mốc thời gian Unix (số mili-giây từ 1970)
    return now.getTime();
  };
  const todayTimestamp = getTodayStart();
  const getTaskDateStart = (dateInput) => {
    if (!dateInput) return null;
    const taskDate = new Date(dateInput);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime();
  };
  const activeTasks = tasksToDisplay.filter((task) => task.isDeleted === false);
  let filteredTasks = [];
  switch (currentView) {
    case 'completed':
      filteredTasks = activeTasks.filter(task => task.completed === true);
      break;
    case 'upcoming':
      filteredTasks = activeTasks.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);
        // Công việc chưa hoàn thành VÀ ngày đến hạn là trong tương lai (> ngày hôm nay)
        return task.completed === false && taskTimestamp !== null && taskTimestamp > todayTimestamp;
      });
      break;
    case 'today':
      filteredTasks = activeTasks.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);

        return (taskTimestamp === todayTimestamp && !task.completed) ;
      });
      break;
    case 'all':
      filteredTasks = activeTasks.filter(task => !task.completed === true);
      break;
    default:
      filteredTasks = activeTasks;
      break;

  }
  const currentTime = new Date();
  const dateString = currentTime.toLocaleString('default', {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  });
    console.log('todo: sau khi loc curren view redner taskview',filteredTasks);
  const tasksIdFiltered = filteredTasks.map((task) => task.id) || [];
  return (
    <>
      <div className="ml-[250px] mr-79 flex-1 p-8 flex flex-col gap-5 overflow-y-auto">
        <div className="">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold">{currentView === "completed" ?
              "Completed's Tasks" : currentView === "upcoming" ? "Upcoming's Tasks"
                : currentView === "today" ? "Today's Tasks" : "All Tasks"
            }</p>
            <p className="text-gray-500 text-lg">{dateString}</p>
          </div>

        </div>
        <div>
          <div className="sort-controls flex gap-5 font-semibold">
            <select className="
            bg-gray-100    
              border           
            border-gray-300 
            text-gray-700    
              text-sm
              rounded-md   
              px-4           
              py-2             
              shadow-sm        
              focus:ring-2     
              focus:ring-blue-500
              outline-none
              cursor-pointer
              appearance-none">
              <option className="">Due Date (Ascending)</option>
              <option className="" cvalue="due_date_desc">Due Date (Descending)</option>
            </select>

            <select className="
              p-2 
            bg-gray-100     
              border           
            border-gray-300 
            text-gray-700    
              text-sm       
              rounded-md   
              px-4           
              py-2             
              shadow-sm        
              focus:ring-2     
              focus:ring-blue-500
              outline-none
              cursor-pointer
              appearance-none
            ">
              <option className="" value="priority_high">Priority (Ascending)</option>
              <option className="" value="priority_low">Priority (Descending)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-[auto,1fr,auto,auto,auto] border rounded-sm gap-5 border-gray-200">
          <div className="col-span-5 grid grid-cols-subgrid font-semibold h-10 items-center border-b border-gray-200 bg-slate-50 p-2">
            <input
              onClick={(e) => {
                handleSelectAllClick(e, tasksIdFiltered);

              }}
              disabled={filteredTasks.length === 0 || filteredTasks.every((task) => task.completed)}
              checked={isSelectAll}
              type="checkbox" className="size-5" />
            <p className="">Task Title</p>
            <p>Due Date</p>
            <p>Priority</p>
            <p>Action</p>
          </div>
          {filteredTasks.map((task) => {
            return (
              <div key={task.id} className=" cursor-pointer hover:bg-slate-100 transition-all col-span-5 grid grid-cols-subgrid items-center border-b border-gray-200 p-2">
                <input

                  type="checkbox"
                  checked={isOpenCompletedConfirm && !task.completed}
                  disabled={task.completed}
                  onChange={() => handleToggleCompleted(task.id)}
                  className="size-5 cursor-pointer"
                />
                <p className={task.completed === true ? "line-through opacity-30" : ""}>{task.todo}</p>
                <p className={task.completed === true ? "line-through opacity-30" : ""}>{task.date}</p>
                <p className={task.priority === "High" ? " text-red-800 bg-red-200 font-medium rounded-xl text-center p-2 " :
                  task.priority === "Medium" ? "text-yellow-800 bg-yellow-200 font-medium rounded-xl text-center p-2" :
                    task.priority === "Low" ? "text-gray-800 bg-gray-200 font-medium rounded-xl text-center p-2"
                      : "text-green-800 bg-green-200 font-medium rounded-xl text-center p-2"

                }>{task.priority}</p>
                <div className="flex flex-col opacity-0 hover:opacity-100 items-center">
                  <button
                    onClick={handleUpdateTask}
                    disabled={task.completed}
                    className="p-2 cursor-pointer hover:bg-black/10 transition-all rounded-full">
                    <GoPencil />
                  </button>
                  <button
                    disabled={task.completed}
                    onClick={() => handleDeleteConfirm(task.id)}
                    className="p-2 cursor-pointer hover:bg-black/10 transition-all rounded-full">
                    <FaRegTrashAlt />
                  </button>

                </div>
              </div>
            )
          })}

        </div>
      </div >

    </>
  )
})