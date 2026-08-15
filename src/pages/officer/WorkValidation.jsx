import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  fieldWorkerTasks,
  saveFieldWorkerTasks,
} from "../../data/fieldWorkerTasks";

const statusLabels = {
  assigned: "Assigned",
  in_progress: "In Progress",
  work_completed: "Work Completed",
  resolved: "Resolved",
};

export default function WorkValidation() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  const validationTasks = useMemo(() => {
    return fieldWorkerTasks.filter(
      (task) => task.status === "work_completed"
    );
  }, []);

  const filteredTasks = validationTasks.filter((task) => {
    const text = searchText.toLowerCase();

    return (
      task.id.toLowerCase().includes(text) ||
      task.complaintId.toLowerCase().includes(text) ||
      task.title.toLowerCase().includes(text) ||
      task.ward.toLowerCase().includes(text)
    );
  });

  function validateTask(taskId) {
    const updatedTasks = fieldWorkerTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: "resolved",
            validationStatus: "approved",
            validatedDate: "Just now",
            updates: [
              ...(task.updates || []),
              {
                title: "Officer validation completed",
                description:
                  "The officer approved the submitted work evidence.",
                time: "Just now",
                completed: true,
              },
            ],
          }
        : task
    );

    saveFieldWorkerTasks(updatedTasks);
    setMessage("Work approved and task marked as resolved.");
  }

  function rejectTask(taskId) {
    const updatedTasks = fieldWorkerTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: "in_progress",
            validationStatus: "rejected",
            validationNote:
              "Please review the evidence and complete the task again.",
            updates: [
              ...(task.updates || []),
              {
                title: "Evidence needs correction",
                description:
                  "The officer requested another inspection or clearer evidence.",
                time: "Just now",
                completed: false,
              },
            ],
          }
        : task
    );

    saveFieldWorkerTasks(updatedTasks);
    setMessage(
      "Task returned to the field worker for correction."
    );
  }

  return (
    <DashboardLayout
      role="officer"
      title="Work Validation"
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

        <p className="section-eyebrow">Completion verification</p>
        <h2>Work validation</h2>
        <p>
          Review field-worker evidence before closing civic tasks.
        </p>
      </section>

      {message && (
        <div className="worker-action-message">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <section className="validation-summary-grid">
        <div className="validation-summary-card pending">
          <Clock3 size={20} />
          <span>Awaiting validation</span>
          <strong>{validationTasks.length}</strong>
          <small>Completed by field workers</small>
        </div>

        <div className="validation-summary-card approved">
          <CheckCircle2 size={20} />
          <span>Approved tasks</span>
          <strong>
            {
              fieldWorkerTasks.filter(
                (task) =>
                  task.validationStatus === "approved"
              ).length
            }
          </strong>
          <small>Resolved work orders</small>
        </div>

        <div className="validation-summary-card rejected">
          <AlertTriangle size={20} />
          <span>Needs correction</span>
          <strong>
            {
              fieldWorkerTasks.filter(
                (task) =>
                  task.validationStatus === "rejected"
              ).length
            }
          </strong>
          <small>Returned to field workers</small>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Completed work awaiting review</h3>
            <p>
              {filteredTasks.length} task
              {filteredTasks.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="complaint-search">
            <Search size={17} />

            <input
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Search task, complaint or ward..."
            />
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="department-empty-state">
            <CheckCircle2 size={28} />
            <h3>No work waiting for validation</h3>
            <p>
              Completed field-worker tasks will appear here.
            </p>
          </div>
        ) : (
          <div className="validation-task-list">
            {filteredTasks.map((task) => (
              <article
                className="validation-task-card"
                key={task.id}
              >
                <div className="validation-task-header">
                  <div>
                    <span className="task-id">
                      {task.id} · {task.complaintId}
                    </span>

                    <h3>{task.title}</h3>
                  </div>

                  <span className="task-status work_completed">
                    {statusLabels[task.status]}
                  </span>
                </div>

                <div className="validation-task-meta">
                  <span>
                    <MapPin size={14} />
                    {task.ward}, {task.location}
                  </span>

                  <span>
                    <UserRound size={14} />
                    {task.workerName || "Assigned field worker"}
                  </span>

                  <span>
                    <Clock3 size={14} />
                    Submitted for review
                  </span>
                </div>

                <div className="evidence-review-grid">
                  <div className="evidence-review-box">
                    <span>Before-work evidence</span>

                    {task.evidence?.beforePhoto ? (
                      <div className="evidence-file">
                        <CheckCircle2 size={17} />
                        <strong>
                          {task.evidence.beforePhoto}
                        </strong>
                      </div>
                    ) : (
                      <div className="missing-evidence">
                        <AlertTriangle size={17} />
                        Missing before photo
                      </div>
                    )}
                  </div>

                  <div className="evidence-review-box">
                    <span>After-work evidence</span>

                    {task.evidence?.afterPhoto ? (
                      <div className="evidence-file">
                        <CheckCircle2 size={17} />
                        <strong>
                          {task.evidence.afterPhoto}
                        </strong>
                      </div>
                    ) : (
                      <div className="missing-evidence">
                        <AlertTriangle size={17} />
                        Missing after photo
                      </div>
                    )}
                  </div>
                </div>

                <div className="validation-notes">
                  <span>Field-worker completion notes</span>
                  <p>
                    {task.evidence?.notes ||
                      "No completion notes provided."}
                  </p>
                </div>

                <div className="validation-actions">
                  <button
                    type="button"
                    className="danger-outline"
                    onClick={() => rejectTask(task.id)}
                  >
                    <XCircle size={16} />
                    Request correction
                  </button>

                  <button
                    type="button"
                    className="primary-action"
                    onClick={() => validateTask(task.id)}
                  >
                    <CheckCircle2 size={16} />
                    Approve and resolve
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}