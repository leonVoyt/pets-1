const Spinner = () => (
  <div
    style={{
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #3498db", // Customize color as needed
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);
export default Spinner;
