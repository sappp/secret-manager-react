import React from "react";

import styled from 'styled-components';

const Div = styled.div`
  border-right: 3px solid #e7e7e7;
`;
const H2 = styled.h2`
  font-size: 1.0rem;
`;

const NewSecretTab = (props) => (
  <div className="row" style={{ "width": "100%"}}>
    <Div className="col-2">
      <H2>New Secret</H2>
    </Div>
    <div className="col-10">
      {props.children}
    </div>
    
  </div>
);

export default NewSecretTab;
