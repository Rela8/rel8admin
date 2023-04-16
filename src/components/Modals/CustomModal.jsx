import React from "react";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const Form = styled.form`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;
const FormData = styled.input`
  padding: 5px 0px;
  background-color: transparent;
  border: none;
  border: 1px solid ${rel8Purple};
  border-radius: 5px;
  padding: 5px;
  color: ${rel8Purple};
  outline: none;
  &::placeholder {
    color: ${rel8Purple};
  }
`;
const FormSelection = styled.select`
  padding: 5px 0px;
  color: ${rel8Purple};
  outline: none;
  border: none;
  border-bottom: 1px solid ${rel8Purple};
  margin: 10px 0px;
  overflow: auto;
`;
const FormOption = styled.option``;
const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 10px 0px;
`;
const SubCon = styled.div`
  background-color: ${rel8White};
  
  height: 500px;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;

  ${mobile({
    width: "250px",
  })}
`;
const SubConHeader = styled.p`
  font-weight: 700;
  text-align: center;
`;
const SubConBtnHold = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;
const SubConBtn = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: ${(props) =>
    props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
  cursor: pointer;
  background-color: ${(props) =>
    props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
  /* background-color: ${(props) =>
    props.loading === "loading" ? "#d3d3d3" : ""}; */
`;


const CustomModal = ({children,title,close,modalWith='350px'})=>{

    return (
        <BackDrop >
            <style>
            {`
            body{
            overflow:hidden;
            }
            `}
            </style>
            <SubCon style={{'width':modalWith}}>
          <SubConHeader>{title}</SubConHeader>

            <br />
            {children}

            <SubConBtnHold>

              <SubConBtn
                type={"submit"}
                value="Cancel"
                onClick={close}
              />
            </SubConBtnHold>
        </SubCon>

        </BackDrop>
    )
}

export default CustomModal