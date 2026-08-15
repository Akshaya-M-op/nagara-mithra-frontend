import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const sampleComplaints = [
  {
    complaintId: "CIV-00118",
    category: "Pothole or damaged road",
    description: "Large pothole near the bus stop.",
    address: "Ward 8, Market Road",
    status: "resolved",
    severity: "medium",
    createdAt: "12 Aug 2026",
  },
  {
    complaintId: "CIV-00119",
    category: "Sanitation or garbage issue",
    description: "Garbage has not been collected for three days.",
    address: "Ward 8, Temple Street",
    status: "in_progress",
    severity: "high",
    createdAt: "13 Aug 2026",
  },
];

const statusLabels = {
  submitted: "Submitted",
  under_verification: "Under Verification",
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
  reopened: "Reopened",
  closed: "Closed",
};

function getStoredComplaints() {
  const saved = localStorage.getItem("nagarMithraComplaints");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export default function MyComplaints() {
  const navigate = useNavigate();
const location = useLocation();

const querySearch = new URLSearchParams(location.search).get("search") || "";

const [searchTerm, setSearchTerm] = useState(querySearch);

useEffect(() => {
  setSearchTerm(querySearch);
}, [querySearch]);
  const [statusFilter, setStatusFilter] = useState("all");

  const savedComplaints = getStoredComplaints();

  const complaints = [...savedComplaints, ...sampleComplaints];

  const filteredComplaints = complaints.filter((complaint) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      complaint.complaintId.toLowerCase().includes(searchText) ||
      complaint.category.toLowerCase().includes(searchText) ||
      complaint.address.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      role="citizen"
      title="My Complaints"
      userName="Demo Citizen"
    >
      <section className="page-heading">
        <p className="section-eyebrow">Complaint history</p>
        <h2>My complaints</h2>
        <p>Track every civic issue you have submitted.</p>
      </section>

      <section className="complaint-toolbar">
        <div className="complaint-search">
          <Search size={18} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by ID, category or location"
          />
        </div>

        <div className="filter-control">
          <Filter size={17} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_verification">
              Under Verification
            </option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="reopened">Reopened</option>
          </select>
        </div>
      </section>

      {filteredComplaints.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon">
            <ClipboardList size={28} />
          </div>

          <h3>No complaints found</h3>
          <p>
            Try changing your search or submit a new civic issue report.
          </p>

          <button
            className="primary-action"
            onClick={() => navigate("/citizen/report")}
          >
            Report a Problem
          </button>
        </section>
      ) : (
        <section className="complaints-grid">
          {filteredComplaints.map((complaint) => (
            <article
              className="complaint-item-card"
              key={complaint.complaintId}
            >
              <div className="complaint-item-top">
                <span className="complaint-number">
                  {complaint.complaintId}
                </span>

                <span
                  className={`status-pill ${getStatusClass(
                    complaint.status
                  )}`}
                >
                  {statusLabels[complaint.status] || complaint.status}
                </span>
              </div>

              <h3>{complaint.category}</h3>

              <p className="complaint-description">
                {complaint.description}
              </p>

              <div className="complaint-location">
                {complaint.address}
              </div>

              <div className="complaint-item-bottom">
                <span>{complaint.createdAt || "Recently submitted"}</span>

                <button
                  className="view-complaint-button"
                  onClick={() =>
                    navigate(
                      `/citizen/complaints/${complaint.complaintId}`,
                      {
                        state: { complaint },
                      }
                    )
                  }
                >
                  View details
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </DashboardLayout>
  );
}

function getStatusClass(status) {
  if (status === "resolved" || status === "closed") {
    return "resolved";
  }

  if (status === "reopened") {
    return "reopened";
  }

  if (status === "submitted") {
    return "submitted";
  }

  return "progress";
}