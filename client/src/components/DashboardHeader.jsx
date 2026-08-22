import { useState } from "react";

function DashboardHeader({
  title,
  subtitle,
  onLogout,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#2563EB,#0F766E)",
        color: "white",
        padding: "18px 22px",
        borderRadius: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        boxShadow: "0 6px 18px rgba(37,99,235,.18)",
      }}
    >
      <div>
        <h1
           style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            color: "#E0F2FE",
            fontSize: "14px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <button
        onClick={onLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: "8px 16px",
          background: hover
            ? "rgba(255,255,255,.28)"
            : "rgba(255,255,255,.15)",
          color: "white",
          border: "1px solid rgba(255,255,255,.35)",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          transition: ".2s",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardHeader;