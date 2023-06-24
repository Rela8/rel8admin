
import React from "react"
import { MeetingsContainer } from "../Meetings/Meetings.styles"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChangeOfName from "./ChangeOfName/ChangeOfName";
import LossOFCert from "./LossOfCert";
import DeactivationOfMembership from "./DeactivationOfMembership";
import ProductManufacturingUpdate, { FactoryLocationTableUpdate } from "./ProductManufacturingUpdate";
import ActivationOfDeactivatedMember from "./ActivationOfDeactivatedMember";
import MergerOfCompanies from "./MergerOfCompanies";

const ServiceRequest= ()=>{


    return (
        <MeetingsContainer>

            <Tabs >
                <TabList style={{'display':'flex','alignItems':'center','listStyle':'none','gap':'10px',}}>
                    <Tab style={{'cursor':'pointer'}}>Change of Name</Tab>
                    <Tab style={{'cursor':'pointer'}}>Loss Of Certificate</Tab>
                    <Tab style={{'cursor':'pointer'}}>
                    Deactivation Or Suspension Of Membership
                    </Tab>
                    <Tab style={{'cursor':'pointer'}}>Product Manufacturing Update</Tab>
                    <Tab style={{'cursor':'pointer'}}>Factory Location</Tab>
                    <Tab style={{'cursor':'pointer'}}>Merger Of Members Companies</Tab>
                </TabList>

                <TabPanel>
                    <ChangeOfName />
                </TabPanel>
                <TabPanel>
                    <LossOFCert/>
                </TabPanel>
                <TabPanel>
                    <DeactivationOfMembership/>
                </TabPanel>

                <TabPanel>
                    <ProductManufacturingUpdate/>
                </TabPanel>
                <TabPanel>
                    <FactoryLocationTableUpdate />
                    {/* <ActivationOfDeactivatedMember/> */}
                </TabPanel>

                <TabPanel>
                    <MergerOfCompanies />
                </TabPanel>
            </Tabs>
        </MeetingsContainer>
    )
}

export default ServiceRequest