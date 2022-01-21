import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Popup from "../../../components/layout/popup";
import AddQuestion from "../../../components/layout/add.question";
import QuestionComponent from "../../../components/exam/question.component";
import {Question, QuestionAnswer} from "../../../models/exam.model";

interface QuestionsParams {
  testOwnerUuid: string;
}

const QuestionsScreen = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Question[]>([])


  const { testOwnerUuid } = useParams<QuestionsParams>();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(updateTitleAction("Pass | Add questions"));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Questions screen
          {/*{testOwnerUuid}*/}
        </Text>
        
        <Button text="Add Question" onClick={() => (setShowPopup(true))} color="primary"/>

        <div style={{overflowY: "scroll", height: "500px", width: "600px"}}>
          {questions.map((question) => (console.log(question),
              <QuestionComponent
                  question={question}
                  showPoints={true}
                  visible={true}
                  onValidChange={() => (console.log(question))}
                  onAnswerChange={() => (console.log(question))}/>))}
        </div>

        <Popup show={showPopup} setShow={setShowPopup}>
          <div>
            <h3>Add Question</h3>
            <AddQuestion onAddQuestion={(question) => {setQuestions([...questions, question]);setShowPopup(false)}} onClose={() => setShowPopup(false)}/>

          </div>
        </Popup>

        <Link to={`/${testOwnerUuid}/editor/finish`} style={{ marginRight: 10 }}>
          <Button text="Next (finish)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default QuestionsScreen;
