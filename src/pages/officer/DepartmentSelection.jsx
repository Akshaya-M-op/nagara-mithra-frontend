import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";

export default function DepartmentSelection() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      role="officer"
      title="Departments"
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate("/officer/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to overview
        </button>

        <p className="section-eyebrow">Department access</p>
        <h2>Choose a department</h2>
        <p>
          Select a workspace to continue with department authentication.
        </p>
      </section>

      <section className="department-grid">
        {departments.map((department) => {
          const Icon = department.icon;

          return (
            <article
              className={`department-card ${department.color}`}
              key={department.id}
            >
              <div className="department-card-top">
                <div className="department-icon">
                  <Icon size={23} />
                </div>

                <span className="department-code">
                  {department.code}
                </span>
              </div>

              <h3>{department.name}</h3>
              <p>{department.description}</p>

              <button
                className="department-access-button"
                onClick={() =>
                  navigate(`/officer/departments/${department.id}`)
                }
              >
                Continue
                <ArrowLeft size={16} className="rotate-arrow" />
              </button>
            </article>
          );
        })}
      </section>
    </DashboardLayout>
  );
}