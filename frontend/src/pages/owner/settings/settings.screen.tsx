import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";

interface SettingsParams {
  testOwnerUuid: string;
}

const SettingsScreen = () => {
  const { testOwnerUuid } = useParams<SettingsParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Exam settings"));
  });

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Settings screen
          {testOwnerUuid}
        </Text>
        <Link to={`/${testOwnerUuid}/editor/participants`} style={{ marginRight: 10 }}>
          <Button text="Next (add participants)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
