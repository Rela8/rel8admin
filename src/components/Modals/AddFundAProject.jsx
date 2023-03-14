import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createFundProjectApi } from "../../utils/api-calls";
import { toast } from "react-toastify";
import { BackDrop, FormDataComp, FormLabel, SubCon,Form,SubConHeader, SubConBtn, SubConBtnHold } from "./AddMeeting";
// import { Form } from "react-router-dom";
import { DeleteButton } from "./AddNews";



const AddFundAProjectForm = ({ close })=>{
    const { register, handleSubmit ,control} = useForm(),
    queryClient = useQueryClient();


    const { isLoading: createLoading, mutate } = useMutation(createFundProjectApi,{
        onMutate: () => {
            toast.info("Project Creation in progress", {
              progressClassName: "toastProgress",
              icon: false,
            });
          },
          onSuccess: () => {
            toast.success("Project Created", {
              progressClassName: "toastProgress",
              icon: false,
            });
            queryClient.invalidateQueries("all-fundprojects");
            close();
          },
          onError: (error) => {
            toast.error("Could not create project");
            if (error?.message?.response?.data?.message?.error) {
              toast.error(`Message: ${error.message.response.data.message.error}`, {
                autoClose: 9000,
              });
            }
          },
    })
    const { fields, append, remove } = useFieldArray({
        name: "what_project_needs",
        control,
      });
    
    const onSubmit = (data) => {
      const submitData = {...data,'what_project_needs':data.what_project_needs.map(value=>value.need)}
        console.log({'subbmiteed':submitData})
        const form  = new FormData()
        form.append('heading',submitData.heading)
        form.append('about',submitData.about)
        form.append('image',submitData.image[0])
        form.append('what_project_needs',JSON.stringify(submitData.what_project_needs))

        mutate(form);
      };
    return (
        <BackDrop>

            <SubCon>
                <SubConHeader>Add Project</SubConHeader>

                <Form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>
                Name:
                <FormDataComp
                    type={"text"}
                    {...register("heading", { required: true })}
                />
                </FormLabel>

                <FormLabel>
                image:
                <FormDataComp
                    type={"file"}
                    {...register("image", { required: true })}
                />
                </FormLabel>

                <FormLabel>
                About:
                <FormDataComp
                    type={"text"}
                    {...register("about", { required: true })}
                />
                </FormLabel>

                {
                    fields.map((field,index)=>(
                        <section key={field.id}>
                        <FormLabel>
                        Need:
                        <FormDataComp
                        type={"text"}
                        {...register(`what_project_needs.${index}.need`)}
                        />
                    </FormLabel>

                    <DeleteButton
                        typex="filled"
                        type="button"
                        onClick={() => remove(index)}
                    >
                        Delete
                    </DeleteButton>
                        </section>
                    ))
                }
                    <DeleteButton
                type="button"
                mt="filledup"
                onClick={() =>
                    append({
                        'need':'block and cement'
                    })
                }
                >
                Add New Project Need Section
                </DeleteButton>

                <SubConBtnHold>
              <SubConBtn
                type={"submit"}
                value="Add"
                disabled={createLoading}
                typex="filled"
              />
              <SubConBtn
                type={"submit"}
                value="Cancel"
                disabled={createLoading}
                onClick={close}
              />
            </SubConBtnHold>
                </Form>

            </SubCon>
        </BackDrop>
    )
}

export default AddFundAProjectForm