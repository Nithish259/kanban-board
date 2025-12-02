import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function AddTaskModal({ open, onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState(new Date());

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    // addTask currently only accepts title + description; we'll pass priority via edit immediately after adding
    addTask(title, description, priority, deadline);

    // local quick fix: because addTask always adds to todo with default priority,
    // we'll edit newly added last task to set its priority (safer than changing addTask signature)
    // But simpler approach: call onClose and let user edit priority via edit modal/details modal.
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Medium");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[380px] rounded-xl shadow-xl p-6 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Task
        </h2>

        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          className="border p-2 w-full rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-600">
          Description (optional)
        </label>
        <textarea
          className="border p-2 w-full rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          rows="3"
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-600">Priority</label>
        <select
          className="border p-2 w-full rounded-lg mt-1 mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label className="text-sm font-medium text-gray-600">Deadline</label>
        <input
          type="date"
          value={deadline}
          className="border p-2 w-full rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskModal;
