import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Dropdown from "../../../components/forms/dropdown";

interface SettingsParams {
  testOwnerUuid: string;
}

const SettingsScreen = () => {
  const [testName, setTestName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const {testOwnerUuid} = useParams<SettingsParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Exam settings"));
  });

  return (
      <Container>
        <Content>
          <Text h1 style={{marginBottom: 20}}>
            Test Setup
            {/*Settings screen*/}
            {/*{testOwnerUuid}*/}
          </Text>
          <form>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{color: 'white'}}>
                <div>
                  Email
                </div>

                <div>
                  Title
                </div>

                <div>
                  Name
                </div>

                <div>
                  Date
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <input type='text'
                       placeholder='Enter your email'
                       value={ownerEmail}
                       onChange={(e) => setOwnerEmail(e.target.value)}/>

                <input type='text'
                       placeholder='Enter the exam title'
                       value={testName}
                       onChange={(e) => setTestName(e.target.value)}/>

                <input type='text'
                       placeholder='Write your name'
                       value={ownerName}
                       onChange={(e) => setOwnerName(e.target.value)}/>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <input type='text'
                         onFocus={
                           (e)=> {
                             e.currentTarget.type = "date";
                             e.currentTarget.focus();
                           }
                         }
                         placeholder='Start Date'
                         value={startDate}
                         onChange={(e) => setStartDate(e.target.value)}/>
                  <input type='text'
                         onFocus={
                           (e)=> {
                             e.currentTarget.type = "date";
                             e.currentTarget.focus();
                           }
                         }
                         placeholder='End Date'
                         value={endDate}
                         onChange={(e) => setEndDate(e.target.value)}/>
                </div>
              </div>
            </div>
            <Dropdown options={["1","2","3"]}>

            </Dropdown>

          </form>
          <Link to={`/${testOwnerUuid}/editor/participants`} style={{marginRight: 10}}>
            <Button text="Next (add participants)" color="primary"/>
          </Link>
        </Content>
      </Container>
  );
};

export default SettingsScreen;
