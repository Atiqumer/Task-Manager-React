import './App.css';
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { saveTask, getAllTasks, deleteTask as deleteFromDB } from './utils/db';

function App() {
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const handleViewTask = (task) => {
  setSelectedTask(task);
};

  useEffect(() => {
  const fetchTasks = async () => {
    const savedTasks = await getAllTasks();
    setTasks(savedTasks || []);
  };
  fetchTasks();
}, []);

  const getFilteredTasks = () => {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "Urgent") return tasks.filter((t) => t.type === "Urgent");
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
};

  const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

const addTask = async (title, dueDate, description, type, imageFile) => {
  const imageBase64 = imageFile ? await toBase64(imageFile) : null;

  const newTask = {
    id: Date.now(),
    title,
    dueDate,
    description,
    type,
    imageUrl: imageBase64,
    completed: false,
  };

  setTasks((prevTasks) => [...prevTasks, newTask]);
  await saveTask(newTask); 
};

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    await deleteFromDB(id);
  };
  
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

const editTask = async (updatedTask) => {
  setTasks(
    tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
  await saveTask(updatedTask);
};

  return (
    <div className="app-container min-h-screen bg-gray-200 p-5">
    <h1 className="text-4xl text-center text-blue-600 font-bold mb-4">Task Manager App</h1>
      <TaskForm addTask={addTask} />
      <div className="flex gap-2 my-4 px-4 sm:px-10 md:px-24 lg:px-40 xl:px-64 2xl:px-96 justify-center">
  <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${ filter === "all" ? "bg-blue-500 text-white" : "bg-slate-500 text-white"}`}>All</button>
  <button onClick={() => setFilter("active")} className={`px-3 py-1 rounded ${ filter === "active" ? "bg-blue-500 text-white" : "bg-slate-500 text-white"}`}>Active</button>
  <button onClick={() => setFilter("Urgent")} className={`px-3 py-1 rounded ${ filter === "Urgent" ? "bg-blue-500 text-white" : "bg-slate-500 text-white"}`}>Urgent</button>
  <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded ${ filter === "completed" ? "bg-blue-500 text-white" : "bg-slate-500 text-white"}`}>Completed</button>
</div>
      <TaskList
        tasks={getFilteredTasks()}
        onComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
        onView={setSelectedTask}
      />
    {selectedTask && (
  <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
)}

    </div>
  );
}

export default App;