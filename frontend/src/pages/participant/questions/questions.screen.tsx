import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {RootState} from "../../../store/configure.store";
import {getExamByUuid} from "../../../store/slices/exam.slice";

interface ParticipateQuestionsParams {
  testParticipateUuid: string;
}

const ParticipateQuestionsScreen = () => {
  const {testParticipateUuid} = useParams<ParticipateQuestionsParams>();
  const dispatch = useDispatch();
  const examState = useSelector((state: RootState) => state.exam);

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid));
  }, []);

  useEffect(() => {
    dispatch(updateTitleAction(`Pass | ${examState.exam?.title || ''}`));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{marginBottom: 20}}>
          Questions screen
          <br/>
          [TODO]
        </Text>

        {examState.exam ? examState.exam.questions.map(question => (
          <Text h2 key={question.question_uuid}>{question.name}</Text>)) : null}

        <Link to={`/${testParticipateUuid}/finish`} style={{marginRight: 10}}>
          <Button text="Next (finish)" color="primary"/>
        </Link>
      </Content>
    </Container>
  );
};

export default ParticipateQuestionsScreen;
