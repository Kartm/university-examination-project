import React from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface QuestionsParams {
  testOwnerUuid: string;
}

const QuestionsScreen = () => {
  const { testOwnerUuid } = useParams<QuestionsParams>();

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Questions screen
          {testOwnerUuid}
        </Text>
        <Link to={`/${testOwnerUuid}/finish`} style={{ marginRight: 10 }}>
          <Button text="Next (finish)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default QuestionsScreen;
