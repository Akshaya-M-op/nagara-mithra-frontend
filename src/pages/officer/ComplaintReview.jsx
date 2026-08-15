import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";
import { departmentComplaints } from "../../data/departmentComplaints";
import { fieldWorkers } from "../../data/fieldWorkers";

const statusLabels = {
  under_verification: "Under Verification",
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
};

export default function ComplaintReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const complaint =
    location.state?.complaint ||
    departmentComplaints.find((item) => item.id === id);

  const department =
    location.state?.department ||
    departments.find(
      (item) => item.id === complaint?.department
    );

  const [showAssign, setShowAssign] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [message, setMessage] = useState("");

  if (!complaint) {
    return (
      <DashboardLayout
        role="officer"
        title="Complaint Review"
        userName="Demo Officer"
      >
        <section className="empty-state">
          <h3>Complaint not found</h3>
          <p>
            No complaint exists with ID <strong>{id}</strong>.
          </p>

          <button
            className="primary-action"
            onClick={() => navigate("/officer/dashboard")}
          >
            Back to dashboard
          </button>
        </section>
      </DashboardLayout>
    );
  }

  const workers = fieldWorkers.filter(
    (worker) => worker.department === complaint.department
  );

  function handleAssign(event) {
    event.preventDefault();

    const worker = workers.find(
      (item) => item.id === selectedWorker
    );

    if (!worker) return;

    setMessage(
      `${complaint.id} assigned to ${worker.name} in ${worker.ward}.`
    );

    setShowAssign(false);
  }

  return (
    <DashboardLayout
      role="officer"
      title="Complaint Review"
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back to complaints
        </button>

        <p className="section-eyebrow">
          {department?.code || "Department review"}
        </p>

        <h2>{complaint.id}</h2>

        <p>
          Review the AI-processed complaint and decide the next action.
        </p>
      </section>

      {message && (
        <div className="action-success-message">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <div className="review-grid">
        <section className="content-card">
          <div className="review-header">
            <div>
              <span className="detail-label">Reported issue</span>
              <h3>{complaint.category}</h3>
            </div>

            <span className={`priority-tag ${complaint.priority}`}>
              {complaint.priority} priority
            </span>
          </div>

          <div className="review-status-row">
            <span className="detail-label">Current status</span>
            <strong>
              {statusLabels[complaint.status] || complaint.status}
            </strong>
          </div>

          <div className="review-block">
            <span className="detail-label">Citizen description</span>
            <p>{complaint.description}</p>
          </div>

          <div className="review-block">
            <span className="detail-label">AI-generated summary</span>
            <p>{complaint.aiSummary}</p>
          </div>

          <div className="review-info-grid">
            <div>
              <span className="detail-label">Citizen</span>
              <strong>{complaint.citizenName}</strong>
            </div>

            <div>
              <span className="detail-label">Ward</span>
              <strong>{complaint.ward}</strong>
            </div>

            <div>
              <span className="detail-label">Location</span>
              <strong>{complaint.location}</strong>
            </div>

            <div>
              <span className="detail-label">Related reports</span>
              <strong>{complaint.relatedReports}</strong>
            </div>
          </div>

          <div className="risk-box">
            <AlertTriangle size={19} />
            <div>
              <strong>Priority reason</strong>
              <p>{complaint.risk}</p>
            </div>
          </div>

          <div className="location-placeholder">
            <MapPin size={19} />
            <div>
              <strong>Reported location</strong>
              <span>
                {complaint.ward}, {complaint.location}
              </span>
            </div>
          </div>
        </section>

        <section className="content-card">
          <div className="card-heading">
            <div>
              <h3>Complaint actions</h3>
              <p>Choose the next administrative action.</p>
            </div>
          </div>

          <div className="analysis-item">
            <span>Category confidence</span>
            <strong>92%</strong>
          </div>

          <div className="analysis-progress">
            <span style={{ width: "92%" }} />
          </div>

          <div className="analysis-item">
            <span>Duplicate reports</span>
            <strong>{complaint.relatedReports}</strong>
          </div>

          <div className="analysis-item">
            <span>Recommended action</span>
            <strong>Field inspection</strong>
          </div>

          <div className="action-stack">
            <button
              type="button"
              className="primary-action"
              onClick={() => setShowAssign(true)}
            >
              <UserPlus size={17} />
              Assign field worker
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setMessage("Complaint approved for department action.")
              }
            >
              <CheckCircle2 size={17} />
              Approve complaint
            </button>

            <button
              type="button"
              className="secondary-button danger-outline"
              onClick={() =>
                setMessage("Complaint rejected. Reason required.")
              }
            >
              <XCircle size={17} />
              Reject complaint
            </button>
          </div>
        </section>
      </div>

      {showAssign && (
        <div className="modal-backdrop">
          <div className="assign-modal">
            <div className="assign-modal-header">
              <div>
                <p className="section-eyebrow">Work-order assignment</p>
                <h3>Assign field worker</h3>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowAssign(false)}
              >
                ×
              </button>
            </div>

            <div className="assign-complaint-summary">
              <strong>{complaint.id}</strong>
              <span>
                {complaint.category} · {complaint.ward}
              </span>
            </div>

            <form
              onSubmit={handleAssign}
              className="department-auth-form"
            >
              <div className="form-field">
                <label htmlFor="worker">Select field worker</label>

                <select
                  id="worker"
                  value={selectedWorker}
                  onChange={(event) =>
                    setSelectedWorker(event.target.value)
                  }
                  required
                >
                  <option value="">Choose a worker</option>

                  {workers.map((worker) => (
                    <option value={worker.id} key={worker.id}>
                      {worker.name} · {worker.ward}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="instructions">Instructions</label>

                <textarea
                  id="instructions"
                  rows="4"
                  defaultValue={`Inspect and resolve: ${complaint.category}`}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAssign(false)}
                >
                  Cancel
                </button>

                <button className="primary-action" type="submit">
                  Create work order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}