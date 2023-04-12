import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createGallery } from "../../utils/api-calls";
import { BackDrop, SubCon } from "./AddMeeting";






const ViewProspectivememberModal  = ({ form_one,form_two, close })=>{

    return (
        <BackDrop>
   <SubCon>
        <p style={{
              'fontWeight': '700',
              'textAlign': 'center'
        }}>Add Gallery</p>
      </SubCon>
        <h3>Form One</h3>
        <div style={{'display':'flex','flexWrap':'wrap'}}>
            {
                form_one.map((d,index)=>(
                    <div key={index}>
                        <p><strong>{d?.name}</strong>: {d?.value}</p>
                    </div>
                ))
            }
        </div>
        <br />
        <div></div>
        </BackDrop>
    )
}

export default ViewProspectivememberModal