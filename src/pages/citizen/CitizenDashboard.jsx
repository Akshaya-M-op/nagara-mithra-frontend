import { useMemo } from "react";
import {
  FilePlus2,
  Clock3,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import HelpChatbot from "../../components/HelpChatbot";

const complaints = [
  {
    id: "CIV-00125",
    category: "Drainage blockage",
    location: "Ward 12, Main Road",
    status: "In Progress",
    statusClass: "progress",
    date: "14 Aug 2026",
  },
  {
    id: "CIV-00118",
    category: "Pothole",
    location: "Ward 8, Market Road",
    status: "Resolved",
    statusClass: "resolved",
    date: "12 Aug 2026",
  },
];
function getSavedComplaints() {
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

export default function CitizenDashboard() {
    const savedComplaints = useMemo(() => getSavedComplaints(), []);

const submittedCount = savedComplaints.filter(
  (complaint) => complaint.status === "submitted"
).length;

const inProgressCount = savedComplaints.filter(
  (complaint) =>
    complaint.status === "in_progress" ||
    complaint.status === "assigned"
).length;

const resolvedCount = savedComplaints.filter(
  (complaint) =>
    complaint.status === "resolved" ||
    complaint.status === "closed"
).length;

const reopenedCount = savedComplaints.filter(
  (complaint) => complaint.status === "reopened"
).length;
  return (
    <DashboardLayout
      role="citizen"
      title="Citizen Overview"
      userName="Demo Citizen"
    >
      <section className="welcome-row">
        <div>
          <p className="section-eyebrow">Citizen portal</p>
          <h2>Good afternoon, Demo Citizen</h2>
          <p className="section-description">
            Track civic issues and help improve your neighbourhood.
          </p>
        </div>

        <a href="/citizen/report" className="primary-action">
          <FilePlus2 size={18} />
          Report a Problem
        </a>
      </section>

      <section className="stats-grid">
        <div className="dashboard-stat blue">
          <div className="stat-icon">
            <FilePlus2 size={20} />
          </div>
          <span>Submitted</span>
          <strong>{submittedCount}</strong>
          <small>Total complaints raised</small>
        </div>

        <div className="dashboard-stat orange">
          <div className="stat-icon">
            <Clock3 size={20} />
          </div>
          <span>In Progress</span>
          <strong>{inProgressCount}</strong>
          <small>Currently being handled</small>
        </div>

        <div className="dashboard-stat green">
          <div className="stat-icon">
            <CheckCircle2 size={20} />
          </div>
          <span>Resolved</span>
          <strong>{resolvedCount}</strong>
          <small>Successfully completed</small>
        </div>

        <div className="dashboard-stat red">
          <div className="stat-icon">
            <RotateCcw size={20} />
          </div>
          <span>Reopened</span>
          <strong>{reopenedCount}</strong>
          <small>Needs additional attention</small>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Recent complaints</h3>
            <p>View your latest civic issue reports.</p>
          </div>

          <a href="/citizen/complaints" className="view-link">
            View all
          </a>
        </div>

        <div className="complaint-list">
          {complaints.map((complaint) => (
            <div className="complaint-row" key={complaint.id}>
              <div className="complaint-id-box">
                <span>{complaint.id}</span>
                <small>{complaint.date}</small>
              </div>

              <div className="complaint-main-info">
                <strong>{complaint.category}</strong>
                <span>{complaint.location}</span>
              </div>

              <span className={`status-pill ${complaint.statusClass}`}>
                {complaint.status}
              </span>

              <a
                href={`/citizen/complaints/${complaint.id}`}
                className="row-action"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </section>

      <HelpChatbot />
    </DashboardLayout>
  );
}