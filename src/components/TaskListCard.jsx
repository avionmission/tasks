import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Edit2, Trash2, CheckCircle } from 'lucide-react';

const TaskListCard = ({ taskList, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const progressPercentage = taskList.progress * 100;

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(taskList);
    setShowMenu(false);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(taskList.id);
    setShowMenu(false);
  };

  return (
    <Link 
      to={`/task-lists/${taskList.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {taskList.title}
          </h3>
          {taskList.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{taskList.description}</p>
          )}
        </div>
        <div className="relative">
          <button
            onClick={handleMenuClick}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
              <button
                onClick={handleEditClick}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{taskList.count} tasks</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {taskList.tasks && taskList.tasks.length > 0 && (
        <div className="mt-4 space-y-2">
          {taskList.tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center space-x-2 text-sm">
              <CheckCircle 
                className={`h-4 w-4 ${
                  task.status === 'CLOSED' ? 'text-green-500 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'
                }`} 
              />
              <span className={task.status === 'CLOSED' ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}>
                {task.title}
              </span>
            </div>
          ))}
          {taskList.tasks.length > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-500">+{taskList.tasks.length - 3} more tasks</p>
          )}
        </div>
      )}
    </Link>
  );
};

export default TaskListCard;