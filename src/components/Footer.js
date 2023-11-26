import { styled } from "styled-components";

function Footer() {
    return(
        <FootDiv>
            <DivisionLine />
            <Contents>© 2023. 레시피숲. all rights reserved.</Contents>
        </FootDiv>
    );

};

export default Footer;

const FootDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 150px 0px 0px 0px;

`

const DivisionLine = styled.div`
  width: 95%;
  border: solid #7B7B7B 0.5px;

`;

const Contents = styled.div`
    font-size: 13px;
    padding: 50px;
    color: #7B7B7B;
`