import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface ParticipantsParams {
  testOwnerUuid: string;
}

const ParticipantsScreen = () => {
  const { testOwnerUuid } = useParams<ParticipantsParams>();

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
