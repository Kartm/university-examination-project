import React from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface ParticipateFinishParams {
  testParticipateUuid: string;
}

const ParticipateFinishScreen = () => {
  const { testParticipateUuid } = useParams<ParticipateFinishParams>();

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Finish screen
          {testParticipateUuid}
        </Text>
      </Content>
    </Container>
  );
};

export default ParticipateFinishScreen;
