import { useMemo, useState } from "react";
import {
  Search,
  UsersRound,
  MapPin,
  ClipboardList,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fieldWorkers } from "../../data/fieldWorkers";

const statusLabels = {
  available: "Available",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function AllFieldWorkers() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showAddWorker, setShowAddWorker] = useState(false);

  const [workers, setWorkers] = useState(fieldWorkers);

  const [newWorker, setNewWorker] = useState({
    name: "",
    phone: "",
    ward: "",
    department: "",
  });

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const text = searchText.toLowerCase();

      const matchesSearch =
        worker.name.toLowerCase().includes(text) ||
        worker.id.toLowerCase().includes(text) ||
        worker.ward.toLowerCase().includes(text) ||
        worker.department.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "all" || worker.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [workers, searchText, statusFilter]);

  function handleWorkerChange(event) {
    const { name, value } = event.target;

    setNewWorker((previousWorker) => ({
      ...previousWorker,
      [name]: value,
    }));
  }

  function handleAddWorker(event) {
    event.preventDefault();

    const worker = {
      id: `FW-${String(workers.length + 1).padStart(3, "0")}`,
      name: newWorker.name,
      phone: newWorker.phone,
      ward: newWorker.ward,
      department: newWorker.department,
      status: "available",
      assignedTask: "",
      taskTitle: "No active task",
      lastUpdate: "Just now",
    };

    setWorkers((previousWorkers) => [
      ...previousWorkers,
      worker,
    ]);

    setNewWorker({
      name: "",
      phone: "",
      ward: "",
      department: "",
    });

    setShowAddWorker(false);
  }

  return (
    <DashboardLayout
      role="officer"
      title="Field Worker Monitoring"
      userName="Demo Officer"
    >
      <section className="page-heading worker-page-heading">
        <div>
          <p className="section-eyebrow">Operations monitoring</p>
          <h2>All field workers</h2>
          <p>
            Monitor assignments, wards and work status across departments.
          </p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={() => setShowAddWorker(true)}
        >
          Add field worker
        </button>
      </section>

      <section className="worker-summary-grid">
        <div className="worker-summary-card">
          <UsersRound size={20} />
          <span>Total workers</span>
          <strong>{workers.length}</strong>
        </div>

        <div className="worker-summary-card available">
          <UsersRound size={20} />
          <span>Available</span>
          <strong>
            {
              workers.filter(
                (worker) => worker.status === "available"
              ).length
            }
          </strong>
        </div>

        <div className="worker-summary-card active">
          <ClipboardList size={20} />
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
          <span>Completed tasks</span>
          <strong>
            {
              workers.filter(
                (worker) => worker.status === "completed"
              ).length
            }
          </strong>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Field-worker list</h3>
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
                placeholder="Search worker, ward or department..."
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
                <span>{worker.department}</span>

                <span>
                  <MapPin size={14} />
                  {worker.ward}
                </span>
              </div>

              <div className="worker-task">
                <strong>
                  {worker.assignedTask || "No active task"}
                </strong>

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
            </article>
          ))}
        </div>
      </section>

      {showAddWorker && (
        <div className="modal-backdrop">
          <div className="assign-modal">
            <div className="assign-modal-header">
              <div>
                <p className="section-eyebrow">
                  Worker registration
                </p>
                <h3>Add field worker</h3>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowAddWorker(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddWorker}>
              <div className="form-field">
                <label htmlFor="worker-name">Full name</label>

                <input
                  id="worker-name"
                  name="name"
                  value={newWorker.name}
                  onChange={handleWorkerChange}
                  placeholder="Enter worker name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="worker-phone">Phone number</label>

                <input
                  id="worker-phone"
                  name="phone"
                  value={newWorker.phone}
                  onChange={handleWorkerChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="worker-ward">Ward</label>

                <input
                  id="worker-ward"
                  name="ward"
                  value={newWorker.ward}
                  onChange={handleWorkerChange}
                  placeholder="Example: Ward 12"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="worker-department">
                  Department
                </label>

                <select
                  id="worker-department"
                  name="department"
                  value={newWorker.department}
                  onChange={handleWorkerChange}
                  required
                >
                  <option value="">Select department</option>
                  <option value="drainage">Drainage</option>
                  <option value="roads">
                    Roads and Transport
                  </option>
                  <option value="sanitation">Sanitation</option>
                  <option value="streetlights">Streetlights</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddWorker(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-action"
                >
                  Add worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}