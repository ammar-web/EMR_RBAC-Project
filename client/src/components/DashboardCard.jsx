function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h6 style={{ color: "#777" }}>{title}</h6>
          <h2>{value}</h2>
        </div>

        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: color,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;