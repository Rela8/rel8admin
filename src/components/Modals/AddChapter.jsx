import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createChapter } from "../../utils/api-calls.js";

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
const FormDataComp = styled.input`
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
const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 10px 0px;
`;
const SubCon = styled.div`
  background-color: ${rel8White};
  width: 350px;
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
  background-color: ${(props) =>
    props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
  color: ${(props) =>
    props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
  cursor: pointer;
`;

const AddChapter = ({ close }) => {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation((data) => createChapter(data), {
    onMutate: () => {
      toast.info("Branch Creation in progress", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Branch Created", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries("all-chapters");
      close();
    },
    onError: (error) => {
      toast.error("Could not create Branch");
      if (error?.message?.response?.data?.message?.error) {
        toast.error(`Message: ${error.message.response.data.message.error}`, {
          autoClose: 9000,
        });
      }
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <BackDrop>
      <style>
        {`
                    body{
                        overflow:hidden;
                    }
                `}
      </style>

      <SubCon>
        <SubConHeader>Create Chapter</SubConHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Name:
            <FormDataComp
              type={"text"}
              {...register("name", { required: true })}
            />
          </FormLabel>

          <SubConBtnHold>
            <SubConBtn
              type={"submit"}
              disabled={isLoading}
              value="Create"
              typex="filled"
            />
            <SubConBtn
              type={"submit"}
              disabled={isLoading}
              value="Cancel"
              onClick={close}
            />
          </SubConBtnHold>
        </Form>
      </SubCon>
    </BackDrop>
  );
};

export default AddChapter;
