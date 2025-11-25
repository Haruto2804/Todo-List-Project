import { FaAnglesRight } from "react-icons/fa6";
export function UpComingDeadlines({ handleTimeRemaining, upcomingTasks }) {
  console.log('rerender up coming deadlines');
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Upcoming Deadlines</p>
        {upcomingTasks.map((task) => (
          <div className="flex gap-4 items-center cursor-pointer hover:bg-blue-100 rounded-lg">
            <FaAnglesRight className="size-5 " />
            <div className = "flex flex-col min-w-0">
              <p className = "truncate">{task.name}</p>
              <p className="text-gray-400 text-sm font-medium">Due in  {handleTimeRemaining(task)} days</p>
            </div>

          </div>
        ))}


      </div>
    </>
  )
}