import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks from backend on first load
  useEffect(() => {
    axios
      .get(`${API}/tasks`)
      .then((res) => setTasks(res.data))
      .catch(() => setError("Could not load tasks. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // Add a new task
  const addTask = async () => {
    const value = text.trim();
    if (!value) return setError("Task cannot be empty.");
    setError("");
    try {
      const res = await axios.post(`${API}/add`, { text: value });
      setTasks((prev) => [...prev, res.data]);
      setText("");
    } catch {
      setError("Could not add the task. Try again.");
    }
  };

  return (
    <main className="app">
      <h1>MERN To-Do App</h1>

      <div className="add-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="What needs doing?"
          aria-label="New task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet. Add your first one above.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t._id}>{t.text}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
