import React from "react";
import styled from 'styled-components';

const Div = styled.div`
  border-right: 3px solid #e7e7e7;
`;

const SecretsList = (props) => (
  <Div className="SecretsList" role="tablist">
      <ul className="nav flex-column nav-pills" role="tablist">
        {props.children}
      </ul>
  </Div>
);

export default SecretsList;
