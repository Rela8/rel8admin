import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import {
  createNews,
  getAllCommittee,
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
const FormTextArea = styled.textarea`
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

  &:disabled {
    background-color: "#d3d3d3";
  }
`;
export const DeleteButton = styled.button`
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

const AddNews = ({ close }) => {
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      news_paragraph: [{ heading: "", paragragh: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "news_paragraph",
    control,
  });

  const {
    isLoading: excoListLoading,
    isFetching: excoListFetching,
    isError: excoListIsError,
    data: excoListData,
  } = useQuery("exco-list", getListOfExcos, {
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data
        .map((item) => ({ id: item.id, name: item.name }))
        .reverse();
    },
  });

  const {
    isLoading: committeeLoading,
    isError: committeeError,
    isFetching: committeeFetching,
    data: committeeData,
  } = useQuery("all-committees", getAllCommittee, {
    refetchOnWindowFocus: false,
    select: (data) => {
      const result = data.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      return result.sort((a, b) => a.id - b.id);
    },
  });

  const queryClient = useQueryClient();

  const { isLoading: createLoading, mutate: createMutate } = useMutation(
    (newsData) => createNews(newsData),
    {
      onMutate: () => {
        toast.info("News Creation in progress", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
      onSuccess: () => {
        toast.success("News Created", {
          progressClassName: "toastProgress",
          icon: false,
        });
        queryClient.invalidateQueries("all-news");
        close();
      },
      onError: (error) => {
        toast.error("Could not create news");
        if (error?.message?.response?.data?.message?.error) {
          toast.error(`Message: ${error.message.response.data.message.error}`, {
            autoClose: 9000,
          });
        }
      },
    }
  );

  const onSubmit = (data) => {
    const image = data.image[0];
    const { news_paragraph, image: img, ...newdata } = data;
    const payload = { image,'is_member':false,'body':'.', ...newdata };
    const formData = new FormData();
    Object.keys(payload)?.forEach((key) => {
      if(key=='is_exco'){
        if(payload.is_exco){
          formData.append(key, payload[key])
        }

      }
      else if(key=='is_commitee'){
        if(payload.is_commitee){
          formData.append(key, payload[key])
        }
      }
      else{
        formData.append(key, payload[key])
      }
    });
    formData.append("news_paragraph", JSON.stringify(news_paragraph));
    // console.log(formData.entries());
    createMutate(formData);
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

      {excoListLoading ||
      excoListFetching ||
      committeeLoading ||
      committeeFetching ? (
        <Loading
          loading={
            excoListLoading ||
            excoListFetching ||
            committeeLoading ||
            committeeFetching
          }
        />
      ) : !excoListIsError || !committeeError ? (
        <SubCon>
          <SubConHeader>Add News</SubConHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Name:
              <FormDataComp
                type={"text"}
                {...register("name", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Image:
              <FormDataComp
                type={"file"}
                accept={"image/*"}
                {...register("image", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Is Exco:
              <FormSelection
                defaultValue={""}
                {...register("is_exco", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value={true}>Yes</FormOption>
                <FormOption value={false}>No</FormOption>
              </FormSelection>
            </FormLabel>

            {watch("is_exco") === "true" && (
              <FormLabel>
                Excos Id:
                <FormSelection
                  defaultValue={""}
                  {...register("exco_id", { required: false })}
                >
                  <FormOption disabled value="">
                    select an option
                  </FormOption>
                  {excoListData.map((item) => (
                    <FormOption key={item.id} value={item.id}>
                      {item.id} || {item.name}
                    </FormOption>
                  ))}
                </FormSelection>
              </FormLabel>
            )}

            <FormLabel>
              Is Committe:
              <FormSelection
                defaultValue={""}
                {...register("is_committe", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value={true}>Yes</FormOption>
                <FormOption value={false}>No</FormOption>
              </FormSelection>
            </FormLabel>

            {watch("is_committe") === "true" && (
              <FormLabel>
                Committe Name:
                <FormSelection
                  defaultValue={""}
                  {...register("commitee_name", { required: false })}
                >
                  {committeeData.map((item) => (
                    <FormOption key={item.id} value={item.id}>
                      {item.id} || {item.name}
                    </FormOption>
                  ))}
                </FormSelection>
              </FormLabel>
            )}

            {/* <FormLabel>
              Is Member:
              <FormSelection
                defaultValue={""}
                {...register("is_member", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value={true}>Yes</FormOption>
                <FormOption value={false}>No</FormOption>
              </FormSelection>
            </FormLabel> */}

            {/* <FormLabel>
              Body:
              <FormTextArea {...register("body", { required: true })} />
            </FormLabel> */}

            {fields.map((field, index) => {
              return (
                <section key={field.id}>
                  <FormLabel>
                    Heading:
                    <FormDataComp
                      type={"text"}
                      {...register(`news_paragraph.${index}.heading`, { required: false })}
                    />
                  </FormLabel>

                  <FormLabel>
                    Paragraph:
                    <FormTextArea
                      {...register(`news_paragraph.${index}.paragragh`)}
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
              onClick={() =>
                append({
                  heading: " ",
                  paragragh: "New Paragraph",
                })
              }
            >
              Add New Paragraph Section
            </DeleteButton>

            <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                value="Add"
                disabled={createLoading}
                typex="filled"
              />
              <SubConBtn
                type={"button"}
                value="Cancel"
                disabled={createLoading}
                onClick={close}
              />
            </SubConBtnHold>
          </Form>
        </SubCon>
      ) : (
        <small style={{ color: "white", fontSize: "20px" }}>
          can't add dues
        </small>
      )}
    </BackDrop>
  );
};

export default AddNews;
