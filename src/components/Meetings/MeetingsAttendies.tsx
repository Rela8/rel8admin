import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { get_meeting_attendiesapi } from "../../utils/api/meeting.api"
import { CommitteeContainer, CommitteeHeader } from "../Committee/Committee.styles"
import Table from "../ReuseAbleTable/ReuseAbleTable"


const MeetingsAttendies = ()=>{

    const {id } = useParams()

    const {isLoading,data} = useQuery('meeting-member',()=>get_meeting_attendiesapi({'meeting_id':id?id:'-1'}),{
        enabled:id?true:false
    })
    console.log({isLoading,data})
    
    const props_data =[
        {
            Header:'SN',
            accessor:'full_name',
            id:13,
            Cell: (tableProps:any)=>{
                return <>
                {tableProps.row.index+1}
                </>
            }
        },
        {
            Header:'Company Name',
            accessor:'full_name',
            id:12
        },
        {
            Header:'Email',
            accessor:'email',
        },
        {
            Header:'SUB-SECTOR',
            accessor:'member_info',
            id:1,
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member_info.find((e:any)=>e.name === 'SUB-SECTOR')?.value
                }
                </>
            )
 
        },
        {
            id:2,
            Header:'SECTOR',
            accessor:'member_info',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member_info.find((e:any)=>e.name === 'SECTOR')?.value
                }
                </>
            )
        },
        {
            id:3,
            Header:'MembershipID',
            accessor:'member_info',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member_info.find((e:any)=>e.name === 'MEMBERSHIP_NO')?.value
                }
                </>
            )
        },

        // {
        // Header:'STATUS',
        // accessor:'status',
        // Cell: (tableProps:any)=>{
        //     return <p  style={{'textTransform':'capitalize','color':tableProps.row.original.status=='success'?'#2BBC52':'#D40F0F',
        //     'fontWeight':'600'    
        // }}>{tableProps.row.original.status}</p>
        // }   
    ]
    return (
        <div>
        <CommitteeContainer>
        <CommitteeHeader>Meetings Member</CommitteeHeader>
        <br />
        <Table 
            prop_columns={props_data}
            custom_data={data?.memebers?data.memebers:[]}
        />
        </CommitteeContainer>
        </div>
    )
}

export default MeetingsAttendies