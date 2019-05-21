import React from "react";


const SecretsTab = (props) => (
  <div className="row" style={{ "width": "100%" }}>
    <div className="col-7">
      {props.left}
    </div>
    <div className="col-5">
      {props.right}
    </div>
  </div>
);

export default SecretsTab;
