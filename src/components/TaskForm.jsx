import { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Normal");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      const imageUrl = image ? URL.createObjectURL(image) : null;
      addTask(taskTitle, dueDate, description, type, imageUrl);
      setTaskTitle('');
      setDueDate('');
      setDescription("");
      setType("Normal");
      setImage(null);
    }
  };

  return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 bg-white p-6 rounded-xl shadow-md">
  <input
    type="text"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
    placeholder="Enter your Task Title"
    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter Task Description"
    rows={3}
    className="col-span-1 md:col-span-2 border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="Normal">Normal</option>
    <option value="Urgent">Urgent</option>
  </select>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    className="file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:bg-white file:text-gray-700"
  />

  <button
    type="submit"
    className="col-span-1 md:col-span-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
  >
    Add Task
  </button>
</form>


  );
}

export default TaskForm;
