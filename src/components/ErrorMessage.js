import React from "react";
import styled from 'styled-components';

const Span = styled.span`
  color: red;
  font-size: initial;
`;

const ErrorMessage = ({msg}) => (
  <Span className="float-left">
    *{msg}
  </Span>
);

export default ErrorMessage;
