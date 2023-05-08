import { Form, FormDataComp, FormLabel, FormOption, FormSelection, FormTextArea, SubCon, SubConBtn, SubConBtnHold, SubConHeader } from "./AddMeeting";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createMeeting, getAllChapters, getAllCommittee, getListOfExcos, updateMeetingApi } from "../../utils/api-calls";
import Loading from "../Loading/Loading";



const EditMeeting = ({meeting}:any) => {
    const { register, handleSubmit ,setValue} = useForm(),
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
        data.data.map((item:any) => ({ id: item.id, name: item.name })),
    });
  
  
    const {
      isLoading: commiteeLoading,
      isFetching: commiteeFetching,
      isError: commiteeError,
      data: commiteeData,
    } = useQuery("all-committee", getAllCommittee, {
      refetchOnWindowFocus: false,
      select: (data) =>
        data.data.map((item:any) => ({ id: item.id, name: item.name })),
    });
  
    const { isLoading: createLoading, mutate } = useMutation(updateMeetingApi, {
      onMutate: () => {
        toast.info("Meeting Updating in progress", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
      onSuccess: () => {
        toast.success("Meeting Updated", {
          progressClassName: "toastProgress",
          icon: false,
        });
        queryClient.invalidateQueries("all-meetings");
        
      },
      onError: (error:any) => {
        toast.error("Could not create meeting");
        if (error?.message?.response?.data?.message?.error) {
          toast.error(`Message: ${error.message.response.data.message.error}`, {
            autoClose: 9000,
          });
        }
      },
    });
  
    const onSubmit = (data:any) => {
        console.log({'submitted data':data})
        mutate(data)
    };
    useEffect(()=>{
        // meeting
        setValue('name',meeting.name)
        setValue('id',meeting.id)
        setValue('details',meeting.details)
        setValue('organiserName',meeting.organiserName)
        setValue('organiserDetails',meeting.organiserDetails)
        setValue('addresse',meeting.addresse)
        setValue('meeting_link',meeting.meeting_link)
        setValue('date_for',meeting.date_for)
        setValue('event_date',meeting.event_date)
        
    },[])
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Loading  loading={createLoading}/>
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
          Commitee:
            <FormSelection
              defaultValue={""}
              {...register("commitee", { required: false })}
            >
              <FormOption disabled value="">
                select an option
              </FormOption>
              <FormOption value="">
                Unselect
              </FormOption>
              {commiteeData?.map((item:any) => (
                <FormOption key={item.id} value={item.id}>
                  {item.id} || {item.name}
                </FormOption>
              ))}
            </FormSelection>
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
              <FormOption value="">
                Unselect
              </FormOption>
              {excoData?.map((item:any) => (
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
              {...register("chapter", { required: false })}
            >
             <FormOption disabled value="">
                select an option
              </FormOption>
              <FormOption value="">
                Unselect
              </FormOption>
              {data?.map((item:any) => (
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
              {...register("date_for", { required: false })}
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
            Meet Link:
            <FormDataComp
              type={"text"}
              {...register("meeting_link", { required: false })}
            />
          </FormLabel>
          
          <FormLabel>
            Event Date:
            <FormDataComp
              type={"datetime-local"}
              {...register("event_date", { required: false })}
            />
          </FormLabel>

          <FormLabel>
            Meeting Docs
          
            <FormDataComp
              type={"file"}
              {...register("meeting_docs", { required: false })}
            />
          </FormLabel>

          <SubConBtnHold>
            <SubConBtn
              type={"submit"}
              value="Update"
              disabled={createLoading}
            //   @ts-ignore
              typex="filled"
            />
           
          </SubConBtnHold>
        </Form>
    );
  };
  
  export default EditMeeting;
  