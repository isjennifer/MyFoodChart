import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faPenToSquare,
  faFilter,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "../css/paginationStyle.css";
import { motion } from "framer-motion";
import { useUserInfo } from "../contexts/UserInfoContext";

function RecipeCompany() {
  const [recipeInfoList, setRecipeInfo] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/posts/diet`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data.filter((v) => v.institute === "산업체"))
      .then((data) => setRecipeInfo(data));
  }, []);

  // 페이지네이션 react-paginate
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState();
  const n = 9;

  useEffect(() => {
    setFilterData(
      recipeInfoList?.filter((item, index) => {
        return (index >= page * n) & (index < (page + 1) * n);
      })
    );
  }, [page, recipeInfoList]);

  const { userInfo } = useUserInfo();

  return (
    <>
      <Container initial="start" animate="end" variants={easeDown}>
        <RowDiv>
          <Div style={{ fontWeight: 800, color: "#1A2136", fontSize: 35 }}>
            {/* <FontAwesomeIcon
              icon={faUsers}
              style={{ fontSize: 40, margin: 20, color: "#3b7339" }}
            /> */}
            <img
              src="/img/white_rabbit.png"
              alt="흰바탕토끼귀로고"
              style={{ width: 60, marginRight: 10 }}
            />
            식단을 공유해요!
          </Div>
          <Div>
            <Link to={"/recipes/write"}>
              <Button style={{ width: 130, padding: 10 }}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ fontSize: 20, margin: 5 }}
                />
                글쓰기
              </Button>
            </Link>
            <FontAwesomeIcon
              icon={faFilter}
              style={{ fontSize: 25, margin: 10 }}
            />
          </Div>
        </RowDiv>
        <Div
          style={{
            justifyContent: "center",
            marginTop: 150,
            display: recipeInfoList?.length === 0 ? "flex" : "none",
          }}
        >
          여러분의 식단을 공유 해주세요!
        </Div>
        <BodyGrid>
          {filterData?.map((recipeInfo) => {
            const recipeTitle = recipeInfo?.menues
              .map((menu) => {
                return menu.menuName;
              })
              .join(", ");
            return (
              <Link to={`/recipes/detail/${recipeInfo.id}`}>
                <BodyItem>
                  <Title>
                    <FontAwesomeIcon
                      icon={faBowlFood}
                      style={{ fontSize: 20, marginRight: 15 }}
                    />
                    {recipeTitle.length >= 20
                      ? `${recipeTitle.slice(0, 20)}...`
                      : recipeTitle}
                  </Title>
                  <Img
                    src={`${process.env.REACT_APP_DOMAIN}/${recipeInfo?.recipeImg}`}
                    alt="식단 이미지"
                  />
                  <RowDiv style={{ marginTop: 0 }}>
                    <Div style={{ fontSize: 16, padding: 10 }}>
                      {/* 작성자아이콘으로 바꿔야됨 */}
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ fontSize: 20, marginRight: 5 }}
                      />
                      {userInfo.nickname}
                    </Div>
                    <Div style={{ fontSize: 16, padding: 10 }}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          fontSize: 20,
                          color: "#FC427B",
                          marginRight: 5,
                        }}
                      />
                      좋아요수
                    </Div>
                  </RowDiv>
                </BodyItem>
              </Link>
            );
          })}
        </BodyGrid>
        <div
          style={{ display: recipeInfoList?.length === 0 ? "none" : "flex" }}
        >
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            onPageChange={(event) => setPage(event.selected)}
            breakLabel="..."
            pageCount={Math.ceil(recipeInfoList?.length / n)}
            previousLabel={"<"}
            previousClassName={"previous"}
            nextLabel={">"}
            nextClassName={"next"}
          />
        </div>
      </Container>
    </>
  );
}

export default RecipeCompany;

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

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin-inline: auto;
  /* border: solid 1px black; */
`;

const BodyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  /* border: solid 2px black; */
  position: relative;
`;

const BodyGrid = styled.div`
  display: grid;
  /* position: relative; */
  z-index: 1;
  width: auto;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: 1fr; */
  gap: 20px;
  margin-top: 50px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  background-color: gray;
`;

const RowDiv = styled.div`
  display: inline-flex;
  position: relative;
  width: 100%;
  margin: 30px 0px 0px 0px;
  justify-content: space-between;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  color: #505050;
`;

const Button = styled.button`
  display: flex;
  width: 100px;
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
