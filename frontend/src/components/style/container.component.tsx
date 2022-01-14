import styled from "styled-components";
import colors from "../../themes/colors.theme";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 56px);
    background-color: ${colors.secondary};
`

export default Container;