import HarutoPicture from '../../image/haruto-picture.png'
import { HiOutlineInbox } from "react-icons/hi2";
import { IoTodayOutline } from "react-icons/io5";
import { MdOutlineUpcoming } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";

export function SideBar({handleAddNewTask}) {


  return (
    <>
      <aside className="fixed top-0 left-0 bottom-0 flex flex-col gap-5 w-sidebar
      border-r border-solid border-gray-200 p-5 bg-white
      ">
        <div className=" p-2 ">
          <div className="user-section flex gap-2 items-center ">
            <img src={HarutoPicture} alt="" className="size-10 rounded-full" />
            <div className="user-details">
              <p className="text-black text-lg font-semibold">Haruto Love React</p>
              <p className="text-gray-500 text-sm font-medium">haruto2804@gmail.com</p>
            </div>
          </div>
        </div>

        <button 
        onClick = {handleAddNewTask}
        className="bg-blue-600 text-white font-bold rounded-lg cursor-pointer w-full
        h-12 hover:bg-blue-700 transition-all hover:-translate-y-1
        ">
          Add new task
        </button>

        <div className="feature-section flex flex-col gap-1 ">
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <HiOutlineInbox className="size-5 " />
            <p>All Tasks</p>
          </div>
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <IoTodayOutline className="size-5" />
            <p>Today</p>
          </div>
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <MdOutlineUpcoming className="size-5" />
            <p>Upcoming</p>
          </div>

          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <FaRegCheckCircle className="size-5" />
            <p>Completed</p>
          </div>
        </div>

        <div className="projects-section flex flex-col gap-1
        border-t-2 border-gray-200 
        ">
          <p className="font-semibold font-sm text-gray-600 mt-5">PROJECTS</p>
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <MdOutlineWorkHistory className="size-5" />
            <p>Work</p>
          </div>
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <IoPerson className="size-5" />
            <p>Personal</p>
          </div>
          <div className="flex gap-4 p-3 items-center cursor-pointer hover:bg-blue-100 rounded-lg
          ">
            <GoProjectRoadmap className="size-5" />
            <p>Work Phoenix</p>
          </div>

        </div>

      </aside>
    </>
  )
}