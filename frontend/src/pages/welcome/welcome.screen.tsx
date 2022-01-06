import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/style/container.component";
import Content from "../../components/style/content.component";
import Button from "../../components/forms/button.component";
import Text from "../../components/style/text.component";

import { useDispatch } from "react-redux";
import { updateTitleAction } from "../../store/slices/ui.slice";

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Examination system"));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Welcome screen
        </Text>
        <Link to="/create" style={{ marginRight: 10 }}>
          <Button text="Create exam" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default WelcomeScreen;
