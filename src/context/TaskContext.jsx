import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [],
          inProgress: [],
          completed: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(columns));
  }, [columns]);

  // Add new task
  function addTask(title, description, priority, deadline) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      deadline,
    };

    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  }

  // Edit existing task fields
  function editTask(columnId, taskId, updatedData) {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === taskId ? { ...t, ...updatedData } : t
      ),
    }));
  }

  // Delete task
  function deleteTask(columnId, taskId) {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t.id !== taskId),
    }));
  }

  // Move by drag & drop using react-beautiful-dnd source/destination objects
  function moveTask(source, destination) {
    console.log(source, destination);

    setColumns((prev) => {
      const sourceCol = Array.from(prev[source.droppableId]);
      const destCol = Array.from(prev[destination.droppableId]);

      const [moved] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, moved);

      return {
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      };
    });
  }

  // Reorder inside same column
  function reorderInside(droppableId, source, destination) {
    console.log(droppableId, source, destination);

    setColumns((prev) => {
      const list = Array.from(prev[droppableId]);
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);

      return {
        ...prev,
        [droppableId]: list,
      };
    });
  }

  // Change status (move by id) — used by details modal dropdown
  function changeTaskStatus(taskId, fromColumnId, toColumnId) {
    if (fromColumnId === toColumnId) return;
    console.log(taskId, fromColumnId, toColumnId);

    setColumns((prev) => {
      const from = Array.from(prev[fromColumnId]);
      const taskIndex = from.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;
      const [movedTask] = from.splice(taskIndex, 1);

      const to = Array.from(prev[toColumnId]);
      to.push(movedTask);

      return {
        ...prev,
        [fromColumnId]: from,
        [toColumnId]: to,
      };
    });
  }

  return (
    <TaskContext.Provider
      value={{
        columns,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        reorderInside,
        changeTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
