import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fieldWorkerTasks } from "../../data/fieldWorkerTasks";

export default function FieldWorkerCompleted() {
  const navigate = useNavigate();

  const completedTasks = fieldWorkerTasks.filter(
    (task) =>
      task.status === "work_completed" ||
      task.status === "resolved"
  );

  return (
    <DashboardLayout
      role="fieldworker"
      title="Completed Tasks"
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
          Back to dashboard
        </button>

        <p className="section-eyebrow">Work history</p>
        <h2>Completed tasks</h2>
        <p>
          Review tasks you completed and submitted for validation.
        </p>
      </section>

      <section className="worker-completed-summary">
        <div className="worker-completed-summary-card">
          <CheckCircle2 size={21} />
          <span>Total completed</span>
          <strong>{completedTasks.length}</strong>
        </div>

        <div className="worker-completed-summary-card">
          <Clock3 size={21} />
          <span>Awaiting validation</span>
          <strong>
            {
              completedTasks.filter(
                (task) => task.status === "work_completed"
              ).length
            }
          </strong>
        </div>

        <div className="worker-completed-summary-card">
          <CheckCircle2 size={21} />
          <span>Approved</span>
          <strong>
            {
              completedTasks.filter(
                (task) => task.status === "resolved"
              ).length
            }
          </strong>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Work history</h3>
            <p>
              {completedTasks.length} completed task
              {completedTasks.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {completedTasks.length === 0 ? (
          <div className="department-empty-state">
            <ClipboardList size={27} />
            <h3>No completed tasks yet</h3>
            <p>
              Completed work will appear here after submission.
            </p>
          </div>
        ) : (
          <div className="completed-task-list">
            {completedTasks.map((task) => (
              <article
                className="completed-task-row"
                key={task.id}
              >
                <div className="completed-task-icon">
                  <CheckCircle2 size={19} />
                </div>

                <div className="completed-task-main">
                  <span className="task-id">
                    {task.id} · {task.complaintId}
                  </span>

                  <h4>{task.title}</h4>

                  <span className="completed-task-location">
                    <MapPin size={14} />
                    {task.ward}, {task.location}
                  </span>
                </div>

                <div className="completed-task-status">
                  <span
                    className={`task-status ${task.status}`}
                  >
                    {task.status === "resolved"
                      ? "Approved"
                      : "Awaiting validation"}
                  </span>

                  <small>
                    {task.validatedDate ||
                      task.completedDate ||
                      "Recently submitted"}
                  </small>
                </div>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    navigate(`/fieldworker/tasks/${task.id}`)
                  }
                >
                  View details
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}