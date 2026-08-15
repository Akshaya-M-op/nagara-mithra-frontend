import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ClipboardList,
  MapPin,
  Search,
  ArrowRight,
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

export default function FieldWorkerDashboard() {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const assignedCount = fieldWorkerTasks.filter(
    (task) => task.status === "assigned"
  ).length;

  const inProgressCount = fieldWorkerTasks.filter(
    (task) => task.status === "in_progress"
  ).length;

  const completedCount = fieldWorkerTasks.filter(
    (task) =>
      task.status === "work_completed" ||
      task.status === "resolved"
  ).length;

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
      title="Field Worker Dashboard"
      userName="Arun Kumar"
    >
      <section className="page-heading fieldworker-heading">
        <div>
          <p className="section-eyebrow">
            Field operations
          </p>

          <h2>Good afternoon, Arun</h2>

          <p>
            View assigned tasks, update work status and submit
            completion evidence.
          </p>
        </div>

        <div className="worker-online-status">
          <span />
          Online
        </div>
      </section>

      <section className="worker-task-summary-grid">
        <button
          type="button"
          className="worker-task-summary-card blue"
          onClick={() => setStatusFilter("all")}
        >
          <ClipboardList size={20} />
          <span>All tasks</span>
          <strong>{fieldWorkerTasks.length}</strong>
          <small>Assigned to you</small>
        </button>

        <button
          type="button"
          className="worker-task-summary-card orange"
          onClick={() => setStatusFilter("assigned")}
        >
          <Clock3 size={20} />
          <span>Assigned</span>
          <strong>{assignedCount}</strong>
          <small>Waiting to start</small>
        </button>

        <button
          type="button"
          className="worker-task-summary-card red"
          onClick={() => setStatusFilter("in_progress")}
        >
          <AlertTriangle size={20} />
          <span>In progress</span>
          <strong>{inProgressCount}</strong>
          <small>Active work</small>
        </button>

        <button
          type="button"
          className="worker-task-summary-card green"
          onClick={() => setStatusFilter("work_completed")}
        >
          <CheckCircle2 size={20} />
          <span>Completed</span>
          <strong>{completedCount}</strong>
          <small>Waiting for validation</small>
        </button>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>My assigned tasks</h3>

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
                <div className="task-title-row">
                  <div>
                    <span className="task-id">
                      {task.id} · {task.complaintId}
                    </span>

                    <h4>{task.title}</h4>
                  </div>

                  <span className={`task-status ${task.status}`}>
                    {statusLabels[task.status]}
                  </span>
                </div>

                <p>{task.description}</p>

                <div className="task-meta">
                  <span>
                    <MapPin size={14} />
                    {task.ward}, {task.location}
                  </span>

                  <span>Due {task.dueDate}</span>
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
            <p>Try another status filter or search term.</p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}