import React from "react";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../globals";



// @ts-ignore
export const SubConBtn = styled.button<any>`
padding: 10px 20px;
border: none;
border-radius: 5px;
background-color: ${(props) =>
  props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
color: ${(props) =>
  props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
cursor: pointer;
`;