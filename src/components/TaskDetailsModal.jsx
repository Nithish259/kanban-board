import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import PriorityPill from "./PriorityPill";

function TaskDetailsModal({ open, onClose, task, columnId }) {
  const { editTask, deleteTask, changeTaskStatus } = useTasks();

  const [localTask, setLocalTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

  useEffect(() => {
    setLocalTask(task ? { ...task } : null);
    setEditingTitle(false);
    setEditingDesc(false);
  }, [task]);

  if (!open || !localTask) return null;

  function saveField(field, value) {
    editTask(columnId, localTask.id, { [field]: value });
    setLocalTask((prev) => ({ ...prev, [field]: value }));
  }

  function handleDelete() {
    deleteTask(columnId, localTask.id);
    onClose();
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function handleStatusChange(e) {
    const newStatus = e.target.value;
    // changeTaskStatus moves the task between columns
    changeTaskStatus(localTask.id, columnId, newStatus);
    onClose(); // close modal after moving (optional)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[420px] rounded-xl shadow-xl">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {editingTitle ? (
              <>
                <input
                  className="w-full border p-2 rounded-lg"
                  value={localTask.title}
                  onChange={(e) =>
                    setLocalTask((p) => ({ ...p, title: e.target.value }))
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                    onClick={() => {
                      saveField("title", localTask.title);
                      setEditingTitle(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 border rounded-lg"
                    onClick={() => {
                      setLocalTask(task);
                      setEditingTitle(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{localTask.title}</h2>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="text-sm text-blue-600 mt-1"
                >
                  Edit title <i class="fa-solid fa-pen"></i>
                </button>
              </>
            )}

            <div className="mt-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Priority:</span>
                <PriorityPill priority={localTask.priority} />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Deadline:</span>
                {task.deadline && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-red-50 text-red-500 border border-red-500 rounded-lg">
                    <i class="fa-solid fa-calendar"></i>{" "}
                    {formatDate(task.deadline)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <select
              value={columnId || "todo"}
              onChange={handleStatusChange}
              className="border p-2 rounded-lg"
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Description</h3>

          {editingDesc ? (
            <>
              <textarea
                className="border w-full rounded-lg p-2"
                rows="5"
                value={localTask.description || ""}
                onChange={(e) =>
                  setLocalTask((p) => ({ ...p, description: e.target.value }))
                }
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                  onClick={() => {
                    saveField("description", localTask.description || "");
                    setEditingDesc(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 border rounded-lg"
                  onClick={() => {
                    setLocalTask(task);
                    setEditingDesc(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p
                className="border p-3 rounded-lg cursor-pointer bg-gray-50"
                onClick={() => setEditingDesc(true)}
              >
                {localTask.description || "Click to add description..."}
              </p>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <i class="fa-solid fa-trash"></i> Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <i class="fa-regular fa-circle-xmark"></i> Close
            </button>
            <button
              onClick={() => {
                // quick access to edit modal for full edits
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <i class="fa-solid fa-thumbs-up"></i> Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
