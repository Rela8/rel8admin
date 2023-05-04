import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createCommittee, getAllMembers } from "../../utils/api-calls.js";
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
const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
  color: ${(props) =>
    props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
  cursor: pointer;
  margin-top: ${(props) => (props.mt === "filledup" ? "20px" : "")};
`;

const AddCommittee = ({ close }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      commitee_todo: {
        how: [""],
      },
      commitee_duties: {
        commitee_duties: [""],
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "commitee_todo.how",
    control,
  });

  const {
    fields: dutyFields,
    append: dutyAppend,
    remove: dutyRemove,
  } = useFieldArray({
    name: "commitee_duties.commitee_duties",
    control,
  });

  const { isLoading, isFetching, isError, data } = useQuery(
    "all-members",
    getAllMembers,
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const membArray = data.data.map((item) => {
          return { id: item.id, email: item.email };
        });

        const result = membArray.sort((a, b) => a.id - b.id);
        return result;
      },
    }
  );

  const queryClient = useQueryClient();

  const { isLoading: createLoading, mutate } = useMutation(createCommittee, {
    onMutate: () => {
      toast.info("Committee Creation in progress", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Committee Created", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries("all-committees");
      close();
    },
    onError: (error) => {
      toast.error("Could not create committee");
      if (error?.message?.response?.data?.message?.error) {
        toast.error(`Message: ${error.message.response.data.message.error}`, {
          autoClose: 9000,
        });
      }
    },
  });

  const onSubmit = (data) => {
    let {
      team_of_reference,
      commitee_todo,
      commitee_duties,
      members_list,
      name,
    } = data;
    team_of_reference = team_of_reference[0];
    const formData = new FormData();
    formData.append("team_of_reference", team_of_reference);
    formData.append("commitee_todo", JSON.stringify(commitee_todo));
    formData.append("commitee_duties", JSON.stringify(commitee_duties));
    formData.append("members_list", JSON.stringify(members_list));
    formData.append("name", name);
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

      {isLoading || isFetching ? (
        <Loading loading={isLoading || isFetching} />
      ) : !isError ? (
        <SubCon>
          <SubConHeader>Add Committee</SubConHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Name:
              <FormDataComp
                type={"text"}
                {...register("name", { required: true })}
              />
            </FormLabel>
            <FormLabel>
              Members List:
              <FormSelection
                multiple
                defaultValue={[]}
                {...register("members_list", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {data.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} || {item.email}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

            <FormLabel>
              Images:
              <FormDataComp
                type={"file"}
                accept="image/*"
                {...register("team_of_reference", { required: true })}
              />
            </FormLabel>

            {fields.map((field, index) => {
              return (
                <section key={field.id}>
                  <FormLabel>
                    Committee Ters:
                    <FormDataComp
                      type={"text"}
                      {...register(`commitee_todo.how.${index}`, {
                        required: true,
                      })}
                    />
                  </FormLabel>
                  <DeleteButton
                    typex="filled"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </DeleteButton>
                </section>
              );
            })}
            <DeleteButton
              type="button"
              mt="filledup"
              onClick={() => append("New Todo")}
            >
              Add Committee Todo
            </DeleteButton>

            {dutyFields.map((field, index) => {
              return (
                <section key={field.id}>
                  <FormLabel>
                    Committee Duty:
                    <FormDataComp
                      type={"text"}
                      {...register(`commitee_duties.commitee_duties.${index}`, {
                        required: true,
                      })}
                    />
                  </FormLabel>
                  <DeleteButton
                    typex="filled"
                    type="button"
                    onClick={() => dutyRemove(index)}
                  >
                    Delete
                  </DeleteButton>
                </section>
              );
            })}
            <DeleteButton
              type="button"
              mt="filledup"
              onClick={() => dutyAppend("New Duty")}
            >
              Add Committee Duty
            </DeleteButton>

            <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                value="Add"
                disabled={isLoading || createLoading}
                typex="filled"
              />
              <SubConBtn
                type={"submit"}
                value="Cancel"
                disabled={isLoading || createLoading}
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

export default AddCommittee;
