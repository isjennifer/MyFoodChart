import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faGem,
  faPencil,
  faCommentDots,
  faHeart,
  faBookmark,
  faArrowRightFromBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsLoginState } from "../../contexts/IsLoginContext";
import { useEffect } from "react";

function Profile() {
  const userLoginStatus = useIsLoginState();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const logout = () =>
    fetch(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {
      method: "GET",
      credentials: "include",
    }).then(() => {
      navigate("/login");
    });

  return (
    <>
      <Container initial="start" animate="end" variants={easeDown}>
        <SideBar>
          <MyProfile>
            <Link to={""}>
              <IconStyle icon={faCircleUser} className="icon" />내 프로필
            </Link>
            <Button onClick={logout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              {"\u00a0"}로그아웃
            </Button>
          </MyProfile>
          <MyLog>
            <MyLogUl>
              <Link to={"edit"}>
                <MyLogLI
                  style={{
                    backgroundColor:
                      pathname === "/profile/edit" ? "#fc8153" : "",
                    color: pathname === "/profile/edit" ? "white" : "",
                  }}
                >
                  <IconStyle icon={faCircleUser} className="icon" />
                  개인정보수정
                </MyLogLI>
              </Link>
              <Link to={"myposts"}>
                <MyLogLI
                  style={{
                    backgroundColor:
                      pathname === "/profile/myposts" ? "#fc8153" : "",
                    color: pathname === "/profile/myposts" ? "white" : "",
                  }}
                >
                  <IconStyle icon={faPencil} className="icon" />내 게시글
                </MyLogLI>
              </Link>
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
            {pathname === "/profile" ? <></> : <Outlet />}
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

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const BodyItem = styled.div`
  width: auto;
  height: 250px;
  border: solid 2px black;
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: space-evenly;
  align-items: center;
  border: solid 1px red;
  border-radius: 30px;
  background-color: whitesmoke;
  margin-top: 10px;
  padding: 30px;
`;

const DivisionLine = styled.div`
  width: 350px;
  border: solid #dedede 1px;
  margin: 30px;
`;

const IconStyle = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const MyLogLI = styled.div`
  display: flex;
  width: 180px;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
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
  width: 120px;
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
