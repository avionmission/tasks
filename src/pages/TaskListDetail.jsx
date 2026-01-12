import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import { taskListsAPI, tasksAPI } from '../services/api';

const TaskListDetail = () => {
  const { id } = useParams();
  const [taskList, setTaskList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchTaskListAndTasks();
  }, [id]);

  const fetchTaskListAndTasks = async () => {
    try {
      setLoading(true);
      const [taskListResponse, tasksResponse] = await Promise.all([
        taskListsAPI.getById(id),
        tasksAPI.getAll(id)
      ]);
      setTaskList(taskListResponse.data);
      setTasks(tasksResponse.data);
    } catch (err) {
      setError('Failed to fetch task list details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      const response = await tasksAPI.create(id, formData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, formData) => {
    try {
      const response = await tasksAPI.update(id, taskId, formData);
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id, taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleModalSubmit = (formData) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, formData);
    } else {
      handleCreateTask(formData);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'OPEN': return task.status === 'OPEN';
      case 'CLOSED': return task.status === 'CLOSED';
      default: return true;
    }
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!taskList) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">Task list not found</div>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 mt-2 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{taskList.title}</h1>
            {taskList.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{taskList.description}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ALL">All Tasks</option>
                <option value="OPEN">Open Tasks</option>
                <option value="CLOSED">Completed Tasks</option>
              </select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTasks.length} of {tasks.length} tasks
            </span>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {filter === 'ALL' ? 'No tasks yet' : `No ${filter.toLowerCase()} tasks`}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add your first task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onEdit={openEditModal}
              />
            ))}
          </div>
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          task={editingTask}
        />
      </div>
    </Layout>
  );
};

export default TaskListDetail;