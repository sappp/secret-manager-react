import React from "react";


const SecretTabHeader = ({ name, createdAt, allowEdit, onChange}) => (
  <div>
    {
      allowEdit &&
      <div className="animated fadeIn input-group  mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
        </div>
        <input type="text" className="form-control" maxLength="32" aria-label="Small" aria-describedby="inputGroup-sizing-sm" defaultValue={name} onChange={(e) => onChange(e.currentTarget.value)} />
      </div>
    }
    {
      !allowEdit &&
      <div className="animated fadeIn">
        <h3>{name}</h3>
        {/* <br /> */}
        <h6>{createdAt}</h6>
      </div>
        
    }
  </div>
);

export default SecretTabHeader;
