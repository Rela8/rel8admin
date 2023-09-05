


import React,{useState} from 'react'
import { MeetingsContainer } from '../Meetings/Meetings.styles'
import Loading from '../Loading/Loading'
import { EventsHeader } from '../Events/Events.styles'
import Table from '../Table'
import { SubConBtn } from '../Button'
import { useQuery } from 'react-query'
import { getMemeberServicesSubmmissionApi } from '../../utils/api-calls'
import { useParams } from 'react-router-dom'
import CustomModal from '../Modals/CustomModal'

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
    return (
        <div>
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
        </div>
    )
}