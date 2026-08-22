import { useState } from "react";

function LogoutModal({ show, onCancel, onLogout }) {
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "white",
          width: "360px",
          borderRadius: "18px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            color: "#6B7280",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          Are you sure you want to logout from your account?
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onCancel}
            onMouseEnter={() => setHoverCancel(true)}
            onMouseLeave={() => setHoverCancel(false)}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "10px",
              border: "1px solid #D1D5DB",
              background: hoverCancel ? "#F3F4F6" : "white",
              color: "#374151",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "10px",
              border: "none",
              background: hoverLogout ? "#1D4ED8" : "#2563EB",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;