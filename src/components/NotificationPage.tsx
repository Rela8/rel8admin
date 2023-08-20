import { useMutation, useQuery } from "react-query"
import { getAllCommittee, getAllCompanysNames, getListOfExcos, sendPushCommiteeNoficationApi, sendPushIndividualNoficationApi, sendPushSectorNoficationApi } from "../utils/api-calls"
import { SubConBtn } from "./Buton"
import { DashBoardMemberCon } from "./DashBoard/DashBoard.styles"
import MemberDetBox from "./DashBoard/MemberDetBox"
import { EventsHeader } from "./Events/Events.styles"
import { MeetingsContainer } from "./Meetings/Meetings.styles"
import MultiSelectComp from "./MultiSelect"
import Loading from "./Loading/Loading"
import { AddNewBtn } from "./Members/Members.styles"
import { useState } from "react"
import CustomModal from "./Modals/CustomModal"
import { FormDataComp, FormLabel } from "./Modals/AddMeeting"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"




const NotificationPage = ()=>{
    // const {data:excoData,isLoading,} = useQuery('exco-list',getListOfExcos, {
    //     refetchOnWindowFocus: false,
    //     select: (data) =>
    //       data.data.map((item) => ({ id: item.id, name: item.name })),
    //   })

    const [indiviModal,setIndiviModal] = useState(false)
    const [sectorModal,setSectorModal] = useState(false)
    const [commiteeModal,setCommitteeModal] = useState(false)
    const dashboardData =[
        {
            header:'Individual',
            subheader:<SubConBtn
            onClick={()=>{
                setIndiviModal(true)
            }}
            >Send </SubConBtn>
        },
        {
            header:'Sector and Sub-Sector',
            subheader:<SubConBtn
            onClick={()=>{
                setSectorModal(true)
            }}
            >Send </SubConBtn>
        },
        // {
        //     header:'Branch',
        //     subheader:<SubConBtn>Send </SubConBtn>
        // },
        {
            header:'Committees',
            subheader:<SubConBtn
                onClick={()=>{
                    setCommitteeModal(true)
                }} 
            >Send </SubConBtn>
        },
        
    ]
    return (
        <MeetingsContainer>
            <EventsHeader>
                Send Notifications
            </EventsHeader>
            <br />
            <DashBoardMemberCon>
            {
                  dashboardData.map((item, index) => (
                    <MemberDetBox
                    cirColor={'#7f02a2'}
                      key={index}
                      data={{
                        header: item.header,
                        subheader:item.subheader,
                      }}
                    />
                  ))
            }
            </DashBoardMemberCon>


            {/* <h1></h1> */}

            {
                indiviModal?
            <CustomModal
            title={'Individual Notification'}
            close={()=>setIndiviModal(false)}
            >
                <SendIndividualNotifcationForm/>
            </CustomModal>:''
            }

{/*  */}


{
                commiteeModal?
            <CustomModal
            title={'Committee Notification'}
            close={()=>setCommitteeModal(false)}
            >
                <SendCommiteeNotifcationForm/>
            </CustomModal>:''
            }

{
                sectorModal?
            <CustomModal
            title={'Sector Notification'}
            close={()=>setSectorModal(false)}
            >
                <SendSectorNotifcationForm/>
            </CustomModal>:''
            }
        </MeetingsContainer>

)
}

export default NotificationPage


const SendIndividualNotifcationForm =()=>{
    const [selectedCompany,setSelectedCompany] = useState<string[]>([]);
    const {isLoading:companiesLoading,data:companiesName} = useQuery('getAllCompanysNames',getAllCompanysNames)
    const  { isLoading,mutate} = useMutation(sendPushIndividualNoficationApi,{
        'onSuccess':(data)=>{
            toast.success("Notification Sent!!", {
                progressClassName: "toastProgress",
                icon: false,
            });
        }
    })
    const onSubmit = (value:any)=>{
        mutate(value)
    }


    const { register, watch, handleSubmit,setValue } = useForm({});

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
             <Loading
          loading={
            companiesLoading
          }
        />

            <FormLabel>
                Title:
                <FormDataComp
                  type={"text"}
                  {...register("title", { required: true })}
                />
              </FormLabel>
              <br />
              <FormLabel>
                Message:
                <textarea
                  {...register("message", { required: true })}
                />
              </FormLabel>
            <br />
            <MultiSelectComp
            options={companiesName?companiesName.map((d:any,index:number)=>({
              'label':d,'value':d})):[]}
            label="Members"
            onChange={(value)=>{
                setValue('names',
                    value.map(d=>d.value)
                )
            }} />
            <br />
            <AddNewBtn
            type="submit"
            >
                Submit
            </AddNewBtn>
        </form>
    )
}





const SendSectorNotifcationForm =()=>{
    const [selectedCompany,setSelectedCompany] = useState<string[]>([]);
    const {data:excoData,isLoading:loadingExco,} = useQuery('exco-list',getListOfExcos, {
        refetchOnWindowFocus: false,
        select: (data) =>
          data.data.map((item:any) => ({ id: item.id, name: item.name })),
      })

    const  { isLoading,mutate} = useMutation(sendPushSectorNoficationApi,{
        'onSuccess':(data)=>{
            toast.success("Notification Sent!!", {
                progressClassName: "toastProgress",
                icon: false,
            });
        }
    })
    const onSubmit = (value:any)=>{
        mutate(value)
        // console.log(value)
    }


    const { register, watch, handleSubmit,setValue } = useForm({});

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
             <Loading
          loading={
            loadingExco||isLoading
          }
        />

            <FormLabel>
                Title:
                <FormDataComp
                  type={"text"}
                  {...register("title", { required: true })}
                />
              </FormLabel>
              <br />
              <FormLabel>
                Message:
                <textarea
                  {...register("content", { required: true })}
                />
              </FormLabel>
            <br />
            {/* <MultiSelectComp
            options={excoData?excoData.map((d:any,index:number)=>({
              'label':d.name,'value':d.id})):[]}
            label="Members"
            onChange={(value)=>{
                setValue('ids',
                    value.map(d=>d.value)
                )
            }} /> */}
            <select
            onChange={e=>{
                // console.log()
                setValue('id',e.target.value)
            }}
            >
                <option  selected>Pick Sectors or Sub-Sector</option>
                {
                    excoData?.map((d:any,index:number)=>(

                        <option value={d.id} key={index} >
                            {d.name}
                        </option>
                    ))
                }
            </select>
            <br />
            <AddNewBtn
            type="submit"
            >
                Submit
            </AddNewBtn>
        </form>
    )
}



const SendCommiteeNotifcationForm =()=>{
    const { isLoading:gettingCommitee,  data } = useQuery(
        "all-committees",
        getAllCommittee,
        {
          refetchOnWindowFocus: false,
          
        }
      );

    const  { isLoading,mutate} = useMutation(sendPushCommiteeNoficationApi,{
        'onSuccess':(data)=>{
            toast.success("Notification Sent!!", {
                progressClassName: "toastProgress",
                icon: false,
            });
        }
    })
    const onSubmit = (value:any)=>{
        mutate(value)
        // console.log(value)
    }


    const { register, watch, handleSubmit,setValue } = useForm({});
    console.log()
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
             <Loading
          loading={
            isLoading||isLoading
          }
        />

            <FormLabel>
                Title:
                <FormDataComp
                  type={"text"}
                  {...register("title", { required: true })}
                />
              </FormLabel>
              <br />
              <FormLabel>
                Message:
                <textarea
                  {...register("content", { required: true })}
                />
              </FormLabel>
            <br />
            {/* <MultiSelectComp
            options={excoData?excoData.map((d:any,index:number)=>({
              'label':d.name,'value':d.id})):[]}
            label="Members"
            onChange={(value)=>{
                setValue('ids',
                    value.map(d=>d.value)
                )
            }} /> */}
            <select
            onChange={e=>{
                // console.log()
                setValue('id',e.target.value)
            }}
            >
                <option  selected>Pick Committe</option>
                {
                    data?.data?.map((d:any,index:number)=>(

                        <option value={d.id} key={index} >
                            {d.name}
                        </option>
                    ))
                }
            </select>
            <br />
            <AddNewBtn
            type="submit"
            >
                Submit
            </AddNewBtn>
        </form>
    )
}

