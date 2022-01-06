import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";

interface FinishParams {
  testOwnerUuid: string;
}

const FinishScreen = () => {
  const { testOwnerUuid } = useParams<FinishParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Finish test creation"));
  });

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
