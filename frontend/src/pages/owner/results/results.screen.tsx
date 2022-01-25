import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {ExamSpecificResult, getExamByUuid, getExamResults} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";
import styled from "styled-components";
import AddQuestion from "../../../components/layout/add.question";
import Popup from "../../../components/layout/popup";

interface ResultsParams {
  testOwnerUuid: string;
}

const Table = styled.table`
  border: 1px solid #333;
`

const THead = styled.thead`
  background-color: #333;
  color: #fff;
`

const TD = styled.td`
  border: 1px solid #333;
  padding: 4px;
`

const ResultsScreen = () => {
  const {testOwnerUuid} = useParams<ResultsParams>();
  const dispatch = useDispatch();
  const examResults = useSelector((state: RootState) => state.exam.examResults);
  const [showPopup, setShowPopup] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<ExamSpecificResult | null>(null)

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Exam results"));
  });

  useEffect(() => {
    dispatch(getExamResults(testOwnerUuid));
  }, [])

  return (
    <Container>
      <Content>
        {examResults && <Table>
            <THead>
            <tr>
                <th>Participant name</th>
                <th>Score</th>
                <th></th>
            </tr>
            </THead>
            <tbody>
            {examResults.results.map(result =>
              <tr>
                <TD>{result.participant.name}</TD>
                <TD>{result.questionResults.reduce((a, b) => a + b.points, 0)}</TD>
                <TD><button onClick={() => {
                  setShowPopup(true)
                  setSelectedParticipant(result)
                }}>details</button></TD>
              </tr>
            )}
            </tbody>
        </Table>}

        <Popup show={showPopup} setShow={setShowPopup}>
          {selectedParticipant &&
              <>
                  <h3>{selectedParticipant.participant.name}</h3>

                  <Table>
                      <THead>
                          <tr>
                              <th>Question</th>
                              <th>Answers</th>
                              <th>Score</th>
                          </tr>
                      </THead>
                      <tbody>
                      {selectedParticipant.questionResults.map(qr =>
                        <tr>
                          <TD>{qr.questionText}</TD>
                          <TD>{qr.answerTexts.join(", ")}</TD>
                          <TD>{qr.points}</TD>
                        </tr>
                      )}
                      </tbody>
                      <tfoot>
                      <tr>
                          <TD></TD>
                          <TD></TD>
                          <TD>{selectedParticipant.questionResults.reduce((a, b) => a + b.points, 0)} points total</TD>
                      </tr>
                      </tfoot>
                  </Table>
                {/*<div style={{backgroundColor: "#ccc", width: "100%", height: "0.5px", margin: "16px 0"}}/>*/}
                {/*<AddQuestion*/}
                {/*  onAddQuestion={(question) => {*/}
                {/*    setLocalQuestions([...localQuestions, question]);*/}
                {/*    setShowPopup(false)*/}
                {/*  }}*/}
                {/*  onClose={() => setShowPopup(false)}*/}
                {/*/>*/}
              </>
          }
        </Popup>

      </Content>
    </Container>
  );
};

export default ResultsScreen;
