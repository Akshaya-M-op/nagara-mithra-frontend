import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  MapPin,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fieldWorkerTasks } from "../../data/fieldWorkerTasks";

const statusLabels = {
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
};

export default function FieldWorkerTasks() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return fieldWorkerTasks.filter((task) => {
      const text = searchText.toLowerCase();

      const matchesSearch =
        task.id.toLowerCase().includes(text) ||
        task.complaintId.toLowerCase().includes(text) ||
        task.title.toLowerCase().includes(text) ||
        task.ward.toLowerCase().includes(text) ||
        task.location.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter]);

  return (
    <DashboardLayout
      role="fieldworker"
      title="My Tasks"
      userName="Arun Kumar"
    >
      <section className="page-heading">
        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/fieldworker/dashboard")
          }
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

        <p className="section-eyebrow">Field operations</p>
        <h2>My assigned tasks</h2>
        <p>
          View and update the civic tasks assigned to you.
        </p>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Task list</h3>
            <p>
              {filteredTasks.length} task
              {filteredTasks.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="worker-task-controls">
            <div className="complaint-search">
              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search task, ward or location..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">All tasks</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">
                In Progress
              </option>
              <option value="work_completed">
                Work Completed
              </option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="field-worker-task-list">
          {filteredTasks.map((task) => (
            <article
              className={`field-worker-task-card ${task.priority}`}
              key={task.id}
            >
              <div className="task-priority-marker">
                {task.priority.toUpperCase()}
              </div>

              <div className="field-worker-task-main">
                <span className="task-id">
                  {task.id} · {task.complaintId}
                </span>

                <h4>{task.title}</h4>

                <p>{task.description}</p>

                <div className="task-meta">
                  <span>
                    <MapPin size={14} />
                    {task.ward}, {task.location}
                  </span>

                  <span>
                    {statusLabels[task.status]}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="primary-action compact-action"
                onClick={() =>
                  navigate(`/fieldworker/tasks/${task.id}`)
                }
              >
                Open task
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="department-empty-state">
            <ClipboardList size={27} />
            <h3>No tasks found</h3>
            <p>Try another filter or search term.</p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}