# MERN To-Do List App (Task 2)

React + Express + MongoDB Atlas. Users can add tasks and see them listed immediately.

## API
| Method | Route   | Description        |
|--------|---------|--------------------|
| POST   | /add    | Add a task `{ text }` |
| GET    | /tasks  | Get all tasks      |

## Setup

### 1. MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/atlas
2. Database Access -> add a user (username + password)
3. Network Access -> add your IP (or 0.0.0.0/0 for testing)
4. Connect -> Drivers -> copy the connection string

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env     # then paste your connection string into .env
npm run dev              # http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

### 4. Test with Postman
- POST http://localhost:5000/add with JSON body `{ "text": "Learn MERN" }`
- GET  http://localhost:5000/tasks

## Structure
```
mern-todo/
  backend/   server.js, package.json, .env.example
  frontend/  src/App.jsx, src/App.css, src/main.jsx, index.html
```
# maincrafts-task2
# maincrafts-task2
