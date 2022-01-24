import React from "react";
import styled from "styled-components";
import {useState} from 'react'
import Text from "../../components/style/text.component";
import colors from "../../themes/colors.theme";


const DropdownButton = styled.button`
  background-color: ${colors["primary"]};
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  width: 100%;`

const  DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
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

interface DropdownParams {
    options: string[]
    onChange: (selectedOptions: string[]) => void
}



const Dropdown= (props: DropdownParams) => {
    const [openOptions, setOpenOptions] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const removeOption = (id) => {
      const newSelectedOptions = selectedOptions.filter((option) => selectedOptions.indexOf(option) !== id);

      setSelectedOptions(newSelectedOptions)

      props.onChange(newSelectedOptions)
    }

    return (
        <DropdownWrapper>
            <DropdownButton onClick={(e) => {
                setOpenOptions(!openOptions)
                e.preventDefault()
            }}>
                {selectedOptions.map((option, i) => (
                    <div key={i}>
                        {option}
                        <span style={{color: 'red', cursor: 'pointer'}} onClick={() => removeOption(i)}>
                            X
                        </span>
                    </div>
                ))}
            </DropdownButton>
            {openOptions && <DropdownContent>
                {props.options.filter(option => !selectedOptions.includes(option))
                    .map((value, i) =>
                        <a style={{cursor:'pointer'}} key={i} onClick={() => {
                          setSelectedOptions([...selectedOptions, value]);
                          props.onChange([...selectedOptions, value])
                        }}>{value}</a>)}
            </DropdownContent>}
        </DropdownWrapper>
    );
}

export default Dropdown
