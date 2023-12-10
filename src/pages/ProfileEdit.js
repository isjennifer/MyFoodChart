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
import { Link, Outlet } from "react-router-dom";

function ProfileEdit() {
  return (
    <>
      <Contents>
        <Title>닉네임</Title>
        {/* //추후 변경 필요 */}
        <div>dundun</div>
        <Button>수정하기</Button>
      </Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
    </>
  );
}

export default ProfileEdit;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
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

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  border: solid 1px red;
  background-color: whitesmoke;
  margin-bottom: 40px;
  padding: 30px;
`;
