import React from "react";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
        <p className="mb-1"><strong>Due Date:</strong> {task.dueDate}</p>
        <p className="mb-1"><strong>Description:</strong> {task.description}</p>
        <p className="mb-1"><strong>Type:</strong> {task.type}</p>
        {task.imageUrl && (
          <img src={task.imageUrl} alt="Task" className="w-full h-auto rounded my-4" />
        )}
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
