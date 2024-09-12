"use client";
import { useState, useEffect } from "react";
import { Container, Typography, List, Box, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import SearchForm from "./components/SearchForm";
import SearchItem from "./components/SearchItem";
import dayjs from 'dayjs';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [undoTaskId, setUndoTaskId] = useState(null); // Task to undo
  const [isUndoModalOpen, setUndoModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false, completedAt: null };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? dayjs().format("YYYY-MM-DD HH:mm") : null,
            }
          : task
      )
    );
  };

  const editTask = (taskId) => {
    const newText = prompt("Edit task");
    if (newText) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleUndo = (taskId) => {
    setUndoTaskId(taskId);
    setUndoModalOpen(true);
  };

  const confirmUndo = () => {
    toggleComplete(undoTaskId);
    setUndoTaskId(null);
    setUndoModalOpen(false);
  };

  const closeUndoModal = () => {
    setUndoModalOpen(false);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        paddingTop: "50px",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Pending Tasks
        </Typography>
        <Box
          sx={{
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <TaskForm onAdd={addTask} />
          <List>
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onComplete={() => toggleComplete(task.id)}
                onEdit={editTask}
              />
            ))}
          </List>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Completed Tasks
        </Typography>
        <Box
          sx={{
            backgroundColor: "#FFE9E4",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <SearchForm onSearch={handleSearch} />
          <List>
            {completedTasks.map((task) => (
              <SearchItem
                key={task.id}
                task={task}
                onUndo={() => handleUndo(task.id)}
              />
            ))}
          </List>
        </Box>
      </Container>

      {/* Undo Confirmation Modal */}
      <Dialog open={isUndoModalOpen} onClose={closeUndoModal}>
        <DialogTitle>Confirm Undo</DialogTitle>
        <DialogActions>
          <Button onClick={closeUndoModal}>Cancel</Button>
          <Button onClick={confirmUndo} color="primary">
            Confirm Undo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
