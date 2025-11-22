import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { AddNewTaskModal } from '../../GeneralComponents/AddNewTaskModalComponent/AddNewTaskModal'
import { TasksView } from './TasksView'
import { useState } from 'react'
export function Dashboard() {
  let [isOpen, setIsOpen] = useState(true);
  function handleAddNewTask() {
    setIsOpen(isOpen => !isOpen);
  }
  return (
    <>
      <div className="relative">
        <div className={`overlay fixed top-0 right-0 z-1 left-0 bottom-0 bg-black/50
          ${isOpen
            ? 'opacity-100 transition-all duration-300 ease-in-out'
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}></div>
        <SideBar handleAddNewTask={handleAddNewTask}></SideBar>
        <TasksView></TasksView>
        <TimeLinePanel></TimeLinePanel>
        <AddNewTaskModal isOpen={isOpen} handleAddNewTask={handleAddNewTask}></AddNewTaskModal>
      </div>
    </>
  )
}