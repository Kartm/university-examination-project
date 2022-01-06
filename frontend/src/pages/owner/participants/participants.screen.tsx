import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";

interface ParticipantsParams {
  testOwnerUuid: string;
}

const ParticipantsScreen = () => {
  const { testOwnerUuid } = useParams<ParticipantsParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Add participants"));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Participants screen
          {testOwnerUuid}
        </Text>
        <Link to={`/${testOwnerUuid}/questions`} style={{ marginRight: 10 }}>
          <Button text="Next (add questions)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default ParticipantsScreen;
