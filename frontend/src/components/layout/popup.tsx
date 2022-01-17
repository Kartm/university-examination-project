import React from "react";
import styled from "styled-components";
import {useState} from 'react'
import Text from "../../components/style/text.component";

const PopupWrapper = styled.div`
`

const PopupInner = styled.div`
`

const PopupCancel = styled.button`
`


interface PopupParams {
    show: boolean
}

const Popup= (props: PopupParams) => {
    const [showPopup, setShowPopup] = useState(false)

    return (
        props.show && <PopupWrapper>
            <PopupInner>
                <PopupCancel>cancel</PopupCancel>
            </PopupInner>
        </PopupWrapper>
        );

}

export default Popup