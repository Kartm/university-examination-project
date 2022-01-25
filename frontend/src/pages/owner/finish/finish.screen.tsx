import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Button from "../../../components/forms/button.component";
import {RootState} from "../../../store/configure.store";
import {publishExam} from "../../../store/slices/exam.slice";

interface FinishParams {
  testOwnerUuid: string;
}

const FinishScreen = () => {
  const { testOwnerUuid } = useParams<FinishParams>();
  const examState = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Finish test creation"));
  });

  function onPublish() {
    dispatch(publishExam(testOwnerUuid))
  }

  return (
    <Container>
      <Content>
        <Text style={{ marginBottom: 20 }}>
          <b>You</b> will now receive an email with a link to examination results.
        </Text>
        <Text style={{ marginBottom: 20 }}>
          <b>Every student</b> will now receive an emails with a link to the examination.
        </Text>
        <Button onClick={() => onPublish()} text="Publish"/>
      </Content>
    </Container>
  );
};

export default FinishScreen;
