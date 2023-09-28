import { Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar.js"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faMagnifyingGlass, faUsers, faPenToSquare, faFilter} from '@fortawesome/free-solid-svg-icons'



function Recipe() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

    return (
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <RowDiv>
            <div style={{display:"inline-flex"}}>
                <Button>학교</Button>
                <Button>산업체</Button>
            </div>
            <SearchBox>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize:20, margin:10}}/>
                <Input placeholder="통합검색..."/>
                <FontAwesomeIcon icon={faArrowRight} style={{fontSize:20, margin:10}}/>
            </SearchBox>
        </RowDiv>
        <RowDiv>
            <Div>
                <FontAwesomeIcon icon={faUsers} style={{fontSize:20, margin:10}}/>
                식단을 공유해요!
            </Div>
            <Div>
                <FontAwesomeIcon icon={faPenToSquare} />
                <FontAwesomeIcon icon={faFilter} />
            </Div>
        </RowDiv>
        </>
    );
};

export default Recipe;




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
    font-size: 16px;

    

` 


const SearchBox = styled.div`
    display: inline-flex;
    background-color: white;
    border: #7B7B7B solid 1px;
    padding: 0px 10px;
    border-radius: 40px;
    width: 400px;
    height: 45px;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;


`
const Input = styled.input`
    border: none; // 검색창 border 을 없앰으로써 자연스러워짐
    -webkit-appearance: none; // 기본 search 디자인을 없앰
    width: 300px;
    height: 40px;
    overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
    font-size: 16px;
    &:focus{
        outline: none;
    };
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
