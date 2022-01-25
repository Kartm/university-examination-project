import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {getExamByUuid} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";

interface ParticipateParams {
  testParticipateUuid: string;
}

const ParticipateScreen = () => {
  const [hasStartPassed, setHasStartPassed] = useState(false)
  const [hasEndPassed, setHasEndPassed] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { testParticipateUuid } = useParams<ParticipateParams>();
  const examState = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid));
  }, [])

  useEffect(() => {
    if(examState.exam?.time_start) {
      const d = new Date(Date.parse(examState.exam.time_start.replace('T',' ').replace('-','/')))
      setStartDate(d.toLocaleString('pl-PL'))
    }
    if(examState.exam?.time_end) {
      const ed = new Date(Date.parse(examState.exam.time_end.replace('T',' ').replace('-','/')))
      setEndDate(ed.toLocaleString('pl-PL'))
    }

    if(examState.exam?.time_start && examState.exam?.time_end) {
      setHasStartPassed(Date.now() > Date.parse(examState.exam.time_start.replace('T',' ').replace('-','/')));
      setHasEndPassed(Date.now() > Date.parse(examState.exam.time_end.replace('T',' ').replace('-','/')));
    }
    console.log(examState.exam?.time_end)
    console.log(examState.exam?.time_start)
  }, [examState.exam])

  useEffect(() => {
    dispatch(updateTitleAction(`Pass | ${examState.exam?.name || ''}`));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          {examState.exam?.name || ''}
          <br/>
        </Text>
        <Text h2 style={{ marginBottom: 20 }}>
          Created by: {examState.exam?.owner_name || ''}
          <br/>
        </Text>
        <div style={{color: 'darkgrey'}}>
          <h3> Start Date: {startDate}</h3>
          <h3> End Time: {endDate}</h3>
        </div>
        <br/>
        {hasStartPassed ? <Link
            to={`/${testParticipateUuid}/questions`}
            style={{marginRight: 10}}
        >
          <Button text="START EXAM" color="primary"/>
        </Link>
        :
          hasEndPassed ?
            <div style={{color: 'darkgrey'}}>
              <h2>Looks like the exam is over</h2>
            </div>:<div style={{color: 'darkgrey'}}>
              <h2>Looks like it's not yet time for the exam</h2>
            </div>}
      </Content>
    </Container>
  );
};

export default ParticipateScreen;
