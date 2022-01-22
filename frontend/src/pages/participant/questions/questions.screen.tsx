import React, {useEffect, useMemo, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {RootState} from "../../../store/configure.store";
import {getExamByUuid, getQuestionTypes, questionToLocalQuestion} from "../../../store/slices/exam.slice";
import QuestionComponent from "../../../components/exam/question.component";
import {Question, QuestionAnswer} from "../../../models/exam.model";
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
  const questionTypes = useSelector((state: RootState) => state.exam.questionTypes);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [invalidQuestionIds, setInvalidQuestionIds] = useState<string[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    dispatch(getExamByUuid(testParticipateUuid));
    dispatch(getQuestionTypes());
  }, []);

  useEffect(() => {
    if (examState?.exam?.questions) {
      setInvalidQuestionIds([...examState.exam.questions.map(q => q.id)])
    }
  }, [examState?.exam?.questions]);

  useEffect(() => {
    dispatch(updateTitleAction(`Pass | ${examState.exam?.name || ''}`));
  });


  function questionValidChange(question: Question, isValid: boolean) {
    if (isValid) {
      setInvalidQuestionIds([...invalidQuestionIds.filter(id => id !== question.id)]);
    } else {
      setInvalidQuestionIds([...invalidQuestionIds, question.id]);
    }
  }


  function goBack() {
    setSelectedQuestionIndex(Math.max(0, selectedQuestionIndex - 1))
  }

  function goForward() {
    setSelectedQuestionIndex(Math.min(examState?.exam?.questions?.length - 1, selectedQuestionIndex + 1))
  }

  function goSubmit() {
    if (invalidQuestionIds.length > 0) {
      console.log(invalidQuestionIds)
      alert("You must answer all questions!");
      return;
    }

    console.log(questionAnswers)

    history.push(`/${testParticipateUuid}/finish`);
  }

  function answerChange(answer: QuestionAnswer) {
    const answerExistsAlready = questionAnswers.findIndex((qa: QuestionAnswer) => qa.question_id === answer.question_id) !== -1;

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
            key={question.id}
            visible={selectedQuestionIndex === i}
            localQuestion={questionToLocalQuestion(question, questionTypes)}
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
