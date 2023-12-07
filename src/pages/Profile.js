import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faGem,
  faPencil,
  faCommentDots,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useIsLoginState } from "../contexts/IsLoginContext";
import { useEffect } from "react";

function Profile() {
  const userLoginStatus = useIsLoginState();
  const location = useLocation();
  const { pathname } = location;
  console.log(userLoginStatus);
  const logout = useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {
      method: "GET",
    }).then((response) => response.json());
  }, []);

  return (
    <>
      <Container initial="start" animate="end" variants={easeDown}>
        <SideBar>
          <MyProfile>
            <Link to={""}>
              <IconStyle icon={faCircleUser} className="icon" />내 프로필
            </Link>
          </MyProfile>
          <MyLog>
            <MyLogUl>
              <Link to={"edit"}>
                <IconStyle icon={faCircleUser} className="icon" />
                개인정보수정
              </Link>
              <li>
                <IconStyle icon={faPencil} className="icon" />내 게시글
              </li>
              <li>
                <IconStyle icon={faCommentDots} className="icon" />내 댓글
              </li>
              <li>
                <IconStyle icon={faHeart} className="icon" />
                좋아요한 글
              </li>
              <li>
                <IconStyle icon={faBookmark} className="icon" />
                북마크한 글
              </li>
              <li>
                <IconStyle icon={faGem} className="icon" />
                포인트 관리
              </li>
            </MyLogUl>
          </MyLog>
        </SideBar>
        <ProfileForm>
          <OutletContainer>
            {pathname === "/profile" ? (
              <>
                {userLoginStatus === true ? (
                  <Button onClick={logout}>로그아웃</Button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <Outlet />
            )}
          </OutletContainer>
        </ProfileForm>
      </Container>
    </>
  );
}

export default Profile;

//////////// framer-motion (animation)

const easeDown = {
  start: { opacity: 0, y: -20 },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

/////////// styled-component

const DivisionLine = styled.div`
  width: 350px;
  border: solid #dedede 1px;
  margin: 30px;
`;

const IconStyle = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const MyLogUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const MyLog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  border: solid 1px #2c3e50;
  font-weight: 500;
`;

const MyProfile = styled.div`
  display: flex;
  height: 150px;
  border: solid 1px #2c3e50;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 20px;
  border: solid 1px #2c3e50;
`;

const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px black;
  overflow-y: auto;
`;

const ProfileForm = styled.div`
  width: 800px;
  height: 600px;
  padding: 30px;
  color: #505050;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  width: 1000px;
  margin-inline: auto;
  margin-top: 100px;
  border: solid 1px black;
`;

const Button = styled.button`
  display: flex;
  width: 100px;
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #3b7339;
  color: white;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #fc8153;
  }
`;
