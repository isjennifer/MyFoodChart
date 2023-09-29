import { Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar.js"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faMagnifyingGlass, faUsers, faPenToSquare, faFilter} from '@fortawesome/free-solid-svg-icons'



function RecipeSchool() {

    return (
        <>
        <RowDiv>
            <Div style={{fontWeight:600}}>
                <FontAwesomeIcon icon={faUsers} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
                식단을 공유해요!
            </Div>
            <Div>
                <Button style={{width: 130, padding:10}}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:20, margin:5}} />
                    글쓰기
                </Button>
                <FontAwesomeIcon icon={faFilter} style={{fontSize:25, margin:10}}/>
            </Div>
        </RowDiv>
        </>
    );
};

export default RecipeSchool;




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