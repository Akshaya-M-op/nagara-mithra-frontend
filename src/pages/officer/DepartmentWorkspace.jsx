import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";

export default function DepartmentWorkspace() {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const department = departments.find(
    (item) => item.id === departmentId
  );

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!department) {
    return (
      <DashboardLayout
        role="officer"
        title="Department Not Found"
        userName="Demo Officer"
      >
        <section className="empty-state">
          <h3>Department not found</h3>
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

  function handleSubmit(event) {
    event.preventDefault();

    if (
      userId.trim() === department.userId &&
      password === department.password
    ) {
      sessionStorage.setItem(
        `department-access-${department.id}`,
        JSON.stringify({
          departmentId: department.id,
          authenticatedAt: new Date().toISOString(),
        })
      );

      navigate(`/officer/departments/${department.id}/workspace`);
    } else {
      setError("Invalid department user ID or password.");
    }
  }

  return (
    <DashboardLayout
      role="officer"
      title="Department Authentication"
      userName="Demo Officer"
    >
      <section className="department-auth-page">
        <button
          className="back-button"
          onClick={() => navigate("/officer/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to departments
        </button>

        <div className={`department-auth-card ${department.color}`}>
          <div className="department-auth-icon">
            <LockKeyhole size={27} />
          </div>

          <p className="section-eyebrow">Restricted workspace</p>
          <h2>{department.name}</h2>
          <p>
            Enter the standard credentials allocated to this department to
            continue.
          </p>

          <div className="security-note">
            <ShieldCheck size={17} />
            <span>
              Department data is protected from unauthorized access.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="department-auth-form">
            <div className="form-field">
              <label htmlFor="department-user-id">
                Department user ID
              </label>

              <input
                id="department-user-id"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="Enter department user ID"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="department-password">Password</label>

              <input
                id="department-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter department password"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button className="primary-action" type="submit">
              Verify and enter
            </button>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
}