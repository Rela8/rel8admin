


import React,{useState} from 'react'
import { MeetingsContainer } from '../Meetings/Meetings.styles'
import Loading from '../Loading/Loading'
import { EventsHeader } from '../Events/Events.styles'
import Table from '../Table'
import { SubConBtn } from '../Button'
import { useMutation, useQuery } from 'react-query'
import { getMemeberServicesSubmmissionApi, handleServiceRequestApi } from '../../utils/api-calls'
import { useParams } from 'react-router-dom'
import CustomModal from '../Modals/CustomModal'
import { SelectWithInput } from '../InputWithLabel'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const MemberServiceRequestSubmission = () => {
    const { id } = useParams()
    const  {data,isLoading} = useQuery('getMemeberServicesSubmmissionApi',()=>getMemeberServicesSubmmissionApi(id),{
        enabled:typeof id=='string'
    })

    const [selectedData,setSeletedData] = useState<any>(null)
    const prop_columns =[
        {
            Header:'Service Name',
            accessor:'service_name',
        },
        {
            Header:'Member Name',
            accessor:'full_name',
        },
        {
            Header:'Approval Status',
            accessor:'status',
        },
        {
            Header:'View File and Fields Submitted',
            accessor:'id',
            Cell:(tableProps:any)=>{
                return (
                    <SubConBtn
                    onClick={e=>{
                        e.preventDefault()
                        // console.log(
                        //     tableProps.row.original
                        // )
                        setSeletedData(tableProps.row.original)
                        // route(`/service-request/member-submission/${tableProps.row.original.id}`)
                    }}
                    >
                        View
                    </SubConBtn>
                )
            }
        },
        
    ]
  return (
    <MeetingsContainer>
            <Loading  loading={isLoading}/>
        <br />
            
            <EventsHeader>Service Request Submission</EventsHeader>
        <br />
            <Table prop_columns={prop_columns} custom_data={data?data:[]}/>

    
    {selectedData&&
            <CustomModal 
            modalWith='600px'
            title={'Infomation Submitted'}
            close={()=>setSeletedData(null)}>
            <MemberServiceSubmission data={selectedData}/>
        </CustomModal>
    }


        
    </MeetingsContainer>
  )
}

export default MemberServiceRequestSubmission


const MemberServiceSubmission = ({data}:any)=>{
    const {register,handleSubmit} = useForm();
    const {isLoading,mutate}  = useMutation(handleServiceRequestApi,{
        'onSuccess':(data)=>{
            toast.success("Status Updated Successfully", {
                // progressClassName: "toastProgress",
                icon: false,
            });
            window.location.reload()
        }
    })
    const onSubmit =({status}:any)=>{
        if (status ===''){
            toast.success("Please select a valid option", {
                // progressClassName: "toastProgress",
                icon: false,
            });
            return

        }
        mutate({
            'member_request_id':data.id,
            status,
        })
        // console.log(value)

    }
    return (
        <div>
            <Loading loading={isLoading} />
            <h2>Fields Submission</h2>
            <br />
            <div style={{'display':'grid','gridTemplateColumns':'1fr 1fr','gap':'10px'}}>
                {data?.fields_subbission?.map((d:any,index:number)=>(
                    <div key={index}>
                        <p><strong>{d.name}:</strong>{' '} {d.value}</p>
                    </div>
                ))}
            </div>
            <br></br>
            <h2>File Submission</h2>
            <br />
            <div style={{'display':'grid','gridTemplateColumns':'1fr 1fr','gap':'10px'}}>
                {data?.files?.map((d:any,index:number)=>(
                    <div key={index}>
                        <p><strong>{d.name}:</strong>{' '} <a href={d.value}  target='_blank' rel="noreferrer">view</a></p>
                    </div>
                ))}
            </div> 
            <br />
            <p><strong>Approval Status</strong>:{' '}{data.status}</p>
            {/* approved='approved'
        pending='pending' */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <br />
                <br />
            <SelectWithInput 
            options={[
                {'name':'Select Status','value':''},
                {'name':'Approve','value':'approved'},
                {'name':'Pending','value':'pending'},
            ]}
            label='Update Approval'
            name='status'
            register={register}
            />
            {/* @ts-ignore */}
            <SubConBtn  typex='filled'>
                Submit
            </SubConBtn>
            </form>
        </div>
    )
}