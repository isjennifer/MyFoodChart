import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useIsLoginState } from "../components/IsLoginContext";
import REACT_APP_DOMAIN from "react";
import { motion } from "framer-motion";

function Login() {
  function getUser(platform) {
    // 리다이렉트 방식으로 변경
    window.location.href = `${REACT_APP_DOMAIN}/auth/login/${platform}`;
  }

  return (
    <>
      <LoginForm initial="start" animate="end" variants={easeDown}>
        <img
          src="http://localhost:3000/img/대나무흰바탕한글로고.png"
          alt="흰바탕한글로고"
          style={{ width: 150 }}
        />
        <span style={{ margin: 20 }}>
          소셜 로그인으로 레시피숲을 이용해보세요!
        </span>
        <Button
          onClick={() => getUser("naver")}
          style={{ backgroundColor: "#4cd137" }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJjAvpt6-Z981z6LFyIgBeYfp-kONUE3xtA&usqp=CAU"
            style={{ width: 35, marginRight: 10 }}
            alt="네이버로그인"
          />
          NAVER 로그인
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 5 }} />
        </Button>
        <Button
          onClick={() => getUser("kakao")}
          style={{ backgroundColor: "#f9ca24" }}
        >
          <img
            src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png"
            style={{ width: 35, marginRight: 10 }}
            alt="카카오로그인"
          />
          KAKAO 로그인
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 5 }} />
        </Button>
        {/* <DivisionLine></DivisionLine>
        <span style={{ fontSize: 12 }}>© 2023. 레시피숲. all rights reserved.</span> */}
      </LoginForm>
    </>
  );
}

export default Login;

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

const LoginForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  width: 430px;
  height: 400px;
  padding: 30px;
  margin-inline: auto;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  color: #505050;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Button = styled.button`
  display: flex;
  width: 95%;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #7b7b7b;
  color: white;
  font-size: 18px;
  border: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
