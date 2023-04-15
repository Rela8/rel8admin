import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteGallery, getSingleGallery, updateGalleryImageApi, updateGalleryTitleApi } from '../../utils/api-calls'
import styled from 'styled-components'
import { rel8Pink, rel8Purple, rel8White } from '../../globals'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { mobile, tablet } from '../../responsive'
const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SubCon = styled.div`
    background-color: ${rel8White};
    width: 80%;
    border-radius: 10px;
    height: 500px;
    overflow-y: auto;
    padding: 20px;
`
const SubConHeader = styled.p`
    font-weight: 700;
    text-align: center;
`
const SubConHeader2 = styled.p`
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`
const SubConBtnHold = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 30px 0px;
`
const SubConBtn = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: ${props=>props.typex==="filled" ? `${rel8Purple}`:`${rel8Pink}`};
    color: ${props=>props.typex==="filled" ? `${rel8White}`:`${rel8Purple}`};
    cursor: pointer;
`
const ImageCon = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;

  ${
    mobile({
      gridTemplateColumns: "auto",
    })
  }

  ${
    tablet({
      gridTemplateColumns: "auto auto"
    })
  }
`
const Image = styled.img`
  height: 200px;
  object-fit: contain;
`

const SingleGallery = ({id, close}) => {
  const queryClient = useQueryClient()
  const [name,setName] = useState('')
  const { isLoading, isFetching, isError, data } = useQuery(`gallery-${id}`, ()=>getSingleGallery(Number(id)), {
    refetchOnWindowFocus: false,
    select: data => data.data,
    'onSuccess':(data)=>{
      setName(data.name)
    }
  },)
  const  {isLoading:changingName,mutate:changeName} = useMutation(updateGalleryTitleApi,{
    'onSuccess':(data)=>{
      toast.info('name changed succesfully',{progressClassName:"toastProgress",icon:false})
      queryClient.invalidateQueries(`gallery-${id}`)  
    }
  })
  const {isLoading:updatingImage,mutate:updateImage} = useMutation(updateGalleryImageApi,{
    'onSuccess':()=>{
      toast.info('Uploaded Succesfully',{progressClassName:"toastProgress",icon:false})
      queryClient.invalidateQueries(`gallery-${id}`)  
    }
  })
  const { isLoading:deleteLoading, mutate } = useMutation((id)=>deleteGallery(id), {
    onMutate: () => {
      toast.info("Gallery Deletion in progress",{progressClassName:"toastProgress",icon:false})
    },
    onSuccess: () => {
        toast.success("Gallery Deleted",{progressClassName:"toastProgress",icon:false})
        queryClient.invalidateQueries("all-galleries")
        close()
    },
    onError: (error) => {
        toast.error("Could not delete gallery")
        if(error?.message?.response?.data?.message){
            toast.error(`Message: ${error.message.response.data.message}`, {autoClose: 9000})
        }
    }
  })

  const deleteGalleryHandler = (id) => {
    mutate(id)
  }

  return (
    <BackDrop>
      <style>
          {`
              body{
                  overflow:hidden;
              }
          `}
      </style>
      <Loading loading={updatingImage ||changingName} />
      { (isLoading||isFetching) ? <Loading loading={isLoading || isFetching}/> : (!isError) ? 
      <SubCon>
          <SubConHeader>Title:{' '}<input 
          onChange={e=>setName(e.target.value)}
          value={name}
          type='text'/></SubConHeader>
          <SubConBtnHold>
              <SubConBtn typex="filled" disabled={deleteLoading} onClick={()=>deleteGalleryHandler(data.id)}>Delete Gallery</SubConBtn>
              <SubConBtn typex="filled" disabled={deleteLoading} onClick={()=>{
                if(window.confirm('Do you want to update name')){
                  changeName({'id':data.id,'name':name})
                }
              }}>Update title Gallery</SubConBtn>
              <SubConBtn onClick={close} disabled={deleteLoading}>Close</SubConBtn>
          </SubConBtnHold>
            <ImageCon>
              {
                data.images.map((item,index) => (
                  <div key={index} >
                    <label htmlFor={data.id+'image'} 
                     style={{'margin':'0 auto','display':'inline-block',
                     'color':'purple',
                     'textAlign':'center','border':'1px solid purple','padding':'.7rem','borderRadius':'10px'}}>
                      update image
                    </label>
                    <input type="file" 
                    onChange={e=>{
                      if(window.confirm('Are sure you want to update')){
                        updateImage({
                          'id':item.id,
                          'image':e.target.files[0]
                        })
                      }
                    }}
                    name={data.id+'image'}
                    id={data.id+'image'}
                    style={{'display':'none'}}
                     />
                      <Image alt='' src={item.image} />
                  </div>
                ))
              }
            </ImageCon>

      </SubCon>
      : <small>Can't Fetch Details</small> }
  </BackDrop>
  )
}

export default SingleGallery