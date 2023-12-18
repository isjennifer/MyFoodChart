import { Link } from "react-router-dom";
import styled from "styled-components";

function ProfileMenu() {
  return (
    <Container>
      {"메뉴박스 입니다!"}
      <Link to={"/profile"}>프로필 링크</Link>
    </Container>
  );
}

export default ProfileMenu;

const Container = styled.div`
  width: 300px;
  height: 800px;
  border: solid 1px black;
`;
