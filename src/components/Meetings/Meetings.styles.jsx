import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile, tablet } from "../../responsive";

export const MeetingsContainer = styled.div`
    margin-top: 67px;
    margin-left: 220px;
    padding: 50px 30px;
    background-color: ${rel8Pink};
    min-height: 100vh;
    ${
        mobile({
            marginTop: "0px",
            marginLeft: "0px",
        })
    }
    ${
        tablet({
            marginTop: "0px",
            marginLeft: "0px",
        })
    }
`
export const MembersSearch = styled.div`
    margin: 40px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${
        mobile({
            flexDirection: "column",
        })
    }
`
export const MembersSearchCompCon = styled.div`
        width: 70%;
        display: flex;
        ${
        mobile({
            width: "100%",
        })
    }
`
export const MembersSearchInput = styled.input`
    width: 80%;
    outline: none;
    padding: 20px;
    border: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: ${rel8Pink};
    color: ${rel8Purple};

    &::placeholder{
        color: ${rel8Purple};
    }
    ${
        mobile({
            width: "80%",
        })
    }
`
export const MembersSearchBtn = styled.button`
    color: black;
    outline: none;
    padding: 20px;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    cursor: pointer;
    background-color: ${rel8Pink};
    ${
        mobile({
            width: "20%",
        })
    }
`
export const AddNewBtn = styled.button`
    border: none;
    color: ${rel8White};
    background-color: ${rel8Purple};
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    ${
        mobile({
            margin: "20px 0px",
        })
    }
`