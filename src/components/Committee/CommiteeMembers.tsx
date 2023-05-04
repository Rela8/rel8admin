import { useQuery } from "react-query"
import { getCommiteeMembers } from "../../utils/api/commitee.api"
import Table from "../ReuseAbleTable/ReuseAbleTable"
import { CommitteeContainer, CommitteeHeader } from "./Committee.styles"
import { useParams } from "react-router-dom"




const CommiteeMembers =()=>{
    const props_data =[
        {
            Header:'Company Name',
            accessor:'full_name',
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
            Header:'MembershipId',
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
    const {id } = useParams()

    const {isLoading,data} = useQuery('commitee-member',()=>getCommiteeMembers(id?id:-1),{
        enabled:id?true:false
    })
    return (
        <CommitteeContainer>
        <CommitteeHeader>Committee Member</CommitteeHeader>
        <br />
        <Table 
            prop_columns={props_data}
            custom_data={data}
        />
        </CommitteeContainer>
    )
}

export default CommiteeMembers