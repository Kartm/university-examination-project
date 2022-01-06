import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: green;
`;

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  return <Wrapper>{props.title}</Wrapper>;
};
