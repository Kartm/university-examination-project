import React from "react";
import styled from "styled-components";
import {useState} from 'react'
import colors from "../../themes/colors.theme";
import AddQuestion from "./add.question";

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;`

const PopupInner = styled.div`
  position: relative;
  padding: 32px;
  width: 60vh;
  height: 80vh;
  background-color: #fff`

const PopupCancel = styled.button`
  background-color: lightgrey;
  color: ${colors["dark"]};
  padding: 16px;
  font-size: 16px;
  border: none;
  width: 15vh;
  max-width: 450px;
  position: absolute;
  margin-left: 17vh;
`


interface PopupParams {
    show: boolean;
    children: JSX.Element;
    setShow: any;
}

const Popup= (props: PopupParams) => {


    return (
        props.show && <PopupWrapper>
            <PopupInner>
                {props.children}
                <PopupCancel onClick={() => props.setShow(false)}>cancel</PopupCancel>
            </PopupInner>
        </PopupWrapper>
        );

}

export default Popup