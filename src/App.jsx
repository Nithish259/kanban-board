import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { useTasks } from "./context/TaskContext";
import Column from "./components/Column";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
import "./App.css";

function App() {
  const { columns, reorderInside, moveTask } = useTasks();

  // add/edit modal states
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  // details modal states
  const [detailsModal, setDetailsModal] = useState(false);
  const [detailsTask, setDetailsTask] = useState(null);
  const [detailsColumn, setDetailsColumn] = useState(null);

  function openEdit(task, columnId) {
    setSelectedTask(task);
    setSelectedColumn(columnId);
    setEditModal(true);
  }

  function openDetails(task, columnId) {
    setDetailsTask(task);
    setDetailsColumn(columnId);
    setDetailsModal(true);
  }

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      reorderInside(source.droppableId, source, destination);
    } else {
      moveTask(source, destination);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white shadow p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-3xl font-semibold tracking-wide">Kanban Board</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow-sm font-medium"
        >
          <i class="fa-solid fa-plus"></i> Add Task
        </button>
      </div>

      {/* Modals */}
      <AddTaskModal open={openModal} onClose={() => setOpenModal(false)} />

      <EditTaskModal
        open={editModal}
        onClose={() => setEditModal(false)}
        task={selectedTask}
        columnId={selectedColumn}
      />

      <TaskDetailsModal
        open={detailsModal}
        onClose={() => setDetailsModal(false)}
        task={detailsTask}
        columnId={detailsColumn}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full w-full items-center flex-col md:flex-row gap-6 p-10">
          <Column
            id="todo"
            title="To Do"
            color="bg-red-50 border-red-400"
            tasks={columns.todo}
            openEdit={openEdit}
            openDetails={openDetails}
          />
          <Column
            id="inProgress"
            title="In Progress"
            color="bg-yellow-50 border-yellow-400"
            tasks={columns.inProgress}
            openEdit={openEdit}
            openDetails={openDetails}
          />
          <Column
            id="completed"
            title="Completed"
            color="bg-green-50 border-green-400"
            tasks={columns.completed}
            openEdit={openEdit}
            openDetails={openDetails}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
