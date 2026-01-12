import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout';
import TaskListCard from '../components/TaskListCard';
import TaskListModal from '../components/TaskListModal';
import { taskListsAPI } from '../services/api';

const Dashboard = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskList, setEditingTaskList] = useState(null);

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    try {
      setLoading(true);
      const response = await taskListsAPI.getAll();
      setTaskLists(response.data);
    } catch (err) {
      setError('Failed to fetch task lists');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTaskList = async (formData) => {
    try {
      const response = await taskListsAPI.create(formData);
      setTaskLists([...taskLists, response.data]);
    } catch (err) {
      setError('Failed to create task list');
    }
  };

  const handleEditTaskList = async (formData) => {
    try {
      const response = await taskListsAPI.update(editingTaskList.id, {
        ...formData,
        id: editingTaskList.id,
      });
      setTaskLists(taskLists.map(tl => 
        tl.id === editingTaskList.id ? response.data : tl
      ));
      setEditingTaskList(null);
    } catch (err) {
      setError('Failed to update task list');
    }
  };

  const handleDeleteTaskList = async (id) => {
    if (window.confirm('Are you sure you want to delete this task list?')) {
      try {
        await taskListsAPI.delete(id);
        setTaskLists(taskLists.filter(tl => tl.id !== id));
      } catch (err) {
        setError('Failed to delete task list');
      }
    }
  };

  const openEditModal = (taskList) => {
    setEditingTaskList(taskList);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTaskList(null);
  };

  const handleModalSubmit = (formData) => {
    if (editingTaskList) {
      handleEditTaskList(formData);
    } else {
      handleCreateTaskList(formData);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Task Lists</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Task List</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {taskLists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">No task lists yet</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Create your first task list
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskLists.map((taskList) => (
              <TaskListCard
                key={taskList.id}
                taskList={taskList}
                onEdit={openEditModal}
                onDelete={handleDeleteTaskList}
              />
            ))}
          </div>
        )}

        <TaskListModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          taskList={editingTaskList}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;