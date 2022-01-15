import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Dropdown from "../../../components/forms/dropdown";
import {Exam, ExamDraft} from "../../../models/exam.model";

const CreateScreen = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Create an exam"));
  });

  const templates: ExamDraft[] = [
    {
      exam_uuid: null,
      title: 'Simple ABC',
      settings: {
        settings_uuid: null,
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
        {
          question_uuid: null,
          name: "Yes or no?",
          question_type: ""
        }
      ],
    }
    // "Simple ABC",
    // "Medical exam",
    // "Test exam",
    // "CSS basic exam",
  ]

  function handleSelectTemplate(value: string) {
    console.log(value)
    return undefined;
  }

  return (
    <Container>
      <Content>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <select onChange={(e) => handleSelectTemplate(e.target.value)}>
            <option disabled selected>Select a template</option>
            {templates.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
        </div>
        <Text style={{ marginTop: 20, marginBottom: 20 }}>
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
