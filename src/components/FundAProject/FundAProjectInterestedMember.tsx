import { useParams } from "react-router-dom"
import { CommitteeContainer, CommitteeHeader } from "../Committee/Committee.styles"
import { useQuery } from "react-query"
import { getInKindcApi, getIncashApi } from "../../utils/api/fundproject.api"
import  Table  from '../ReuseAbleTable/ReuseAbleTable'
import ExcelJS from 'exceljs'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { read, utils ,writeFileXLSX } from 'xlsx';
import { exportExcelFile } from "../../utils/extrafunction"
const FundAProjectInterestedMember = ()=>{
    const {id } = useParams()

    const {isLoading,data} = useQuery   ('support-in-kind',()=>getInKindcApi(id?id:-1),{
        enabled:id?true:false
    })
    const {isLoading:loading,data:incashData} = useQuery   ('support-in-cash',()=>getIncashApi(id?id:-1),{
        enabled:id?true:false
    })
    const inKindprops_data =[
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
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.full_name
                }
                </>
            ),
            id:123,
 
        },
        {
            Header:'Email',
            accessor:'email',
        },
        {
            Header:'SUB-SECTOR',
            accessor:'member',
            id:1,
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'SUB-SECTOR')?.value
                }
                </>
            )
 
        },
        {
            id:2,
            Header:'SECTOR',
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'SECTOR')?.value
                }
                </>
            )
        },
        {
            id:3,
            Header:'MembershipID',
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'MEMBERSHIP_NO')?.value
                }
                </>
            )
        },
        {
            Heading:'Support Type',
            accessor:'heading'
        },
        {
            Heading:'More Info',
            accessor:'about'
        }
    ]

    const inCashprops_data =[
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
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.full_name
                }
                </>
            ),
            id:123,
 
        },
        {
            Header:'Email',
            accessor:'email',
        },
        {
            Header:'SUB-SECTOR',
            accessor:'member',
            id:1,
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'SUB-SECTOR')?.value
                }
                </>
            )
 
        },
        {
            id:2,
            Header:'SECTOR',
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'SECTOR')?.value
                }
                </>
            )
        },
        {
            id:3,
            Header:'MembershipID',
            accessor:'member',
            Cell: (tableProps:any)=>(
                <>
                {
                    tableProps.row.original.member.member_info.find((e:any)=>e.name === 'MEMBERSHIP_NO')?.value
                }
                </>
            )
        },
        {
            Heading:'Amount',
            accessor:'amount'
        },
        {
            Heading:'Has Paid',
            accessor:'is_paid'
        }
    ]
    return (
        <CommitteeContainer>
        <CommitteeHeader>Interested Member For Project</CommitteeHeader>
        <br />
           <Tabs>
        <TabList>
          <Tab>Supporters in kind</Tab>
          {/* <Tab>Exco Due</Tab> */}
          <Tab>Supporters in Cash</Tab>
        </TabList>
    
        {/* <TabPanel>
            <CreateGeneralDue/>
        </TabPanel> */}
        <TabPanel>
        <Table
            prop_columns={inKindprops_data}
            custom_data={data?data:[]}
        />
        </TabPanel>

        <TabPanel>
        <Table
            prop_columns={inCashprops_data}
            custom_data={incashData?incashData:[]}
        />
        </TabPanel>
      </Tabs>
        </CommitteeContainer>
    )
}

export default FundAProjectInterestedMember