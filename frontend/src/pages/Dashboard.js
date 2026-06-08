import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    if (!token) return;

    const res = await axios.get(`${baseURL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post(
      `${baseURL}/api/tasks`,
      {
        title,
        description
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${baseURL}/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Productivity Dashboard</h1>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>

        <h2>Your Tasks</h2>

        {tasks.map((task) => (
          <div key={task._id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
