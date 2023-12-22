import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ProfileMyPosts() {
  // 서버에서 레시피 목록들 가져오기
  // const [recipeInfoList, setRecipeInfo] = useState(null);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_DOMAIN}/posts/diet?userId=`, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => data.filter((v) => v.institute === "school"))
  //     .then((data) => setRecipeInfo(data.reverse()));
  // }, []);

  //   // 페이지네이션 react-paginate
  //   const [page, setPage] = useState(0);
  //   const [filterData, setFilterData] = useState();
  //   const n = 9;

  //   useEffect(() => {
  //     setFilterData(
  //       recipeInfoList?.filter((item, index) => {
  //         return (index >= page * n) & (index < (page + 1) * n);
  //       })
  //     );
  //   }, [page, recipeInfoList]);

  return (
    <ProfileForm>
      <TitleDiv>
        <Title>내 게시글</Title>
        <Div />
        <SubTitle>식단공유 게시판</SubTitle>
      </TitleDiv>
      <Contents>
        <Img />
        <ContentDiv>
          <div style={{ display: "flex" }}>
            <ContentTitle>메뉴</ContentTitle>
            <Span>현미밥, 미역국, 채소무침, 불고기, 배추김치, 사과주스</Span>
          </div>
          <div style={{ display: "flex" }}>
            <ContentTitle>작성일</ContentTitle>
            <Span>2023-10-10</Span>
          </div>
          <div style={{ display: "flex" }}>
            <ContentTitle>좋아요 받은 수</ContentTitle>
            <Span>
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  fontSize: 16,
                  color: "#FC427B",
                  marginRight: 5,
                }}
              />
              300
            </Span>
          </div>
        </ContentDiv>
      </Contents>
    </ProfileForm>
  );
}

export default ProfileMyPosts;

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
  border-radius: 30px;
  border: solid 1px black;
  margin-bottom: 20px;
  padding: 20px;
  background-color: whitesmoke;
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
