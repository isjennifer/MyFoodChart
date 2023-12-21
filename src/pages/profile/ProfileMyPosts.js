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
      <Title>내 게시글</Title>
      <Contents>
        <div style={{ display: "flex", marginBottom: 30 }}>
          <Div />
          <ContentTitle>식단공유 게시판</ContentTitle>
        </div>
        <BodyGrid>
          <BodyItem>1</BodyItem>
          <BodyItem>1</BodyItem>
          <BodyItem>1</BodyItem>
          <BodyItem>1</BodyItem>
          <BodyItem>1</BodyItem>
          <BodyItem>1</BodyItem>
        </BodyGrid>
      </Contents>
      <Contents>
        <div style={{ display: "flex", marginBottom: 30 }}>
          <Div />
          <ContentTitle>자유 게시판</ContentTitle>
        </div>
      </Contents>
    </ProfileForm>
  );
}

export default ProfileMyPosts;

const BodyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 125px;
  margin-bottom: 10px;
  border: solid 2px black;
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
`;

const Div = styled.div`
  display: flex;
  width: 10px;
  height: 30px;
  background-color: grey;
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
  display: flex;
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
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
  flex-direction: column;
  width: 100%;
  height: auto;
  /* border: solid 1px black; */
  background-color: whitesmoke;
  margin-bottom: 20px;
  padding: 30px;
`;
