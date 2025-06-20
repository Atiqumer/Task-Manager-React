import TaskItem from './TaskItem';

function TaskList({ tasks, onComplete, onDelete, onEdit }) {
  return (
    <div className="space-y-3 mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center italic">No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
