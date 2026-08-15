import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  AlertTriangle,
  UsersRound,
  Clock3,
  Search,
  MapPin,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";
import { departmentComplaints } from "../../data/departmentComplaints";

const statusLabels = {
  under_verification: "Under Verification",
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
};

export default function DepartmentWorkspaceHome() {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const department = departments.find(
    (item) => item.id === departmentId
  );

  const complaints = useMemo(() => {
    return departmentComplaints.filter(
      (complaint) => complaint.department === departmentId
    );
  }, [departmentId]);

  const counts = {
    total: complaints.length,
    high: complaints.filter(
      (complaint) => complaint.priority === "high"
    ).length,
    inProgress: complaints.filter(
      (complaint) =>
        complaint.status === "in_progress" ||
        complaint.status === "assigned"
    ).length,
    workers: 18,
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "high" && complaint.priority === "high") ||
      (selectedFilter === "in_progress" &&
        (complaint.status === "in_progress" ||
          complaint.status === "assigned")) ||
      (selectedFilter === "completed" &&
        complaint.status === "work_completed");

    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      complaint.id.toLowerCase().includes(searchValue) ||
      complaint.category.toLowerCase().includes(searchValue) ||
      complaint.ward.toLowerCase().includes(searchValue) ||
      complaint.location.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  if (!department) {
    return null;
  }

  function selectFilter(filter) {
    setSelectedFilter(filter);

    setTimeout(() => {
      document
        .getElementById("department-complaint-list")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <DashboardLayout
      role="officer"
      title={`${department.shortName} Workspace`}
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate("/officer/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to officer overview
        </button>

        <p className="section-eyebrow">{department.code}</p>
        <h2>{department.name}</h2>
        <p>
          Manage complaints, field workers and resolutions for this department.
        </p>
      </section>

      <section className="department-stat-grid">
        <button
          className={`department-stat-card blue ${
            selectedFilter === "all" ? "selected" : ""
          }`}
          onClick={() => selectFilter("all")}
        >
          <div className="department-stat-icon">
            <ClipboardList size={21} />
          </div>
          <span>Total complaints</span>
          <strong>{counts.total}</strong>
          <small>View all department cases</small>
        </button>

        <button
          className={`department-stat-card red ${
            selectedFilter === "high" ? "selected" : ""
          }`}
          onClick={() => selectFilter("high")}
        >
          <div className="department-stat-icon">
            <AlertTriangle size={21} />
          </div>
          <span>High priority</span>
          <strong>{counts.high}</strong>
          <small>Require immediate attention</small>
        </button>

        <button
          className={`department-stat-card orange ${
            selectedFilter === "in_progress" ? "selected" : ""
          }`}
          onClick={() => selectFilter("in_progress")}
        >
          <div className="department-stat-icon">
            <Clock3 size={21} />
          </div>
          <span>In progress</span>
          <strong>{counts.inProgress}</strong>
          <small>Assigned or active work</small>
        </button>

        <button
  className="department-stat-card green"
  onClick={() =>
    navigate(`/officer/departments/${departmentId}/workers`)
  }
>
  <div className="department-stat-icon">
    <UsersRound size={21} />
  </div>

  <span>Field workers</span>
  <strong>{counts.workers}</strong>
  <small>View assigned workers</small>
</button>
      </section>

      <section
        className="content-card department-complaint-panel"
        id="department-complaint-list"
      >
        <div className="card-heading">
          <div>
            <h3>
              {selectedFilter === "all"
                ? "All complaints"
                : selectedFilter === "high"
                  ? "High-priority complaints"
                  : "Complaints in progress"}
            </h3>

            <p>
              {filteredComplaints.length} complaint
              {filteredComplaints.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="complaint-search department-search">
            <Search size={17} />

            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search complaints..."
            />
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="department-empty-state">
            <ClipboardList size={27} />
            <h3>No complaints found</h3>
            <p>Try another filter or search term.</p>
          </div>
        ) : (
          <div className="department-complaint-list">
            {filteredComplaints.map((complaint) => (
              <article
                className="department-complaint-row"
                key={complaint.id}
              >
                <div className="department-complaint-id">
                  <strong>{complaint.id}</strong>
                  <span>{complaint.submittedDate}</span>
                </div>

                <div className="department-complaint-main">
                  <h4>{complaint.category}</h4>
                  <p>{complaint.description}</p>

                  <div className="complaint-meta">
                    <span>
                      <MapPin size={13} />
                      {complaint.ward}, {complaint.location}
                    </span>

                    <span>
                      <UserCheck size={13} />
                      {complaint.relatedReports} related reports
                    </span>
                  </div>
                </div>

                <div className="department-complaint-side">
                  <span
                    className={`priority-tag ${complaint.priority}`}
                  >
                    {complaint.priority}
                  </span>

                  <span className="department-status">
                    {statusLabels[complaint.status]}
                  </span>
                </div>

                <button
  type="button"
  className="complaint-open-button"
  onClick={() => {
    alert(`Opening ${complaint.id}`);
    navigate(`/officer/complaints/${complaint.id}`);
  }}
>
  Open
  <ArrowRight size={15} />
</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}