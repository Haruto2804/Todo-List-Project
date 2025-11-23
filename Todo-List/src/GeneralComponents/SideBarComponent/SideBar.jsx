import HarutoPicture from '../../image/haruto-picture.png'
import { HiOutlineInbox } from "react-icons/hi2";
import { IoTodayOutline, IoPerson } from "react-icons/io5";
import { MdOutlineUpcoming, MdOutlineWorkHistory } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { NavLink, Link } from 'react-router-dom';

export function SideBar({ handleAddNewTask }) {
  const getNavLinkClass = ({ isActive }) =>
    `flex gap-4 p-3 items-center cursor-pointer rounded-lg transition-colors
        ${isActive
      ? 'bg-blue-100 text-blue-700 font-semibold'
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="fixed top-0 left-0 bottom-0 flex flex-col gap-5 w-sidebar border-r border-solid border-gray-200 p-5 bg-white">

      {/* User Section (Link về Trang chủ) */}
      <Link to="/" className="p-2">
        <div className="user-section flex gap-2 items-center ">
          <img src={HarutoPicture} alt="" className="size-10 rounded-full" />
          <div className="user-details">
            <p className="text-black text-lg font-semibold">Haruto Love React</p>
            <p className="text-gray-500 text-sm font-medium">haruto2804@gmail.com</p>
          </div>
        </div>
      </Link>

      {/* Button Add new task */}
      <button
        onClick={handleAddNewTask}
        className="bg-blue-600 text-white font-bold rounded-lg cursor-pointer w-full h-12 hover:bg-blue-700 transition-all hover:-translate-y-1"
      >
        Add new task
      </button>

      {/* --- TASKS SECTION --- */}
      <div className="feature-section flex flex-col gap-1 ">
        <NavLink to="/tasks/all" className={getNavLinkClass}>
          <HiOutlineInbox className="size-5" />
          <p>All Tasks</p>
        </NavLink>

        <NavLink to="/tasks/today" className={getNavLinkClass}>
          <IoTodayOutline className="size-5" />
          <p>Today</p>
        </NavLink>

        <NavLink to="/tasks/upcoming" className={getNavLinkClass}>
          <MdOutlineUpcoming className="size-5" />
          <p>Upcoming</p>
        </NavLink>

        <NavLink to="/tasks/completed" className={getNavLinkClass}>
          <FaRegCheckCircle className="size-5" />
          <p>Completed</p>
        </NavLink>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="projects-section flex flex-col gap-1 border-t-2 border-gray-200 ">
        <p className="font-semibold font-sm text-gray-600 mt-5">PROJECTS</p>

        {/* Dùng NavLink và Dynamic Route /projects/:projectId */}
        <NavLink to="/projects/work" className={getNavLinkClass}>
          <MdOutlineWorkHistory className="size-5" />
          <p>Work</p>
        </NavLink>

        <NavLink to="/projects/personal" className={getNavLinkClass}>
          <IoPerson className="size-5" />
          <p>Personal</p>
        </NavLink>

        <NavLink to="/projects/phoenix" className={getNavLinkClass}>
          <GoProjectRoadmap className="size-5" />
          <p>Work Phoenix</p>
        </NavLink>
      </div>
    </nav>
  );
}