import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import {Exam, ExamDraft} from "../../../models/exam.model";

const CreateScreen = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  useEffect(() => {
    dispatch(updateTitleAction("Pass | Create an exam"));
  });

  const templates: ExamDraft[] = [
    {
      title: 'Simple ABC',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
        {
          name: 'Which one?',
          question_type: 'SINGLE_CHOICE',
          question_choices: [
            {
              text: 'A',
              is_correct: true,
            },
            {
              text: 'B',
              is_correct: false,
            },
            {
              text: 'C',
              is_correct: false,
            }
          ]
        }
      ],
    },
    {
      title: 'Medical exam',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
      ],
    },
    {
      title: 'Test exam',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
      ],
    },
    {
      title: 'CSS basic exam',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
      ],
    }
  ]

  function handleSelectTemplate(title: string) {
    const template = templates.find(t => t.title === title)!
    console.log(template)
    return undefined;
  }

  return (
    <Container>
      <Content>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <select onChange={(e) => handleSelectTemplate(e.target.value)}>
            <option disabled selected>Select a template</option>
            {templates.map((value, i) =>
              <option key={i} value={value.title}>{value.title} - {value.questions.length} questions</option>)
            }
          </select>
        </div>
        <Text style={{ marginTop: 20, marginBottom: 20 }}>
          or
        </Text>
        {/* TODO this is hardcoded */}
        <Link
          to="/123e4567-e89b-12d3-a456-426652340000/editor"
          style={{ width: 'auto' }}
        >
          <Button text="Create from scratch" color="primary" />
        </Link>
      </Content>
    </Container>
  );
};

export default CreateScreen;
