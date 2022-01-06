import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface ParticipateQuestionsParams {
  testParticipateUuid: string;
}

const ParticipateQuestionsScreen = () => {
  const { testParticipateUuid } = useParams<ParticipateQuestionsParams>();

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Questions screen
          {testParticipateUuid}
        </Text>
        <Link to={`/${testParticipateUuid}/finish`} style={{ marginRight: 10 }}>
          <Button text="Next (finish)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default ParticipateQuestionsScreen;
