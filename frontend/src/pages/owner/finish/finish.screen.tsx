import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface FinishParams {
  testOwnerUuid: string;
}

const FinishScreen = () => {
  const { testOwnerUuid } = useParams<FinishParams>();

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Finish screen
          {testOwnerUuid}
        </Text>
      </Content>
    </Container>
  );
};

export default FinishScreen;