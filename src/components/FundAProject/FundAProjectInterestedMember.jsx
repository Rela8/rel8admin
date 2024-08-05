import React from 'react';
import { useParams } from "react-router-dom";
import { CommitteeContainer, CommitteeHeader } from '../Committee/Committee.styles';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const FundAProjectInterestedMember = () => {
    const { id } = useParams();
    return (
        <div>
            <CommitteeContainer>
                <CommitteeHeader>Interested Member For Project</CommitteeHeader>
                <br />
                <Tabs>
                    <TabList>
                        <Tab>Supporters in kind</Tab>
                        <Tab>Supporters in Cash</Tab>
                    </TabList>
                    <TabPanel>
                        <div>
                            {/* Content for Supporters in kind */}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {/* Content for Supporters in Cash */}
                        </div>
                    </TabPanel>
                </Tabs>
            </CommitteeContainer>
        </div>
    );
};

export default FundAProjectInterestedMember;
