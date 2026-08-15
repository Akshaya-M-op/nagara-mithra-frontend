import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Building2,
  Save,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const defaultOfficerProfile = {
  name: "Ravi Kumar",
  employeeId: "OFF-001",
  designation: "Administrative Officer",
  department: "Municipal Administration",
  jurisdiction: "Coimbatore City",
  email: "ravi.kumar@municipality.gov",
  phone: "+91 98765 43210",
  status: "Active",
  lastLogin: "15 August 2026, 03:45 PM",
};

export default function OfficerProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("nagaraMithraOfficerProfile");

    if (saved) {
      return JSON.parse(saved);
    }

    return defaultOfficerProfile;
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "nagaraMithraOfficerProfile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <DashboardLayout
      role="officer"
      title="Officer Profile"
      userName={profile.name}
    >
      <section className="page-heading">
        <p className="section-eyebrow">Account and access</p>
        <h2>Officer profile</h2>
        <p>
          View your official information and department access details.
        </p>
      </section>

      <div className="officer-profile-layout">
        <section className="officer-identity-card">
          <div className="officer-large-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <h3>{profile.name}</h3>
          <p>{profile.designation}</p>

          <div className="profile-verification-badge">
            <BadgeCheck size={16} />
            Verified officer
          </div>

          <div className="officer-identity-line">
            <Building2 size={16} />
            <span>{profile.department}</span>
          </div>

          <div className="officer-identity-line">
            <MapPin size={16} />
            <span>{profile.jurisdiction}</span>
          </div>

          <div className="officer-identity-line">
            <ShieldCheck size={16} />
            <span>{profile.status} account</span>
          </div>
        </section>

        <section className="content-card">
          <div className="card-heading">
            <div>
              <h3>Official information</h3>
              <p>Keep your contact information updated.</p>
            </div>

            <UserRound size={20} color="#98a2b3" />
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="officer-name">Full name</label>
                <input
                  id="officer-name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="employee-id">Employee ID</label>
                <input
                  id="employee-id"
                  name="employeeId"
                  value={profile.employeeId}
                  disabled
                />
              </div>

              <div className="form-field">
                <label htmlFor="designation">Designation</label>
                <input
                  id="designation"
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="department">Primary department</label>
                <input
                  id="department"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="jurisdiction">Jurisdiction</label>
                <input
                  id="jurisdiction"
                  name="jurisdiction"
                  value={profile.jurisdiction}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="officer-email">Official email</label>
                <input
                  id="officer-email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="officer-phone">Official phone</label>
                <div className="input-with-icon">
                  <Phone size={16} />
                  <input
                    id="officer-phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="account-status">Account status</label>
                <input
                  id="account-status"
                  name="status"
                  value={profile.status}
                  disabled
                />
              </div>
            </div>

            <div className="officer-login-info">
              <ShieldCheck size={18} />
              <div>
                <strong>Last login</strong>
                <span>{profile.lastLogin}</span>
              </div>
            </div>

            {saved && (
              <div className="success-message">
                <CheckCircle2 size={17} />
                Officer profile updated successfully.
              </div>
            )}

            <div className="form-actions">
              <button className="primary-action" type="submit">
                <Save size={17} />
                Save changes
              </button>
            </div>
          </form>
        </section>
      </div>

      <section className="content-card access-section">
        <div className="card-heading">
          <div>
            <h3>Authorized department access</h3>
            <p>
              Department workspaces require separate verification before access.
            </p>
          </div>

          <ShieldCheck size={20} color="#12b76a" />
        </div>

        <div className="access-list">
          <div className="access-row">
            <div>
              <strong>Drainage and Sewerage</strong>
              <span>Complaint review and field assignment</span>
            </div>
            <span className="access-status">Authorized</span>
          </div>

          <div className="access-row">
            <div>
              <strong>Sanitation and Solid Waste</strong>
              <span>Complaint review and work verification</span>
            </div>
            <span className="access-status">Authorized</span>
          </div>

          <div className="access-row">
            <div>
              <strong>Roads and Public Works</strong>
              <span>Read-only access until verification</span>
            </div>
            <span className="access-status limited">Limited</span>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}