import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Popup from "../../../components/layout/popup";
import AddQuestion from "../../../components/layout/add.question";
import QuestionComponent from "../../../components/exam/question.component";
import {LocalQuestion, Question, QuestionAnswer} from "../../../models/exam.model";
import {
  getExamByUuid,
  questionToLocalQuestion,
  updateExamParticipants,
  UpdateExamParticipants, updateExamQuestions, UpdateExamQuestions
} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";

interface QuestionsParams {
  testOwnerUuid: string;
}

const QuestionsScreen = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [localQuestions, setLocalQuestions] = useState<LocalQuestion[]>([])


  const {testOwnerUuid} = useParams<QuestionsParams>();
  const dispatch = useDispatch();
  const examState = useSelector((state: RootState) => state.exam);
  const history = useHistory();


  useEffect(() => {
    dispatch(updateTitleAction("Pass | Add questions"));
  });

  useEffect(() => {
    dispatch(getExamByUuid(testOwnerUuid));
  }, [])

  useEffect(() => {
    if(examState.exam != null) {
      setLocalQuestions(examState.exam.questions)
    }
  }, [examState.exam?.questions])

  function handleAnswerChange(localQuestion: LocalQuestion, answer: QuestionAnswer) {
    console.log(localQuestion, answer)
  }

  function onNextButtonClicked() {
    // convert component's state to something backend will understand
    const update: UpdateExamQuestions = {questions: [...localQuestions], testId: testOwnerUuid}

    // @ts-ignore
    dispatch(updateExamQuestions(update)).then(x => {
      history.push(`/${testOwnerUuid}/editor/finish`);
    });
  }

  return (
    <Container>
      <Content>
        <Text h1 style={{marginBottom: 20}}>
          Questions screen
          {/*{testOwnerUuid}*/}
        </Text>

        <Button text="Add Question" onClick={() => (setShowPopup(true))} color="primary"/>

        <div style={{overflowY: "scroll", height: "500px", width: "600px"}}>
          {localQuestions.map((localQuestion, i) =>
            <QuestionComponent
              key={i}
              localQuestion={localQuestion}
              showPoints={true}
              visible={true}
              onValidChange={() => {}}
              onAnswerChange={(answer) => handleAnswerChange(localQuestion, answer)}
            />)
          }
        </div>

        <Popup show={showPopup} setShow={setShowPopup}>
          <>
            <h3>Add Question</h3>
            <div style={{backgroundColor: "#ccc", width: "100%", height: "0.5px", margin: "16px 0"}}/>
            <AddQuestion
              onAddQuestion={(question) => {
                setLocalQuestions([...localQuestions, question]);
                setShowPopup(false)
              }}
              onClose={() => setShowPopup(false)}
              />

          </>
        </Popup>

        <Button text="Next (finish)" color="primary" onClick={() => onNextButtonClicked()}/>
      </Content>
    </Container>
  );
};

export default QuestionsScreen;
