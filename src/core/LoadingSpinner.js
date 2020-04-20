import React from "react";

const LoadingSpinner = ({ loading }) => (
  <div className="text-center" style={{ display: loading ? "block" : "none" }}>
    <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
