import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllMembers } from "../../utils/api-calls.js";
import { MemberDashTable } from "../ActionComponents/ActionComponents1";
import DeleteMember from "../DashBoard/DeleteMember";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import {
  MembersContainer,
  MembersPersonList,
  MembersPersons,
  MembersPersonTab,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "./Members.styles";

const Members = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setModal] = useState(false);
  const [options, setOptions] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const displayModal = () => {
    setModal(!showModal);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "all-members",
    getAllMembers,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = data?.filter(
      (item) => item.email.search(searchPattern) >= 0
    );
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {showModal && <DeleteMember close={displayModal} />}
      <MembersContainer>
        <MembersPersonTab typex="dues">
          <MembersPersons
            typex="dues"
            filled={options === "all" ? "show" : ""}
            onClick={() => setOptions("all")}
          >
            All Members
          </MembersPersons>
        </MembersPersonTab>

        <MembersSearch>
          <MembersSearchCompCon>
            <MembersSearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            />
            <MembersSearchBtn onClick={searchHandler}>
              <SearchIcon style={{ width: "15px", height: "15x" }} />
            </MembersSearchBtn>
          </MembersSearchCompCon>
        </MembersSearch>

        <MembersPersonList>
          {searchResult?.length <= 0 ? (
            isLoading || isFetching ? (
              <Loading loading={isLoading || isFetching} />
            ) : !isError ? (
              <MemberDashTable
                show={showModal}
                deleteFn={displayModal}
                data={paginatedData}
              />
            ) : (
              <small>can't fetch members</small>
            )
          ) : isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <MemberDashTable
              show={showModal}
              deleteFn={displayModal}
              data={searchResult}
            />
          ) : (
            <small>can't fetch members</small>
          )}
        </MembersPersonList>

        <Pagination
          totalPosts={data?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </MembersContainer>
    </>
  );
};

export default Members;
