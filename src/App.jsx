import './App.css';
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));}, [tasks]); 
  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("tasks")) || [];setTasks(saved);}, []);

  const getFilteredTasks = () => {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "Urgent") return tasks.filter((t) => t.type === "Urgent");
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
};

  const addTask = (title, dueDate,description,type,imageUrl) => {
    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      description,
      type,
      imageUrl,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="app-container min-h-screen bg-gray-200 p-8">
    <h1 className="text-4xl text-center text-blue-600 font-bold mb-6">Task Manager App</h1>
      <TaskForm addTask={addTask} />
      <div className="flex gap-2 my-6 px-[445px]">
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
      />
    </div>
  );
}

export default App;