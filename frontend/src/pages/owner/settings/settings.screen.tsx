import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

interface SettingsParams {
  testOwnerUuid: string;
}

const SettingsScreen = () => {
  const { testOwnerUuid } = useParams<SettingsParams>();

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Settings screen
          {testOwnerUuid}
        </Text>
        <Link to={`/${testOwnerUuid}/participants`} style={{ marginRight: 10 }}>
          <Button text="Next (add participants)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
