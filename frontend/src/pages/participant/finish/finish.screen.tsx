import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {RootState} from "../../../store/configure.store";
import {getExamByUuid} from "../../../store/slices/exam.slice";

interface ParticipateFinishParams {
  testParticipateUuid: string;
}

const ParticipateFinishScreen = () => {
  const participantPoints = '50'
  const maxPoints = '100'

  const { testParticipateUuid } = useParams<ParticipateFinishParams>();
  const dispatch = useDispatch();
  const examState = useSelector((state: RootState) => state.exam);

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid));
  }, []);

  useEffect(() => {
    dispatch(updateTitleAction(`Pass | ${examState.exam?.title || ''} - finish attempt`));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20, overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'center'}}>
          <div>You finished your exam</div>
          <div>Congratulations!</div>
          <br/>
        </Text>
        <h3>Your points: {participantPoints}/{maxPoints}</h3>
      </Content>
    </Container>
  );
};

export default ParticipateFinishScreen;
