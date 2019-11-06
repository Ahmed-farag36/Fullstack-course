import React from "react";

export default ({ data, status }) => (
  <div id="modal" style={{ backgroundColor: status ? "#4caf50" : "#f44336" }}>
    <p>{data}</p>
  </div>
);
