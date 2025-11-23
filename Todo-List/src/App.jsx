import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
import { useEffect, useState } from 'react'
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
function App() {
  const [todo, setTodos] = useState(getInitialTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTasks = async () => {
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
          priority: priority // Thêm trường priority mới
        };
      })
      setTodos(tasksWithPriority);
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
      console.log(newTaskData)
      const response = await axios.post('https://dummyjson.com/todos/add', newTaskData);
      const addNewTask = response.data;
      const finalTask = {
        ...addNewTask,
        priority: newTaskData.priority,
        name: newTaskData.name,
        date: newTaskData.date
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
  useEffect(()=> {
    getTasks();
  },[]);
  useEffect(() => {
    // 1. Kiểm tra xem dữ liệu có tồn tại không trước khi lưu
    if (todo.length > 0) {
      // 2. Chuyển mảng đối tượng thành chuỗi JSON và lưu vào Local Storage
      localStorage.setItem('todos', JSON.stringify(todo));
    }
  }, [todo]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage addTasks={addTasks} todo={todo} />}>
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
