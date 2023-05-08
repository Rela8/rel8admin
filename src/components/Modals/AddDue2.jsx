
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FormLabel,FormDataComp, SubConBtn, FormSelection, FormOption } from './AddMeeting';
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient  } from 'react-query';
import { createExcoDueApi, createGeneralDueApi, createMembershipGradeDueApi, getListOfExcos, get_membershipgrades } from '../../utils/api-calls.js';
import { toast, useToast } from "react-toastify";
import Loading from '../Loading/Loading';


const CreateGeneralDue = ()  => {
  const queryClient = useQueryClient();

    const { register, watch, handleSubmit } = useForm({});
    const {mutate,isLoading,} = useMutation(createGeneralDueApi,{
        'onSuccess':(data)=>{
            // 
            queryClient.invalidateQueries('all-dues')
            toast.success("Created Successfully", {
                progressClassName: "toastProgress",
                icon: false,
            });
            
        },
        'onError':(error)=>{
            toast.error("Please check your input something went wrong", {
                progressClassName: "toastProgress",
                icon: false,
            });
        }
    })

      const onSubmit = (duesData) => {
        console.log({duesData})
        mutate(duesData)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Loading loading={isLoading} />
               <FormLabel>
              Name:
              <FormDataComp
                type={"text"}
                {...register("name", { required: true })}
              />
            </FormLabel>
              <br />

              <FormLabel>
              Amount:
              <FormDataComp
                min={0}
                type={"number"}
                {...register("amount", {
                required: true,
                min: {
                    value: 0,
                    message: "invalid amount",
                },
                })}
              />
              <br />

            </FormLabel>
              <br />

              <FormLabel>
              Start Date:
              <FormDataComp
                type={"date"}
                {...register("startDate", { required: true })}
              />
            </FormLabel>
            <br />

            <FormLabel>
              Start Time:
              <FormDataComp
                type={"time"}
                {...register("startTime", { required: true })}
              />
            </FormLabel>
            <br />

            <FormLabel>
            End Date:
              <FormDataComp
                type={"date"}
                {...register("endDate", { required: true })}
              />
            </FormLabel>
            <br />

            <FormLabel>
            End Time:
              <FormDataComp
                type={"time"}
                {...register("endTime", { required: true })}
              />
            </FormLabel>
<br /><br />
                <SubConBtn
                type={"submit"}
                value="Create Genral Due"
                typex="filled"
              />
        </form>

    )
}


const CreateExcoDue = ()  => {
    const queryClient = useQueryClient();
    const {data:excoData,isLoading,} = useQuery('exco-list',getListOfExcos, {
        refetchOnWindowFocus: false,
        select: (data) =>
          data.data.map((item) => ({ id: item.id, name: item.name })),
      })
  
      const { register, watch, handleSubmit } = useForm({});
      const {mutate,isLoading:creating,} = useMutation(createExcoDueApi,{
          'onSuccess':(data)=>{
              // 
              queryClient.invalidateQueries('all-dues')
              toast.success("Created Successfully", {
                  progressClassName: "toastProgress",
                  icon: false,
              });
              
          },
          'onError':(error)=>{
              toast.error("Please check your input something went wrong", {
                  progressClassName: "toastProgress",
                  icon: false,
              });
          }
      })
  
        const onSubmit = (duesData) => {
          mutate(duesData)
      };
      return (
          <form onSubmit={handleSubmit(onSubmit)}>
              <Loading loading={isLoading} />
                 <FormLabel>
                Name:
                <FormDataComp
                  type={"text"}
                  {...register("name", { required: true })}
                />
              </FormLabel>
                <br />
  
                <FormLabel>
                Amount:
                <FormDataComp
                  min={0}
                  type={"number"}
                  {...register("amount", {
                  required: true,
                  min: {
                      value: 0,
                      message: "invalid amount",
                  },
                  })}
                />
                <br />
  
              </FormLabel>
                <br />
  
                <FormLabel>
                Start Date:
                <FormDataComp
                  type={"date"}
                  {...register("startDate", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
                Start Time:
                <FormDataComp
                  type={"time"}
                  {...register("startTime", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
              End Date:
                <FormDataComp
                  type={"date"}
                  {...register("endDate", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
              End Time:
                <FormDataComp
                  type={"time"}
                  {...register("endTime", { required: true })}
                />
              </FormLabel>

                  <br />
              <FormLabel>
              Sector and Sub Sector:
              <FormSelection
                defaultValue={""}
                {...register("exco_id", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value="">
                  Unselect
                </FormOption>
                {excoData?.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} || {item.name}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

  <br /><br />
                  <SubConBtn
                  type={"submit"}
                  value="Create  Due"
                  typex="filled"
                />
          </form>
  
      )
  }
  
  
  const CreateMemberShipGradeDue = ()  => {
    const queryClient = useQueryClient();
    const {data:grades,isLoading,} = useQuery('membershipgrades',get_membershipgrades, {
        refetchOnWindowFocus: false,
      })
  
      const { register, watch, handleSubmit } = useForm({});
      const {mutate,isLoading:creating,} = useMutation(createMembershipGradeDueApi,{
          'onSuccess':(data)=>{
              // 
              queryClient.invalidateQueries('all-dues')
              toast.success("Created Successfully", {
                  progressClassName: "toastProgress",
                  icon: false,
              });
              
          },
          'onError':(error)=>{
              toast.error("Please check your input something went wrong", {
                  progressClassName: "toastProgress",
                  icon: false,
              });
          }
      })
  
        const onSubmit = (duesData) => {
          mutate(duesData)
      };
      console.log({grades})
      return (
          <form onSubmit={handleSubmit(onSubmit)}>
              <Loading loading={isLoading} />
                 <FormLabel>
                Name:
                <FormDataComp
                  type={"text"}
                  {...register("name", { required: true })}
                />
              </FormLabel>
                <br />
  
                <FormLabel>
                Amount:
                <FormDataComp
                  min={0}
                  type={"number"}
                  {...register("amount", {
                  required: true,
                  min: {
                      value: 0,
                      message: "invalid amount",
                  },
                  })}
                />
                <br />
  
              </FormLabel>
                <br />
  
                <FormLabel>
                Start Date:
                <FormDataComp
                  type={"date"}
                  {...register("startDate", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
                Start Time:
                <FormDataComp
                  type={"time"}
                  {...register("startTime", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
              End Date:
                <FormDataComp
                  type={"date"}
                  {...register("endDate", { required: true })}
                />
              </FormLabel>
              <br />
  
              <FormLabel>
              End Time:
                <FormDataComp
                  type={"time"}
                  {...register("endTime", { required: true })}
                />
              </FormLabel>

                  <br />
              <FormLabel>
              Turn overs:
              <FormSelection
                defaultValue={""}
                {...register("membership_due_id", { required: false })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                <FormOption value="">
                  Unselect
                </FormOption>
                {grades?.map((item) => (
                  <FormOption key={item.id} value={item.id}>
                    {item.id} || {item.name}
                  </FormOption>
                ))}
              </FormSelection>
            </FormLabel>

  <br /><br />
                  <SubConBtn
                  type={"submit"}
                  value="Create Turn over  Due"
                  typex="filled"
                />
          </form>
  
      )
  }
  

const AddDue2 = ()=>{

    return (
        <div >
            <Tabs>
        <TabList>
          <Tab>General Dues</Tab>
          {/* <Tab>Exco Due</Tab> */}
          <Tab>Turn over Due</Tab>
        </TabList>
    
        {/* <TabPanel>
            <CreateGeneralDue/>
        </TabPanel> */}
        <TabPanel>
            <CreateExcoDue/>
        </TabPanel>

        <TabPanel>
            <CreateMemberShipGradeDue/>
        </TabPanel>
      </Tabs>
        </div>
    )
}

export default AddDue2