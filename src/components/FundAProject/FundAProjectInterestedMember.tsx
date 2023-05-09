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
import { SubConBtn } from "../Buton"
import { HiDocumentDownload } from "react-icons/hi"
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
    const generateExcel =(data:any)=>{
        
        let clean_data =data?.map((d:any,index:number)=>{
            let newdata= []
            newdata.push({title:'S/N',value:index+1,})
            newdata.push({title:'Company Name',value:d.member.full_name,})
            newdata.push({title: 'Amount',value:d.amount,})
            newdata.push({ title:'Sector',value:d.member.member_info.find((b:any)=>b.name==='SECTOR')?.value,})
            newdata.push({title: 'Sub Sector',value:d.member.member_info.find((b:any)=>b.name==='SUB-SECTOR')?.value,})
            newdata.push({title:'MembershipID',value:d.member.member_info.find((b:any)=>b.name==='MEMBERSHIP_NO')?.value,})
            return newdata
        })
        exportExcelFile({
          'headers':['S/N	','Company Name',
          'Sector','Sub Sector',
          'MembershipID','Amount'],
          'rows':clean_data
          })

    }
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
        <br />
        <SubConBtn
            style={{
              // 'width':'80%','margin':'10px auto','display':'block'
            }}
            typex='filled'
            onClick={(e:any)=>{
              generateExcel(data)
            }}
            >Download Data
            <HiDocumentDownload style={{'color':'white','margin':'2px 0'}}/>
            </SubConBtn>
        </TabPanel>

        <TabPanel>
        <Table
            prop_columns={inCashprops_data}
            custom_data={incashData?incashData:[]}
        />
                <br />
        <SubConBtn
            style={{
              // 'width':'80%','margin':'10px auto','display':'block'
            }}
            typex='filled'
            onClick={(e:any)=>{
              generateExcel(incashData)
            }}
            >Download Data
            <HiDocumentDownload style={{'color':'white','margin':'2px 0'}}/>
            </SubConBtn>
        </TabPanel>
      </Tabs>
        </CommitteeContainer>
    )
}

export default FundAProjectInterestedMember