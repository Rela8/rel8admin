import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createGallery } from "../../utils/api-calls";

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

const AddGallery = ({ close }) => {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation((data) => createGallery(data), {
    onMutate: () => {
      toast.info("Gallery Creation in progress", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Gallery Created", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries("all-galleries");
      close();
    },
    onError: (error) => {
      toast.error("Could not create gallery");
      if (error?.message?.response?.data?.message) {
        toast.error(`Message: ${error.message.response.data.message}`, {
          autoClose: 9000,
        });
      }
    },
  });

  const onSubmit = (data) => {
    const { upload_images, ...newdata } = data;
    const formData = new FormData();
    Object.keys(newdata)?.forEach((key) => formData.append(key, newdata[key]));
    for (const file of upload_images) {
      formData.append("upload_images", file);
    }
    mutate(formData);
  };

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
        <SubConHeader>Add Gallery</SubConHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Name:
            <FormDataComp
              type={"text"}
              {...register("name", { required: true })}
            />
          </FormLabel>
          <FormLabel>
            Created At:
            <FormDataComp
              type={"date"}
              {...register("date_taken", { required: true })}
            />
          </FormLabel>

          <FormLabel>
            To select multiple months on desktop hold ctrl for windows or
            command button for Mac
          </FormLabel>

          <FormLabel>
            Images:
            <FormDataComp
              type={"file"}
              accept="image/*"
              multiple
              {...register("upload_images", { required: true })}
            />
          </FormLabel>

          <SubConBtnHold>
            <SubConBtn
              type={"submit"}
              value="Add"
              disabled={isLoading}
              typex="filled"
            />
            <SubConBtn
              type={"submit"}
              value="Cancel"
              disabled={isLoading}
              onClick={close}
            />
          </SubConBtnHold>
        </Form>
      </SubCon>
    </BackDrop>
  );
};

export default AddGallery;
