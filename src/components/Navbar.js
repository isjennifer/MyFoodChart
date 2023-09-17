import { Link } from "react-router-dom"
import styled from "styled-components"


const Nav = styled.section`
    display: flex;
    height: 60px;
    //border: 2px solid black;
    background-color: #F97F51;
    color: white;
    position: relative;
    margin-bottom: 50px;
    /* z-index: 1000; */
    width: 100%;
`
const NavHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 2px solid red;
    padding: 20px 50px;
    letter-spacing: 2px;
`
const NavMenu = styled.div`
    display: flex;
    width: 600px;
    justify-content: space-evenly;
    align-items: center;
    //border: 2px solid blue;
    padding: 20px;
    letter-spacing: 2px;
    font-size: 14px;
`
const NavRight = styled.div`
    display: flex;
    margin-left: auto;
    width: 200px;
    justify-content: space-evenly;
    align-items: center;
    //border: 2px solid blue;
    padding: 20px;
    letter-spacing: 2px;
    font-size: 14px;
`

function Navbar() {
  return (
        <Nav>
            <NavHome>
                <span>모두의 식판</span>
            </NavHome>
            <NavMenu>
                <span>식단공유</span>
                <span>커뮤니티</span>
                <span>이벤트</span>
                <span>이용방법</span>
            </NavMenu>
            <NavRight>
                <span>프로필</span>
                <span>포인트</span>
            </NavRight>
        </Nav>
  );
}

export default Navbar;