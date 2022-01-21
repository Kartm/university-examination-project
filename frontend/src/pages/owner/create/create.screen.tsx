import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {Exam, ExamDraft} from "../../../models/exam.model";
import {createExam, getExamTemplates, useExamTemplate} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";

const CreateScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const examState = useSelector((state: RootState) => state.exam);

  useEffect(() => {
    dispatch(getExamTemplates())
  }, [])

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Create an exam"));
  });

  function handleSelectTemplate(name: string) {
    const template = examState.examTemplates.find(t => t.name === name)!
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dispatch(useExamTemplate(template)).then(x => {
      const exam: Exam = x.payload;
      history.push(`/${exam.id}/editor`);
    })
  }

  function handleCreateExam() {
    // @ts-ignore
    dispatch(createExam()).then(x => {
      const exam: Exam = x.payload;
      console.log(exam)
      history.push(`/${exam.id}/editor`);
    });
  }

  return (
    <Container>
      <Content>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <select onChange={(e) => handleSelectTemplate(e.target.value)}>
            <option disabled selected>Select a template</option>
            {examState.examTemplates.map((value, i) =>
              <option key={i} value={value.name}>{value.name} - {value.questions.length} questions</option>)
            }
          </select>
        </div>

        <Text style={{ marginTop: 20, marginBottom: 20 }}>
          or
        </Text>

        <Button text="Create from scratch" color="primary" onClick={handleCreateExam} />
      </Content>
    </Container>
  );
};

export default CreateScreen;
