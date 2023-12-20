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
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function ProfileMenu() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const logout = () =>
    fetch(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });

  return (
    <Container initial="start" animate="end" variants={easeDown}>
      <AboutMe>
        <IconStyle
          icon={faCircleUser}
          className="icon"
          style={{ fontSize: 70 }}
        />
        <span style={{ fontSize: 20, fontWeight: 600 }}>dundun</span>
        <span>영양사인증완료</span>
      </AboutMe>
      <MyLogUl>
        <ListBtn onClick={() => navigate("/profile/edit")}>
          <MyLogLI>
            <IconStyle icon={faCircleUser} className="icon" />
            개인정보수정
          </MyLogLI>
        </ListBtn>
        <ListBtn onClick={() => navigate("/profile/myposts")}>
          <MyLogLI>
            <IconStyle icon={faPencil} className="icon" />내 게시글
          </MyLogLI>
        </ListBtn>
        <ListBtn>
          <MyLogLI>
            <IconStyle icon={faCommentDots} className="icon" />내 댓글
          </MyLogLI>
        </ListBtn>
        <ListBtn>
          <MyLogLI>
            <IconStyle icon={faHeart} className="icon" />
            좋아요한 글
          </MyLogLI>
        </ListBtn>
        <ListBtn>
          <MyLogLI>
            <IconStyle icon={faBookmark} className="icon" />
            북마크한 글
          </MyLogLI>
        </ListBtn>
        <ListBtn>
          <MyLogLI>
            <IconStyle icon={faGem} className="icon" />
            포인트 관리
          </MyLogLI>
        </ListBtn>
      </MyLogUl>
      <Button onClick={logout}>
        <IconStyle icon={faArrowRightFromBracket} />
        {"\u00a0"}로그아웃
      </Button>
    </Container>
  );
}

export default ProfileMenu;

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

const AboutMe = styled.div`
  display: flex;
  height: 170px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
`;

const IconStyle = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const MyLogLI = styled.div`
  display: flex;
  width: 180px;
  height: 50px;
  border-radius: 30px;
  align-items: center;
  padding-left: 30px;
  font-size: 18px;
  font-weight: 600;
  /* border: solid 1px black; */
`;

const MyLogUl = styled.ul`
  display: flex;
  flex-direction: column;
  height: 400px;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  margin-bottom: 20px;
  padding: 20px 0px;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 700px;
  /* border: solid 1px black; */
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const ListBtn = styled.button`
  background: none;
  border-radius: 40px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #fc8153;
    color: white;
  }
`;

const Button = styled.button`
  display: flex;
  width: 180px;
  height: 50px;
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
