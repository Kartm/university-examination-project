import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {Exam} from "../../../models/exam.model";
import {createExam} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";

const CreateScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const examState = useSelector((state: RootState) => state.exam);

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Create an exam"));
  });

  function handleCreateExam() {
    // @ts-ignore
    dispatch(createExam()).then(x => {
      const exam: Exam = x.payload;
      console.log(exam)
      history.push(`/${exam.test_id}/editor`);
    });
  }

  return (
    <Container>
      <Content>
        <Button text="Create from scratch" color="primary" onClick={handleCreateExam} />
      </Content>
    </Container>
  );
};

export default CreateScreen;
