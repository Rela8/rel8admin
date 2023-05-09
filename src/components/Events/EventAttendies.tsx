import { useQuery } from "react-query"
import Table from "../ReuseAbleTable/ReuseAbleTable"
import { EventsContainer, EventsHeader } from "./Events.styles"
import { useLocation, useParams } from "react-router-dom"
import { getEventAttendies } from "../../utils/api/events.api"
import Loading from "../Loading/Loading"
import { exportExcelFile } from "../../utils/extrafunction"
import { SubConBtn } from "../Buton"
import { HiDocumentDownload } from "react-icons/hi"




const EventAttendies = ()=>{
    const {id } = useParams()
    const {isLoading,data} = useQuery('event-attendies',()=>getEventAttendies({'event_id':id?parseInt(id):-1}),{
        enabled:id?true:false
    })
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
    const generateExcel =()=>{
        
        let clean_data =data?.map((d:any,index:number)=>{
            let newdata= []
            newdata.push({title:'S/N',value:index+1,})
            newdata.push({title:'Company Name',value:d.full_name,})
            newdata.push({title: 'Amount Owing',value:d.amount_owing,})
            newdata.push({ title:'Sector',value:d.member_info.find((b:any)=>b.name==='SECTOR')?.value,})
            newdata.push({title: 'Sub Sector',value:d.member_info.find((b:any)=>b.name==='SUB-SECTOR')?.value,})
            newdata.push({title:'MembershipID',value:d.member_info.find((b:any)=>b.name==='MEMBERSHIP_NO')?.value,})
            return newdata
        })
        console.log()
        exportExcelFile({
          'headers':['S/N	','Company Name',
          'Amount Owing','Sector','Sub Sector',
          'MembershipID',],
          'rows':clean_data
          })

    }
     return (
        <EventsContainer>
            <Loading loading={isLoading} />
            <EventsHeader>Event Attendies</EventsHeader>
        <br />

        {
          !isLoading?
        <SubConBtn
            style={{
              // 'width':'80%','margin':'10px auto','display':'block'
            }}
            typex='filled'
            onClick={(e:any)=>{
              generateExcel()
            }}
            >Download Data
            <HiDocumentDownload style={{'color':'white','margin':'2px 0'}}/>
            </SubConBtn>:''
        }

<br />
<br />

            <Table 
            prop_columns={props_data}
            custom_data={data?data:[]}
            />
        </EventsContainer>
    )
}

export default EventAttendies