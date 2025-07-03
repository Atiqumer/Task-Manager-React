import { useState } from 'react';

function TaskItem({ task, onComplete, onDelete, onEdit, onView }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    dueDate: task.dueDate || '',
    description: task.description || '',
    type: task.type || 'Normal',
    imageUrl: task.imageUrl || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedTask((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onEdit({ ...task, ...editedTask });
    setIsEditing(false);
  };

  return (
    <div className={`w-full max-w-2xl grid m-auto justify-center gap-4 p-5 border rounded-lg shadow-sm ${task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-white'}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Title"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
           className="w-full border px-3 py-2 rounded"
            placeholder="Description"
          />
          <select
            name="type"
            value={editedTask.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
          />
         {editedTask.imageUrl && (
  <div className="relative mt-2">
    <img
      src={editedTask.imageUrl}
      alt="Task"
      className="w-[200px] h-[200px] object-cover rounded"
    />
    <button
      type="button"
      onClick={() => setEditedTask(prev => ({ ...prev, imageUrl: null }))}
      className="absolute top-1 bg-red-600 text-white rounded text-xs px-2 py-0.5 hover:bg-red-600"
      title="Remove Image"
    >
      X
    </button>
  </div>
)}

          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">
              Cancel
            </button>
          </div>  
        </>
      ) : (
        <>
          <div>
            <p className="text-lg font-semibold">{task.title}</p>
            <p className="text-sm text-gray-600">Due: {task.dueDate || 'No due date'}</p>
            <p className="text-sm">{task.description}</p>
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${task.type === "Urgent" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
              {task.type}
            </span>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => onComplete(task.id)} className="text-sm bg-sky-600 hover:bg-gray-700 hover:text-white px-2 py-1 text-white rounded">
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onView(task)} className="text-sm bg-blue-500 hover:bg-gray-700 hover:text-white text-white px-2 py-1 rounded">
              View
            </button>
            <button onClick={() => setIsEditing(true)} className="text-sm bg-yellow-500 hover:bg-gray-700 hover:text-white text-white px-2 py-1 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(task.id)} className=" text-sm bg-red-500 hover:bg-gray-700 hover:text-white text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
