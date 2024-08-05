import React, { useState } from 'react'
import { getFundAProjects, deleteFundProjectApi } from '../../utils/api-calls'
import { useQuery } from "react-query"
import { SearchIcon } from '../../assets/SideBar/svgs'
import AddFundAProjectForm from '../Modals/AddFundAProject';
import Loading from "../Loading/Loading"
import { FundAProjectTable } from "../ActionComponents/ActionComponents1"
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FundProjectContainer, FundProjectSearch, FundProjectSearchCompCon, FundProjectSearchInput, FundProjectSearchBtn, AddNewBtn} from '../../components/FundAProject/styles/FundAProject.styles'
import { FundProjectHeader, FundProjectList } from '../../components/FundAProject/styles/FundAProjectList.styles'

const FundAProject = () => {
    const [searchValue, setSearchValue] = useState("");
    const [addMeeting, setAddMeeting] = useState(false);
    const [addViewMoreModal, setAddViewMoreModal] = useState(false);
    const   queryClient = useQueryClient();
    

    const displayAddMeeting = () => {
        setAddMeeting(!addMeeting);
      };
      const displayViewMoreModal = (id) => {
        console.log('me')
       mutate(id)
       };

    const { isLoading, isError, isFetching, data } = useQuery("all-fundprojects", getFundAProjects,{
          refetchOnWindowFocus: false,
        },);

        const { isLoading: createLoading, mutate } = useMutation(deleteFundProjectApi, {
            onMutate: () => {
              toast.info("Project Delete in progress", {
                progressClassName: "toastProgress",
                icon: false,
              });
            },
            onSuccess: () => {
              toast.success("Deleted", {
                progressClassName: "toastProgress",
                icon: false,
              });
              queryClient.invalidateQueries("all-fundprojects");
            },
            onError: (error) => {
              toast.error("Could not create meeting");
              if (error?.message?.response?.data?.message?.error) {
                toast.error(`Message: ${error.message.response.data.message.error}`, {
                  autoClose: 9000,
                });
              }
            },
          });

  return (
    <div>
        {addMeeting && <AddFundAProjectForm close={displayAddMeeting} />}
        <FundProjectContainer>
        <FundProjectHeader>Fund A Project</FundProjectHeader>
        <FundProjectSearch>
            <FundProjectSearchCompCon>
                <FundProjectSearchInput
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                    />
                <FundProjectSearchBtn>
                <SearchIcon style={{ width: "15px", height: "15x" }} />
                </FundProjectSearchBtn>
            </FundProjectSearchCompCon>
            <AddNewBtn onClick={displayAddMeeting}>Add New Project</AddNewBtn>
        </FundProjectSearch>
        <FundProjectList>
        {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <FundAProjectTable
            deleteFn={displayViewMoreModal}
              data={data.results}
              show={addViewMoreModal}
            />
          ) : (
            <small>can't fetch committees</small>
          )}
        </FundProjectList>
        </FundProjectContainer>
    </div>
  )
}

export default FundAProject