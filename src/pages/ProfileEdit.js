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
      <Contents>개인정보수정페이지입니다.</Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
      <Contents>개인정보수정페이지입니다.</Contents>
    </>
  );
}

export default ProfileEdit;

const Contents = styled.div`
  width: 100%;
  height: 300px;
  border: solid 1px red;
  border-radius: 50px;
  background-color: whitesmoke;
  margin-bottom: 40px;
  padding: 30px;
`;
