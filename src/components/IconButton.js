import React from "react";
import { FiPlus, FiEdit2, FiX, FiMenu } from "react-icons/fi";

import styled from 'styled-components';

const Icon = styled.i`
  font-size: 20px;
`;

const Button = styled.button`
  padding-top: 0;
  padding-bottom: 0;
  &:hover {
      color: ${props => (props.redHover ? "red" : "none")};
    }
  
 }
`;

const IconButton = ({ label, isDisabled, isActive, onClick}) => (
  <Button
    redHover={!isDisabled && label === "delete"}
    className={`btn btn-light ${isActive ? "active" : ''}`}
    disabled={isDisabled} 
    onClick={onClick}
  >
    <Icon>
      {
        label === "add" &&
          <FiPlus className="icon" />
      }
      {
        label === "edit" &&
        <FiEdit2 className="icon" />
      }
      {
        label === "delete" &&
        <FiX className="icon" />
      }
      {
        label === "Secrets List" &&
        <FiMenu className="icon" />
      }
      <span> {label}</span>
    </Icon>
  </Button>
);


export default IconButton;
