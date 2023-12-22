import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ProfileMyComments() {
  return (
    <ProfileForm>
      <TitleDiv>
        <Title>내 댓글</Title>
        <Div />
        <SubTitle>식단공유 게시판</SubTitle>
      </TitleDiv>
      <div style={{ fontSize: 14, color: "grey", marginBottom: 5 }}>
        <FontAwesomeIcon icon={faCommentDots} style={{ marginRight: 5 }} />
        내가 남긴 댓글은 수정만 가능하며, 삭제가 불가합니다.
      </div>
      <BodyGrid>
        <BodyTitle>댓글 내용</BodyTitle>
        <BodyTitle>날짜</BodyTitle>
        <BodyItem>너무 좋은 식단이에요!</BodyItem>
        <BodyItem>2023-10-10</BodyItem>
        <BodyItem>너무 좋은 식단이에요!</BodyItem>
        <BodyItem>2023-10-10</BodyItem>
      </BodyGrid>
    </ProfileForm>
  );
}

export default ProfileMyComments;

const BodyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: 50px;
  justify-content: center;
  border-top: solid 1px #c9c9c9;
  font-size: 16px;
`;

const BodyTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: 50px;
  justify-content: center;
  background-color: #3b7339;
  color: white;
  font-weight: 600;
  font-size: 17px;
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const Span = styled.span`
  font-size: 16px;
  color: "#505050";
`;

const Img = styled.div`
  display: flex;
  width: 160px;
  height: 120px;
  border: solid 1px black;
  border-radius: 20px;
  margin-right: 20px;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: solid 1px black;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Div = styled.div`
  display: flex;
  width: 10px;
  height: 30px;
  background-color: grey;
  margin-right: 20px;
`;

const ContentTitle = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 600;
  margin-right: 15px;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  border: solid 1px black;
  margin-bottom: 20px;
  padding: 20px;
`;

const SubTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: #3b7339;
`;

const Title = styled.div`
  display: flex;
  font-size: 23px;
  font-weight: 600;
  margin-right: 20px;
`;

const ProfileForm = styled.div`
  width: 800px;
  height: auto;
  padding: 50px;
  margin-inline: auto;
  margin-top: 100px;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
