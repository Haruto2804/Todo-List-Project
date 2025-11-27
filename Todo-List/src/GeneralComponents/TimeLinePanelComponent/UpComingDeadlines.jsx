import { FaAnglesRight } from "react-icons/fa6";
import React from 'react';
import { Link } from "react-router-dom";
export const UpComingDeadlines = React.memo(function UpComingDeadlines({ handleTimeRemaining, upcomingTasks }) {
  return (
    <>
      <div className="flex flex-col gap-3 select-none">
        <p className="font-bold text-lg">Upcoming Deadlines</p>
        {upcomingTasks.map((task) => (
          <div key = {task.id} className="flex gap-4 items-center cursor-pointer hover:bg-blue-100 rounded-lg">
            <FaAnglesRight className="size-5 " />
            <Link to ={`/tasks/details/${task.id}`} className="flex flex-col min-w-0">
              <p className="truncate">{task.name}</p>
              <p className="text-gray-400 text-sm font-medium">Due in  {handleTimeRemaining(task)} days</p>
            </Link>

          </div>
        ))}
      </div>
    </>
  )
})