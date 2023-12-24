import styled from "styled-components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTriangleExclamation,
  faArrowLeft,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCheck,
  faSquare,
  faCommentDots,
  faHeart,
  faBookmark,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams, Link } from "react-router-dom";
import WrapComments from "../components/common/comments/WrapComments.js";

function RecipeDetail() {
  // 서버에서 메뉴이름들 가져오기
  const [recipePosts, setRecipePosts] = useState(null);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/posts/diet/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipePosts(data);
        console.log("data:", data);
      });
  }, [id]);

  // 삭제 기능
  const navigate = useNavigate();
  const recipePostsDelete = () => {
    fetch(`${process.env.REACT_APP_DOMAIN}/posts/diet/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러 발생!");
      })
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        if (window.confirm("삭제 하시겠습니까?")) {
          navigate("/recipes/school");
          window.alert("삭제 되었습니다.");
        } else {
          window.alert("취소 되었습니다.");
        }
      });
  };

  return (
    <>
      <HeadDiv style={{ fontWeight: 600 }}>
        <IconStyle
          icon={faBowlFood}
          style={{ fontSize: 40, margin: 20, color: "#3b7339" }}
        />
        식단 상세정보
      </HeadDiv>

      <Form>
        <HeaderGrid>
          <HeaderItem>
            <RowDiv>
              <Title>작성자</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>{recipePosts?.user.nickname}</HeaderItem>
          <HeaderItem />
          <HeaderItem />
          <HeaderItem>
            <RowDiv>
              <Title>급식일</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>{recipePosts?.date}</HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>구{"\u00a0\u00a0\u00a0"}분</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>
            {recipePosts?.institute === "school"
              ? recipePosts.whichSchool
              : recipePosts?.institute}
          </HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>식{"\u00a0\u00a0\u00a0"}수</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>{recipePosts?.peopleNum}명</HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>식단가</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>{recipePosts?.price}원</HeaderItem>
        </HeaderGrid>

        <UploadImg
          src={`${process.env.REACT_APP_DOMAIN}/${recipePosts?.recipeImg}`}
          alt="식단 이미지"
        />

        <BodyGrid>
          <BodyItem />
          <BodyItem>
            <Title>메뉴명</Title>
          </BodyItem>
          <BodyItem>
            <Title style={{ textAlign: "center", fontSize: 17 }}>
              공산품
              <br />
              사용여부
            </Title>
          </BodyItem>
          <BodyItem>
            <Title>제품명</Title>
          </BodyItem>
          <BodyItem>
            <Title>브랜드</Title>
          </BodyItem>
          <BodyItem />
        </BodyGrid>

        <RowDivisionLine />
        {recipePosts?.menues.map((data) => {
          return (
            <>
              <BodyGrid key={data.id}>
                <BodyItem>
                  <Title>메뉴 {data.id + 1}</Title>
                  <DivisionLine />
                </BodyItem>
                <BodyItem>{data.menuName}</BodyItem>
                <BodyItem>
                  {data.isProductUsed ? (
                    <IconStyle icon={faSquareCheck} />
                  ) : (
                    <IconStyle icon={faSquare} />
                  )}
                </BodyItem>
                <BodyItem>{data.productName}</BodyItem>
                <BodyItem>{data.productBrand}</BodyItem>
              </BodyGrid>
            </>
          );
        })}

        <FooterGrid>
          <FooterItem>
            <RowDiv>
              <Title>메뉴설명</Title>
              <DivisionLine />
            </RowDiv>
          </FooterItem>
          <FooterItem>{recipePosts?.explanation}</FooterItem>
          <FooterItem>
            <RowDiv>
              <Title>레시피 파일</Title>
              <DivisionLine />
            </RowDiv>
          </FooterItem>
          <FooterItem>
            <a
              href={`${process.env.REACT_APP_DOMAIN}/${recipePosts?.recipeFile}`}
              download={`recipe_${recipePosts?.user.name}`}
            >
              클릭하여 다운로드
            </a>
          </FooterItem>
        </FooterGrid>

        <FuncDiv>
          <RowDiv>
            <IconStyle icon={faCommentDots} />
            <Title>댓글</Title>
          </RowDiv>
          <div>
            <RowDiv style={{ marginRight: 20 }}>
              <IconStyle icon={faHeart} />
              좋아요
            </RowDiv>
            <RowDiv style={{ marginRight: 20 }}>
              <IconStyle icon={faBookmark} />
              북마크
            </RowDiv>
            <RowDiv>
              <IconStyle icon={faTriangleExclamation} />
              신고
            </RowDiv>
          </div>
        </FuncDiv>
        <RowDivisionLine />
        <WrapComments />
        <RowDivisionLine />
        <FuncDiv>
          <Link to={`/recipes/school`}>
            <Button>
              <IconStyle icon={faArrowLeft} />
              목록으로
            </Button>
          </Link>
          {/* 수정 삭제 부분은 토큰을 가진 유저(해당 글을 작성한 유저만 보이게 구현하기) */}
          <RowDiv>
            <Link to={`/recipes/edit/${recipePosts?.id}`}>
              <Button>
                <IconStyle icon={faPenToSquare} />
                수정
              </Button>
            </Link>
            <Button onClick={recipePostsDelete}>
              <IconStyle icon={faTrashCan} />
              삭제
            </Button>
          </RowDiv>
        </FuncDiv>
      </Form>
    </>
  );
}

export default RecipeDetail;

const IconStyle = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const FuncDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  margin-top: 100px;
`;

const Button = styled.div`
  display: flex;
  width: 160px;
  height: 60px;
  background-color: #f97f51;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  /* margin-bottom: 40px; */
  &:hover {
    cursor: pointer;
  }
`;

const UploadImg = styled.img`
  display: flex;
  flex-direction: column;
  margin: 30px 0px 80px 0px;
  width: 800px;
  height: 500px;
  background-color: #dedede;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-weight: 600;
`;

const DivisionLine = styled.div`
  height: 25px;
  border: solid #7b7b7b 1px;
  margin: 0px 20px;
`;
const RowDivisionLine = styled.div`
  width: 100%;
  border: solid #dedede 1px;
  margin: 20px 0px 20px 0px;
`;

const Form = styled.div`
  width: 70%;
  height: auto;
  padding: 100px 100px;
  margin-inline: auto;
  color: #505050;
  border-radius: 50px;
  font-size: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const HeadDiv = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  color: #505050;
  font-size: 30px;
  padding: 50px 200px 30px 200px;
`;

const RowDiv = styled.div`
  display: inline-flex;
  color: #505050;
`;

const FooterItem = styled.div`
  width: auto;
  height: auto;
  /* border: solid 2px black; */
  &:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  &:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 30px auto;
  grid-template-rows: minmax(50px, auto);
  gap: 30px 10px;
  margin-top: 50px;
`;

const BodyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;
  margin-bottom: 10px;
  /* border: solid 2px black; */
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 0.5fr 1fr 1fr 0.2fr;
  /* grid-template-rows: 1fr; */
  gap: 10px;
`;

const HeaderItem = styled.div`
  /* display: flex;
    align-items: center; */
  width: auto;
  height: 50px;
  /* border: solid 2px black; */
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px 1fr);
  grid-auto-rows: minmax(50px, auto);
  gap: 10px;
  margin-bottom: 50px;
`;
