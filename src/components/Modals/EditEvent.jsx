import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { updateEvent } from '../../utils/api-calls';
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const SubCon = styled.div`
  background-color: ${rel8White};
  width: 350px;
  max-height: 80%;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;

  ${mobile({
    width: "250px",
  })}
`;

const SubConHeader = styled.p`
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 10px 0px;
`;

const FormDataComp = styled.input`
  padding: 5px 0px;
  background-color: transparent;
  border: none;
  border: 1px solid ${rel8Purple};
  border-radius: 5px;
  padding: 5px;
  color: ${rel8Purple};
  outline: none;
  &::placeholder {
    color: ${rel8Purple};
  }
`;

const FormSelection = styled.select`
  padding: 5px 0px;
  color: ${rel8Purple};
  outline: none;
  border: none;
  border-bottom: 1px solid ${rel8Purple};
  margin: 10px 0px;
  overflow: auto;
`;

const FormOption = styled.option``;

const SubConBtnHold = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const SubConBtn = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.typex === "filled" ? `${rel8Purple}` : `${rel8Pink}`};
  color: ${(props) =>
    props.typex === "filled" ? `${rel8White}` : `${rel8Purple}`};
  cursor: pointer;
`;

const EditEventModal = ({ show, onClose, data, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    is_paid_event: false,
    amount: '',
    startDate: '',
    startTime: '',
    organiser_name: '',
    address: '',
    event_access: { link: '', has_paid: false },
    // Add other fields as neededs
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        is_paid_event: data.is_paid_event,
        amount: data.amount,
        startDate: data.startDate,
        startTime: data.startTime,
        organiser_name: data.organiser_name,
        address: data.event_access.link,
        event_access: {
          link: data.event_access.link,
          has_paid: data.event_access.has_paid
        },
        // Add other fields as needed
      });
    }
  }, [data]);

  const { isLoading, mutate: updateEventMutation } = useMutation(
    (eventData) => updateEvent(eventData.id, eventData),
    {
      onMutate: () => {
        toast.info("Event Update in progress", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
      onSuccess: (response) => {
        toast.success("Event Updated Successfully", {
          progressClassName: "toastProgress",
          icon: false,
        });
        onSubmit(response);
        onClose();
      },
      onError: (error) => {
        toast.error(`Can't update event: ${error.message}`);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData({
        ...formData,
        address: value,
        event_access: {
          ...formData.event_access,
          link: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNestedCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      event_access: {
        ...formData.event_access,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data && data.id) {
      updateEventMutation({ ...formData, id: data.id });
    } else {
      console.error('Event data or ID is missing');
    }
  };

  if (!show) return null;

  return (
    <BackDrop>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <SubCon>
        <SubConHeader>Edit Event</SubConHeader>
        <Form onSubmit={handleSubmit}>
          <FormLabel>
            Name:
            <FormDataComp type="text" name="name" value={formData.name} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Is Paid Event:
            <FormSelection name="is_paid_event" value={formData.is_paid_event} onChange={handleChange}>
              <FormOption value={true}>Yes</FormOption>
              <FormOption value={false}>No</FormOption>
            </FormSelection>
          </FormLabel>
          <FormLabel>
            Amount:
            <FormDataComp type="number" name="amount" value={formData.amount} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Start Date:
            <FormDataComp type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Start Time:
            <FormDataComp type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Organiser Name:
            <FormDataComp type="text" name="organiser_name" value={formData.organiser_name} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Event Access Link:
            <FormDataComp type="text" name="address" value={formData.address} onChange={handleChange} />
          </FormLabel>
          <FormLabel>
            Has Paid:
            <FormSelection name="has_paid" value={formData.event_access.has_paid} onChange={handleNestedCheckboxChange}>
              <FormOption value={true}>Yes</FormOption>
              <FormOption value={false}>No</FormOption>
            </FormSelection>
          </FormLabel>
          <SubConBtnHold>
            <SubConBtn type="submit" value="Save" typex="filled" disabled={isLoading} />
            <SubConBtn type="button" value="Cancel" onClick={onClose} />
          </SubConBtnHold>
        </Form>
      </SubCon>
    </BackDrop>
  );
};

export default EditEventModal;
