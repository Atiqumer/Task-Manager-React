import { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Normal");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleRegex = /^[a-zA-Z0-9 ]*$/;

    if (!taskTitle.trim()) {
    alert("Please fill in Title required fields.");
    return;
    }
    if (!dueDate.trim()) {
    alert("Please fill in Date required fields.");
    return;
    }
    if (!description.trim()) {
    alert("Please fill in Description required fields.");
    return;
    }
    if (!titleRegex.test(taskTitle)) {
    alert("Task title must not contain special characters. Only letters, numbers are allowed.");
    return;
  }
  addTask(taskTitle, dueDate, description, type, image);
      setTaskTitle('');
      setDueDate('');
      setDescription("");
      setType("Normal");
      setImage(null);

  };

return (
  <div className="grid justify-center">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-3 bg-white p-6 rounded shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Add Task</h2>

      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        rows={3}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border rounded px-2 py-2"
      >
        <option value="Normal" >Normal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full file:border file:border-grey-300 file:rounded file:px-4 file:py-2 file:bg-white file:text-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-500 transition"
      >
        Add Task To List
      </button>
    </form>
  </div>
);

}

export default TaskForm;
