import { Link } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'

const Nav = styled.nav`
    display: flex;
    height: 60px;
    //border: 2px solid black;
    background-color: #F97F51;
    color: white;
    /* position: relative; */
    margin-bottom: 50px;
    list-style: none;
    /* z-index: 1000; */
    width: 100%;
    @media screen and (max-width: 630px) {
        width: 100%;
    }
    @media screen and (max-width: 430px) {
        width: 430px;
    }

`
const NavHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 2px solid red;
    padding: 20px 50px;
    letter-spacing: 2px;
    @media screen and (max-width: 630px) {
        display: none;
    }
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
    @media screen and (max-width: 630px) {
        display: none;
    }
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
    @media screen and (max-width: 630px) {
        display: none;
    }
`

const NavMobile = styled.div`
    display: none;
    @media screen and (max-width: 630px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 30px;
        font-size: 20px;
    }
`

function Navbar() {
  return (
        <Nav>
            <NavMobile>
                <FontAwesomeIcon icon={faBars} />
                <li>모두의 식판</li>
                <FontAwesomeIcon icon={faUser} />
            </NavMobile>
            <NavHome>
                <li>모두의 식판</li>
            </NavHome>
            <NavMenu>
                <li>식단공유</li>
                <li>커뮤니티</li>
                <li>이벤트</li>
                <li>이용방법</li>
            </NavMenu>
            <NavRight>
                <li>프로필</li>
                <li>포인트</li>
            </NavRight>

        </Nav>
  );
}

export default Navbar;