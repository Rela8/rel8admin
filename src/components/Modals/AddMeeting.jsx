import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import {
  createMeeting,
  getAllChapters,
  getListOfExcos,
} from "../../utils/api-calls";
import Loading from "../Loading/Loading";

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
export const FormDataComp = styled.input`
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
export const FormSelection = styled.select`
  padding: 5px 0px;
  color: ${rel8Purple};
  outline: none;
  border: none;
  border-bottom: 1px solid ${rel8Purple};
  margin: 10px 0px;
  overflow: auto;
`;
export const FormOption = styled.option``;
export const FormLabel = styled.label`
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
export const FormTextArea = styled.textarea`
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

const AddMeeting = ({ close }) => {
  const { register, handleSubmit } = useForm(),
    queryClient = useQueryClient();

  const { isLoading, isFetching, isError, data } = useQuery(
    "all-chapters",
    getAllChapters,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.results,
    }
  );

  const {
    isLoading: excoLoading,
    isFetching: excoFetching,
    isError: excoError,
    data: excoData,
  } = useQuery("all-excos", getListOfExcos, {
    refetchOnWindowFocus: false,
    select: (data) =>
      data.data.map((item) => ({ id: item.id, name: item.name })),
  });

  const { isLoading: createLoading, mutate } = useMutation(createMeeting, {
    onMutate: () => {
      toast.info("Meeting Creation in progress", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Meeting Created", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries("all-meetings");
      close();
    },
    onError: (error) => {
      toast.error("Could not create meeting");
      if (error?.message?.response?.data?.message?.error) {
        toast.error(`Message: ${error.message.response.data.message.error}`, {
          autoClose: 9000,
        });
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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

      {isLoading || isFetching || excoLoading || excoFetching ? (
        <Loading
          loading={isLoading || isFetching || excoLoading || excoFetching}
        />
      ) : !isError || !excoError ? (
        <SubCon>
          <SubConHeader>Add Meeting</SubConHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Name:
              <FormDataComp
                type={"text"}
                {...register("name", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Details:
              <FormTextArea {...register("details", { required: true })} />
            </FormLabel>

            <FormLabel>
              Organiser Name:
              <FormDataComp
                {...register("organiserName", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Organiser Details:
              <FormDataComp
                {...register("organiserDetails", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Exco:
              <FormSelection
                defaultValue={""}
                {...register("exco", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {excoData.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} || {item.name}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

            <FormLabel>
              Chapter:
              <FormSelection
                defaultValue={""}
                {...register("exco", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {data.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} || {item.name}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

            <FormLabel>
              Date For:
              <FormDataComp
                type={"datetime-local"}
                {...register("date_for", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Address:
              <FormDataComp
                type={"text"}
                {...register("addresse", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Event Date:
              <FormDataComp
                type={"datetime-local"}
                {...register("event_date", { required: true })}
              />
            </FormLabel>

            <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                value="Add"
                disabled={createLoading}
                typex="filled"
              />
              <SubConBtn
                type={"submit"}
                value="Cancel"
                disabled={createLoading}
                onClick={close}
              />
            </SubConBtnHold>
          </Form>
        </SubCon>
      ) : (
        <small>Can't fetch Meeting</small>
      )}
    </BackDrop>
  );
};

export default AddMeeting;
