import React from "react";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { useForm } from "react-hook-form";
import { mobile } from "../../responsive";
import { createDues, getListOfExcos } from "../../utils/api-calls.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
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
  color: ${(props) =>
    props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
  cursor: pointer;
  background-color: ${(props) =>
    props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
  /* background-color: ${(props) =>
    props.loading === "loading" ? "#d3d3d3" : ""}; */
`;

const AddDue = ({ close }) => {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      scheduletype: "",
      schedule: [],
    },
  });

  const queryClient = useQueryClient();

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

  const { isLoading: createLoading, mutate } = useMutation(
    (data) => createDues(data),
    {
      onMutate: () => {
        toast.info("Due Creation in progress", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
      onSuccess: () => {
        toast.success("Due Created", {
          progressClassName: "toastProgress",
          icon: false,
        });
        queryClient.invalidateQueries("all-dues");
        queryClient.invalidateQueries("member-dues");
        close();
      },
      onError: () => {
        toast.error("Could not create due");
      },
    }
  );

  const onSubmit = (duesData) => {
    mutate(duesData);
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
      {excoListLoading || excoListFetching ? (
        <Loading loading={excoListLoading || excoListFetching} />
      ) : !excoListIsError ? (
        <SubCon>
          <SubConHeader>Add Payment</SubConHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Name:
              <FormData
                type={"text"}
                {...register("name", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Is Reoccuring:
              <FormSelection
                defaultValue={""}
                {...register("re_occuring", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value={true}>Yes</FormOption>
                <FormOption value={false}>No</FormOption>
              </FormSelection>
            </FormLabel>

            <FormLabel>
              For Excos:
              <FormSelection
                defaultValue={""}
                {...register("is_for_excos", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value={true}>Yes</FormOption>
                <FormOption value={false}>No</FormOption>
              </FormSelection>
            </FormLabel>

            {watch("is_for_excos") === "true" ? (
              <FormLabel>
                Select Exco:
                <FormSelection
                  defaultValue={""}
                  {...register("exco", { required: true })}
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
            ) : null}

            <FormLabel>
              Alumni Year:
              <FormData
                type={"date"}
                {...register("alumni_year", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Amount:
              <FormData
                min={0}
                type={"number"}
                {...register("amount", {
                  required: true,
                  min: {
                    value: 0,
                    message: "invalid amount",
                  },
                })}
              />
            </FormLabel>
            <FormLabel>
              Start Date:
              <FormData
                type={"date"}
                {...register("startDate", { required: true })}
              />
            </FormLabel>
            <FormLabel>
              Start Time:
              <FormData
                type={"time"}
                {...register("startTime", { required: true })}
              />
            </FormLabel>

            <FormLabel>
              Schedule Type:
              <FormSelection
                defaultValue={""}
                {...register("scheduletype", { required: true })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value="day_of_week">Day Of Week</FormOption>
                <FormOption value="month_of_year">Month of Year</FormOption>
              </FormSelection>
            </FormLabel>

            {watch("scheduletype") === "month_of_year" && (
              <>
                <FormLabel>
                  To select multiple months on desktop hold ctrl for windows or
                  command button for Mac
                </FormLabel>
                <FormLabel>Select Months:</FormLabel>
                <FormSelection
                  defaultValue={[]}
                  multiple
                  {...register("schedule")}
                >
                  <FormOption disabled value={""}>
                    Select Options
                  </FormOption>
                  <FormOption value="0">January</FormOption>
                  <FormOption value="1">February</FormOption>
                  <FormOption value="2">March</FormOption>
                  <FormOption value="3">April</FormOption>
                  <FormOption value="4">May</FormOption>
                  <FormOption value="5">June</FormOption>
                  <FormOption value="6">July</FormOption>
                  <FormOption value="7">August</FormOption>
                  <FormOption value="8">September</FormOption>
                  <FormOption value="9">October</FormOption>
                  <FormOption value="10">November</FormOption>
                  <FormOption value="11">December</FormOption>
                </FormSelection>
              </>
            )}

            {watch("scheduletype") === "day_of_week" && (
              <>
                <FormLabel>
                  To select multiple days on desktop hold ctrl for windows or
                  command button for Mac
                </FormLabel>
                <FormLabel>Select Week days:</FormLabel>
                <FormSelection
                  defaultValue={[]}
                  multiple
                  {...register("schedule")}
                >
                  <FormOption disabled value={""}>
                    Select Options
                  </FormOption>
                  <FormOption value="0">Sunday</FormOption>
                  <FormOption value="1">Monday</FormOption>
                  <FormOption value="2">Tuesday</FormOption>
                  <FormOption value="3">Wednesday</FormOption>
                  <FormOption value="4">Thursday</FormOption>
                  <FormOption value="5">Friday</FormOption>
                  <FormOption value="6">Saturday</FormOption>
                </FormSelection>
              </>
            )}

            <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                disabled={createLoading}
                loading={createLoading ? "loading" : ""}
                value="Add"
                typex="filled"
              />
              <SubConBtn
                type={"submit"}
                disabled={createLoading}
                loading={createLoading ? "loading" : ""}
                value="Cancel"
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

export default AddDue;
