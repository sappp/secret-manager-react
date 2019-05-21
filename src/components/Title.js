import React from "react";
import styled from 'styled-components';


const H1 = styled.h1`
  font-family: Comfortaa;
`;

const Title = ({ title }) => <H1>{title}</H1>;

export default Title;
