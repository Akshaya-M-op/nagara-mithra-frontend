import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("nagaraMithraProfile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return defaultProfile;
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
      "nagaraMithraProfile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <DashboardLayout
      role="citizen"
      title="Profile"
      userName={profile.name || "Citizen"}
    >
      <section className="page-heading">
        <p className="section-eyebrow">Account settings</p>
        <h2>My profile</h2>
        <p>Manage your personal information and contact details.</p>
      </section>

      <div className="profile-layout">
        <section className="profile-summary-card">
          <div className="large-avatar">
            {(profile.name || "C").charAt(0).toUpperCase()}
          </div>

          <h3>{profile.name || "Citizen"}</h3>
          <p>Registered citizen</p>

          <div className="profile-summary-line">
            <Mail size={16} />
            <span>{profile.email || "Add your email address"}</span>
          </div>

          <div className="profile-summary-line">
            <MapPin size={16} />
            <span>{profile.city || "Add your city"}</span>
          </div>
        </section>

        <section className="content-card">
          <div className="card-heading">
            <div>
              <h3>Personal information</h3>
              <p>Keep your details updated for complaint communication.</p>
            </div>

            <UserRound size={20} color="#98a2b3" />
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid">
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
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <div className="input-with-icon">
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
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
            </div>

            {saved && (
              <div className="success-message">
                <CheckCircle2 size={17} />
                Profile updated successfully.
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
    </DashboardLayout>
  );
}