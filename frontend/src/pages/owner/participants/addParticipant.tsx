import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";

interface AddParticipantsParams {
    onAddParticipant: (email: string, personName: string) => void
}

const AddParticipant = (props: AddParticipantsParams) => {
    const [email, setEmail] = useState('')
    const [personName, setPersonName] = useState('')

    const handleAdd = (e:any) => {
        e.preventDefault()
        props.onAddParticipant(email, personName)
        setEmail('')
        setPersonName('')
    }

    return (
        <form className='add-form'>
            <Content className='form-control'>
                <input type='textInput' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='textInput' placeholder='person name' value={personName} onChange={(e) => setPersonName(e.target.value)}/>
            </Content>
            <button color="primary" onClick={handleAdd}>+add email</button>
        </form>
    )
}

export default AddParticipant