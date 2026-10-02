# MERN To-Do List App (Task 3)

React + Express + MongoDB Atlas To-Do app with create, read, update, and delete operations. Tasks include a text field and a completion status.

## API

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/add` | Add a task with `{ "text": "Learn MERN" }` |
| GET | `/tasks` | Get all tasks, oldest first |
| PUT | `/update/:id` | Update the task `text`, `completed`, or both |
| DELETE | `/delete/:id` | Delete a task by its MongoDB ObjectId |

The PUT request accepts either `{ "text": "Updated task" }`, `{ "completed": true }`, or both properties. Text is trimmed and must contain 1–200 characters. The API returns 400 for invalid input or IDs and 404 when a valid ID does not match a task.

## Setup

### 1. MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/atlas
2. Database Access -> add a user (username + password)
3. Network Access -> add your IP
4. Connect -> Drivers -> copy the connection string

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env     # add your MongoDB Atlas connection string
npm run dev              # http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Set `VITE_API_URL` in `frontend/.env` if the API is hosted somewhere other than `http://localhost:5000`.

## Postman examples

Use `http://localhost:5000` as the base URL and select **Body -> raw -> JSON**.

- Add: `POST /add` with `{ "text": "Learn MERN" }`
- List: `GET /tasks`
- Edit text: `PUT /update/<taskId>` with `{ "text": "Learn full-stack MERN" }`
- Mark complete: `PUT /update/<taskId>` with `{ "completed": true }`
- Edit both: `PUT /update/<taskId>` with `{ "text": "Submit Task 3", "completed": false }`
- Delete: `DELETE /delete/<taskId>` (no request body)

Copy `<taskId>` from the `_id` field returned by `POST /add` or `GET /tasks`.

## Manual test checklist

- Add a task and confirm it appears in the list.
- Edit its text; verify Enter saves and Escape cancels.
- Mark the task complete and confirm its text is struck through.
- Delete the task and confirm it disappears.
- Refresh the page and confirm saved changes remain in MongoDB Atlas.

## Internship submission summary

React sends task edits to Express with Axios `PUT` requests and sends removals with `DELETE` requests. Express validates each task ID and request body before updating or deleting a document through Mongoose. Mongoose applies schema validation, updates the MongoDB document, and returns the updated task to React. React uses functional state updates to reflect each successful response without reloading the page.

## Structure
```
mern-todo/
  backend/   server.js, package.json
  frontend/  src/App.jsx, src/TaskItem.jsx, src/App.css, src/main.jsx
```
# Maincrafts-taks3
