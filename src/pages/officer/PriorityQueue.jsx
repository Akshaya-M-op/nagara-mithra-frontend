import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Search,
  MapPin,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departmentComplaints } from "../../data/departmentComplaints";

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const statusLabels = {
  under_verification: "Under Verification",
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
};

export default function PriorityQueue() {
  const navigate = useNavigate();

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredComplaints = useMemo(() => {
    return [...departmentComplaints]
      .filter((complaint) => {
        const text = searchText.toLowerCase();

        const matchesSearch =
          String(complaint.id || "").toLowerCase().includes(text) ||
          String(complaint.category || "").toLowerCase().includes(text) ||
          String(complaint.ward || "").toLowerCase().includes(text) ||
          String(complaint.location || "").toLowerCase().includes(text);

        const matchesPriority =
          priorityFilter === "all" ||
          complaint.priority === priorityFilter;

        return matchesSearch && matchesPriority;
      })
      .sort(
        (first, second) =>
          (priorityOrder[first.priority] || 99) -
          (priorityOrder[second.priority] || 99)
      );
  }, [priorityFilter, searchText]);

  const highCount = departmentComplaints.filter(
    (complaint) => complaint.priority === "high"
  ).length;

  const mediumCount = departmentComplaints.filter(
    (complaint) => complaint.priority === "medium"
  ).length;

  return (
    <DashboardLayout
      role="officer"
      title="Priority Queue"
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/officer/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to officer overview
        </button>

        <p className="section-eyebrow">
          Administrative attention list
        </p>

        <h2>Priority queue</h2>

        <p>
          Review complaints that need immediate officer attention.
        </p>
      </section>

      <section className="priority-summary-grid">
        <div className="priority-summary-card high">
          <AlertTriangle size={20} />
          <span>High priority</span>
          <strong>{highCount}</strong>
          <small>Safety or health risks</small>
        </div>

        <div className="priority-summary-card medium">
          <Clock3 size={20} />
          <span>Medium priority</span>
          <strong>{mediumCount}</strong>
          <small>Require timely action</small>
        </div>

        <div className="priority-summary-card total">
          <AlertTriangle size={20} />
          <span>Total queue</span>
          <strong>{departmentComplaints.length}</strong>
          <small>All department complaints</small>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Complaints requiring attention</h3>
            <p>
              {filteredComplaints.length} complaint
              {filteredComplaints.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="priority-controls">
            <div className="complaint-search">
              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search complaints..."
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <option value="all">All priorities</option>
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>
          </div>
        </div>

        <div className="priority-queue-list">
          {filteredComplaints.map((complaint) => (
            <article
              className="priority-queue-row"
              key={complaint.id}
            >
              <div className="priority-number">
                {(complaint.priority || "low").toUpperCase()}
              </div>

              <div className="priority-queue-main">
                <h4>
                  {complaint.id} · {complaint.category}
                </h4>

                <p>
                  {complaint.aiSummary ||
                    complaint.description ||
                    "No summary available"}
                </p>

                <div className="complaint-meta">
                  <span>
                    <MapPin size={13} />
                    {complaint.ward || "Ward unavailable"}
                  </span>

                  <span>
                    {complaint.location || "Location unavailable"}
                  </span>

                  <span>
                    <Clock3 size={13} />
                    {complaint.submittedDate || "Date unavailable"}
                  </span>
                </div>
              </div>

              <div className="priority-queue-status">
                <span
                  className={`priority-tag ${
                    complaint.priority || "low"
                  }`}
                >
                  {complaint.priority || "low"}
                </span>

                <span className="department-status">
                  {statusLabels[complaint.status] ||
                    complaint.status ||
                    "Pending"}
                </span>
              </div>

              <button
                type="button"
                className="complaint-open-button"
                onClick={() =>
                  navigate(`/officer/complaints/${complaint.id}`)
                }
              >
                Open
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <div className="department-empty-state">
            <AlertTriangle size={27} />
            <h3>No complaints found</h3>
            <p>Try another priority filter or search term.</p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}