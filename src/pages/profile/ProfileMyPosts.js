import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ProfileMyPosts() {
  // 서버에서 레시피 목록들 가져오기
  const [myPosts, setMyPosts] = useState(null);

  const [myPostsType, setMyPostsType] = useState("");

  const filterMyPosts = (type) => {
    setMyPostsType(`?type=${type}`);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/profile/myposts${myPostsType}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMyPosts(data);
      });
  }, []);

  // 페이지네이션 react-paginate
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const n = 9;

  useEffect(() => {
    if (myPosts) {
      const startIndex = page * n;
      const endIndex = (page + 1) * n;
      setFilterData(myPosts.slice(startIndex, endIndex));
    }
  }, [page, myPosts]);
  console.log(filterData);

  return (
    <ProfileForm>
      <TitleDiv>
        <Title>내 게시글</Title>
        <Div />
        <SubTitle onClick={() => filterMyPosts("diet")}>
          식단공유 게시판
        </SubTitle>
        <SubTitle onClick={() => filterMyPosts("free")}>자유 게시판</SubTitle>
      </TitleDiv>
      {filterData?.map((myPostsInfo) => {
        const recipeTitle = Array.isArray(myPostsInfo?.menu)
          ? myPostsInfo.menu.map((menu) => menu.menuName).join(", ")
          : "loading...";
        return (
          <Link to={`/recipes/detail/${myPostsInfo.id}`}>
            <Contents>
              <Img
                src={`${process.env.REACT_APP_DOMAIN}/${myPostsInfo?.recipeImg}`}
                alt="식단 이미지"
              />
              <ContentDiv>
                <div style={{ display: "flex" }}>
                  <ContentTitle>메뉴</ContentTitle>
                  <Span>{recipeTitle}</Span>
                </div>
                <div style={{ display: "flex" }}>
                  <ContentTitle>작성일</ContentTitle>
                  <Span>{myPostsInfo?.createdAt}</Span>
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
                    {/* 추후 변경 필요 */}
                    300
                  </Span>
                </div>
              </ContentDiv>
            </Contents>
          </Link>
        );
      })}
      <ReactPaginate
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        onPageChange={(event) => setPage(event.selected)}
        breakLabel="..."
        pageCount={Math.ceil(myPosts?.length / n)}
        previousLabel={"<"}
        previousClassName={"previous"}
        nextLabel={">"}
        nextClassName={"next"}
      />
    </ProfileForm>
  );
}

export default ProfileMyPosts;

const Span = styled.span`
  font-size: 16px;
  color: "#505050";
`;

const Img = styled.img`
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

const SubTitle = styled.button`
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
