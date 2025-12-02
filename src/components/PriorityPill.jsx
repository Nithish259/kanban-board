function PriorityPill({ priority }) {
  const base =
    "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 border ";

  if (priority === "High") {
    return (
      <span className={base + "border-red-500 bg-red-500 text-white"}>
        <i className="fa-regular fa-clock"></i> High
      </span>
    );
  }

  if (priority === "Low") {
    return (
      <span className={base + "border-green-500 bg-green-500 text-white"}>
        <i className="fa-regular fa-clock"></i> Low
      </span>
    );
  }

  // Default → Medium
  return (
    <span className={base + "border-yellow-500 bg-yellow-500 text-white"}>
      <i className="fa-regular fa-clock"></i> Medium
    </span>
  );
}

export default PriorityPill;
