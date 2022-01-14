import React, {useEffect, useState} from "react";
import {Question, QuestionType} from "../../models/exam.model";
import styled from "styled-components";

interface QuestionParams {
  question: Question;
  onValidChange: (isValid: boolean) => void;
  showPoints: boolean;
  visible: boolean;
  // onAnswerChange: (answer: string | string[]);
}

const Wrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 450px;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
`

const Divider = styled.div`
    background-color: #ccc;
    width: 100%;
    height: 0.5px;
    margin: 16px 0;
`

const Label = styled.label`
  margin-left: 8px;
`

const QuestionComponent = ({question, onValidChange, showPoints, visible}: QuestionParams) => {
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>([])

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
      onValidChange(!!e.target.value)
  }

  function onRadioChange() {
      onValidChange(true)
  }

  function onCheckboxChange(question_choice_id: string) {
    let newSelectedCheckboxIds = [];

    if (selectedCheckboxIds.includes(question_choice_id)) {
      newSelectedCheckboxIds = [...selectedCheckboxIds.filter(id => id !== question_choice_id)];
    } else {
      newSelectedCheckboxIds = [...selectedCheckboxIds, question_choice_id];
    }

    setSelectedCheckboxIds(newSelectedCheckboxIds)

    onValidChange(newSelectedCheckboxIds.length > 0)
  }

  return (
    <Wrapper style={{display: visible ? 'flex':'none'}}>
      <h2>{question.name} {showPoints && <i style={{fontSize: '10px'}}>({5} points)</i>}</h2>

      <Divider/>

      {
        question.question_type.name === 'OPEN' ?
          <input type="text" required placeholder="Your answer here..." onChange={(e) => onTextChange(e)}/>
          :
          question.question_choices.map(choice =>
            <div key={choice.question_choice_id} style={{marginBottom: '8px'}}>
              <input
                type={question.question_type.name === 'SINGLE_CHOICE' ? "radio" : "checkbox"}
                required={question.question_type.name === 'SINGLE_CHOICE'}
                name={question.question_uuid}
                id={choice.question_choice_id}
                onChange={() => {
                  question.question_type.name === 'SINGLE_CHOICE' ? onRadioChange() : onCheckboxChange(choice.question_choice_id)
                }}
              />
              <Label htmlFor={choice.question_choice_id}>{choice.text}</Label>
            </div>
          )
      }

    </Wrapper>
  );
};

export default QuestionComponent;