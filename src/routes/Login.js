import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

  function getUser(platform) {
    // 리다이렉트 방식으로 변경
    window.location.href = `http://localhost:3001/auth/login/${platform}`;
  }

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:3001/auth/login/naver");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        toggleProfile={toggleProfile}
        setToggleProfile={setToggleProfile}
      />
      <LoginForm>
        <Logo>모두의 식판</Logo>
        <span style={{ margin: 20 }}>소셜 로그인으로 모두의 식판을 이용해보세요!</span>
        <Button onClick={() => getUser("naver")} style={{ backgroundColor: "#4cd137" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJjAvpt6-Z981z6LFyIgBeYfp-kONUE3xtA&usqp=CAU"
            style={{ width: 35, marginRight: 10 }}
          />
          NAVER 로그인
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 5 }} />
        </Button>
        <Button onClick={() => getUser("kakao")} style={{ backgroundColor: "#f9ca24" }}>
          <img
            src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png"
            style={{ width: 35, marginRight: 10 }}
          />
          KAKAO 로그인
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: 5 }} />
        </Button>
        <DivisionLine></DivisionLine>
        <span style={{ fontSize: 12 }}>© 2023. 모두의식판. all rights reserved.</span>
      </LoginForm>
    </>
  );
}

export default Login;

const DivisionLine = styled.div`
  width: 350px;
  border: solid #dedede 1px;
  margin: 30px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  width: 430px;
  height: 500px;
  padding: 30px;
  margin-inline: auto;
  justify-content: center;
  align-items: center;
  color: #505050;
  border-radius: 50px;
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
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const Logo = styled.span`
  font-family: "Sunflower", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #f97f51;
  margin: 20px;
`;
