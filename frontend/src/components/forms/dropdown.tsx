import React from "react";
import styled from "styled-components";


// /* Links inside the dropdown */
// .dropdown-content a {
//     color: black;
//     padding: 12px 16px;
//     text-decoration: none;
//     display: block;
// }

/* Change color of dropdown links on hover */
//.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
// .dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
// .dropdown:hover .dropbtn {background-color: #3e8e41;}

const DropdownButton = styled.button`
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;`

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
  }`

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropdownContent} {
    display: block;
  }
  &:hover ${DropdownButton} {
    background-color: #3e8e41;
  }`

interface DropdownParams {}

const Dropdown= (props: DropdownParams) => {
    return (
        <DropdownWrapper>
            <DropdownButton>Dropdown</DropdownButton>
            <DropdownContent>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </DropdownContent>
        </DropdownWrapper>
    );
}

export default Dropdown
