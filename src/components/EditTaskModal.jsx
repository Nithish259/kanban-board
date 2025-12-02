import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function EditTaskModal({ open, onClose, task, columnId }) {
  const { editTask } = useTasks();
  const [deadline, setDeadline] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority || "Medium");
      setDeadline(task.deadline || new Date());
    }
  }, [task]);

  if (!open || !task) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    editTask(columnId, task.id, {
      title,
      description,
      priority,
      deadline,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[380px] rounded-xl shadow-xl p-6 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h2>

        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          className="border p-2 w-full rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-600">Description</label>
        <textarea
          className="border p-2 w-full rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          rows="3"
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

        <div className="flex justify-end gap-3 mt-4">
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;
