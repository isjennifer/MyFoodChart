import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil,faTriangleExclamation,faArrowRight,faMagnifyingGlass, faImage, faPlus,faSquareMinus} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck,faSquare,faCommentDots,faHeart,faBookmark,faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Footer from "../components/Footer.js"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams, Link } from "react-router-dom"
import WrapComments from "../components/WrapComments.js"



function RecipeDetail () {

// Navbar 모바일 반응형
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

// 서버에서 메뉴이름들 가져오기
    const [recipePosts, setRecipePosts] = useState(null);
    const params = useParams();
    const {id} = params;
    useEffect(() => {
        fetch("http://localhost:3010/recipePosts")
        .then((response) => response.json())
        .then((data) => data.find((data) => {
            return data.id == id;
        }))
        .then((data) => {setRecipePosts(data)})
    }, []);

// 삭제 기능
    const navigate = useNavigate();
    const recipePostsDelete = () => {
            fetch(`http://localhost:3010/recipePosts/${id}`, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok === true) {
                    return response.json();
                    }
                throw new Error("에러 발생!");
            }).catch((error) => {
                alert(error);
            }).then(() => {
                if(window.confirm("삭제 하시겠습니까?")){
                    navigate('/recipe/recipe_school')
                    window.alert("삭제 되었습니다.")
                } else {
                    window.alert("취소 되었습니다.")
                };
            });
    }
   
// 서버로 댓글 보내기
    // const onSubmit = (data) => {
    //     fetch("http://localhost:3010/comments",{
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     }).then((response) => {
    //         if (response.ok === true) {
    //             return response.json();
    //             }
    //         throw new Error("에러 발생!");
    //     }).catch((error) => {
    //         alert(error);
    //     }).then((data) => {
    //         if(window.confirm("댓글을 남기시겠습니까?")){
    //             console.log("댓글이 등록되었습니다.")
    //             console.log(data)
    //         } else {
    //             console.log("취소 되었습니다.")
    //         };
    //     });

    // }

// 서버에서 댓글 가져오기
    // const [comment, setComment] = useState(null);
            
    // useEffect(() => {
    //     fetch("http://localhost:3010/profile")
    //     .then((response) => response.json())
    //     .then((data) => setComment(data))
    // }, [comment]);






    return(
        <>
        <Navbar 
            toggleMenu={toggleMenu} 
            setToggleMenu={setToggleMenu} 
            toggleProfile={toggleProfile} 
            setToggleProfile={setToggleProfile}
        />

        <HeadDiv style={{fontWeight:600}}>
        <FontAwesomeIcon icon={faPencil} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
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
                <HeaderItem>
                    {recipePosts?.user.name}
                </HeaderItem>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem>
                    <RowDiv>
                    <Title>급식일</Title>
                    <DivisionLine />
                    </RowDiv>
                </HeaderItem>
                <HeaderItem>
                    {recipePosts?.date}
                </HeaderItem>
                <HeaderItem>
                    <RowDiv>
                    <Title>구{"\u00a0\u00a0\u00a0"}분</Title>
                    <DivisionLine />
                    </RowDiv>
                </HeaderItem>
                <HeaderItem>
                    {recipePosts?.institute == 'school' ? recipePosts.whichSchool : recipePosts?.institute}
                </HeaderItem>
                <HeaderItem>
                    <RowDiv>
                    <Title>식{"\u00a0\u00a0\u00a0"}수</Title>
                    <DivisionLine />
                    </RowDiv>
                </HeaderItem>
                <HeaderItem>
                    {recipePosts?.peopleNum}명
                </HeaderItem>
                <HeaderItem>
                    <RowDiv>
                    <Title>식단가</Title>
                    <DivisionLine />
                    </RowDiv>
                </HeaderItem>
                <HeaderItem>
                    {recipePosts?.price}원
                </HeaderItem>
            </HeaderGrid>

            <UploadImg src={recipePosts?.recipeImg} alt="식단 이미지"/>

            <BodyGrid>
                <BodyItem/>
                <BodyItem>
                    <Title>메뉴명</Title>
                </BodyItem>
                <BodyItem>
                    <Title style={{textAlign:"center", fontSize:17}}>공산품<br/>사용여부</Title>
                </BodyItem>
                <BodyItem>
                    <Title>제품명</Title>
                </BodyItem>
                <BodyItem>
                    <Title>브랜드</Title>
                </BodyItem>
                <BodyItem/>
            </BodyGrid>

            <RowDivisionLine />

                {recipePosts?.menues.map((data)=>{
                    return (
                        <>
                        <BodyGrid key={data.id}>
                            <BodyItem>
                                <Title>메뉴 {data.id + 1}</Title><DivisionLine />
                            </BodyItem>
                            <BodyItem>{data.menuName}</BodyItem>
                            <BodyItem>{data.isProductUsed ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</BodyItem>
                            <BodyItem>{data.productName}</BodyItem>
                            <BodyItem>{data.productBrand}</BodyItem>
                        </BodyGrid>
                        </>
                    )
                })}


            <FooterGrid>
                <FooterItem>
                    <RowDiv>
                        <Title>메뉴설명</Title>
                        <DivisionLine />
                    </RowDiv>
                </FooterItem>
                <FooterItem>
                    {recipePosts?.explanation}
                </FooterItem>
                <FooterItem>
                    <RowDiv>
                        <Title>레시피 파일</Title>
                        <DivisionLine />
                    </RowDiv>
                </FooterItem>
                <FooterItem>
                    <a href={recipePosts?.recipeFile} download={`recipe_${recipePosts?.user.name}`}>
                            클릭하여 다운로드
                    </a>
                </FooterItem>
            </FooterGrid>
        

                    <RowDiv>
                        <FontAwesomeIcon icon={faCommentDots} />
                        댓글
                        <FontAwesomeIcon icon={faHeart} />
                        좋아요
                        <FontAwesomeIcon icon={faBookmark} />
                        북마크
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        신고
                    </RowDiv>
                {/* 
                <RowDivisionLine />
                    {/* {comment?.map((data) => {
                        return (
                            <>
                            <RowDiv>
                            <div>{data.id}</div>
                            <div>{data.comment}</div>
                            </RowDiv>
                            </>
                        )
                    })}
                    <CommentBox onSubmit={handleSubmit(onSubmit)}>
                        <CommentInput {...register("comment")} name="comment" placeholder="댓글 남기기..."/>
                        <button type="submit" style={{border:"none", backgroundColor:"transparent"}}>
                        <FontAwesomeIcon icon={faArrowRight} style={{fontSize:20, margin:10}}/>
                        </button>
                    </CommentBox>
                    */}
                <RowDivisionLine />
                    <WrapComments />
                <RowDivisionLine />
                    <RowDiv>
                        <Link to={`/recipe_edit/${recipePosts?.id}`}>
                            <Button>
                                <FontAwesomeIcon icon={faPenToSquare} />수정
                            </Button>
                        </Link>
                        <Button onClick={recipePostsDelete}>
                            <FontAwesomeIcon icon={faTrashCan} />삭제
                        </Button>
                    </RowDiv>
                
                

        </Form>

        <Footer/>
        </>
    );
}

export default RecipeDetail;


const CommentBox = styled.form`
    display: inline-flex;
    background-color: white;
    border: #7B7B7B solid 1px;
    padding: 0px 10px;
    border-radius: 40px;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: space-between;


`
const CommentInput = styled.input`
    border: none; // 검색창 border 을 없앰으로써 자연스러워짐
    -webkit-appearance: none; // 기본 search 디자인을 없앰
    width: 100%;
    height: 40px;
    margin: 0px 10px;
    overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
    font-size: 18px;
    &:focus{
        outline: none;
    };
`


const FormSubmitBtn = styled.button`
    display: flex;
    width: 100%;
    height: 80px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    background-color: #F97F51;
    color: white;
    border: none;
    font-size: 20px;
    &:hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }


`
const Button = styled.div`
    display: flex;
    width: 160px;
    height: 60px;
    background-color: #F97F51;
    color: white;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    margin-bottom: 40px;
    &:hover{
        cursor: pointer;
    }
    
`

const UploadImg = styled.img`
    display: flex;
    flex-direction: column;
    margin: 30px 0px 80px 0px;
    width: 800px;
    height: 500px;
    background-color: #DEDEDE;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
    }
    
`

const MenuTitle = styled.div`
    font-weight: 600;

`

const Title = styled.p`
    font-weight: 600;

`

const Input = styled.input`
    width: 70px;
    font-size: 18px;
    margin: 0px 10px;
`


const DivisionLine = styled.div`
    height: 25px;
    border: solid #7B7B7B 1px;
    margin: 0px 20px;

`
const RowDivisionLine = styled.div`
  width: 100%;
  border: solid #DEDEDE 1px;
  margin: 20px 0px 40px 0px;
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

`

const MenuTitleDiv = styled.div`
    display: inline-flex;
    align-items: center;
    color: #505050;
    width: 100%;
    margin-bottom: 30px;


`

const FormDiv = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    color: #505050;
    width: 100%;
    padding-bottom: 50px;


`


const RowDiv = styled.div`
    display: inline-flex;
    color: #505050;

` 


const ColDiv = styled.div`
    display: flex;
    flex-direction: column;
    color: #505050;


` 
const FooterItem = styled.div`
    width: auto;
    height: auto;
    /* border: solid 2px black; */
    &:nth-child(2){
        grid-column: 2 / 4;
        grid-row: 1 / 2;
    }
    &:nth-child(3){
        grid-column: 1 / 3;
        grid-row: 2 / 3;
    }

`

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 120px 30px auto;
    grid-template-rows: minmax(50px, auto);
    gap: 30px 10px;
    margin-top: 50px;

` 

const BodyItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 50px;
    margin-bottom: 10px; 
    /* border: solid 2px black; */

`

const BodyGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr 0.5fr 1fr 1fr 0.2fr;
    /* grid-template-rows: 1fr; */
    gap: 10px;

` 

const HeaderItem = styled.div`
    /* display: flex;
    align-items: center; */
    width: auto;
    height: 50px;
    /* border: solid 2px black; */

`

const HeaderGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 100px 1fr);
    grid-auto-rows: minmax(50px, auto);
    gap: 10px;
    margin-bottom: 50px;

`