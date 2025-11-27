import './App.css'
import { HomePage } from './pages/HomePagePage/HomePage.jsx'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { TasksView } from './pages/Tasks/TasksView'
import { DetailsTodoPage } from './pages/DetailsTodoPage.jsx'
import { useEffect, useState, useCallback } from 'react'
// -
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
// const mergeTodoData = (currentTodos, newTaskData) => {
//   const newTaskMap = new Map();
//   newTaskData.forEach(task => {
//     newTaskMap.set(task.id, task);
//   })

//   // mergeList co nghia la kiem tra du lieu tu API co trong Local Storage hay ko, nếu có thì đem các thuộc
//   // tính mới (nếu có) của Local Storage ghi đè vào data của API rồi trả về
//   const mergeList = currentTodos.map((task) => {
//     const newData = newTaskMap.get(task.id);
//     if (newData) {
//       return {
//         ...newData,
//         ...task,
//       }
//     }
//     // nếu Local Storage ko có todo trong API thì trả về data của API mà ko làm gì
//     return task;
//   })
//   // lọc tập Set các ID API
//   const currentId = new Set(currentTodos.map((task) => task.id));
//   // lọc các data của LocalStorage mà chưa có trong API
//   const newlyAddTasked = newTaskData.filter(task => !currentId.has(task.id));
//   return [
//     ...mergeList, // mảng data của API
//     ...newlyAddTasked // mảng data của Local Storage
//     // hợp nhất 2 dữ liệu lại với nhau
//   ]
// }

function App() {
  const [todo, setTodos] = useState(getInitialTodos);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars

  // const getTasks = async () => {
  //   const storedLocalStorageTodoData = getInitialTodos();
  //   try {
  //     const response = await axios.get('https://dummyjson.com/todos');
  //     const priorityLevels = ["High", "Medium", "Completed", "Low",];
  //     const tasksWithPriority = response.data.todos.map((task) => {
  //       let priority = priorityLevels[Math.floor(Math.random() * priorityLevels.length)];


  //       if (task.completed) {
  //         priority = "Completed"
  //       }
  //       else if (task.id % 3 === 0) {
  //         priority = "High";
  //       } else if (task.id % 2 === 0) {
  //         priority = "Medium";
  //       }
  //       else {
  //         priority = "Low";
  //       }
  //       return {
  //         ...task, // Giữ lại các trường cũ (id, todo, completed)
  //         priority: priority,
  //         isDeleted: false,
  //         // Thêm trường priority mới
  //       };
  //     })
  //     const mergeData = mergeTodoData(tasksWithPriority, storedLocalStorageTodoData);
  //     setTodos(mergeData);
  //     setError(null);
  //   }
  //   catch (err) {
  //     console.error("Lỗi khi tải dữ liệu: ", err);
  //     setError("Không thể tải danh sách công việc. Vui lòng kiểm tra kết nối.");
  //     setTodos([]);
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // }
  const addTasks = async (newTaskData) => {
    //Dùng API để add dữ liệu
    // try {
    //   const response = await axios.post('https://dummyjson.com/todos/add', newTaskData);
    //   const addNewTask = response.data;
    //   const finalTask = {
    //     ...addNewTask,
    //     id: crypto.randomUUID(),
    //     priority: newTaskData.priority,
    //     name: newTaskData.name,
    //     date: newTaskData.date,
    //     isDeleted: false
    //   }
    //   setTodos(prevTodos => [
    //     finalTask,
    //     ...prevTodos
    //   ])
    //   setError(null);
    // } catch (err) {
    //   console.log("Loi khi them cong viec: ", err);
    //   setError("Không thể thêm công việc. Vui lòng kiểm tra lại dữ liệu.");
    // } finally {
    //   setIsLoading(false);
    // }
    //Code xử lí add
    setTodos(prevTodo => {
      return [
        newTaskData,
        ...prevTodo
      ]
    })
    setError(null);
  }
  const deleteTask = async (taskId) => {
    //Xóa bằng cách gọi API, thêm isDeleted từ API trả về đưa vào task, nhưng todo thật sự chưa có xóa khỏi danh sach
    // try {
    //   const response = await axios.delete(`https://dummyjson.com/todos/1`);

    //   const deletedTaskData = response.data;
    //   console.log(`Task sau khi xóa ${taskId} đã được xóa!`);
    //   setTodos(prevTodos => {
    //     return prevTodos.map(task => {
    //       if (task.id === taskId) {
    //         return {
    //           ...task,
    //           ...deletedTaskData
    //         }
    //       }
    //     })
    //   })
    //   setError(null);
    // } catch (err) {
    //   console.error('Lỗi khi xóa task:', err);
    //   setError("Không thể xóa task. Vui lòng kiểm tra kết nối.");
    // } finally {
    //   setIsLoading(false);
    // }
    //Xóa bằng cách dùng code của bản thân
    console.log('task can xoa', taskId)
    const newDataTodo = todo.filter((task) => task.id != taskId); // trả về danh sách todo ko có taskID cần xóa
    setTodos(newDataTodo);
    console.log('task vua xoa', newDataTodo);
    setError(null);
  }
  const updateTask = (taskToUpdate) => {
    console.log('task can up date, (details),', taskToUpdate)
    setTodos(prevTodo => {
      return prevTodo.map((task) => {
        if (task.id === taskToUpdate.id) {
          return {
            ...task,
            ...taskToUpdate
          };
        }
        console.log('bo qua task', task)
        return task;
      })
    })
    setError(null);
    console.log('Todo sau khi cap nhat', todo);
  }

  const handleToggleCompleted = useCallback((taskId) => {
    setTodos(prevTask =>
      prevTask.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])
  useEffect(() => {
    setTodos([ {
    "completed": false,
    "date": "2026-01-15",
    "description": "Lập kế hoạch chi tiết cho dự án 'Nền tảng Thương mại Điện tử Đa Quốc gia'. Bao gồm phân tích yêu cầu, thiết kế kiến trúc hệ thống, và xác định các công nghệ chủ chốt (Microservices, Kafka, React). Phải hoàn thành trước buổi họp tổng kết Quý 1.",
    "id": "e4f8d2a6-c1b0-4e5a-8b3d-1c9f0e7a2b4c",
    "isDeleted": true,
    "name": "Hoàn thiện Kế hoạch Kiến trúc Dự án E-Commerce Lớn",
    "priority": "Completed",
    "userId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
  },
  {
    "completed": false,
    "date": "2025-12-01",
    "description": "Thực hiện kiểm thử hồi quy toàn diện (full regression testing) cho phiên bản 3.2.1 của ứng dụng di động trên cả hai nền tảng iOS và Android. Cần ghi lại chi tiết các lỗi tìm thấy và tạo JIRA tickets tương ứng với mức độ ưu tiên 'Blocker' hoặc 'Major'.",
    "id": "b3c7f0d1-a9e2-47b8-8c1d-6f5e4d3c2b1a",
    "isDeleted": false,
    "name": "Kiểm thử Hồi quy Toàn diện cho Ứng dụng Di động v3.2.1",
    "priority": "High",
    "userId": "q9r8s7t6-u5v4-w3x2-y1z0-a9b8c7d6e5f4"
  },
  {
    "completed": false,
    "date": "2026-03-20",
    "description": "Nghiên cứu sâu về việc tích hợp API Trí tuệ Nhân tạo mới nhất từ nhà cung cấp 'TechGenius' vào quy trình xử lý dữ liệu khách hàng. Mục tiêu là tự động hóa 40% công việc phân loại và gắn nhãn (tagging) dữ liệu thô. Lập báo cáo feasibility report.",
    "id": "f5a9e3b7-d1c8-40f2-9e6a-7b8c9d0e1f2g",
    "isDeleted": false,
    "name": "Nghiên cứu và Tích hợp API AI cho Xử lý Dữ liệu",
    "priority": "Medium",
    "userId": "h7i6j5k4-l3m2-n1o0-p9q8-r7s6t5u4v3w2"
  },
  {
    "completed": false,
    "date": "2026-02-10",
    "description": "Viết tài liệu hướng dẫn sử dụng (User Manual) và tài liệu kỹ thuật (Technical Specification) chi tiết cho Module Thanh toán mới, bao gồm các kịch bản lỗi, mã phản hồi (response codes), và quy trình bảo mật PCI-DSS. Tài liệu phải được đồng bộ lên Confluence.",
    "id": "c0d1e2f3-g4h5-6i7j-8k9l-0m1n2o3p4q5r",
    "isDeleted": false,
    "name": "Tạo Tài liệu Kỹ thuật và Hướng dẫn cho Module Thanh toán",
    "priority": "High",
    "userId": "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6"
  },
  {
    "completed": false,
    "date": "2026-04-05",
    "description": "Tổ chức và điều hành buổi hội thảo nội bộ về 'Các Phương pháp Phát triển Linh hoạt (Agile) và DevOps' cho toàn bộ đội ngũ kỹ sư. Chuẩn bị slide, tài liệu handouts, và một ví dụ thực tế (hands-on example) về CI/CD pipeline.",
    "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    "isDeleted": false,
    "name": "Hội thảo Nội bộ về Quy trình Agile và DevOps",
    "priority": "Medium",
    "userId": "m9n8o7p6-q5r4-s3t2-u1v0-w9x8y7z6a5b4"
  },
  {
    "completed": false,
    "date": "2026-01-25",
    "description": "Tối ưu hóa hiệu suất của truy vấn cơ sở dữ liệu (Database Query Optimization) trên cụm máy chủ Production. Tập trung vào các stored procedures xử lý dữ liệu người dùng hoạt động kém nhất (top 5 slowest queries) để giảm thời gian phản hồi trung bình 30%.",
    "id": "d7e8f9a0-b1c2-3d4e-5f6g-7h8i9j0k1l2m",
    "isDeleted": true,
    "name": "Tối ưu hóa Truy vấn Cơ sở Dữ liệu Sản phẩm",
    "priority": "Completed",
    "userId": "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
  },
  {
    "completed": false,
    "date": "2025-11-30",
    "description": "Lên lịch trình cho việc triển khai (deployment schedule) phiên bản bảo mật mới nhất lên môi trường Staging và Production. Phải có kế hoạch rollback chi tiết và thông báo cho tất cả các bên liên quan (Stakeholders) 48 giờ trước khi thực hiện.",
    "id": "b97e6a79-d792-48b5-8b5e-5def37a73d39",
    "isDeleted": false,
    "name": "Lên lịch Triển khai Phiên bản Bảo mật Mới",
    "priority": "High",
    "userId": "857ed9b8-e649-46eb-ac6d-ecf246e7152e"
  },
  {
    "completed": false,
    "date": "2026-03-01",
    "description": "Thiết kế lại giao diện người dùng (UI/UX Redesign) cho trang 'Quản lý Tài khoản Khách hàng' để cải thiện tỷ lệ chuyển đổi (conversion rate) trong việc cập nhật thông tin cá nhân. Chuẩn bị wireframes, mockups độ phân giải cao, và bản prototype tương tác.",
    "id": "0j9i8h7g-6f5e-4d3c-2b1a-0z9y8x7w6v5u",
    "isDeleted": false,
    "name": "Thiết kế Lại Giao diện Quản lý Tài khoản Khách hàng",
    "priority": "Medium",
    "userId": "s5r4q3p2-o1n0-m9l8-k7j6-i5h4g3f2e1d0"
  },
  {
    "completed": false,
    "date": "2026-02-28",
    "description": "Nghiên cứu các tiêu chuẩn và quy định mới nhất về Bảo mật Dữ liệu Châu Âu (GDPR) và California (CCPA). Cập nhật chính sách bảo mật của công ty và đảm bảo hệ thống tuân thủ 100% trước thời hạn luật định sắp tới.",
    "id": "1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z",
    "isDeleted": true,
    "name": "Cập nhật Tuân thủ Quy định Bảo mật Dữ liệu (GDPR/CCPA)",
    "priority": "Completed",
    "userId": "f7e6d5c4-b3a2-z1y0-x9w8-v7u6t5s4r3q2"
  },
  {
    "completed": false,
    "date": "2026-01-05",
    "description": "Phân tích nhật ký lỗi (error logs) từ máy chủ Production trong 7 ngày gần nhất. Xác định nguyên nhân gốc rễ (Root Cause Analysis - RCA) cho lỗi '500 Internal Server Error' xảy ra vào 3:00 AM mỗi ngày và triển khai bản vá lỗi khẩn cấp.",
    "id": "9s8t7u6v-5w4x-3y2z-1a0b-9c8d7e6f5g4h",
    "isDeleted": false,
    "name": "Phân tích và Khắc phục Lỗi Máy chủ Định kỳ",
    "priority": "High",
    "userId": "v3u2t1s0-r9q8-p7o6-n5m4-l3k2j1i0h9g8"
  },
  {
    "completed": false,
    "date": "2026-02-15",
    "description": "Nâng cấp hệ thống CI/CD pipeline từ Jenkins sang GitLab CI. Cần migrate tất cả các build scripts hiện tại, thiết lập môi trường test tự động, và đảm bảo không có downtime trong quá trình chuyển đổi.",
    "id": "a2b3c4d5-e6f7-8g9h-0i1j-k2l3m4n5o6p7",
    "isDeleted": false,
    "name": "Migration CI/CD Pipeline sang GitLab",
    "priority": "High",
    "userId": "p7o6n5m4-l3k2-j1i0-h9g8-f7e6d5c4b3a2"
  },
  {
    "completed": false,
    "date": "2026-03-10",
    "description": "Triển khai hệ thống monitoring và alerting sử dụng Prometheus và Grafana. Thiết lập các dashboard theo dõi CPU, memory, disk usage, và response time cho tất cả microservices. Cấu hình alert rules gửi thông báo qua Slack và email.",
    "id": "b4c5d6e7-f8g9-h0i1-j2k3-l4m5n6o7p8q9",
    "isDeleted": false,
    "name": "Thiết lập Hệ thống Monitoring với Prometheus/Grafana",
    "priority": "Medium",
    "userId": "q9p8o7n6-m5l4-k3j2-i1h0-g9f8e7d6c5b4"
  },
  {
    "completed": false,
    "date": "2025-12-20",
    "description": "Thực hiện penetration testing cho các API endpoints quan trọng. Kiểm tra lỗ hổng bảo mật như SQL Injection, XSS, CSRF, và authentication bypass. Lập báo cáo chi tiết về các vulnerabilities tìm thấy và đề xuất giải pháp khắc phục.",
    "id": "c6d7e8f9-g0h1-i2j3-k4l5-m6n7o8p9q0r1",
    "isDeleted": false,
    "name": "Security Audit và Penetration Testing cho API",
    "priority": "High",
    "userId": "r1q0p9o8-n7m6-l5k4-j3i2-h1g0f9e8d7c6"
  },
  {
    "completed": false,
    "date": "2026-04-20",
    "description": "Phát triển module quản lý inventory cho hệ thống warehouse. Tích hợp với barcode scanner, hỗ trợ real-time tracking, và tự động cập nhật stock levels. Sử dụng WebSocket để đồng bộ dữ liệu giữa các warehouse locations.",
    "id": "d8e9f0g1-h2i3-j4k5-l6m7-n8o9p0q1r2s3",
    "isDeleted": false,
    "name": "Phát triển Module Quản lý Kho hàng",
    "priority": "Medium",
    "userId": "s3r2q1p0-o9n8-m7l6-k5j4-i3h2g1f0e9d8"
  },
  {
    "completed": false,
    "date": "2026-01-30",
    "description": "Migrate database từ MySQL sang PostgreSQL để tận dụng các tính năng advanced như JSONB, full-text search, và better concurrency. Lập kế hoạch migration chi tiết, test thoroughly trên staging, và chuẩn bị rollback strategy.",
    "id": "e0f1g2h3-i4j5-k6l7-m8n9-o0p1q2r3s4t5",
    "isDeleted": true,
    "name": "Database Migration MySQL sang PostgreSQL",
    "priority": "Completed",
    "userId": "t5s4r3q2-p1o0-n9m8-l7k6-j5i4h3g2f1e0"
  },
  {
    "completed": false,
    "date": "2026-02-25",
    "description": "Xây dựng dashboard báo cáo doanh thu real-time cho management team. Sử dụng React và D3.js để tạo các biểu đồ tương tác. Dữ liệu được lấy từ data warehouse qua REST API với caching layer sử dụng Redis.",
    "id": "f2g3h4i5-j6k7-l8m9-n0o1-p2q3r4s5t6u7",
    "isDeleted": false,
    "name": "Dashboard Báo cáo Doanh thu Real-time",
    "priority": "High",
    "userId": "u7t6s5r4-q3p2-o1n0-m9l8-k7j6i5h4g3f2"
  },
  {
    "completed": false,
    "date": "2026-03-15",
    "description": "Implement OAuth 2.0 và OpenID Connect cho hệ thống authentication. Hỗ trợ đăng nhập qua Google, Facebook, và GitHub. Đảm bảo tuân thủ security best practices và implement refresh token rotation.",
    "id": "g4h5i6j7-k8l9-m0n1-o2p3-q4r5s6t7u8v9",
    "isDeleted": false,
    "name": "Triển khai OAuth 2.0 và Social Login",
    "priority": "Medium",
    "userId": "v9u8t7s6-r5q4-p3o2-n1m0-l9k8j7i6h5g4"
  },
  {
    "completed": false,
    "date": "2025-12-15",
    "description": "Optimize frontend performance bằng cách implement code splitting, lazy loading, và tree shaking. Giảm bundle size xuống dưới 200KB. Sử dụng Webpack Bundle Analyzer để identify và remove unused dependencies.",
    "id": "h6i7j8k9-l0m1-n2o3-p4q5-r6s7t8u9v0w1",
    "isDeleted": false,
    "name": "Tối ưu Frontend Performance và Bundle Size",
    "priority": "Medium",
    "userId": "w1v0u9t8-s7r6-q5p4-o3n2-m1l0k9j8i7h6"
  },
  {
    "completed": false,
    "date": "2026-04-10",
    "description": "Thiết kế và implement RESTful API cho mobile app mới. Sử dụng Node.js với Express framework. Implement rate limiting, request validation với Joi, và comprehensive error handling. Viết API documentation với Swagger/OpenAPI.",
    "id": "i8j9k0l1-m2n3-o4p5-q6r7-s8t9u0v1w2x3",
    "isDeleted": false,
    "name": "Phát triển RESTful API cho Mobile App",
    "priority": "High",
    "userId": "x3w2v1u0-t9s8-r7q6-p5o4-n3m2l1k0j9i8"
  },
  {
    "completed": false,
    "date": "2026-02-05",
    "description": "Setup và cấu hình Kubernetes cluster cho production workloads. Deploy microservices với Helm charts, thiết lập auto-scaling policies, và configure ingress controller. Implement health checks và readiness probes.",
    "id": "j0k1l2m3-n4o5-p6q7-r8s9-t0u1v2w3x4y5",
    "isDeleted": false,
    "name": "Triển khai Kubernetes Cluster cho Production",
    "priority": "High",
    "userId": "y5x4w3v2-u1t0-s9r8-q7p6-o5n4m3l2k1j0"
  },
  {
    "completed": false,
    "date": "2026-03-25",
    "description": "Phát triển chatbot customer support sử dụng natural language processing. Tích hợp với existing CRM system. Train model với historical support tickets để xử lý các câu hỏi thường gặp. Implement fallback mechanism cho human handoff.",
    "id": "k2l3m4n5-o6p7-q8r9-s0t1-u2v3w4x5y6z7",
    "isDeleted": false,
    "name": "Xây dựng AI Chatbot cho Customer Support",
    "priority": "Medium",
    "userId": "z7y6x5w4-v3u2-t1s0-r9q8-p7o6n5m4l3k2"
  },
  {
    "completed": false,
    "date": "2026-01-20",
    "description": "Implement data backup và disaster recovery strategy. Setup automated daily backups cho databases, configure replication across multiple regions, và test restore procedures. Document recovery time objective (RTO) và recovery point objective (RPO).",
    "id": "l4m5n6o7-p8q9-r0s1-t2u3-v4w5x6y7z8a9",
    "isDeleted": true,
    "name": "Thiết lập Backup và Disaster Recovery Plan",
    "priority": "Completed",
    "userId": "a9z8y7x6-w5v4-u3t2-s1r0-q9p8o7n6m5l4"
  },
  {
    "completed": false,
    "date": "2026-04-15",
    "description": "Refactor legacy codebase để improve maintainability. Apply SOLID principles, implement dependency injection, và add comprehensive unit tests. Target code coverage minimum 80%. Use SonarQube để track code quality metrics.",
    "id": "m6n7o8p9-q0r1-s2t3-u4v5-w6x7y8z9a0b1",
    "isDeleted": false,
    "name": "Refactor Legacy Code và Tăng Test Coverage",
    "priority": "Medium",
    "userId": "b1a0z9y8-x7w6-v5u4-t3s2-r1q0p9o8n7m6"
  },
  {
    "completed": false,
    "date": "2025-12-10",
    "description": "Setup log aggregation system sử dụng ELK stack (Elasticsearch, Logstash, Kibana). Collect logs từ tất cả services, parse và index để có thể search efficiently. Tạo dashboard visualization cho error tracking và system health monitoring.",
    "id": "n8o9p0q1-r2s3-t4u5-v6w7-x8y9z0a1b2c3",
    "isDeleted": false,
    "name": "Triển khai ELK Stack cho Log Management",
    "priority": "Medium",
    "userId": "c3b2a1z0-y9x8-w7v6-u5t4-s3r2q1p0o9n8"
  },
  {
    "completed": false,
    "date": "2026-03-05",
    "description": "Develop mobile app sử dụng React Native cho iOS và Android. Implement offline-first architecture với local database sync. Integrate push notifications, biometric authentication, và in-app purchases. Submit lên App Store và Google Play.",
    "id": "o0p1q2r3-s4t5-u6v7-w8x9-y0z1a2b3c4d5",
    "isDeleted": false,
    "name": "Phát triển Cross-platform Mobile App với React Native",
    "priority": "High",
    "userId": "d5c4b3a2-z1y0-x9w8-v7u6-t5s4r3q2p1o0"
  },
  {
    "completed": false,
    "date": "2026-02-18",
    "description": "Implement GraphQL API để replace một số REST endpoints. Setup Apollo Server, define schema với type definitions, implement resolvers, và add DataLoader để solve N+1 query problem. Setup GraphQL Playground cho API exploration.",
    "id": "p2q3r4s5-t6u7-v8w9-x0y1-z2a3b4c5d6e7",
    "isDeleted": false,
    "name": "Triển khai GraphQL API với Apollo Server",
    "priority": "Medium",
    "userId": "e7d6c5b4-a3z2-y1x0-w9v8-u7t6s5r4q3p2"
  },
  {
    "completed": false,
    "date": "2026-04-25",
    "description": "Migrate static assets sang CDN (CloudFlare hoặc AWS CloudFront) để improve load times globally. Configure cache headers, implement image optimization với responsive images, và setup automatic purging khi có updates.",
    "id": "q4r5s6t7-u8v9-w0x1-y2z3-a4b5c6d7e8f9",
    "isDeleted": false,
    "name": "Migrate Static Assets sang CDN",
    "priority": "Low",
    "userId": "f9e8d7c6-b5a4-z3y2-x1w0-v9u8t7s6r5q4"
  },
  {
    "completed": false,
    "date": "2026-01-10",
    "description": "Conduct code review training session cho junior developers. Cover best practices for pull requests, common code smells, security considerations, và performance optimization techniques. Prepare hands-on exercises và real examples từ codebase.",
    "id": "r6s7t8u9-v0w1-x2y3-z4a5-b6c7d8e9f0g1",
    "isDeleted": false,
    "name": "Training Session về Code Review Best Practices",
    "priority": "Low",
    "userId": "g1f0e9d8-c7b6-a5z4-y3x2-w1v0u9t8s7r6"
  },
  {
    "completed": false,
    "date": "2026-03-30",
    "description": "Implement A/B testing framework cho web application. Sử dụng feature flags để control experiment rollout. Track conversion metrics và user behavior. Integrate với analytics platform để measure statistical significance của test results.",
    "id": "s8t9u0v1-w2x3-y4z5-a6b7-c8d9e0f1g2h3",
    "isDeleted": false,
    "name": "Xây dựng A/B Testing Framework",
    "priority": "Medium",
    "userId": "h3g2f1e0-d9c8-b7a6-z5y4-x3w2v1u0t9s8"
  },
  {
    "completed": false,
    "date": "2025-12-25",
    "description": "Setup automated end-to-end testing sử dụng Cypress hoặc Playwright. Write test scenarios cho critical user flows như checkout process, user registration, và profile management. Integrate vào CI/CD pipeline để run tests automatically.",
    "id": "t0u1v2w3-x4y5-z6a7-b8c9-d0e1f2g3h4i5",
    "isDeleted": false,
    "name": "Automated E2E Testing với Cypress/Playwright",
    "priority": "Medium",
    "userId": "i5h4g3f2-e1d0-c9b8-a7z6-y5x4w3v2u1t0"
  },
  {
    "completed": false,
    "date": "2026-02-08",
    "description": "Develop admin dashboard để manage users, products, và orders. Implement role-based access control (RBAC), data grid với sorting/filtering/pagination, và bulk operations. Use Material-UI hoặc Ant Design cho UI components.",
    "id": "u2v3w4x5-y6z7-a8b9-c0d1-e2f3g4h5i6j7",
    "isDeleted": true,
    "name": "Xây dựng Admin Dashboard với RBAC",
    "priority": "Completed",
    "userId": "j7i6h5g4-f3e2-d1c0-b9a8-z7y6x5w4v3u2"
  },
  {
    "completed": false,
    "date": "2026-04-30",
    "description": "Implement service mesh sử dụng Istio để manage microservices communication. Configure traffic management, service discovery, load balancing, và circuit breakers. Setup distributed tracing với Jaeger để debug latency issues.",
    "id": "v4w5x6y7-z8a9-b0c1-d2e3-f4g5h6i7j8k9",
    "isDeleted": false,
    "name": "Triển khai Service Mesh với Istio",
    "priority": "High",
    "userId": "k9j8i7h6-g5f4-e3d2-c1b0-a9z8y7x6w5v4"
  },
  {
    "completed": false,
    "date": "2026-03-12",
    "description": "Develop recommendation engine sử dụng collaborative filtering và content-based algorithms. Train model với user behavior data, implement real-time scoring, và A/B test different recommendation strategies. Measure impact trên conversion rate.",
    "id": "w6x7y8z9-a0b1-c2d3-e4f5-g6h7i8j9k0l1",
    "isDeleted": false,
    "name": "Xây dựng Recommendation Engine",
    "priority": "Medium",
    "userId": "l1k0j9i8-h7g6-f5e4-d3c2-b1a0z9y8x7w6"
  },
  {
    "completed": false,
    "date": "2026-01-28",
    "description": "Implement WebSocket server cho real-time features như live chat, notifications, và collaborative editing. Handle connection management, room-based broadcasting, và reconnection logic. Scale horizontally sử dụng Redis pub/sub.",
    "id": "x8y9z0a1-b2c3-d4e5-f6g7-h8i9j0k1l2m3",
    "isDeleted": false,
    "name": "Triển khai WebSocket cho Real-time Features",
    "priority": "High",
    "userId": "m3l2k1j0-i9h8-g7f6-e5d4-c3b2a1z0y9x8"
  }
])
  }, []);

  const handleDeleteAllCurrentView = (taskCurrentViews) => {
    const newSetIdTaskCurrentView = new Set(taskCurrentViews);
    const newTodoAfterDelete = todo.filter((task) => {
      return !newSetIdTaskCurrentView.has(task.id);
    })
    setTodos(newTodoAfterDelete);
    localStorage.setItem('todos', []); // dọn dữ liệu trong local Storage
  }
  useEffect(() => {
    // 1. Kiểm tra xem dữ liệu có tồn tại không trước khi lưu
    if (todo.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todo));
    }
  }, [todo]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage updateTask={updateTask} handleDeleteAllCurrentView={handleDeleteAllCurrentView} deleteTask={deleteTask} handleToggleCompleted={handleToggleCompleted} addTasks={addTasks} todo={todo} setTodos={setTodos} />}>
          <Route path="/tasks/all" element={<TasksView />} />
          <Route path="/tasks/today" element={<TasksView />} />
          <Route path="/tasks/upcoming" element={<TasksView />} />
          <Route path="/tasks/completed" element={<TasksView />} />
        </Route>
        <Route path="/tasks/details/:taskId" element={<DetailsTodoPage updateTask={updateTask} deleteTask={deleteTask} todo={todo} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
