import React from "react";


const SecretDetails = (props) => (
    <div className="tab-content">
        <div className="tab-pane fade show active">
            {props.children}
        </div>
    </div>

);


export default SecretDetails;
