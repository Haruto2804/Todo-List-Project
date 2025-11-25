import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
const getInitialTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    // Nếu có dữ liệu, chuyển từ chuỗi JSON thành đối tượng JavaScript
    return JSON.parse(storedTodos);
  }
  // Nếu không có, trả về mảng rỗng để khởi tạo
  return [];
};
// newTaskData: Local Storage Data, currentTodos, useState todo hiện tại, lấy từ API
const mergeTodoData = (currentTodos, newTaskData) => {
  const newTaskMap = new Map();
  newTaskData.forEach(task => {
    newTaskMap.set(task.id, task);
  })

  // mergeList co nghia la kiem tra du lieu tu API co trong Local Storage hay ko, nếu có thì đem các thuộc
  // tính mới (nếu có) của Local Storage ghi đè vào data của API rồi trả về
  const mergeList = currentTodos.map((task) => {
    const newData = newTaskMap.get(task.id);
    if (newData) {
      return {
        ...newData,
        ...task,
      }
    }
    // nếu Local Storage ko có todo trong API thì trả về data của API mà ko làm gì
    return task;
  })
  // lọc tập Set các ID API
  const currentId = new Set(currentTodos.map((task) => task.id));
  // lọc các data của LocalStorage mà chưa có trong API
  const newlyAddTasked = newTaskData.filter(task => !currentId.has(task.id));
  return [
    ...mergeList, // mảng data của API
    ...newlyAddTasked // mảng data của Local Storage
    // hợp nhất 2 dữ liệu lại với nhau
  ]
}

function App() {
  const [todo, setTodos] = useState(getInitialTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTasks = async () => {
    const storedLocalStorageTodoData = getInitialTodos();
    try {
      const response = await axios.get('https://dummyjson.com/todos');
      const priorityLevels = ["High", "Medium", "Completed", "Low",];
      const tasksWithPriority = response.data.todos.map((task) => {
        let priority = priorityLevels[Math.floor(Math.random() * priorityLevels.length)];


        if (task.completed) {
          priority = "Completed"
        }
        else if (task.id % 3 === 0) {
          priority = "High";
        } else if (task.id % 2 === 0) {
          priority = "Medium";
        }
        else {
          priority = "Low";
        }
        return {
          ...task, // Giữ lại các trường cũ (id, todo, completed)
          priority: priority,
          isDeleted: false,
          // Thêm trường priority mới
        };
      })
      const mergeData = mergeTodoData(tasksWithPriority, storedLocalStorageTodoData);
      setTodos(mergeData);
      setError(null);
    }
    catch (err) {
      console.error("Lỗi khi tải dữ liệu: ", err);
      setError("Không thể tải danh sách công việc. Vui lòng kiểm tra kết nối.");
      setTodos([]);
    }
    finally {
      setIsLoading(false);
    }
  }
  const addTasks = async (newTaskData) => {
    try {
      const response = await axios.post('https://dummyjson.com/todos/add', newTaskData);
      const addNewTask = response.data;
      const finalTask = {
        ...addNewTask,
        id: crypto.randomUUID(),
        priority: newTaskData.priority,
        name: newTaskData.name,
        date: newTaskData.date,
        isDeleted: false
      }
      setTodos(prevTodos => [
        finalTask,
        ...prevTodos
      ])
      setError(null);
    } catch (err) {
      console.log("Loi khi them cong viec: ", err);
      setError("Không thể thêm công việc. Vui lòng kiểm tra lại dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  }
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/todos/${taskId}`);
      console.log(`Task sau khi xóa ${taskId} đã được xóa!`);
      const deletedTaskData = response.data;
      setTodos(prevTodos => {
        return prevTodos.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              ...deletedTaskData
            }
          }
          return task;
        })
      })
      setError(null);
    } catch (err) {
      console.error('Lỗi khi xóa task:', err);
      setError("Không thể xóa task. Vui lòng kiểm tra kết nối.");
    } finally {
      setIsLoading(false);
    }

  }
  const handleToggleCompleted = useCallback((taskId) => {
    setTodos(prevTask =>
      prevTask.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])
  useEffect(() => {
    console.log('get tasks')
    getTasks();
  }, []);


  useEffect(() => {
    // 1. Kiểm tra xem dữ liệu có tồn tại không trước khi lưu
    if (todo.length > 0) {
      // 2. Chuyển mảng đối tượng thành chuỗi JSON và lưu vào Local Storage
      console.log('Da luu todos vao local storage');
      localStorage.setItem('todos', JSON.stringify(todo));
    }
  }, [todo]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage deleteTask={deleteTask} handleToggleCompleted={handleToggleCompleted} addTasks={addTasks} todo={todo} setTodos={setTodos} />}>
          <Route path="/tasks/all" element={<TasksView />} />
          <Route path="/tasks/today" element={<TasksView />} />
          <Route path="/tasks/upcoming" element={<TasksView />} />
          <Route path="/tasks/completed" element={<TasksView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
