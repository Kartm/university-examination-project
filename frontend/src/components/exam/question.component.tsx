import React, {useEffect, useState} from "react";
import {LocalQuestion, Question, LocalQuestionAnswer} from "../../models/exam.model";
import styled from "styled-components";

interface QuestionParams {
  localQuestion: LocalQuestion;
  showPoints: boolean;
  visible: boolean;
  onValidChange: (isValid: boolean) => void;
  onAnswerChange: (answer: LocalQuestionAnswer) => void;
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

const QuestionComponent = ({localQuestion, showPoints, visible, onValidChange, onAnswerChange}: QuestionParams) => {
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>([])

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
      onValidChange(!!e.target.value)

      const answer: LocalQuestionAnswer = {
        question_id: localQuestion.question_id,
        question_choice_ids: [],
        answer_text: e.target.value
      }

      onAnswerChange(answer)
  }

  function onRadioChange(question_choice_id: string) {
      onValidChange(true)

    const answer: LocalQuestionAnswer = {
        question_id: localQuestion.question_id,
        question_choice_ids: [question_choice_id],
        answer_text: null
      }

    onAnswerChange(answer)
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

    const answer: LocalQuestionAnswer = {
      question_id: localQuestion.question_id,
      question_choice_ids: newSelectedCheckboxIds,
      answer_text: null
    }

    onAnswerChange(answer)
  }

  return (
    <Wrapper style={{display: visible ? 'flex':'none'}}>
      <h2>{localQuestion.name} {showPoints && <i style={{fontSize: '10px'}}>({localQuestion.points} points)</i>}</h2>

      <Divider/>

      {
        localQuestion.question_type === 'OPEN' ?
          <input type="text" required placeholder="Your answer here..." onChange={(e) => onTextChange(e)}/>
          :
          localQuestion.question_choices.map((choice, i) =>
            <div key={i.toString()} style={{marginBottom: '8px'}}>
              <input
                type={localQuestion.question_type === 'SINGLE_CHOICE' ? "radio" : "checkbox"}
                required={localQuestion.question_type === 'SINGLE_CHOICE'}
                name={localQuestion.question_id}
                id={i.toString()}
                onChange={() => {
                  localQuestion.question_type === 'SINGLE_CHOICE' ? onRadioChange(choice.questionChoice_id) : onCheckboxChange(choice.questionChoice_id)
                }}
              />
              <Label htmlFor={i.toString()}>{choice.text}</Label>
            </div>
          )
      }

    </Wrapper>
  );
};

export default QuestionComponent;
