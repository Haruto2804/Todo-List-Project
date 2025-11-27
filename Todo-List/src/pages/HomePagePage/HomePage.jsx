import { SideBar } from '../../GeneralComponents/SideBarComponent/SideBar'
import { TimeLinePanel } from '../../GeneralComponents/TimeLinePanelComponent/TimeLinePanel'
import { AddNewTaskModal } from '../../GeneralComponents/AddNewTaskModalComponent/AddNewTaskModal'
import { TasksView } from '../Tasks/TasksView'
import { useState, useCallback } from 'react'
import { DeleteConfirm } from '../../GeneralComponents/Confirm/DeleteConfirm'
import { UpdateConfirm } from '../../GeneralComponents/Confirm/UpdateConfirm'
import { CompletedConfirm } from '../../GeneralComponents/Confirm/CompletedConfirm'
import { UpdateTask } from '../../GeneralComponents/UpdateTask/UpdateTask'
import { InputError } from '../../GeneralComponents/Error/InputError'
export function HomePage({ updateTask, handleDeleteAllCurrentView, deleteTask, handleToggleCompleted, addTasks, todo, setTodos }) {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
  const [isOpenUpdateConfirm, setIsOpenUpdateConfirm] = useState(false);
  const [isOpenCompletedConfirm, setIsOpenCompletedConfirm] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [taskIdFiltered, setTaskIdFiltered] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [error, setError] = useState("");
  const [isErrorInputOpen, setIsErrorInputOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const handleDeleteConfirm = useCallback((taskId) => {
    if (taskId) {
      setTaskIdToDelete(taskId);
    } else {
      setTaskIdToDelete(null);
    }
    setIsOpenDeleteConfirm(isOpenDeleteConfirm => !isOpenDeleteConfirm);
  }, [])
  const memorizedHandleAddNewTask = useCallback(() => {
    setIsOpenAddNewTask(isOpen => !isOpen);
  }, [])

  const handleUpdateTask = useCallback(() => {
    setIsOpenUpdateTask(isOpenUpdateTask => !isOpenUpdateTask);
  }, [])


  const handleUpdateConfirm = useCallback(() => {
    setIsOpenUpdateConfirm(isOpenUpdateConfirm => !isOpenUpdateConfirm);
  }, [])

  const handleCompletedConfirm = useCallback(() => {
    setIsOpenCompletedConfirm(isOpenCompletedConfirm => !isOpenCompletedConfirm);
  }, [])
  const handleSelectAllClick = useCallback((e, taskIdToSelect) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      console.log('set select all')
      setIsSelectAll(true); // SELECT ALL
      setSelectedTasks(new Set(taskIdToSelect));

    } else {
      console.log('set unselect all')
      setIsSelectAll(false); //DESELECT ALL
      setSelectedTasks(new Set());
    }
    setTaskIdFiltered(taskIdToSelect);
    handleCompletedConfirm();
  }, [handleCompletedConfirm])
  const handleConfirmAction = () => {
    let newItems;
    const taskIdSet = new Set(taskIdFiltered);
    const newTodoFiltered = todo.filter((task) => {
      return taskIdSet.has(task.id);
    })
    if (isSelectAll) { //SELECT ALL
      newItems = newTodoFiltered.map((task) => {
        console.log('task sau khi loc')
        console.log(task)
        return {
          ...task,
          isSelected: true,
          completed: true,
        }

      })
    } else { // DESELECT
      console.log('Dang o chuc nang tat ca khong duoc chon')
      newItems = newTodoFiltered.map((task) => {
        return {
          ...task,
          isSelected: false,
          completed: false,
        }
      })
    }
    setIsSelectAll(!isSelectAll);

    const updatedTasksMap = new Map(newItems.map(task => [task.id, task]));

    // 4. Cập nhật trạng thái TODOS (Ghi đè/Hợp nhất)
    setTodos(prevTodos => {
      const finalTodos = prevTodos.map(task => {
        // Kiểm tra xem task này có ID trong Map đã cập nhật không
        if (updatedTasksMap.has(task.id)) {
          // Nếu có, ghi đè bằng task mới đã cập nhật
          return {
            ...updatedTasksMap.get(task.id),
            priority: "Completed"
          }
        }
        // Nếu không, giữ nguyên task cũ
        return task;
      });
      // Xóa trạng thái tạm thời (rất quan trọng)
      setTaskIdFiltered([]);
      setSelectedTasks(new Set());
      return finalTodos; // Trả về mảng todo đã được hợp nhất
    });

    handleCompletedConfirm();
  }
  const handleToggleSingleTask = useCallback((taskId) => {
    console.log(taskId);
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId)
      }
      return newSet;
    })
  }, [selectedTasks])

  return (
    <div className="font-inter">
      <div className="relative flex flex-col">
        <div className={`overlay fixed top-0 right-0 z-20 left-0 bottom-0 bg-black/50
          ${isOpenAddNewTask || isOpenDeleteConfirm || isOpenUpdateTask || isOpenUpdateConfirm || isOpenCompletedConfirm || isErrorInputOpen
            ? 'opacity-100 transition-all duration-300 ease-in-out  '
            : 'opacity-0 transition-all pointer-events-none duration-300 ease-in-out'}
          `}
          onClick={() => {
            if (isOpenAddNewTask) memorizedHandleAddNewTask();
            if (isOpenDeleteConfirm) handleDeleteConfirm();
            if (isOpenUpdateTask) handleUpdateTask();
            if (isOpenCompletedConfirm) {
              handleCompletedConfirm();
              setIsSelectAll(false);
            }
            if (isOpenUpdateConfirm) handleUpdateConfirm();
          }}></div>
        <SideBar handleAddNewTask={memorizedHandleAddNewTask}></SideBar>

        <TasksView
          selectedTasks={selectedTasks}
          handleToggleSingleTask={handleToggleSingleTask}
          setTaskToUpdate={setTaskToUpdate}
          setUpcomingTasks={setUpcomingTasks}
          handleDeleteAllCurrentView={handleDeleteAllCurrentView}
          isOpenCompletedConfirm={isOpenCompletedConfirm}
          isSelectAll={isSelectAll}
          handleSelectAllClick={handleSelectAllClick}
          handleUpdateTask={handleUpdateTask}
          handleDeleteConfirm={handleDeleteConfirm}
          handleToggleCompleted={handleToggleCompleted}
          todo={todo}></TasksView>

        <TimeLinePanel
          upcomingTasks={upcomingTasks}
          todo={todo}></TimeLinePanel>

        <AddNewTaskModal
          setIsErrorInputOpen={setIsErrorInputOpen}
          setError={setError}
          addTasks={addTasks}
          isOpen={isOpenAddNewTask}
          handleAddNewTask={memorizedHandleAddNewTask}>
        </AddNewTaskModal>

        <DeleteConfirm
          deleteTask={deleteTask}
          taskIdToDelete={taskIdToDelete}
          isOpenDeleteConfirm={isOpenDeleteConfirm}
          handleDeleteConfirm={handleDeleteConfirm}>

        </DeleteConfirm>

        <UpdateConfirm
          updateTask={updateTask}
          taskToUpdate={taskToUpdate}
          handleUpdateConfirm={handleUpdateConfirm}
          isOpenUpdateConfirm={isOpenUpdateConfirm}
          handleUpdateTask={handleUpdateTask} >

        </UpdateConfirm>

        <UpdateTask
          setIsErrorInputOpen={setIsErrorInputOpen}
          setError={setError}
          taskToUpdate={taskToUpdate}
          setTaskToUpdate={setTaskToUpdate}
          setUpcomingTasks handleUpdateConfirm={handleUpdateConfirm}
          isOpenUpdateTask={isOpenUpdateTask}
          handleUpdateTask={handleUpdateTask}>
        </UpdateTask>

        <CompletedConfirm
          setIsSelectAll={setIsSelectAll}
          handleConfirmAction={handleConfirmAction}
          handleCompletedConfirm={handleCompletedConfirm}
          isOpenCompletedConfirm={isOpenCompletedConfirm}>
        </CompletedConfirm>
        <InputError
          isErrorInputOpen={isErrorInputOpen}
          setIsErrorInputOpen={setIsErrorInputOpen}
          error={error} ></InputError>
      </div>
    </div>
  )
}