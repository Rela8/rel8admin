import React, { useEffect } from "react";
import { useState } from "react";
import { DuesIcon, PlusCircleIcon } from "../../assets/SideBar/svgs";
import {
  ExcoDashTable,
  MemberDashTable,
} from "../ActionComponents/ActionComponents1";
import {
  DashBoardContainer,
  DashBoardHeaders,
  DashBoardHeadersItem,
  DashBoardLeft,
  DashBoardMemberCon,
  DashBoardPersons,
  DashBoardRight,
  DashBoardRightCon,
  DashBoardRightDue,
  DashBoardRightDueButton,
  DashBoardRightDueHeader,
  DashBoardRightDueSubHeader,
} from "./DashBoard.styles";
import MemberDetBox from "./MemberDetBox";
import AddDue from "../Modals/AddDue";
import { useQuery } from "react-query";
import {
  getAdminDashBoardDetails,
  getAllCouncils,
  getAllMembers,
} from "../../utils/api-calls.js";
import Loading from "../Loading/Loading";

const DashBoard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setModal] = useState(false);
  const [addDueModal, setAddDueModal] = useState(false);
  const [options, setOptions] = useState("exco");

  const displayModal = () => {
    setModal(!showModal);
  };
  const displayAddDueModal = () => {
    setAddDueModal(!addDueModal);
  };

  const {
    isLoading: excoLoading,
    isFetching: excoFetching,
    data: excoData,
    isError: excoIsError,
  } = useQuery("all-excos", getAllCouncils, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  const {
    isLoading: memLoading,
    isFetching: memFetching,
    data: memData,
    isError: memIsError,
  } = useQuery("all-members", getAllMembers, {
    refetchOnWindowFocus: false,
    select: (data) => data.data.reverse(),
  });
  const {
    isLoading: adminDashLoading,
    isFetching: adminDashFetching,
    data: adminDashData,
    isError: adminDashIsError,
  } = useQuery("admin-dashboard-info", getAdminDashBoardDetails, {
    refetchOnWindowFocus: false,
    select: (data) => data.data[0],
  });

  const dashboardSummary = [];

  if (adminDashData) {
    for (let [key, value] of Object.entries(adminDashData)) {
      let info = { [key]: value };
      dashboardSummary.push(info);
    }
  }

  return (
    <>
      {addDueModal && <AddDue close={displayAddDueModal} />}
      <DashBoardContainer>
        <DashBoardLeft>
          <DashBoardMemberCon>
            {adminDashLoading || adminDashFetching ? (
              <Loading loading={adminDashLoading || adminDashFetching} />
            ) : !adminDashIsError ? (
              dashboardSummary.map((item, index) => (
                <MemberDetBox
                  key={index}
                  data={{
                    header: Object.values(item)[0],
                    subheader: Object.keys(item)[0]
                      .replace(/_/g, " ")
                      .toUpperCase(),
                  }}
                />
              ))
            ) : (
              <small>can't fetch summary data</small>
            )}
          </DashBoardMemberCon>

          <DashBoardPersons>
            <DashBoardHeaders>
              <DashBoardHeadersItem
                onClick={() => setOptions("exco")}
                filled={options === "exco" ? "show" : ""}
              >
                Council
              </DashBoardHeadersItem>
              <DashBoardHeadersItem
                onClick={() => setOptions("mem")}
                filled={options === "mem" ? "show" : ""}
              >
                Members
              </DashBoardHeadersItem>
            </DashBoardHeaders>

            {options === "exco" ? (
              excoLoading || excoFetching ? (
                <Loading loading={excoLoading || excoFetching} />
              ) : !excoIsError ? (
                <ExcoDashTable data={excoData} />
              ) : (
                <small>cant fetch excos</small>
              )
            ) : memLoading || memFetching ? (
              <Loading loading={memLoading || memFetching} />
            ) : !memIsError ? (
              <MemberDashTable
                data={memData}
                deleteFn={displayModal}
                show={showModal}
              />
            ) : (
              <small>cant fetch members</small>
            )}
          </DashBoardPersons>
        </DashBoardLeft>

        <DashBoardRight>
          <DashBoardRightCon>
            {adminDashLoading || adminDashFetching ? (
              <Loading loading={adminDashLoading || adminDashFetching} />
            ) : !adminDashIsError ? (
              dashboardSummary
                .filter((item) => Object.keys(item)[0] === "total_income")
                .map((item, index) => {
                  return (
                    <DashBoardRightDue key={index}>
                      <DuesIcon style={{ width: "50px", height: "50px" }} />
                      <DashBoardRightDueHeader>
                        {Object.values(item)[0]}
                      </DashBoardRightDueHeader>
                      <DashBoardRightDueSubHeader>
                        Total Income this month
                      </DashBoardRightDueSubHeader>
                      <DashBoardRightDueButton onClick={displayAddDueModal}>
                        <PlusCircleIcon
                          style={{ height: "25px", width: "25px" }}
                        />
                        Add Payment
                      </DashBoardRightDueButton>
                    </DashBoardRightDue>
                  );
                })
            ) : (
              <small>can't fetch summary data</small>
            )}
          </DashBoardRightCon>
        </DashBoardRight>
      </DashBoardContainer>
    </>
  );
};

export default DashBoard;
