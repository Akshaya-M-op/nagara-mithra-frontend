import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Clock3,
  MapPin,
  PlayCircle,
  Send,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
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

export default function FieldWorkerTaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const task = fieldWorkerTasks.find(
    (item) => item.id === taskId
  );

  const [status, setStatus] = useState(
    task?.status || "assigned"
  );

  const [notes, setNotes] = useState(
  task?.evidence?.notes || ""
);

const [beforePhoto, setBeforePhoto] = useState(
  task?.evidence?.beforePhoto || ""
);

const [afterPhoto, setAfterPhoto] = useState(
  task?.evidence?.afterPhoto || ""
);

const [message, setMessage] = useState("");

  if (!task) {
    return (
      <DashboardLayout
        role="fieldworker"
        title="Task Details"
        userName="Arun Kumar"
      >
        <section className="empty-state">
          <h2>Task not found</h2>
          <p>
            No task exists with ID:
            <strong> {taskId}</strong>
          </p>

          <button
            type="button"
            className="primary-action"
            onClick={() =>
              navigate("/fieldworker/dashboard")
            }
          >
            Back to dashboard
          </button>
        </section>
      </DashboardLayout>
    );
  }

  function updateTaskStatus(nextStatus) {
    setStatus(nextStatus);
    setMessage("");

    const updatedTasks = fieldWorkerTasks.map((item) =>
      item.id === task.id
        ? {
            ...item,
            status: nextStatus,
          }
        : item
    );

    saveFieldWorkerTasks(updatedTasks);
  }

  function handleStartWork() {
    updateTaskStatus("in_progress");
    setMessage("Task marked as in progress.");
  }

  function handleSubmitCompletion(event) {
  event.preventDefault();

  if (!beforePhoto) {
    setMessage("Please upload a before-work photo.");
    return;
  }

  if (!afterPhoto) {
    setMessage("Please upload an after-work photo.");
    return;
  }

  if (!notes.trim()) {
    setMessage("Please add completion notes.");
    return;
  }

  const updatedTasks = fieldWorkerTasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          status: "work_completed",
          evidence: {
            beforePhoto,
            afterPhoto,
            notes,
          },
          updates: [
            ...(item.updates || []),
            {
              title: "Work completed",
              description:
                "Before and after evidence submitted for officer validation.",
              time: "Just now",
              completed: true,
            },
          ],
        }
      : item
  );

  saveFieldWorkerTasks(updatedTasks);
  setStatus("work_completed");

  setMessage(
    "Before and after evidence submitted for officer validation."
  );
}

  return (
    <DashboardLayout
      role="fieldworker"
      title="Task Details"
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
          Back to my tasks
        </button>

        <p className="section-eyebrow">
          {task.id} · {task.complaintId}
        </p>

        <h2>{task.title}</h2>

        <p>
          Complete the assigned work and submit proof for
          verification.
        </p>
      </section>

      {message && (
        <div className="worker-action-message">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <section className="worker-task-detail-layout">
        <div className="content-card">
          <div className="task-detail-top">
            <div>
              <span className={`task-status ${status}`}>
                {statusLabels[status]}
              </span>

              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <div className="task-detail-priority">
              {task.priority.toUpperCase()}
            </div>
          </div>

          <div className="task-detail-info-grid">
            <div>
              <span>Ward</span>
              <strong>{task.ward}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{task.location}</strong>
            </div>

            <div>
              <span>Assigned date</span>
              <strong>{task.assignedDate}</strong>
            </div>

            <div>
              <span>Due date</span>
              <strong>{task.dueDate}</strong>
            </div>
          </div>

          <div className="task-location-box">
            <MapPin size={19} />

            <div>
              <strong>Work location</strong>
              <span>
                {task.ward}, {task.location}
              </span>
            </div>
          </div>

          <div className="citizen-description-box">
            <span>Citizen description</span>
            <p>
              {task.citizenDescription ||
                "No additional citizen description available."}
            </p>
          </div>

          <div className="task-timeline">
            <h3>Task progress</h3>

            {task.updates?.map((update) => (
              <div className="task-timeline-item" key={update.title}>
                <div
                  className={`timeline-dot ${
                    update.completed ? "completed" : ""
                  }`}
                >
                  {update.completed && (
                    <CheckCircle2 size={14} />
                  )}
                </div>

                <div>
                  <strong>{update.title}</strong>
                  <p>{update.description}</p>
                  <small>{update.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="content-card task-action-card">
          <div className="card-heading">
            <div>
              <h3>Update task</h3>
              <p>Keep the officer informed.</p>
            </div>
          </div>

          {status === "assigned" && (
            <button
              type="button"
              className="primary-action full-width-action"
              onClick={handleStartWork}
            >
              <PlayCircle size={17} />
              Start work
            </button>
          )}

          {status === "in_progress" && (
  <form onSubmit={handleSubmitCompletion}>
    <div className="evidence-section-heading">
      <h3>Work evidence</h3>
      <p>
        Upload photos showing the condition before and after
        completing the work.
      </p>
    </div>

    <div className="evidence-upload-grid">
      <div className="form-field">
        <label htmlFor="before-photo">
          Before-work photo
        </label>

        <label className="completion-upload-box">
          <Camera size={20} />

          <span>
            {beforePhoto ||
              "Upload condition before work"}
          </span>

          <input
            id="before-photo"
            type="file"
            accept="image/*"
            onChange={(event) =>
              setBeforePhoto(
                event.target.files?.[0]?.name || ""
              )
            }
            required
          />
        </label>

        <small>
          Show the original problem clearly.
        </small>
      </div>

      <div className="form-field">
        <label htmlFor="after-photo">
          After-work photo
        </label>

        <label className="completion-upload-box">
          <Camera size={20} />

          <span>
            {afterPhoto ||
              "Upload condition after work"}
          </span>

          <input
            id="after-photo"
            type="file"
            accept="image/*"
            onChange={(event) =>
              setAfterPhoto(
                event.target.files?.[0]?.name || ""
              )
            }
            required
          />
        </label>

        <small>
          Show the completed result from a similar angle.
        </small>
      </div>
    </div>

    <div className="form-field">
      <label htmlFor="completion-notes">
        Completion notes
      </label>

      <textarea
        id="completion-notes"
        value={notes}
        onChange={(event) =>
          setNotes(event.target.value)
        }
        rows="5"
        placeholder="Describe what you repaired or completed..."
        required
      />
    </div>

    <button
      type="submit"
      className="primary-action full-width-action"
    >
      <Send size={17} />
      Submit before and after evidence
    </button>
  </form>
)}

          {status === "work_completed" && (
  <div className="submitted-task-state">
    <CheckCircle2 size={28} />

    <h4>Evidence submitted</h4>

    <p>
      Your before-work photo, after-work photo and notes
      are waiting for officer validation.
    </p>

    <div className="submitted-evidence-list">
      <span>Before: {beforePhoto}</span>
      <span>After: {afterPhoto}</span>
      <span>Notes: {notes}</span>
    </div>
  </div>
)}
        </aside>
      </section>
    </DashboardLayout>
  );
}