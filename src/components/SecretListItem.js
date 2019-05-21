import React from "react";
import styled from 'styled-components';


const Li = styled.li`
  cursor: pointer;
  color: #444;
  font-weight: 700;
  color: ${props => props.active ? "#198df8 " : ""};
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;
  padding-left: ${props => props.active ? "5px " : "0"};
  margin: 0 0 3px 0;
  &:hover {
   color: #198df8;
   padding-left: 5px;
 }
`;


const SecretListItem = ({ secretId = '', secretName, isNew = false, isActive=false, onClick}) => (
  <Li className="nav-item animated fadeIn " active={isActive} onClick={() => onClick(secretId)}>
    <span >{secretName}</span>
  </Li>
  
);

export default SecretListItem;
