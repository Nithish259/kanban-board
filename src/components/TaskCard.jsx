import { Draggable } from "react-beautiful-dnd";
import { useTasks } from "../context/TaskContext";
import PriorityPill from "./PriorityPill";

function TaskCard({ task, index, columnId, openEdit, openDetails }) {
  const { deleteTask } = useTasks();

  // Prevent click on button from triggering card click
  function stop(e) {
    e.stopPropagation();
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => openDetails(task, columnId)}
          className={`p-4 bg-white rounded-xl shadow-md transition cursor-pointer
            ${
              snapshot.isDragging ? "shadow-2xl scale-[1.02] bg-blue-200" : ""
            }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start gap-3">
            <div>
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              {task.deadline && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-red-50 text-red-500 border border-red-500 rounded-lg">
                  <i class="fa-solid fa-calendar"></i>{" "}
                  {formatDate(task.deadline)}
                </span>
              )}
            </div>

            {/* Priority pill */}
            <div className="shrink-0 ml-2">
              <PriorityPill priority={task.priority} />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-3 text-md">
            <button
              onClick={(e) => {
                stop(e);
                openEdit(task, columnId);
              }}
              className="text-blue-600 hover:cursor-pointer"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button
              onClick={(e) => {
                stop(e);
                deleteTask(columnId, task.id);
              }}
              className="text-red-600 hover:cursor-pointer"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
