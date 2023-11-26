import styled from "styled-components"
import Navbar from "../components/Navbar";





function Home() {


    return (
        <>
        <Background>
        <NavDiv>
            <Navbar />
        </NavDiv>
        <Div>
            <SubTitle>전문가의 식단공유 플랫폼</SubTitle>
            <Title>레시피숲, Recipe:SOUP</Title>
        </Div>
        </Background>
        </>
    );
};

export default Home;


const Background = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url("http://localhost:3000/img/background_img.jpg");
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-inline: auto;


`

const NavDiv = styled.div`
    display: flex;
    width: 100vw;
    position: fixed;
    top: 0;


`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 3px;
    color: white;
    margin: auto 0;
    font-weight: 500;

`


const SubTitle = styled.span`
    display: flex;
    margin-bottom: 20px;

`

const Title = styled.span`
    display: flex;
    font-size: 30px;

`