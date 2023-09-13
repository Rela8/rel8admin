import { useFieldArray, useForm } from "react-hook-form"
import { EventsHeader } from "../Events/Events.styles"
import InputWithLabel, { SelectWithInput } from "../InputWithLabel"
import { MeetingsContainer } from "../Meetings/Meetings.styles"
import { AddNewBtn } from "../Members/Members.styles"
import CustomModal from "../Modals/CustomModal"
import {useState,useEffect} from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ChaptersButton } from "../Chapters/Chapters.styles"
import { SubConBtn } from "../Button"
import { createServiceRequestApi, deleteServicesRequestApi, getServicesRequestApi } from "../../utils/api-calls"
import { toast } from "react-toastify"
import Table from '../../components/Table'
import Loading from "../Loading/Loading"
import { useNavigate } from "react-router-dom"




const ServiceRequest =()=>{
    const [isOpen,setIsOpen] = useState(false)
    const {isLoading,data} = useQuery('getServicesRequestApi',getServicesRequestApi)
    const queryClient = useQueryClient();
    const route = useNavigate()

    const {mutate,isLoading:deleteing} = useMutation(deleteServicesRequestApi,{
        'onSuccess':()=>{
            queryClient.invalidateQueries('getServicesRequestApi')
        }
    })
    const [currentService,setCurrentService] = useState<ServiceProp|null>(null)
    const prop_columns =[
        {
            Header:'Service Name',
            accessor:'service_name',
        },
        {
            Header:'Intro Text',
            accessor:'intro_text',
        },
        {
            Header:'Amount',
            accessor:'amount',
        },{
            Header:'Edit',
            accessor:'id',
            Cell:(tableProps:any)=>{
                return (
                    <SubConBtn
                    onClick={e=>{
                        e.preventDefault()
                        setCurrentService(tableProps.row.original)
                    }}
                    >
                        Edit
                    </SubConBtn>
                )
            }
        }
        ,{
            Header:'Delete',
            accessor:'id',
            id:2,
            Cell:(tableProps:any)=>{
                return (
                    <SubConBtn
                    onClick={e=>{
                        e.preventDefault()
                        mutate(tableProps.row.original.id)
                    }}
                    >
                        Delete
                    </SubConBtn>
                )
            }
        }
        ,{
            Header:'View Member Submission',
            accessor:'id',
            id:4,
            Cell:(tableProps:any)=>{
                return (
                    <SubConBtn
                    onClick={e=>{
                        e.preventDefault()
                        route(`/service-request/member-submission/${tableProps.row.original.id}`)
                    }}
                    >
                        View
                    </SubConBtn>
                )
            }
        }
    ]

    // console.log(data.results)
    return (
        <MeetingsContainer>
            <Loading  loading={deleteing||isLoading}/>
        <EventsHeader>Service Request</EventsHeader>
        <br />
        <AddNewBtn  style={{'display':'inline-block','marginRight':'auto'}} onClick={()=>setIsOpen(true)}>Create Service</AddNewBtn>




            {isOpen&& <CustomModal
                title={'Create a new Service'}
                close={()=> setIsOpen(false)}
            modalWith="600px"
           >
            <CreateServiceRequestForm />
            </CustomModal>}

            {currentService&& <CustomModal
                title={'Edit Service'}
                close={()=> setCurrentService(null)}
            modalWith="600px"
           >
            <CreateServiceRequestForm 
            service={currentService}
            isEdit={true}
            />
            </CustomModal>}
            <br /><br />

            <Table prop_columns={prop_columns} custom_data={data?.results?data.results:[]}/>
            
           
        </MeetingsContainer>
    )
}
export default ServiceRequest

const grid ={'display':'grid',gap:'10px','gridTemplateColumns':'1fr  1fr','alignItems':'center'}
export type ServiceProp ={
    "id": number,
    "service_name":string,
    "intro_text": string,
    "fields_subbission": {
        "fields": string[]
    },
    "file_subbission": {
        "fields": string[]
    },
    "is_paid":boolean,
    "break_down_of_payment": {
        "payment": {"name": string,"amount":string}[]
    },
    "amount": string
}
type CreateServiceRequestFormProp ={
    isEdit?:boolean,
service?:ServiceProp
}
const CreateServiceRequestForm = ({isEdit,service}:CreateServiceRequestFormProp)=>{
    const { register, handleSubmit ,watch,setValue,control} = useForm(isEdit?{
        defaultValues:{...service}
    }:{});

    const { fields:textfields, append:textAppend, remove:textRemove } = useFieldArray({
        name: "fields_subbission.fields",
        control,
      });

      const { fields:fileFields, append:fileAppend, remove:fileRemove } = useFieldArray({
        name: "file_subbission.fields",
        control,
      });

      const { fields, append, remove } = useFieldArray({
        name: "break_down_of_payment.payment",
        control,
      });

    const queryClient = useQueryClient();
    // createServiceRequestApi
    const { isLoading,mutate} = useMutation(createServiceRequestApi,{
        'onSuccess':()=>{
            toast.success("Created Service Successfully", {
                progressClassName: "toastProgress",
                icon: false,
            },
            
            );
        },
        'onError':()=>{
            toast.error("Something went wrong", {
                progressClassName: "toastProgress",
                icon: false,
            });
        },
        
    })
    const is_paid = watch('is_paid')
    useEffect(()=>{ 

        setValue('amount','0.00')
        setValue('break_down_of_payment',{
            break_down_of_payment:{
                payment:[]
            }})
        
            if(service){
                // setValue('amount',service.amount)
                // setValue('break_down_of_payment',{
                //     break_down_of_payment:{
                //         payment:service.break_down_of_payment.payment
                //     }}) 
                // setValue('service_name',service.service_name)
                // setValue('fields_subbission',{
                //     'fields':service.fields_subbission.fields
                // })
                // setValue('file_subbission',{'fields':service.file_subbission.fields})
                // setValue('is_paid',service.is_paid)
                // setValue('intro_text',service.intro_text)
                // setValue('id',service.id)


                
            }
    },[])
    useEffect(()=>{
        
    },[is_paid])

    const onSubmit = (data:any) => {
        if(isEdit){
            // send edit request
        }else{
            mutate(data)

        }
      };
    return(
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
            <InputWithLabel
            label="Service Name"
            name="service_name"
            required
            register={register}
            />
<InputWithLabel
            label="Intro Text"
            name="intro_text"
            required
            register={register}
            is_textarea
            />

            <SelectWithInput
            label="Do you want this service to be paid"
            name="is_paid"
            required
            register={register}
            options={[
                {'name':'Yes','value':'true'},
                {'name':'No','value':'false'},
            ]}
            />
            {
                watch('is_paid') === 'true'?
                <>
                
                <InputWithLabel
            label="Amount Member Should Pay"
            name="amount"
            required
            register={register}
            // is_textarea
            />
            {fields.map((field,index)=>(
                <div key={index}>
                    <div style={grid}>
<InputWithLabel
            label="Bill Name"
            name={`break_down_of_payment.payment.${index}.name`}
            required
            register={register}
            // is_textarea
            />
            <InputWithLabel
            label="Bill Amount"
            name={`break_down_of_payment.payment.${index}.amount`}
            required
            register={register}
            // is_textarea
            />
            {/* @ts-ignore */}
             <SubConBtn typex={'filled'} onClick={e=>{
                        e.preventDefault()
                        remove(index)
                    }}>
                        Delete
            </SubConBtn>
                    </div>


                </div>
            ))}
                    <SubConBtn onClick={e=>{
                        e.preventDefault()
                        append({'name':"Bill One",'amount':'10.00'})
                    }}>
                        Add More Billing
                    </SubConBtn>
                </>
                
                :''
            }


{textfields.map((field,index)=>(
                <div key={index}>
                    <div style={grid}>
<InputWithLabel
            label="Fields Name"
            name={`fields_subbission.fields.${index}`}
            required
            register={register}
            // is_textarea
            />
            {/* @ts-ignore */}
             <SubConBtn typex={'filled'} onClick={e=>{
                        e.preventDefault()
                        textRemove(index)
                    }}>
                        Delete
            </SubConBtn>
                    </div>


                </div>
            ))}
                    <SubConBtn
                    style={{'display':'inline-block'}}
                    onClick={e=>{
                        e.preventDefault()
                        textAppend('Full Name')
                    }}>
                        Add Text Field Name 
                    </SubConBtn>


                    {fileFields.map((field,index)=>(
                <div key={index}>
                    <div style={grid}>
<InputWithLabel
            label="Fields Name"
            name={`file_subbission.fields.${index}`}
            required
            register={register}
            // is_textarea
            />
            {/* @ts-ignore */}
             <SubConBtn typex={'filled'} onClick={e=>{
                        e.preventDefault()
                        fileRemove(index)
                    }}>
                        Delete
            </SubConBtn>
                    </div>


                </div>
            ))}
                    <SubConBtn style={{'display':'inline-block'}} onClick={e=>{
                        e.preventDefault()
                        fileAppend('Upload Birth Cert')
                    }}>
                        Add File Fields 
                    </SubConBtn>
                    <br />
                    {/* @ts-ignore */}
                    <SubConBtn typex={'filled'}>
                        {
                            isLoading?
                            'Creating...':
                            'Submit'
                        }
                    </SubConBtn>
        </form>
    )
}