import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCircleUser,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useIsLoginState } from "../../contexts/IsLoginContext";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

function Navbar({
  toggleMenu,
  setToggleMenu,
  toggleProfile,
  setToggleProfile,
}) {
  const onClickMenu = () => {
    if (toggleProfile) {
      setToggleProfile(false);
    }
    setToggleMenu(!toggleMenu);
  };

  const onClickProfile = () => {
    if (toggleMenu) {
      setToggleMenu(false);
    }
    setToggleProfile(!toggleProfile);
  };

  const isLogin = useIsLoginState();
  // console.log(isLogin);

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const MenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Container>
        <Nav>
          {/* 모바일 내비게이션 반응형 */}
          <NavMobile>
            <FontAwesomeIcon icon={faBars} onClick={onClickMenu} />
            <li>레시피숲</li>
            <FontAwesomeIcon icon={faUser} onClick={onClickProfile} />
          </NavMobile>
          {toggleMenu ? (
            <NavMobileMenu>
              <Link to={"/recipes/school"}>
                <li>식단공유</li>
              </Link>
              <Link to={"/community"}>
                <li>커뮤니티</li>
              </Link>
              <Link to={"/event"}>
                <li>이벤트</li>
              </Link>
              <Link to={"/how_to_use"}>
                <li>이용방법</li>
              </Link>
            </NavMobileMenu>
          ) : null}
          {toggleProfile ? (
            <NavMobileMenu style={{ height: "120px" }}>
              <Link to={"/login"}>
                <li>프로필</li>
              </Link>
              <li>포인트</li>
            </NavMobileMenu>
          ) : null}
          <NavHome>
            <Link to={"/"}>
              <img
                src="/img/green_korean_row.png"
                alt="초록바탕한글로고"
                style={{ width: 160 }}
              />
            </Link>
          </NavHome>
          {/* 웹용 내비게이션 */}
          <NavMenu>
            <Link to={"/recipes/school"}>
              <li>식단공유</li>
            </Link>
            <Link to={"/community"}>
              <li>커뮤니티</li>
            </Link>
            <Link to={"/event"}>
              <li>이벤트</li>
            </Link>
            <Link to={"/how_to_use"}>
              <li>이용방법</li>
            </Link>
          </NavMenu>
          <NavRight>
            {isLogin === true ? (
              <ProfileBtn isOpen={isOpen} onClick={MenuToggle}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="icon"
                  style={{ fontSize: 22 }}
                />
                프로필
              </ProfileBtn>
            ) : (
              <Link to={"/login"}>
                <ProfileBtn>
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ marginRight: 10 }}
                  />
                  로그인
                </ProfileBtn>
              </Link>
            )}
          </NavRight>
        </Nav>
        <SideBar>{isOpen && <ProfileMenu />}</SideBar>
      </Container>
    </>
  );
}

export default Navbar;

const Nav = styled.nav`
  display: flex;
  height: 60px;
  background-color: #3b7339;
  color: white;
  justify-content: space-between;
  /* position: relative; */
  /* margin-bottom: 50px; */
  list-style: none;
  /* z-index: 1000; */
  width: 100vw;
  @media screen and (max-width: 630px) {
    width: 100%;
  }
  @media screen and (max-width: 430px) {
    width: 430px;
  }
`;
const NavHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid red; */
  width: 300px;
  letter-spacing: 2px;
  @media screen and (max-width: 630px) {
    display: none;
  }
`;
const NavMenu = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-evenly;
  align-items: center;
  /* border: 2px solid blue; */
  letter-spacing: 2px;
  font-size: 14px;
  @media screen and (max-width: 630px) {
    display: none;
  }
`;
const NavRight = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-evenly;
  align-items: center;
  /* border: 2px solid blue; */
  letter-spacing: 2px;
  font-size: 14px;
  @media screen and (max-width: 630px) {
    display: none;
  }
  .icon {
    margin-right: 10px;
    font-size: 30px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

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
`;

const NavMobileMenu = styled.div`
  background-color: #f97f51;
  display: flex;
  position: absolute;
  flex-direction: column;
  margin-top: 60px;
  padding: 20px 40px;
  height: 200px;
  justify-content: space-around;
  @media screen and (max-width: 630px) {
    width: 100%;
  }
  @media screen and (max-width: 430px) {
    width: 430px;
  }
`;

const ProfileBtn = styled.button`
  display: flex;
  border: solid 1px white;
  border-radius: 20px;
  width: 120px;
  height: 40px;
  background: none;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  letter-spacing: 2px;
  /* line-height: 25px; */
  &:hover {
    cursor: pointer;
    color: #3b7339;
    background-color: white;
  }
  ${({ isOpen }) =>
    isOpen &&
    `
    cursor: pointer;
    color: #3b7339;
    background-color: white;
  `};
`;

const SideBar = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
