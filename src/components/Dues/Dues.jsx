import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/SideBar/svgs";
import {
  AllDuesTable,
  MemDuesTable,
} from "../ActionComponents/ActionComponents1";
import MemberDetBox from "../DashBoard/MemberDetBox";
import {
  AddNewBtn,
  MembersPersonList,
  MembersPersons,
  MembersPersonTab,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import { DuesContainer, DuesHighlight } from "./Dues.styles";
import AddDue from "../Modals/AddDue";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { dueSummary, getAllDues, getMemberDues } from "../../utils/api-calls.js";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import CustomModal from "../Modals/CustomModal";
import AddDue2 from "../Modals/AddDue2";

const Dues = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [viewMoreDuesInfo, setViewMoreDuesInfo] = useState(false);
  const [addDueModal, setAddDueModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [options, setOptions] = useState("all");

  const displayAddDueModal = () => {
    setAddDueModal(!addDueModal);
  };

  const displayViewMoreDuesInfo = () => {
    setViewMoreDuesInfo(!viewMoreDuesInfo);
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    "dues-summary",
    dueSummary,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  const {
    isLoading: allLoading,
    isFetching: allFetching,
    isError: allIsError,
    data: allData,
  } = useQuery("all-dues", getAllDues, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
    onError: () => {
      toast.error("An error occurred while fetching all dues");
    },
  });

  const {
    isLoading: memLoading,
    isFetching: memFetching,
    isError: memIsError,
    data: memData,
  } = useQuery("member-dues", getMemberDues, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
    onError: () => {
      toast.error("An error occurred while fetching member dues");
    },
  });

  const searchHandler = () => {
    if (options === "all") {
      const searchPattern = new RegExp(searchValue, "i");
      const result = allData?.filter(
        (item) => item.Name.search(searchPattern) >= 0
      );
      return result;
    } else if (options === "mem") {
      const searchPattern = new RegExp(searchValue, "i");
      const result = memData?.filter(
        (item) => item.email.search(searchPattern) >= 0
      );
      return result;
    }
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  const duesSummary = [];

  if (data) {
    data.forEach((item) => {
      for (let [key, value] of Object.entries(item)) {
        let info = { [key]: value };
        duesSummary.push(info);
      }
    });
  }
  return (
    <>
      {/* {addDueModal && <AddDue close={displayAddDueModal} />} */}
      {addDueModal && <CustomModal 
      modalWith={'500px'}
      title={'Payment'}
      close={displayAddDueModal} >
        <AddDue2/>
        </CustomModal>}
      <DuesContainer>
        {isLoading || isFetching ? (
          <Loading loading={isLoading || isFetching} />
        ) : !isError ? (
          <DuesHighlight>
            {duesSummary.map((item, index) => {
              return (
                <MemberDetBox
                  key={index}
                  data={{
                    header: Object.keys(item)[0]
                      .replace(/_/g, " ")
                      .toUpperCase(),
                    subheader: Object.values(item)[0],
                  }}
                />
              );
            })}
          </DuesHighlight>
        ) : (
          <small>can't fetch data</small>
        )}

        <MembersPersonTab typex="dues">
          <MembersPersons
            onClick={() => setOptions("all")}
            typex="dues"
            filled={options === "all" ? "show" : ""}
          >
            All Dues
          </MembersPersons>
          <MembersPersons
            onClick={() => setOptions("mem")}
            filled={options === "mem" ? "show" : ""}
          >
            Members Owning
          </MembersPersons>
        </MembersPersonTab>

        <MembersSearch>
          <MembersSearchCompCon>
            <MembersSearchInput
              placeholder={
                options === "all" ? "Search by name" : "Search by email"
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <MembersSearchBtn onClick={searchHandler}>
              <SearchIcon style={{ width: "15px", height: "15x" }} />
            </MembersSearchBtn>
          </MembersSearchCompCon>

          <AddNewBtn onClick={displayAddDueModal}>Add New</AddNewBtn>
        </MembersSearch>

        <MembersPersonList>
          {options === "all" ? (
            allLoading || allFetching ? (
              <Loading loading={allLoading} />
            ) : !allIsError ? (
              <AllDuesTable
                data={paginatedData}
                show={viewMoreDuesInfo}
                deleteFn={displayViewMoreDuesInfo}
              />
            ) : (
              <p>can't load all dues</p>
            )
          ) : memLoading || memFetching ? (
            <Loading loading={memLoading} />
          ) : !memIsError ? (
            <MemDuesTable
              data={paginatedData}
              show={viewMoreDuesInfo}
              deleteFn={displayViewMoreDuesInfo}
            />
          ) : (
            <p>can't load member dues</p>
          )}
        </MembersPersonList>

        {options === "all" ? (
          <Pagination
            totalPosts={allData?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : (
          <Pagination
            totalPosts={memData?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </DuesContainer>
    </>
  );
};

export default Dues;
