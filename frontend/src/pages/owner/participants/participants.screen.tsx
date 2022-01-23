import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";


import AddParticipant from "./addParticipant";
import {
  UpdateExamParticipants,
  updateExamParticipants,
  updateExamSettings,
  UpdateExamSettings
} from "../../../store/slices/exam.slice";
import {Participant, ParticipantDraft} from "../../../models/exam.model";

interface ParticipantsParams {
  testOwnerUuid: string;
}

const ParticipantsScreen = () => {
  const history = useHistory();
  const {testOwnerUuid} = useParams<ParticipantsParams>();
  const dispatch = useDispatch();

  const [participants, setParticipants] = useState<ParticipantDraft[]>([])

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Add participants"));
  });

  function pushParticipant(email: string, nameSurname: string) {
    const newParticipant: ParticipantDraft = {
      test_id: testOwnerUuid,
      email: email,
      name: nameSurname,
    }

    setParticipants([...participants, newParticipant])

  }

  const handleDelete = (id) => {
    setParticipants(participants.filter((participant) => participants.indexOf(participant) !== id))
  }

  function onNextButtonClicked() {
    // convert component's state to something backend will understand
    const update: UpdateExamParticipants = {participants: [...participants]}

    // @ts-ignore
    dispatch(updateExamParticipants(update)).then(x => {
      history.push(`/${testOwnerUuid}/editor/questions`);
    });
  }

  return (
    <Container>
      <Content>
        <Text h1 style={{marginBottom: 20}}>
          Participants screen
        </Text>
        <span>
          {participants.map((participant, i) => (
            <h3 key={participant.email} style={{display: 'flex'}}>
              {participant.email} {participant.name}
              <Text style={{color: 'red', cursor: 'pointer'}} onClick={() => handleDelete(i)}>
                x
              </Text>
            </h3>
          ))}
        </span>
        <AddParticipant onAddParticipant={pushParticipant}/>
        <Button text="Next (add questions)" color="primary" onClick={() => onNextButtonClicked()}/>
      </Content>
    </Container>
  );
};

export default ParticipantsScreen;
