import React from "react";


const SecretTabText = ({ text, allowEdit, onChange}) => (
  <div>
    {
      allowEdit &&
      <div className="animated fadeIn input-group  mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Secret</span>
          </div>
        <textarea className="form-control" aria-label="With textarea" defaultValue={text} rows="6" onChange={(e) => onChange(e.currentTarget.value)}></textarea>
        </div>
    }
    {
      !allowEdit && 
      <div className="animated fadeIn">{text}</div>
    }
  </div>
);

export default SecretTabText;
