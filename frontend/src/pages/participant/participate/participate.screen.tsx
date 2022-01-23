import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {getExamByUuid, getQuestionTypes} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";

interface ParticipateParams {
  testParticipateUuid: string;
}

const ParticipateScreen = () => {
  const hasStartPassed = true
  const startDate = '21.01.2022'
  const startTime = '15:00'

  const { testParticipateUuid } = useParams<ParticipateParams>();
  const examState = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionTypes());
  }, []);

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid, examState.questionTypes));
  }, [examState.questionTypes])

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
          <h3> Start Time: {startTime}</h3>
        </div>
        <br/>
        {hasStartPassed ? <Link
            to={`/${testParticipateUuid}/questions`}
            style={{marginRight: 10}}
        >
          <Button text="START EXAM" color="primary"/>
        </Link>
        :
        <div style={{color: 'darkgrey'}}>
          <h2>Looks like it's not yet time for the exam</h2>
        </div>}
      </Content>
    </Container>
  );
};

export default ParticipateScreen;
