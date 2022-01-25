import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {getExamByUuid, getExamResults} from "../../../store/slices/exam.slice";
import {RootState} from "../../../store/configure.store";
import styled from "styled-components";

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
            </tr>
            </THead>
            <tbody>
            {examResults.results.map(result =>
              <tr>
                <TD>{result.participant.name}</TD>
                <TD>{result.questionResults.reduce((a, b) => a + b.points, 0)}</TD>
              </tr>
            )}
            </tbody>
        </Table>}

      </Content>
    </Container>
  );
};

export default ResultsScreen;
