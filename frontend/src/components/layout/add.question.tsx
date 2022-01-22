import React from "react";
import styled from "styled-components";
import {useState} from 'react'
import Text from "../../components/style/text.component";
import colors from '../../themes/colors.theme';
import {Question, QuestionChoice} from "../../models/exam.model";

interface AddQuestionParams {
    onAddQuestion : (question: Question) => void
    onClose : () => void
}


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

const AddQuestion= (props: AddQuestionParams) => {
    const [openSelection, setOpenSelection] = useState(false)
    const [questionType, setQuestionType] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [optionText, setOptionText] = useState("")
    const [points, setPoints] = useState(0)
    const [questionChoices, setQuestionChoices] = useState<QuestionChoice[]>([])
    const [idForRadio, setIdForRadio] = useState(-1)


    function handleQuestionTypeChange(type: string) {
        setQuestionType(type)
        setOpenSelection(false)
    }

    function handleQuestionSave() {
        console.log(questionType)
        const question: Question = {
            // @ts-ignore
            question_uuid: (Math.floor(Math.random() * 10000)).toString(), //stays empty, assigned by backend
            name: questionText,
            question_choices: questionChoices, //TODO: used a random val for id
            question_type_id: undefined, //TODO: for now stays as undefined until we figure out how to properly save question type

            //TODO: there should be something to store points for a question
        }

        console.log(questionChoices)
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
        const choiceId = (Math.floor(Math.random() * 10000)).toString()
        setQuestionChoices([...questionChoices,
            {
                question_choice_id: choiceId,
                text: optionText,
                is_correct: false
            }])
        setOptionText('')
    }

    const removeChoice = (id) => {
        setQuestionChoices(questionChoices.filter((choice) => questionChoices.indexOf(choice) !== id))
    }

    return(
        <Wrapper>
            <PopupInput type="text" required placeholder="Please write your question here" onChange={(e) => setQuestionText(e.target.value)}/>
            <DropdownWrapper>
                <DropdownButton onClick={(e) => {setOpenSelection(!openSelection)
                    e.preventDefault()
                }}>
                    {questionType === '' ? 'Choose question type' :
                        questionType === 'OPEN' ? 'Open Answer' :
                        questionType === 'SINGLE_CHOICE' ? 'Single Choice Answer' : 'Multiple Choice Answer'}

                </DropdownButton>

                {openSelection && <DropdownContent>
                    <a style={{cursor:'pointer'}} onClick={() => {
                        handleQuestionTypeChange('OPEN')
                    }}>Open Answer</a>
                    <a style={{cursor:'pointer'}} onClick={() => {
                        handleQuestionTypeChange('SINGLE_CHOICE')
                    }}>Single Choice Answer</a>
                    <a style={{cursor:'pointer'}} onClick={() => {
                        handleQuestionTypeChange('MULTI_CHOICE')
                    }}>Multiple Choice Answer</a>
                </DropdownContent>}
            </DropdownWrapper>
            <input type="number" onChange={(e) => setPoints(Number(e.target.value))} required placeholder="Please write the number of points for this exercise" />
            <Divider/>
            {/*question options go here*/}

            {questionChoices.length > 0 &&
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
            {questionType !== '' && <>
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