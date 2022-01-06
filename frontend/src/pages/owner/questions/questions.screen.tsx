import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";

interface QuestionsParams {
  testOwnerUuid: string;
}

const QuestionsScreen = () => {
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
          {testOwnerUuid}
        </Text>
        <Link to={`/${testOwnerUuid}/editor/finish`} style={{ marginRight: 10 }}>
          <Button text="Next (finish)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default QuestionsScreen;
