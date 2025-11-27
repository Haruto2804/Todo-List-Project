/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from 'react-router-dom'
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GrExpand } from "react-icons/gr";
// Priority Weight được đưa ra ngoài component để là hằng số tĩnh, tối ưu hóa hiệu suất
const priorityWeight = {
  'High': 3,
  'Medium': 2,
  'Low': 1,
  'Completed': 0,
  'None': 0,
};

export const TasksView = React.memo(function TasksView({ selectedTasks, handleToggleSingleTask, handleDeleteAllCurrentView, setTaskToUpdate, setUpcomingTasks, isSelectAll, handleSelectAllClick, handleUpdateTask, handleDeleteConfirm, handleToggleCompleted, todo }) {

  // ✅ CẬP NHẬT: Đặt giá trị mặc định ban đầu là 'date_none'
  const [sortOrder, setSortOrder] = useState('date_none');
  const [sortPriorityOrder, setSortPriorityOrder] = useState('priority_none');

  const location = useLocation();
  const currentView = location.pathname.split('/').pop();

  const activeTasks = useMemo(() => (
    todo.filter((task) => task.isDeleted === false)
  ), [todo]);

  let filteredTasks = [];
  const getTodayStart = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  };
  const getTaskDateStart = useCallback((dateInput) => {
    if (!dateInput) return null;
    const taskDate = new Date(dateInput);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime();
  }, []);
  const todayTimestamp = getTodayStart();

  switch (currentView) {
    case 'completed':
      filteredTasks = activeTasks.filter(task => task.completed === true);
      break;
    case 'upcoming':
      filteredTasks = activeTasks.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);
        return task.completed === false && taskTimestamp !== null && taskTimestamp > todayTimestamp;
      });
      break;
    case 'today':
      filteredTasks = activeTasks.filter(task => {
        const taskTimestamp = getTaskDateStart(task.date);
        return (taskTimestamp === todayTimestamp && !task.completed);
      });
      break;
    case 'all':
      filteredTasks = activeTasks.filter(task => task.completed === false);
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
  const tasksIdFiltered = filteredTasks.map((task) => task.id) || [];

  useEffect(() => {
    const today = getTodayStart();
    const upcomingTask = activeTasks.filter((task) => {
      const taskDate = getTaskDateStart(task.date);
      return !task.completed && (taskDate > today);
    })
    setUpcomingTasks(upcomingTask);
  }, [activeTasks, getTaskDateStart, setUpcomingTasks]);


  // LOGIC sắp xếp due date
  const handleSortDateAscending = useCallback((a, b) => {
    const dateA = getTaskDateStart(a.date);
    const dateB = getTaskDateStart(b.date);
    if (dateA === null && dateB !== null) return 1;
    if (dateA !== null && dateB === null) return -1;
    if (dateA === null && dateB === null) return 0;
    return dateA - dateB;
  }, [getTaskDateStart])

  const handleSortDateDescending = useCallback((a, b) => {
    const dateA = getTaskDateStart(a.date);
    const dateB = getTaskDateStart(b.date);
    if (dateA === null && dateB !== null) return 1;
    if (dateA !== null && dateB === null) return -1;
    if (dateA === null && dateB === null) return 0;
    return dateB - dateA;
  }, [getTaskDateStart])

  console.log(currentView)
  // LOGIC sắp xếp priority
  const handleSortPriorityAscending = useCallback((a, b) => {
    const weightA = priorityWeight[a.priority] || 0;
    const weightB = priorityWeight[b.priority] || 0;
    return weightA - weightB;
  }, []);

  const handleSortPriorityDescending = useCallback((a, b) => {
    const weightA = priorityWeight[a.priority] || 0;
    const weightB = priorityWeight[b.priority] || 0;
    return weightB - weightA;
  }, []);

  const sortedTasks = useMemo(() => {
    const tasksToSort = [...filteredTasks];

    // 1. Ưu tiên sắp xếp theo Priority
    if (sortPriorityOrder === 'priority_asc') {
      return tasksToSort.sort(handleSortPriorityAscending);
    }
    if (sortPriorityOrder === 'priority_desc') {
      return tasksToSort.sort(handleSortPriorityDescending);
    }

    // 2. Nếu Priority không được chọn, sắp xếp theo Due Date
    if (sortOrder === 'date_desc') {
      return tasksToSort.sort(handleSortDateDescending);
    }
    if (sortOrder === 'date_asc') {
      return tasksToSort.sort(handleSortDateAscending);
    }
    // Trường hợp mặc định 'date_none' (không sắp xếp theo ngày) thì trả về mảng gốc đã lọc

    return tasksToSort;
  }, [filteredTasks, sortOrder, sortPriorityOrder, handleSortDateAscending, handleSortDateDescending, handleSortPriorityAscending, handleSortPriorityDescending]);
  return (
    <>
      <div className="select-auto ml-[250px] mr-79 flex-1 p-8 flex flex-col gap-5 overflow-y-auto">
        <div className="">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold">{currentView === "completed"
              ? "Completed's Tasks"
              : currentView === "upcoming"
                ? "Upcoming's Tasks"
                : currentView === "today"
                  ? "Today's Tasks"
                  : currentView === "Todo-List-Project" 
                    ? "Home"
                    : "All Tasks"
            }
            </p>
            <p className="text-gray-500 text-lg">{dateString}</p>
          </div>
        </div>
        <div>
          <div className="flex w-full justify-between">
            <div className="sort-controls flex gap-5 font-semibold">
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setSortPriorityOrder('priority_none')
                }}
                className="
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
                <option className="" value="date_none">Due Date (None)</option>
                <option className="" value="date_asc">Due Date (Ascending)</option>
                <option className="" value="date_desc">Due Date (Descending)</option>
              </select>

              <select
                value={sortPriorityOrder}
                onChange={(e) => {
                  setSortPriorityOrder(e.target.value);
                  setSortOrder('date_none');
                }}
                className="
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
                <option className="" value="priority_none">Priority (None)</option>
                <option className="" value="priority_asc">Priority (Low - High)</option>
                <option className="" value="priority_desc">Priority (High - Low)</option>
              </select>
            </div>
            <button
              onClick={() => handleDeleteAllCurrentView(tasksIdFiltered)}
              className={`
              bg-red-600
               text-white 
               rounded-sm p-3 
               cursor-pointer 
               hover:bg-red-700 
               active:scale-96 
                `} >Delete All</button>
          </div>

        </div>
        <div className="grid grid-cols-[auto,1fr,auto,auto,auto] border rounded-sm gap-5 border-gray-200">
          <div className="col-span-5 col-row-1 grid grid-cols-subgrid font-semibold h-10 items-center border-b border-gray-200 bg-slate-50 p-2">
            <input
              onChange={(e) => {
                console.log('select check:', e.target.checked)
                handleSelectAllClick(e, tasksIdFiltered);
              }}
              disabled={sortedTasks.length === 0 || sortedTasks.every((task) => task.completed)}
              checked={isSelectAll}
              type="checkbox" className="size-5" />
            <p className="">Task name</p>
            <p>Due Date</p>
            <p>Priority</p>
            <p>Action</p>
          </div>
          {sortedTasks.map((task) => {
            return (

              <div key={task.id} className=" cursor-pointer hover:bg-slate-100 transition-all col-span-5 grid grid-cols-subgrid items-center border-b border-gray-200 p-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  disabled={task.completed}
                  onChange={() => handleToggleSingleTask(task.id)}
                  className="size-5 cursor-pointer"
                />
                <p className={`${task.completed === true ? "line-through opacity-30" : "truncate"} `}>{task.name}</p>
                <p className={task.completed === true ? "line-through opacity-30" : ""}>{task.date}</p>
                <p className={task.priority === "High" ? " text-red-800 bg-red-200 font-medium rounded-xl text-center p-2 " :
                  task.priority === "Medium" ? "text-yellow-800 bg-yellow-200 font-medium rounded-xl text-center p-2" :
                    task.priority === "Low" ? "text-gray-800 bg-gray-200 font-medium rounded-xl text-center p-2"
                      : "text-green-800 bg-green-200 font-medium rounded-xl text-center p-2"

                }>{task.priority}</p>
                <div className="flex flex-col opacity-0 hover:opacity-100 items-center">
                  <button
                    onClick={() => {
                      handleUpdateTask();
                      setTaskToUpdate(task);
                    }}
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
                  <Link to={`/tasks/details/${task.id}`}
                    disabled={task.completed}
                    onClick={() => handleDeleteConfirm(task.id)}
                    className="p-2 cursor-pointer hover:bg-black/10 transition-all rounded-full">
                    <GrExpand />
                  </Link>

                </div>
              </div>
            )
          })}

        </div>

      </div >
    </>
  )
})