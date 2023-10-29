import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil,faTriangleExclamation,faArrowRight,faMagnifyingGlass, faImage, faPlus,faSquareMinus} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck,faSquare,faCommentDots,faHeart,faBookmark,faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Footer from "../components/Footer.js"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"


function RecipeDetail () {

// Navbar 모바일 반응형
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);


    const { register, handleSubmit, watch } = useForm();



// 서버에서 메뉴이름들 가져오기
    const [recipeInfo, setRecipeInfo] = useState(null);
    
    useEffect(() => {
        fetch("http://localhost:3010/comments")
        .then((response) => response.json())
        .then((data) => data.find((data) => {
            return data.id === 2;
        }))
        .then((data) => setRecipeInfo(data))
    }, []);


// 서버에서 데이터 가져오기
    const [userName, setUserName] = useState(null);
        
    useEffect(() => {
        fetch("http://localhost:3010/posts")
        .then((response) => response.json())
        .then((data) => setUserName(data))
    }, []);

    const menues = recipeInfo?.menues.map((data)=>{return data})
   


// 서버로 댓글 보내기
    const onSubmit = (data) => {
        fetch("http://localhost:3010/profile",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok === true) {
                return response.json();
                }
            throw new Error("에러 발생!");
        }).catch((error) => {
            alert(error);
        }).then((data) => {
            if(window.confirm("댓글을 남기시겠습니까?")){
                console.log("댓글이 등록되었습니다.")
                console.log(data)
            } else {
                console.log("취소 되었습니다.")
            };
        });

    }


// 서버에서 댓글 가져오기
    const [comment, setComment] = useState(null);
            
    useEffect(() => {
        fetch("http://localhost:3010/profile")
        .then((response) => response.json())
        .then((data) => setComment(data))
    }, [comment]);






    return(
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <HeadDiv style={{fontWeight:600}}>
        <FontAwesomeIcon icon={faPencil} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
            식단 상세정보
        </HeadDiv>
        <Form>
            <FormDiv>
                    <RowDiv>
                        <Title>작성자</Title>
                        <DivisionLine />
                        {userName?.map((data) => (<div key={data.name}>{data.name}</div>))}
                    </RowDiv>
                    <RowDiv>
                        <Title>급식일</Title>
                        <DivisionLine />
                        {recipeInfo?.date}
                    </RowDiv>
                </FormDiv>
                <FormDiv>
                    <RowDiv>
                        <Title>구분</Title>
                        <DivisionLine style={{height:100}}/>
                        {recipeInfo?.institute == 'school' ? recipeInfo.whichSchool : recipeInfo?.institute}
                    </RowDiv>
                    <ColDiv style={{paddingRight:95}}>
                        <RowDiv style={{paddingBottom:50}}>
                            <Title>식수</Title>
                            <DivisionLine />
                            {recipeInfo?.peopleNum}명
                        </RowDiv>
                        <RowDiv>
                            <Title>식단가</Title>
                            <DivisionLine />
                            {recipeInfo?.price}원
                        </RowDiv>
                    </ColDiv>
                </FormDiv>
                <UploadImg>
                     <img src={recipeInfo?.recipeImg} alt="식단 이미지"/>
                </UploadImg>

                <MenuTitleDiv>
                    <MenuTitle style={{marginLeft:20}}>구분</MenuTitle>
                    <MenuTitle style={{marginLeft:110}}>메뉴명</MenuTitle>
                    <MenuTitle style={{marginLeft:85, textAlign:'center', fontSize:18}}>공산품<br/>사용</MenuTitle>
                    <MenuTitle style={{marginLeft:85}}>사용 제품명</MenuTitle>
                    <MenuTitle style={{marginLeft:135}}>브랜드</MenuTitle>
                </MenuTitleDiv>
                
            
                {menues?.map((data)=>{
                    return (
                        <>
                        <FormDiv>
                            <RowDiv>
                                <Title>메뉴</Title>{data.id + 1}<DivisionLine />
                            </RowDiv>
                            <div>{data.menuName}</div>
                            <div>{data.isProductUsed ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</div>
                            <div>{data.productName}</div>
                            <div>{data.productBrand}</div>
                        </FormDiv>
                        </>
                    )
                })}
                    
                

                <FormDiv>
                    <RowDiv>
                        <Title>설명</Title>
                        <DivisionLine />
                        {recipeInfo?.explanation}
                    </RowDiv>
                </FormDiv>
                <FormDiv style={{marginTop: 30}}>
                    <RowDiv>
                        <Title>레시피 정보</Title>
                        <DivisionLine />
                        {recipeInfo?.recipeFile}
                    </RowDiv>
                </FormDiv>

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

                <RowDivisionLine />
                    {comment?.map((data) => {
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
                   
                <RowDivisionLine />
                    <RowDiv>
                    <FontAwesomeIcon icon={faPenToSquare} />
                        수정
                        <FontAwesomeIcon icon={faTrashCan} />
                        삭제
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

const UploadImg = styled.div`
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
  display: flex;
  flex-direction: column;
  /* position: relative; */
  width: 70%;
  height: auto;
  padding: 100px 100px;
  margin-inline: auto;
  justify-content: center;
  align-items: center;
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
