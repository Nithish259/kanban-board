import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "../App.css";

function Column({ id, title, color, tasks, openEdit, openDetails }) {
  return (
    <div
      className={`w-[32%] min-w-[300px] h-[450px] rounded-xl shadow-md border ${color} flex flex-col`}
    >
      <h3 className="p-4 bg-white border-b text-lg font-semibold text-gray-700 sticky top-0 rounded-t-xl">
        {title}
      </h3>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex-1 px-3 py-4 space-y-3 overflow-y-auto hide-scrollbar"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((t, i) => (
              <TaskCard
                key={t.id}
                task={t}
                index={i}
                columnId={id}
                openEdit={openEdit}
                openDetails={openDetails}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
