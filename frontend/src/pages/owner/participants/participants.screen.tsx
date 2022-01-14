import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";


import AddParticipant from "./addParticipant";

interface ParticipantsParams {
  testOwnerUuid: string;
}

const ParticipantsScreen = () => {
  const [participants, setParticipants] = useState([
    {
      email: "s1@pwr.pl",
      person: "stud1"
    },
    {
      email: "s2@pwr.pl",
      person: "stud2"
    },
    {
      email: "s3@pwr.pl",
      person: "stud3"
    },
  ])

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Add participants"));
  });

  const { testOwnerUuid } = useParams<ParticipantsParams>();
  const dispatch = useDispatch();

  function pushParticipant(email: string, nameSurname: string) {

    setParticipants([...participants, {
        email: email,
        person: nameSurname
    }])

  }

  const handleDelete = (id) => {
    setParticipants(participants.filter((participant) => participants.indexOf(participant) !== id))
  }

  return (
    <Container>
      <Content>
        <Text h1 style={{ marginBottom: 20 }}>
          Participants screen
          {/*<p>{testOwnerUuid}</p>*/}
        </Text>
        <Button text="Upload File" color="primary" />
        <span>
          {participants.map((participant, i) => (
              <h3 key={participant.email} style={{display: 'flex'}}>
                {participant.email} {participant.person}
                <Text style={{color: 'red', cursor: 'pointer'}} onClick={() => handleDelete(i)}>
                  x
                </Text>
              </h3>
          ))}
        </span>
        <AddParticipant  onAddParticipant={pushParticipant}/>
        <Link to={`/${testOwnerUuid}/editor/questions`} style={{ marginRight: 10 }}>
          <Button text="Next (add questions)" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default ParticipantsScreen;
