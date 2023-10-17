import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faImage, faPlus,faSquareMinus} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck,faSquare } from '@fortawesome/free-regular-svg-icons'

import Footer from "../components/Footer.js"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"


function RecipeDetail () {

// Navbar 모바일 반응형
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);


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
                <RowDivisionLine />
            

        </Form>

        <Footer/>
        </>
    );
}

export default RecipeDetail;




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
