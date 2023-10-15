import { Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar.js"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBowlFood, faUsers, faPenToSquare, faFilter, faHeart} from '@fortawesome/free-solid-svg-icons'
import Footer from "../components/Footer.js"
import Recipe from "./Recipe.js"



function RecipeSchool() {

    // 서버에서 메뉴이름들 가져오기
    const [recipeInfo, setRecipeInfo] = useState(null);
    
    
    useEffect(() => {
        fetch("http://localhost:3010/comments")
        .then((response) => response.json())
        .then((data) => data.find((data) => {
            return data.id === 2;
        }))
        .then((data) => data.menues)
        .then((data) => data.map((item) => {return item.menuName}))
        .then((data) => setRecipeInfo(data))
    }, []);

 

    return (
        <>
        <RowDiv>
            <Div style={{fontWeight:600}}>
                <FontAwesomeIcon icon={faUsers} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
                식단을 공유해요!
            </Div>
            <Div>
                <Link to={"/recipe_write"}>
                    <Button style={{width: 130, padding:10}}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:20, margin:5}} />
                        글쓰기
                    </Button>
                </Link>
                <FontAwesomeIcon icon={faFilter} style={{fontSize:25, margin:10}}/>
            </Div>
        </RowDiv>
        <Div style={{width: 450, fontSize:16, paddingLeft:120}}>
            <div style={{fontWeight:600}}>학교급별</div>
            <DivisionLine />
            <School>유치원</School>
            <School>초등학교</School>
            <School>중학교</School>
            <School>고등학교</School>
        </Div>

        <RecipeList>
            <RecipeCompo>
                <Title>
                    <FontAwesomeIcon icon={faBowlFood} style={{fontSize:20, margin:5}} />
                    {recipeInfo?.join(" - ")}

                </Title>
                <Img>식단이미지</Img>
 
                <Div>
                    <Div style={{fontSize: 16, padding:10}}>
                        {/* 아이콘 바꿔야됨 */}
                        <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:20, margin:5}} />
                        작성자닉네임
                    </Div>
                    <Div style={{fontSize: 16, padding:10}}>
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:20, margin:5, color: "#FC427B"}}  />
                        좋아요수
                    </Div>
                </Div>
            </RecipeCompo>
            <RecipeCompo>
                <Title>
                    <FontAwesomeIcon icon={faBowlFood} style={{fontSize:20, margin:5}} />
                    {recipeInfo?.join(" - ")}

                </Title>
                <Img>식단이미지</Img>
                <Div>
                    <Div style={{fontSize: 16, padding:10}}>
                        {/* 아이콘 바꿔야됨 */}
                        <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:20, margin:5}} />
                        작성자닉네임
                    </Div>
                    <Div style={{fontSize: 16, padding:10}}>
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:20, margin:5, color: "#FC427B"}}  />
                        좋아요수
                    </Div>
                </Div>
            </RecipeCompo>
        </RecipeList>
        <Footer/>
        </>
    );
};

export default RecipeSchool;


const Title = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    align-items: center;


`

const Img = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: gray;

`

const RecipeCompo = styled.div`
    display: flex;
    flex-direction: column;
    width: 46%;
    height: 400px;
    margin: 10px;

`

const RecipeList = styled.div`
    display: flex;
    width: 100%;
    padding: 50px 100px;
    align-items: center;
    justify-content: space-evenly;


`


const DivisionLine = styled.div`
    height: 25px;
    border: solid #7B7B7B 1px;

`

const School = styled.div`
    &:hover {
        font-weight: 600;
        color: #F97F51;
        cursor: pointer;
    };
`

const RowDiv = styled.div`
    display: inline-flex;
    width: 100%;
    padding: 50px 100px;
    justify-content: space-between;
    align-items: center;

`

const Div = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: #505050;

` 

const Button = styled.button`
    display: flex;
    width: 100px;
    margin: 10px 20px;
    padding: 10px 20px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    background-color: #7B7B7B;
    color: white;
    font-size: 15px;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: #F97F51;
    }
    &:focus{
        background-color: #F97F51;
    }
    
`
