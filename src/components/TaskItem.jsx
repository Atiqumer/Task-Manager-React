import { useState } from 'react';

function TaskItem({ task, onComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div
  className={`flex items-center justify-between p-4 border rounded mb-2 ${
    task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-white'
  }`}
>
  {isEditing ? (
    <>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
      />
      <button onClick={handleSave} className="text-sm-9 bg-neutral-300 hover:bg-zinc-700 hover:text-white text-black px-6 py-1 rounded ">
        Save
      </button>
    </>
  ) : (
    <>
      <div>
        <p className="font-semibold">{task.title}</p>
        <p className="text-sm text-gray-600">Due: {task.dueDate || 'No due date'}</p>
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${task.type === "Urgent" ? "bg-red-100 text-red-700" :
      "bg-blue-100 text-blue-700"}
  `}
>
  {task.type}
</span>

      </div>
      <div className="flex gap-2">
        <button onClick={() => onComplete(task.id)} className="text-sm bg-sky-600 hover:bg-gray-700 hover:text-white px-2 py-1 text-white rounded ">
          {task.completed ? 'Undo' : 'Complete'}  
        </button>
        <button onClick={handleEdit} className="text-sm bg-blue-500 hover:bg-gray-700 hover:text-white text-white px-2 py-1 rounded">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-sm bg-red-500 hover:bg-gray-700 hover:text-white text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </>
  )}
</div>

  );
}
export default TaskItem;
