import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  UserRound,
  Phone,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";
import { fieldWorkers } from "../../data/fieldWorkers";

const statusLabels = {
  available: "Available",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function FieldWorkers() {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const department = departments.find(
    (item) => item.id === departmentId
  );

  const workers = useMemo(() => {
    return fieldWorkers.filter(
      (worker) => worker.department === departmentId
    );
  }, [departmentId]);

  const filteredWorkers = workers.filter((worker) => {
    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      worker.name.toLowerCase().includes(searchValue) ||
      worker.id.toLowerCase().includes(searchValue) ||
      worker.ward.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || worker.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!department) {
    return null;
  }

  return (
    <DashboardLayout
      role="officer"
      title="Field Workers"
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          className="back-button"
          onClick={() =>
            navigate(`/officer/departments/${departmentId}/workspace`)
          }
        >
          <ArrowLeft size={17} />
          Back to department workspace
        </button>

        <p className="section-eyebrow">{department.code}</p>
        <h2>{department.shortName} field workers</h2>
        <p>
          Monitor assignments, work status and field-worker availability.
        </p>
      </section>

      <section className="worker-summary-grid">
        <div className="worker-summary-card">
          <UserRound size={20} />
          <span>Total workers</span>
          <strong>{workers.length}</strong>
        </div>

        <div className="worker-summary-card available">
          <CheckCircle2 size={20} />
          <span>Available</span>
          <strong>
            {workers.filter((worker) => worker.status === "available").length}
          </strong>
        </div>

        <div className="worker-summary-card active">
          <Clock3 size={20} />
          <span>Active tasks</span>
          <strong>
            {
              workers.filter(
                (worker) =>
                  worker.status === "assigned" ||
                  worker.status === "in_progress"
              ).length
            }
          </strong>
        </div>

        <div className="worker-summary-card completed">
          <ClipboardList size={20} />
          <span>Completed</span>
          <strong>
            {workers.filter((worker) => worker.status === "completed").length}
          </strong>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Department field workers</h3>
            <p>
              {filteredWorkers.length} worker
              {filteredWorkers.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="worker-filters">
            <div className="complaint-search">
              <Search size={17} />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search worker or ward..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="worker-list">
          {filteredWorkers.map((worker) => (
            <article className="worker-row" key={worker.id}>
              <div className="worker-avatar">
                {worker.name.charAt(0)}
              </div>

              <div className="worker-main">
                <h4>{worker.name}</h4>
                <span>{worker.id}</span>
              </div>

              <div className="worker-info">
                <span>
                  <MapPin size={14} />
                  {worker.ward}
                </span>

                <span>
                  <Phone size={14} />
                  {worker.phone}
                </span>
              </div>

              <div className="worker-task">
                <strong>{worker.assignedTask || "No active task"}</strong>
                <span>{worker.taskTitle}</span>
              </div>

              <div>
                <span className={`worker-status ${worker.status}`}>
                  {statusLabels[worker.status]}
                </span>

                <small className="worker-last-update">
                  {worker.lastUpdate}
                </small>
              </div>

              <button
                className="worker-view-button"
                onClick={() =>
                  alert(
                    `${worker.name} is ${statusLabels[worker.status]} in ${worker.ward}.`
                  )
                }
              >
                View
              </button>
            </article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}