import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Topbar({ title, userName = "User" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  });

  function handleSearch(event) {
    const value = event.target.value;
    setSearchText(value);

    if (value.trim()) {
      navigate(
        `/citizen/complaints?search=${encodeURIComponent(value)}`
      );
    } else if (location.pathname === "/citizen/complaints") {
      navigate("/citizen/complaints");
    }
  }

  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">NagaraMithra AI</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input
            value={searchText}
            onChange={handleSearch}
            placeholder="Search complaints..."
            aria-label="Search complaints"
          />
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="user-mini">
          <div className="avatar">
  {(userName || "U").charAt(0).toUpperCase()}
</div>

          <div>
            <strong>{userName}</strong>
            <span>Active account</span>
          </div>
        </div>
      </div>
    </header>
  );
}