import React from "react";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative flex flex-col items-center text-center">
       <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="bg-blue-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
             Due: {task.dueDate}
          </span>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {task.description}
          </span>
          <span className="bg-purple-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
             Type: {task.type}
          </span>
        </div>

        {task.imageUrl && (
          <img
            src={task.imageUrl}
            alt="Task"
            className="w-[200px] h-[200px] object-cover object-center rounded mb-4"
          />
        )}

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Close View
        </button>
      </div>
    </div>
  );
};

export default TaskModal;