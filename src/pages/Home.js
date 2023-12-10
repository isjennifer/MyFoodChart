import styled from "styled-components";
import Navbar from "../components/common/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { IsLoginContext } from "../contexts/IsLoginContext";
import { useIsLoginState } from "../contexts/IsLoginContext";

function Home() {
  const { setIsLogin } = useContext(IsLoginContext);
  const userLoginStatus = useIsLoginState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLogin(data.isLogIn);
      });
  }, []);

  useEffect(() => {
    if (userLoginStatus === true) {
      fetch(`${process.env.REACT_APP_DOMAIN}/users/aboutme`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        });
    }
  }, []);

  return (
    <>
      <Background>
        <NavDiv>
          <Navbar />
        </NavDiv>
        <Div initial="start" animate="end" variants={easeDown}>
          {userName ? (
            <>
              <SubTitle>레시피숲에 오신 것을 환영합니다!</SubTitle>
              <Title>{userName}님의 식단을 함께 공유해요!</Title>
            </>
          ) : (
            <>
              <SubTitle>전문가의 식단공유 플랫폼</SubTitle>
              <Title>레시피숲, Recipe:SOUP</Title>
            </>
          )}
        </Div>
      </Background>
    </>
  );
}

export default Home;

//////////// framer-motion (animation)

const easeDown = {
  start: { opacity: 0, y: -100 },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

/////////// styled-component

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("/img/background_img.jpg");
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-inline: auto;
`;

const NavDiv = styled.div`
  display: flex;
  width: 100vw;
  position: fixed;
  top: 0;
`;

const Div = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
  color: white;
  margin: auto 0;
  font-weight: 500;
`;

const SubTitle = styled.span`
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.span`
  display: flex;
  font-size: 30px;
`;
