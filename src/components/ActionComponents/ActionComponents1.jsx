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
  text-align: center;
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
      {show && <MembersDashViewMore data={selected} close={deleteFn} />}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Amount Owing</TableHead>
            <TableHead>Action</TableHead>
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
            <TableHead>Action</TableHead>
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
