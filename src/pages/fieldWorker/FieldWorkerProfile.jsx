import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function FieldWorkerProfile() {
  const navigate = useNavigate();

  const savedProfile = JSON.parse(
    localStorage.getItem("fieldWorkerProfile") || "null"
  );

  const [profile, setProfile] = useState(
    savedProfile || {
      name: "Arun Kumar",
      workerId: "FW-001",
      phone: "9876543210",
      email: "arun.kumar@example.com",
      ward: "Ward 12",
      department: "Drainage",
    }
  );

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "fieldWorkerProfile",
      JSON.stringify(profile)
    );

    setMessage("Profile updated successfully.");
  }

  return (
    <DashboardLayout
      role="fieldworker"
      title="My Profile"
      userName={profile.name}
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

        <p className="section-eyebrow">Personal information</p>
        <h2>My profile</h2>
        <p>
          Update your contact and assignment information.
        </p>
      </section>

      {message && (
        <div className="worker-action-message">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <section className="profile-layout">
        <aside className="content-card profile-summary-card">
          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>

          <h3>{profile.name}</h3>
          <span>{profile.workerId}</span>

          <div className="profile-summary-item">
            <MapPin size={16} />
            <span>{profile.ward}</span>
          </div>

          <div className="profile-summary-item">
            <UserRound size={16} />
            <span>{profile.department}</span>
          </div>
        </aside>

        <form
          className="content-card profile-form"
          onSubmit={handleSubmit}
        >
          <div className="card-heading">
            <div>
              <h3>Profile details</h3>
              <p>Keep your information up to date.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="form-field">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="workerId">Worker ID</label>

              <input
                id="workerId"
                name="workerId"
                value={profile.workerId}
                disabled
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone number</label>

              <div className="profile-input-icon">
                <Phone size={16} />

                <input
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email">Email address</label>

              <div className="profile-input-icon">
                <Mail size={16} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="ward">Assigned ward</label>

              <input
                id="ward"
                name="ward"
                value={profile.ward}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="department">Department</label>

              <input
                id="department"
                name="department"
                value={profile.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="profile-form-actions">
            <button
              type="submit"
              className="primary-action"
            >
              <Save size={16} />
              Save changes
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}