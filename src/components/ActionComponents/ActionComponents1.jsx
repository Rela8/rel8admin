import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  CancelIcon,
  EditIcon,
  EllipsesIcon,
  PlusCircleIcon,
} from "../../assets/SideBar/svgs";
import { rel8LightPink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import {
  AllDuesViewMore,
  ChangeOfNameMoreDetail,
  CommitteeViewMore,
  CouncilViewMore,
  ElectionAddAspirant,
  ElectionAddPosition,
  ElectionPosition,
  EventsViewMore,
  MeetingViewMore,
  MembersDashViewMore,
  MembersDuesViewMore,
  NewsViewMore,
  PublicationViewMore,
} from "./ViewMoreInfo";
import MoreButton from '../MoreButton'
import UpdateServiceRequestProgress from "../Modals/UpdateServiceRequestProgress";
import { AddNewBtn } from "../Members/Members.styles";
import ViewProspectivememberModal from "../Modals/ViewProspectivememberModal";
import { toast, useToast } from "react-toastify";
import CustomModal from "../Modals/CustomModal";
import UpdateMemberModal from "../Modals/UpdateMember";
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableHead = styled.th`
  text-align: center;
  padding-bottom: 20px;
  border-right: 2px solid ${rel8LightPink};
`;
const TableData = styled.td`
  padding: 10px;
  font-size: 14px;
  background-color: ${rel8White};
  text-align: left;
  border-bottom: 2px solid ${rel8LightPink};
  border-right: 2px solid ${rel8LightPink};

  ${mobile({
    padding: "2px",
  })}
`;
const ElectionThemeHeader = styled.p`
  font-size: 20px;
  color: ${rel8Purple};
  margin: 30px 20px;
  text-decoration: underline;
`;

const ActionBtns = styled.button`
  padding: 10px;
  background-color: ${rel8Purple};
  border-radius: 10px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: ${rel8White};
  ${mobile({
    fontSize: "10px",
  })}
`;

export const NoAction = () => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>Hello</TableHead>
          <TableHead>Hello</TableHead>
        </TableRow>
        <TableRow>
          <TableData>Hello Content</TableData>
          <TableData>Hello Content</TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export const DeleteOnly = ({ deleteFn }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>Hello</TableHead>
          <TableHead>Hello</TableHead>
        </TableRow>
        <TableRow>
          <TableData>Hello Content</TableData>
          <TableData>Hello Content</TableData>
          <TableData>
            <CancelIcon
              svgClick={deleteFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const EditDeletOnly = ({ editFn, deleteFn }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>Hello</TableHead>
          <TableHead>Hello</TableHead>
        </TableRow>
        <TableRow>
          <TableData>Hello Content</TableData>
          <TableData>Hello Content</TableData>
          <TableData>
            <EditIcon
              svgClick={editFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
          <TableData>
            <CancelIcon
              svgClick={deleteFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export const EditDeleteWriteOnly = ({ deleteFn, editFn, writeFn }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>Hello</TableHead>
          <TableHead>Hello</TableHead>
        </TableRow>
        <TableRow>
          <TableData>Hello Content</TableData>
          <TableData>Hello Content</TableData>
          <TableData>
            <PlusCircleIcon
              svgClick={writeFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
          <TableData>
            <EditIcon
              svgClick={editFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
          <TableData>
            <CancelIcon
              svgClick={deleteFn}
              style={{ cursor: "pointer", width: "25px", height: "25px" }}
            />
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
};

//DASHBOARD
export const MemberDashTable = ({ deleteFn, data, show }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
  {
    selected &&
    <CustomModal 
    modalWith={'700px'}
    title={'Update Members'}
    close={()=>setSelected(null)}
    >
        <UpdateMemberModal memberid={selected.id}/>
    </CustomModal>
  }
      {/* {show && <MembersDashViewMore data={selected} close={deleteFn} />} */}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Amount Owing</TableHead>
            <TableHead>Membershipid</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Sub Sector</TableHead>
            <TableHead>View mores </TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.email}
                </TableData>
                <TableData>
                  {Number(item.amount_owing).toLocaleString("en-US")}
                </TableData>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.member_info.find(b=>b.name==='MEMBERSHIP_NO')?.value}
                </TableData>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.member_info.find(b=>b.name==='SECTOR')?.value}
                </TableData>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.member_info.find(b=>b.name==='SUB-SECTOR')?.value}
                </TableData>
                <TableData>
                  <a
                  // style={{}}
                    onClick={e=>{
                      e.preventDefault()
                      // deleteFn(e)
                       setSelected(item)
                    }}
                    style={{ cursor: "pointer",'color':'#7f02a2' ,'textTransform':'underline'}}
                  >
                    views
                  </a>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export const ExcoDashTable = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const displayModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <CouncilViewMore close={displayModal} id={selected} />}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Council</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.name}</TableData>
                <TableData>
                  <ActionBtns
                    onClick={() => {
                      setSelected(item.id);
                      displayModal();
                    }}
                  >
                    Show Members
                  </ActionBtns>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//DUES
export const AllDuesTable = ({ deleteFn, data, show }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      {show && <AllDuesViewMore data={selected} close={deleteFn} />}

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.Name}</TableData>
                <TableData>
                  {Number(item.amount).toLocaleString("en-US")}
                </TableData>
                <TableData>
                  <EllipsesIcon
                    svgClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", width: "25px", height: "25px" }}
                  />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export const MemDuesTable = ({ deleteFn, data, show }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      {show && <MembersDuesViewMore data={selected} close={deleteFn} />}

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount Owing</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.email.toString()}
                </TableData>
                <TableData>
                  {Number(item.amount_owing).toLocaleString("en-US")}
                </TableData>
                <TableData>
                  <EllipsesIcon
                    svgClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", width: "25px", height: "25px" }}
                  />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//EVENT
export const EventsTable = ({ show, data, deleteFn }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {show && <EventsViewMore data={selected} close={deleteFn} />}

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData style={{ overflowWrap: "anywhere" }}>
                  {item.name}
                </TableData>
                {item.is_paid_event ? (
                  <TableData>
                    {Number(item.amount).toLocaleString("en-US")}
                  </TableData>
                ) : (
                  <TableData>
                    {Number("0.000").toLocaleString("en-US")}
                  </TableData>
                )}
                <TableData>
                  <a
                    onClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", 'color':rel8Purple}}
                  >
                    View
                  </a>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//NEWS
export const NewsTable = ({ show, data, deleteFn }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {show && <NewsViewMore data={selected} close={deleteFn} />}

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>
                  <EllipsesIcon
                    svgClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", width: "25px", height: "25px" }}
                  />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//Publication Table
export const PublicationTable = ({ show, data, deleteFn }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {show && <PublicationViewMore data={selected} close={deleteFn} />}

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>
                  <EllipsesIcon
                    svgClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", width: "25px", height: "25px" }}
                  />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//COMMITTEE
export const CommitteeTable = ({ show, data, deleteFn }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {show && <CommitteeViewMore data={selected} close={deleteFn} />}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>
                  <EllipsesIcon
                    svgClick={deleteFn}
                    itemInfo={() => setSelected(item)}
                    style={{ cursor: "pointer", width: "25px", height: "25px" }}
                  />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//ELECTION
export const ElectionTable = ({ data }) => {
  const [addPos, showAddPos] = useState(false);
  const [addAsp, showAddAsp] = useState(false);
  const [selected, setSelected] = useState(null);

  const displayAddPos = () => {
    showAddPos(!addPos);
  };

  const displayAddAsp = () => {
    showAddAsp(!addAsp);
  };

  return (
    <>
      {addPos && (
        <ElectionAddPosition close={displayAddPos} electionid={selected} />
      )}
      {addAsp && (
        <ElectionAddAspirant close={displayAddAsp} electionid={selected} />
      )}
      <Table>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableData>{item.name}</TableData>
                <TableData>
                  <ActionBtns
                    onClick={() => {
                      displayAddPos();
                      setSelected(item.id);
                    }}
                  >
                    Add Position
                  </ActionBtns>
                </TableData>
                <TableData>
                  <ActionBtns
                    onClick={() => {
                      displayAddAsp();
                      setSelected(item.id);
                    }}
                  >
                    Add Aspirant
                  </ActionBtns>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export const ElectionResultTable = ({ data }) => {
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const displayShowResult = () => {
    setShowResult(!showResult);
  };

  return (
    <>
      {showResult && (
        <ElectionPosition id={selected} close={displayShowResult} />
      )}
      <Table>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableData>{item.name}</TableData>
                <TableData>{item.is_close ? "ended" : "on going"}</TableData>
                <TableData>
                  <ActionBtns
                    onClick={() => {
                      displayShowResult();
                      setSelected(item.id);
                    }}
                  >
                    Show Positions
                  </ActionBtns>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

//CHAPTER
export const ChaptersTable = ({ data }) => {
  return (
    <>
      <ElectionThemeHeader>CHAPTERS</ElectionThemeHeader>
      <Table>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableData>{item.name}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export const FundAProjectTable = ({data,show,deleteFn})=>{
  const [selected, setSelected] = useState(null);

  return(
    <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Heading</TableHead>
            <TableHead>About</TableHead>
            <TableHead>What Project Needs</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableData>{item.id}</TableData>
              <TableData>{item.heading}</TableData>
              <TableData>{item.about}</TableData>
              <TableData>{item.what_project_needs.toString()}</TableData>
              <TableData>
                <EllipsesIcon
                  svgClick={()=>deleteFn(item.id)}
                  itemInfo={() => setSelected(item)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                />
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
export const MeetingsTable = ({ show, data, deleteFn }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {show && <MeetingViewMore data={selected} close={deleteFn} />}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableData>{item.id}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>
                <EllipsesIcon
                  svgClick={deleteFn}
                  itemInfo={() => setSelected(item)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                />
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};


export const ChangeOfNameServiceTable = ({ show, data, deleteFn })=>{
  const [Modal, setModal] = useState(false);
  const [mdata, setMdata] = useState(null);
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  const displayAddMeeting = () => {
    setModal(!Modal);
  };
  return (
   <div>

{
        showModal&&<UpdateServiceRequestProgress
        service_type={'ChangeOfNameService'}
        header={'Change Of Name Service Status'}
        close={()=>setShowModal(false)}
        invalidate_query_string={'changeOfName'}
        id={currentData.id}
      />
      }

    {
      Modal&&mdata?
      <ChangeOfNameMoreDetail data={mdata} close={displayAddMeeting} />
      :''
    }
     <ElectionThemeHeader>Change Of Name</ElectionThemeHeader>
     <Table>

      <TableBody> 
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Original Membership Certificate</TableHead>
            <TableHead>Year One Audited Finacial Statements</TableHead>
            <TableHead>Year Two Audited Finacial Statements</TableHead>
            <TableHead>Certificate Of Incorporation</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>View more</TableHead>
          </TableRow>
        
         {
          data.map(((item,index)=>(
            <TableRow key={item.id}>
            <TableData>{item.member.full_name}</TableData>
            <TableData><a href={item.original_membership_certificate} target='_blank' rel="noreferrer" >view</a></TableData>
            <TableData><a href={item.year_one_audited_finacial_statements} target='_blank' rel="noreferrer" >view</a></TableData>
            <TableData><a href={item.year_two_audited_finacial_statements} target='_blank' rel="noreferrer" >view</a></TableData>
            <TableData><a href={item.certificate_of_incorporation} target='_blank' rel="noreferrer" >view</a></TableData>
            <TableData>{item.status}</TableData>
            <TableData>
              {/* <EllipsesIcon
                svgClick={()=>{
                  setMdata(item)
                  setModal(true)}}
                // itemInfo={() => setModal(true)}
                style={{ cursor: "pointer", width: "25px", height: "25px" }}
              /> */}

              <MoreButton
                list={[
                  {'label':'update Status','click':()=>{
                    setCurrentData(item)
                    setShowModal(true)
                  
                  }},
                  {
                    'label':'view Reissuance Of Certificate',
                    'click':()=>{
                      setMdata(item)
                      setModal(true)
                    }
                  }
                ]}
                />
            </TableData>
            
          </TableRow>
          )))
         }
      </TableBody>
  </Table>
   </div>
  )
}


export const LossOFCertTable = ({data,close})=>{
  const [Modal, setModal] = useState(false);
  const [mdata, setMdata] = useState(null);
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  const displayAddMeeting = () => {
    setModal(!Modal);
  };
  return (
    <div>

{
        showModal&&<UpdateServiceRequestProgress
        service_type={'LossOFCert'}
        header={'Loss Of Certification Status'}
        close={()=>setShowModal(false)}
        invalidate_query_string={'LossOFCert'}
        id={currentData.id}
      />
      }
      <ElectionThemeHeader>Loss Of Certificate</ElectionThemeHeader>

      <Table>
            {
        Modal&&mdata?
        <ChangeOfNameMoreDetail data={mdata} close={displayAddMeeting} />
        :''
          }

          <TableBody>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Affidavit From Court Of Loss Of Cert</TableHead>
              <TableHead>Year One Audited Finacial Statements</TableHead>
              <TableHead>Year Two Audited Finacial Statements</TableHead>
              <TableHead>Certificate Of Incorporation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          
            {
              data.map((item,index)=>(
                <TableRow key={item.id}>
                  <TableData>{item.member.full_name}</TableData>
                  <TableData><a href={item.affidavit_from_court_of_loss_of_cert} 
                  target='_blank' rel="noreferrer" >view</a></TableData>

                <TableData><a href={item.year_one_audited_finacial_statements} 
                target='_blank' rel="noreferrer" >view</a></TableData>

              <TableData><a href={item.year_two_audited_finacial_statements} 
              target='_blank' rel="noreferrer" >view</a></TableData>

              <TableData><a href={item.certificate_of_incorporation} 
              target='_blank' rel="noreferrer" >view</a></TableData>
              <TableData>{item.status}</TableData>

      <TableData>
                {/* <EllipsesIcon
                  svgClick={()=>{
                    setMdata(item)
                    setModal(true)
                  }}
                  // itemInfo={() => setModal(true)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                /> */}

                <MoreButton
                list={[
                  {'label':'update Status','click':()=>{
                    setCurrentData(item)
                    setShowModal(true)
                  
                  }},
                  {
                    'label':'view Reissuance Of Certificate',
                    'click':()=>{
                      setMdata(item)
                      setModal(true)
                    }
                  }
                ]}
                />
              </TableData>
                </TableRow>
              ))
            }
          </TableBody>


      </Table>
    </div>
  )
}

export const DeactivationOfMembershipTable = ({data,close})=>{
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  return  (
    <div>
       {
        showModal&&<UpdateServiceRequestProgress
        service_type={'DeactivationOfMembership'}
        header={'Deactivation Of Membership Status'}
        close={()=>setShowModal(false)}
        invalidate_query_string={'DeactivationOfMembership'}
        id={currentData.id}
      />
      }
      <ElectionThemeHeader>Deactivation Of Membership</ElectionThemeHeader>

      <Table>
          <TableBody>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Letter Requesting Deactivation</TableHead>
              <TableHead>Original Membership Certificate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>

            {
              data.map((item,index)=>(
                <TableRow key={index}>
                  <TableData>{item.member.full_name}</TableData>
                  <TableData><a href={item.letter_requesting_deactivation} 
                  target='_blank' rel="noreferrer" >view</a></TableData>


                  <TableData><a href={item.original_membership_certificate} 
                  target='_blank' rel="noreferrer" >view</a></TableData>
                  <TableData>{item.status}</TableData>


                  <TableData>
                {/* <EllipsesIcon
                  svgClick={()=>{
                    // setMdata(item)
                    // setModal(true)
                  }}
                  // itemInfo={() => setModal(true)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                /> */}
                <MoreButton
                    list={[
                      {'label':'update Status','click':()=>{
                        setCurrentData(item)
                        setShowModal(true)}}
                    ]}
                  />
              </TableData>

                </TableRow>
              ))
            }
          </TableBody>
      </Table>
    </div>
  )
}


export const ProductManufacturingUpdateTable = ({data,close})=>{
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  return (
    <div>
      {
        showModal&&<UpdateServiceRequestProgress
        service_type={'ProductManufacturingUpdate'}
        header={'Product Manufacturing Update Status'}
        close={()=>setShowModal(false)}
        invalidate_query_string={'manufacturing_update'}
        id={currentData.id}
      />
      }
      <ElectionThemeHeader>Product Manufacturing Update</ElectionThemeHeader>
      <Table>
          <TableBody>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Most Recent Financial Statement</TableHead>
              <TableHead>Product Update Inspection Report</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>

            {
              data.map((item,index)=>(
                <TableRow key={index}>
                  <TableData>{item.member.full_name}</TableData>
                  <TableData><a href={item.most_recent_financial_statement} 
                  target='_blank' rel="noreferrer" >view</a></TableData>


                  <TableData><a href={item.product_update_inspection_report} 
                  target='_blank' rel="noreferrer" >view</a></TableData>
                  <TableData>{item.status}</TableData>


                  <TableData>
                {/* <EllipsesIcon
                  svgClick={()=>{
                    // setMdata(item)
                    // setModal(true)
                  }}
                  // itemInfo={() => setModal(true)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                /> */}
                <MoreButton
                    list={[
                      {'label':'update Status','click':()=>{
                        setCurrentData(item)
                        setShowModal(true)}}
                    ]}
                  />
              </TableData>

                </TableRow>
              ))
            }
          </TableBody>
      </Table>
    </div>
  )
}


export const ActivationOfDeactivatedMemberTable = ({data,close})=>{
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  return  (
    <div>
      {
        showModal&&<UpdateServiceRequestProgress
        service_type={'ActivationOfDeactivatedMember'}
        header={'Activation Of Deactivated Member Status'}
        close={()=>setShowModal(false)}
        invalidate_query_string={'activate_deactivated_members'}
        id={currentData.id}
      />
      }
      <ElectionThemeHeader>Activation Of Deactivated Member</ElectionThemeHeader>
      
      <Table>
          <TableBody>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Submit Most Recent Audited Financial Statement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>

            {
              data.map((item,index)=>(
                <TableRow key={index}>
                  <TableData>{item.member.full_name}</TableData>
                  <TableData><a href={item.submit_most_recent_audited_financial_statement} 
                  target='_blank' rel="noreferrer" >view</a></TableData>



                  <TableData>{item.status}</TableData>


                  <TableData>
                {/* <EllipsesIcon
                  svgClick={()=>{
                    // setMdata(item)
                    // setModal(true)
                  }}
                  // itemInfo={() => setModal(true)}
                  style={{ cursor: "pointer", width: "25px", height: "25px" }}
                /> */}
                  <MoreButton
                    list={[
                      {'label':'update Status','click':()=>{
                        setCurrentData(item)
                        setShowModal(true)}}
                    ]}
                  />
              </TableData>

                </TableRow>
              ))
            }
          </TableBody>
      </Table>
    </div>
  )
}

export const ViewAllProspectiveMembersTable = ({data,close})=>{
  const [showModal,setShowModal] = useState(false)
  const [currentData,setCurrentData] =useState(null)
  // const toast = useToast()
  return (
    <div>
      {
        showModal?
        <ViewProspectivememberModal
        form_one={currentData?.form_one?.info}
        form_two={currentData?.form_two}
        setClose={setShowModal}
        id={currentData.id}
        />
        :''
      }
      <ElectionThemeHeader>All Prospective Members</ElectionThemeHeader>
      <Table>
        <TableBody>
          <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Telephone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Addresse</TableHead>
          <TableHead>Pay Status</TableHead>
          <TableHead>Amount Ppaid </TableHead>
          <TableHead>Application Status</TableHead>
          <TableHead>More</TableHead>
          </TableRow>
        </TableBody>

       {
        data?.map((d,index)=>(
          <TableRow key={index}>
            <TableData>{d?.full_name}</TableData>
            <TableData>{d?.telephone_number}</TableData>
            <TableData>{d?.email}</TableData>
            <TableData>{d?.addresse}</TableData>
            <TableData>{d?.has_paid?'Paid Received':'Not Received'}</TableData>
            <TableData>{d?.amount_paid}</TableData>
            <TableData>{d?.application_status}</TableData>
            <TableData><AddNewBtn
            
              onClick={e=>{
                if(d.form_one.info instanceof Array){
                  setCurrentData(d)
                  console.log(d)
                  setShowModal(true)
                }
                else{
                  console.log(d)
                  toast.success("This member has not submitted anything", {
                    progressClassName: "toastProgress",
                    icon: false,
                  });
                }
                
              }}
            >
              view
              </AddNewBtn></TableData>
        </TableRow>
        ))
       }
      </Table>
    </div>
  )

}