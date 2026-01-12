# Task Manager Frontend

A React-based frontend for the Task Management System with JWT authentication.

## Features

- **Authentication**: Login and registration with JWT tokens
- **Task Lists**: Create, edit, delete, and view task lists
- **Tasks**: Add, edit, delete, and manage tasks within lists
- **Task Management**: 
  - Set priority levels (High, Medium, Low)
  - Set due dates
  - Mark tasks as complete/incomplete
  - Filter tasks by status
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Configuration

The frontend is configured to connect to the backend API at `http://localhost:8080`. Make sure your backend is running before using the frontend.

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View all your task lists with progress indicators
3. **Create Task Lists**: Click "New Task List" to create a new list
4. **Manage Tasks**: Click on a task list to view and manage its tasks
5. **Task Operations**: Add, edit, delete, and mark tasks as complete

## API Integration

The frontend integrates with the following backend endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info
- `GET /api/task-lists` - Get all task lists
- `POST /api/task-lists` - Create new task list
- `PUT /api/task-lists/{id}` - Update task list
- `DELETE /api/task-lists/{id}` - Delete task list
- `GET /api/task-lists/{id}/tasks` - Get tasks for a list
- `POST /api/task-lists/{id}/tasks` - Create new task
- `PUT /api/task-lists/{id}/tasks/{taskId}` - Update task
- `DELETE /api/task-lists/{id}/tasks/{taskId}` - Delete task

## Technologies Used

- **React 19** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and development server

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint