import { useEffect, useState } from "react";
import styled from "styled-components";

function ProfileEdit() {
  const [userID, setUserID] = useState(0);
  const [newUserName, setNewUserName] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/users/aboutme`)
      .then((response) => response.json())
      .then((data) => {
        setUserID(data.id);
        setNewUserName(data.name);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewUserName(event.target.value);
  };

  const userNameEditHandle = () => {
    if (window.confirm("닉네임을 수정하시겠습니까?")) {
      fetch(`${process.env.REACT_APP_DOMAIN}/users/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUserName }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("에러 발생!");
        })
        .then(() => {
          window.alert("수정 되었습니다.");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      window.alert("취소 되었습니다.");
    }
  };
  const userDeleteHandle = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      fetch(`${process.env.REACT_APP_DOMAIN}/users/${userID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userID }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("에러 발생!");
        })
        .then(() => {
          window.alert("탈퇴 되었습니다.");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      window.alert("취소 되었습니다.");
    }
  };

  return (
    <ProfileForm>
      <Title>개인정보수정</Title>
      <Contents>
        <Div />
        <ContentTitle>닉네임</ContentTitle>
        {/* //추후 변경 필요 */}
        <Input value={newUserName} onChange={handleInputChange}></Input>
        <Button onClick={userNameEditHandle}>수정하기</Button>
      </Contents>
      {/* <Contents>
        <Div />
        <ContentTitle>프로필 사진</ContentTitle>
        <Input></Input>
        <Button>수정하기</Button>
      </Contents> */}
      <Contents>
        <Div />
        <ContentTitle>영양사 인증</ContentTitle>
        {/* //추후 변경 필요 */}
        <Input placeholder="영양사 면허번호를 입력해주세요."></Input>
        <Button onClick={() => window.alert("준비중인 기능입니다.")}>
          인증하기
        </Button>
      </Contents>
      <Contents>
        <Div />
        <ContentTitle>회원 탈퇴</ContentTitle>
        <Button onClick={userDeleteHandle}>탈퇴하기</Button>
      </Contents>
    </ProfileForm>
  );
}

export default ProfileEdit;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin-right: 30px;
`;

const ContentTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
  margin-right: 30px;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: flex;
  width: 100px;
  height: 35px;
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

const Div = styled.div`
  display: flex;
  width: 10px;
  height: 30px;
  background-color: grey;
  margin-right: 30px;
`;

const ProfileForm = styled.div`
  width: 800px;
  height: 600px;
  padding: 30px;
  margin-inline: auto;
  margin-top: 100px;
  color: #505050;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  /* border: solid 1px black; */
  background-color: whitesmoke;
  margin-bottom: 20px;
  padding: 30px;
`;
