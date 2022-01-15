import React from "react";
import styled from "styled-components";
import colors from "../../themes/colors.theme";
import Text from './text.component';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.primary};
  height: 56px;
  font-weight: bold;
  padding-left: 32px;
`;

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  return <Wrapper><Text>{props.title}</Text></Wrapper>;
};
