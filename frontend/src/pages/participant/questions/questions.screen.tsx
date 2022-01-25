import React, {useEffect, useMemo, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTimeLeft, updateTitleAction} from "../../../store/slices/ui.slice";
import {RootState} from "../../../store/configure.store";
import {getExamByUuid, updateExamSettings, sendQuestionAnswers} from "../../../store/slices/exam.slice";
import QuestionComponent from "../../../components/exam/question.component";
import {LocalQuestion, Question, LocalQuestionAnswer} from "../../../models/exam.model";
import styled from "styled-components";

interface ParticipateQuestionsParams {
  testParticipateUuid: string;
}

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 64px;

  button {
    max-width: 120px;
  }
`

const ParticipateQuestionsScreen = () => {
  const {testParticipateUuid} = useParams<ParticipateQuestionsParams>();
  const dispatch = useDispatch();
  const examState = useSelector((state: RootState) => state.exam);
  const history = useHistory();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [invalidQuestionIds, setInvalidQuestionIds] = useState<string[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<LocalQuestionAnswer[]>([]);

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid));

    setInterval(() => {
      if(examState.exam.time_end) {
        const endDate = new Date(Date.parse(examState.exam.time_end))
        dispatch(updateTimeLeft(`Pass | ${examState.exam?.name || ''}`, endDate));
      }
    }, 1000);
  }, [])

  useEffect(() => {
    if (examState?.exam?.questions) {
      setInvalidQuestionIds([...examState.exam.questions.map(q => q.question_id)])
    }
  }, [examState?.exam?.questions]);

  useEffect(() => {
    dispatch(updateTitleAction(`Pass | ${examState.exam?.name || ''}`));
  }, [examState.exam]);


  function questionValidChange(question: LocalQuestion, isValid: boolean) {
    if (isValid) {
      setInvalidQuestionIds([...invalidQuestionIds.filter(id => id !== question.question_id)]);
    } else {
      setInvalidQuestionIds([...invalidQuestionIds, question.question_id]);
    }
  }


  function goBack() {
    setSelectedQuestionIndex(Math.max(0, selectedQuestionIndex - 1))
  }

  function goForward() {
    setSelectedQuestionIndex(Math.min(examState?.exam?.questions?.length - 1, selectedQuestionIndex + 1))
  }

  function goSubmit() {
    // if (invalidQuestionIds.length > 0) {
    //   console.log(invalidQuestionIds)
    //   alert("You must answer all questions!");
    //   return;
    // }

    // @ts-ignore
    dispatch(sendQuestionAnswers(questionAnswers, examState.participant.participant_id)).then(x => {
      history.push(`/${testParticipateUuid}/finish`);
    });
  }

  function answerChange(answer: LocalQuestionAnswer) {
    const answerExistsAlready = questionAnswers.findIndex((qa: LocalQuestionAnswer) => qa.question_id === answer.question_id) !== -1;

    let newQuestionAnswers = [...questionAnswers];

    if (answerExistsAlready) {
      newQuestionAnswers = newQuestionAnswers.filter(qa => qa.question_id !== answer.question_id)
    }

    setQuestionAnswers([...newQuestionAnswers, answer]);
  }

  return (
    <Container>
      <Content>
        {examState?.exam?.questions?.map((question, i) =>
          <QuestionComponent
            key={question.question_id}
            visible={selectedQuestionIndex === i}
            localQuestion={question}
            showPoints={examState?.exam?.settings.show_points_per_question}
            onValidChange={(isValid) => questionValidChange(question, isValid)}
            onAnswerChange={answerChange}
          />
        )}


        <ActionsBar>
          <Button
            style={selectedQuestionIndex === 0 ? {visibility: 'hidden'} : {}}
            text="Previous"
            disabled={examState?.exam?.settings.allow_going_back}
            onClick={() => goBack()}
          />

          <Text>{`${selectedQuestionIndex + 1}/${examState?.exam?.questions?.length}`}</Text>

          {selectedQuestionIndex < examState?.exam?.questions?.length - 1 ?
            <Button text="Next" onClick={() => goForward()}/>
            :
            <Button text="Submit" onClick={() => goSubmit()}/>
          }


        </ActionsBar>


      </Content>


    </Container>
  );
};

export default ParticipateQuestionsScreen;
