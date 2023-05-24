import styled from "styled-components";
import { rel8Purple } from "../../globals";

export const PostToCMS = styled.div`
  margin: 10px 0px;
  .radio-labels {
    display: flex;
    gap: 10px;
    label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

export const CMSLoginModalContainer = styled.div`
  color: ${rel8Purple};
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;

  .align-btn {
    display: flex;
    align-items: center;
    margin: 10px 0px;
    gap: 20px;
  }
`;

export const CMSButton = styled.button`
  padding: 10px 20px;
  outline: none;
  background-color: ${(props) => (props.secondary ? "#fff" : "#7F02A2")};
  color: ${(props) => (props.secondary ? "#7F02A2" : "#fff")};
  border: none;
  border-radius: 10px;
`;
