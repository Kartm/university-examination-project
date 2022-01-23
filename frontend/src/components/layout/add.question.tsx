import React, {useEffect} from "react";
import styled from "styled-components";
import {useState} from 'react'
import colors from '../../themes/colors.theme';
import {LocalQuestion, Question, QuestionChoice, QuestionChoiceDraft, QuestionType} from "../../models/exam.model";

const DropdownButton = styled.button`
  background-color: ${colors["primary"]};
  color: ${colors["secondary"]};
  padding: 16px;
  font-size: 16px;
  border: none;
  width: 100%;`

const  DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${colors["secondary"]};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover  {
      color: darkgrey;
    }
  }`

const DropdownWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  &:hover ${DropdownContent} {
    display: block;
  }
  &:hover ${DropdownButton} {
    background-color: ${colors["info"]};
  }`

const Wrapper = styled.div`
  background-color: ${colors["secondary"]};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;`

const Divider = styled.div`
    background-color: #ccc;
    width: 100%;
    height: 0.5px;
    margin: 16px 0;`

const PopupInput = styled.input`
  width: 100%; 
  height: 20px;
  padding: 16px;
  font-size: 16px;`

const Label = styled.label`
  margin-left: 8px;
`

interface AddQuestionParams {
    onAddQuestion : (localQuestion: LocalQuestion) => void
    onClose : () => void
    questionTypes: QuestionType[];
}

const AddQuestion= (props: AddQuestionParams) => {
    const [openSelection, setOpenSelection] = useState(false)
    const [questionType, setQuestionType] = useState<QuestionType | null>(null)
    const [questionText, setQuestionText] = useState('')
    const [optionText, setOptionText] = useState("")
    const [points, setPoints] = useState(0)
    const [questionChoices, setQuestionChoices] = useState<QuestionChoiceDraft[]>([])
    const [idForRadio, setIdForRadio] = useState(-1)

    function handleQuestionTypeChange(questionType: QuestionType) {
        setQuestionType(questionType)
        setOpenSelection(false)
    }

    function handleQuestionSave() {
        const question: LocalQuestion = {
            name: questionText,
            question_choices: questionChoices,
            question_type: questionType,
        }

        props.onAddQuestion(question)
        setIdForRadio(-1)
        console.log(question)
    }

    const handleCheck = (id) => {
        let copyChoices = [...questionChoices];
        let choice = {...questionChoices[id]};
        choice.is_correct = !choice.is_correct;
        copyChoices[id] = choice;
        setQuestionChoices(copyChoices);
        console.log(questionChoices)
    }

    const addChoice = (e:any) => {
        e.preventDefault()
        setQuestionChoices([...questionChoices,
            {
                text: optionText,
                is_correct: false
            }])
        setOptionText('')
    }

    const removeChoice = (id) => {
        setQuestionChoices(questionChoices.filter((choice) => questionChoices.indexOf(choice) !== id))
    }

    const questionTypeToString = {
        '': "Choose question type",
        'OPEN': 'Open Answer',
        'SINGLE_CHOICE': 'Single Choice Answer',
        'MULTI_CHOICE': 'Multiple Choice Answer',
    }

    return(
        <Wrapper>
            <PopupInput type="text" required placeholder="Please write your question here" onChange={(e) => setQuestionText(e.target.value)}/>
            <DropdownWrapper>
                <DropdownButton onClick={(e) => {setOpenSelection(!openSelection)
                    e.preventDefault()
                }}>
                    {questionType === null ? 'Select question type' : questionTypeToString[questionType.name]}
                </DropdownButton>

                {openSelection && <DropdownContent>
                    {props.questionTypes.map(qt =>
                      <a
                        key={qt.id}
                        style={{cursor:'pointer'}}
                        onClick={() => {
                            handleQuestionTypeChange(qt)
                        }}>
                          {questionTypeToString[qt.name]}
                      </a>
                    )}
                </DropdownContent>}
            </DropdownWrapper>
            <input type="number" onChange={(e) => setPoints(Number(e.target.value))} required placeholder="Please write the number of points for this exercise" />
            <Divider/>
            {/*question options go here*/}

            {questionType !== null && questionChoices.length > 0 &&
                    questionChoices.map((choice, i) =>
                    <div key={i}>
                        <input
                            type={questionType.name === 'SINGLE_CHOICE' ? "radio" : "checkbox"}
                            required={questionType.name === 'SINGLE_CHOICE'}
                            name="Answer Choice"
                            value={choice.text}
                            id={i.toString()}
                            onChange={() => {
                                questionType.name === 'SINGLE_CHOICE' ?
                                    setQuestionChoices(
                                        questionChoices.map((qc, j) =>  ({...qc, is_correct: j === i}))
                                    ) : handleCheck(i)
                            }}
                        />
                        <Label>{choice.text}</Label>
                        <span style={{color: 'red', cursor: 'pointer'}} onClick={() => removeChoice(i)}>
                            X
                        </span>
                    </div>
                    )
            }

            {questionType !== null && <>
                <input type="text" placeholder="Please write here a question answer" value={optionText} onChange={(e) => setOptionText(e.target.value)}/>

                <div style={{cursor:'pointer'}} onClick={addChoice}>
                    + add an option
                </div>
            </>}



        <button onClick={
            () => handleQuestionSave()
        }>Save</button>
        </Wrapper>
    )
}

export default AddQuestion