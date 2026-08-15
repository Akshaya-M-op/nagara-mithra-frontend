import { useState } from "react";
import { useNavigate } from "react-router-dom";

const demoUsers = {
  citizen: {
    userId: "CIT-001",
    password: "citizen123",
    route: "/citizen/dashboard",
  },

  officer: {
    userId: "OFF-001",
    password: "officer123",
    route: "/officer/dashboard",
  },

  field_worker: {
  userId: "FW-001",
  password: "worker123",
  route: "/fieldworker/dashboard",
},
};

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("citizen");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const selectedUser = demoUsers[role];

    if (
      userId === selectedUser.userId &&
      password === selectedUser.password
    ) {
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      navigate(selectedUser.route);
    } else {
      setError("Invalid user ID or password.");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.brandPanel}>
        <div style={styles.logo}>N</div>
        <h1>NagaraMithra</h1>
        <p>Smarter Cities. Faster Resolution.</p>
        <span>Report. Resolve. Prevent.</span>
      </section>

      <section style={styles.formPanel}>
        <form style={styles.card} onSubmit={handleSubmit}>
          <p style={styles.eyebrow}>Civic infrastructure platform</p>
          <h2>Welcome back</h2>
          <p style={styles.muted}>
            Sign in to your NagaraMithra workspace.
          </p>

          <div style={styles.tabs}>
            <button
              type="button"
              style={role === "citizen" ? styles.activeTab : styles.tab}
              onClick={() => setRole("citizen")}
            >
              Citizen
            </button>

            <button
              type="button"
              style={role === "officer" ? styles.activeTab : styles.tab}
              onClick={() => setRole("officer")}
            >
              Officer
            </button>

            <button
              type="button"
              style={
                role === "field_worker"
                  ? styles.activeTab
                  : styles.tab
              }
              onClick={() => setRole("field_worker")}
            >
              Field Worker
            </button>
          </div>

          <label>User ID</label>
          <input
            style={styles.input}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="Enter user ID"
            required
          />

          <label>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.loginButton} type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    fontFamily: "Arial, sans-serif",
  },

  brandPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px",
    color: "white",
    background: "linear-gradient(145deg, #082f49, #155eef)",
  },

  logo: {
    width: "64px",
    height: "64px",
    display: "grid",
    placeItems: "center",
    marginBottom: "24px",
    borderRadius: "18px",
    color: "#155eef",
    background: "white",
    fontSize: "32px",
    fontWeight: "800",
  },

  formPanel: {
    display: "grid",
    placeItems: "center",
    padding: "32px",
    background: "#f8fafc",
  },

  card: {
    width: "min(100%, 440px)",
    padding: "42px",
    border: "1px solid #eaecf0",
    borderRadius: "24px",
    background: "white",
    boxShadow: "0 20px 60px rgba(16, 24, 40, 0.08)",
  },

  eyebrow: {
    marginBottom: "12px",
    color: "#155eef",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  muted: {
    marginBottom: "28px",
    color: "#667085",
  },

  tabs: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginBottom: "22px",
  },

  tab: {
    padding: "10px 5px",
    border: "1px solid #d0d5dd",
    borderRadius: "8px",
    color: "#475467",
    background: "white",
    cursor: "pointer",
  },

  activeTab: {
    padding: "10px 5px",
    border: "1px solid #155eef",
    borderRadius: "8px",
    color: "white",
    background: "#155eef",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    margin: "8px 0 16px",
    padding: "13px",
    border: "1px solid #d0d5dd",
    borderRadius: "8px",
  },

  loginButton: {
    width: "100%",
    marginTop: "18px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    background: "#155eef",
    fontWeight: "700",
    cursor: "pointer",
  },

  error: {
    color: "#d92d20",
    fontSize: "14px",
  },
};