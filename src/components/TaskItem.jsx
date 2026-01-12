import { useState } from 'react';
import { CheckCircle, Circle, Calendar, Flag, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleStatusToggle = () => {
    const newStatus = task.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    onUpdate(task.id, { ...task, status: newStatus });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'text-red-500 dark:text-red-400';
      case 'MEDIUM': return 'text-yellow-500 dark:text-yellow-400';
      case 'LOW': return 'text-green-500 dark:text-green-400';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start space-x-3">
        <button
          onClick={handleStatusToggle}
          className="mt-1 flex-shrink-0"
        >
          {task.status === 'CLOSED' ? (
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium ${
            task.status === 'CLOSED' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.status === 'CLOSED' ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center space-x-4 mt-2">
            {task.priority && (
              <div className="flex items-center space-x-1">
                <Flag className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            )}
            
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;