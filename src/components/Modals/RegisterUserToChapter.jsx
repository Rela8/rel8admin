import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { getAllMembers, registerUserToChapter } from "../../utils/api-calls.js";
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

const RegisterUserToChapter = ({ close }) => {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const chaptersList =
    queryClient.getQueryData("all-chapters").results || undefined;

  const {
    isLoading: userLoading,
    isFetching: userFetching,
    isError: userError,
    data: userData,
  } = useQuery("all-users", getAllMembers, {
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data.map((item) => ({ user: item.user, email: item.email }));
    },
  });

  const { isLoading: createLoading, mutate } = useMutation(
    registerUserToChapter,
    {
      onMutate: () => {
        toast.info("User Registration in progress", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
      onSuccess: () => {
        toast.success("User Registered", {
          progressClassName: "toastProgress",
          icon: false,
        });
        queryClient.invalidateQueries("all-chapters");
        close();
      },
      onError: (error) => {
        toast.error("Could not register user");
        if (error?.message?.response?.data?.message?.error) {
          toast.error(`Message: ${error.message.response.data.message.error}`, {
            autoClose: 9000,
          });
        }
      },
    }
  );

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

      {userLoading || userFetching ? (
        <Loading loading={userLoading || userFetching} />
      ) : !userError ? (
        <SubCon>
          <SubConHeader>Register User To Chapter</SubConHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              User:
              <FormSelection
                defaultValue={""}
                {...register("user_id", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {userData.map((item) => (
                  <FormOption key={item.user} value={item.user}>
                    {item.user} | {item.email}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

            <FormLabel>
              Chapter:
              <FormSelection
                defaultValue={""}
                {...register("chapter_id", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {chaptersList.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} | {item.name}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

            <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                disabled={createLoading}
                value="Add"
                typex="filled"
              />
              <SubConBtn
                type={"submit"}
                disabled={createLoading}
                value="Cancel"
                onClick={close}
              />
            </SubConBtnHold>
          </Form>
        </SubCon>
      ) : (
        <small>Can't fetch members</small>
      )}
    </BackDrop>
  );
};

export default RegisterUserToChapter;
