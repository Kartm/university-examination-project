import React, {useEffect} from "react";
import styled from "styled-components";
import {useState} from 'react'
import colors from '../../themes/colors.theme';
import {LocalQuestion, Question, QuestionChoice, QuestionChoiceDraft, QuestionTypeEnum} from "../../models/exam.model";

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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  height: 80%;
  border-radius: 8px;
  padding: 16px 0 16px 10%;
  box-sizing: border-box;
  margin: 0;`

const PopupInput = styled.input`
  height: 20px;
  padding: 16px;
  font-size: 16px;`

const Label = styled.label`
  margin-left: 8px;
`

const SaveButton = styled.button`
  background-color: ${colors["primary"]};
  color: ${colors["secondary"]};
  padding: 16px;
  font-size: 16px;
  border: none;
  width: 15vh;
  position: absolute;
  margin-top: 62.3vh;
  margin-left: 27vh`

interface AddQuestionParams {
    onAddQuestion : (localQuestion: LocalQuestion) => void
    onClose : () => void
}

const AddQuestion= (props: AddQuestionParams) => {
    const [openSelection, setOpenSelection] = useState(false)
    const [questionType, setQuestionType] = useState<QuestionTypeEnum | null>(null)
    const [questionText, setQuestionText] = useState('')
    const [optionText, setOptionText] = useState("")
    const [points, setPoints] = useState(0)
    const [questionChoices, setQuestionChoices] = useState<QuestionChoiceDraft[]>([])
    const [idForRadio, setIdForRadio] = useState(-1)

    function handleQuestionTypeChange(questionType: QuestionTypeEnum) {
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

    const getQuestionTypeDropdownOptions = () => {
        const results = [];

        for (const q in QuestionTypeEnum) {
            const questionEnumValue: QuestionTypeEnum = QuestionTypeEnum[q as keyof typeof QuestionTypeEnum];


            results.push(<a
              key={questionEnumValue}
              style={{cursor:'pointer'}}
              onClick={() => {
                  handleQuestionTypeChange(questionEnumValue)
              }}>
                {questionTypeToString[questionEnumValue]}
            </a>)
        }

        return results;
    }


    return(
        <Wrapper>
            <PopupInput type="text" required placeholder="Please write your question here" onChange={(e) => setQuestionText(e.target.value)}/>
            <DropdownWrapper>
                <DropdownButton onClick={(e) => {setOpenSelection(!openSelection)
                    e.preventDefault()
                }}>
                    {questionType === null ? 'Select question type' : questionTypeToString[questionType]}
                </DropdownButton>

                {openSelection && <DropdownContent>
                    {getQuestionTypeDropdownOptions()}
                </DropdownContent>}
            </DropdownWrapper>
            <br/>
            <input type="number" onChange={(e) => setPoints(Number(e.target.value))} required placeholder="Please write the number of points for this exercise" />

            {/*question options go here*/}

            <h3 style={{marginBottom: "0"}}>Answer Options</h3>
            <p style={{color: "lightgrey", marginTop: "5px"}}>When you add question options please mark the correct ones by selecting them</p>
            {questionType !== null && questionChoices.length > 0 &&

                    questionChoices.map((choice, i) =>
                    <div key={i}>
                        <input
                            type={questionType === 'SINGLE_CHOICE' ? "radio" : "checkbox"}
                            required={questionType === 'SINGLE_CHOICE'}
                            name="Answer Choice"
                            value={choice.text}
                            id={i.toString()}
                            onChange={() => {
                                questionType === 'SINGLE_CHOICE' ?
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



        <SaveButton onClick={
            () => handleQuestionSave()
        }>Save</SaveButton>
        </Wrapper>
    )
}

export default AddQuestion