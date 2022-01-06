import React from "react";
import { Link } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";

const CreateScreen = () => {
  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Create screen
        </Text>

        <Text h2 style={{ marginBottom: 20 }}>
          [TODO: select template]
        </Text>
        <Text h2 style={{ marginBottom: 20 }}>
          or
        </Text>
        {/* TODO this is hardcoded */}
        <Link
          to="/123e4567-e89b-12d3-a456-426652340000/editor"
          style={{ marginRight: 10 }}
        >
          <Button text="Create from scratch" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default CreateScreen;
