import { Link } from "react-router-dom"
import styled from "styled-components"
import { useForm } from "react-hook-form"

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 15%;
    width: 450px;
    height: 600px;
    padding: 30px;
    margin-inline: auto;
    justify-content: center;
    align-items: center;
    color: #505050;
    letter-spacing: 2px;
    border-radius: 50px;
    font: 18px bold;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    
`

const Button = styled.button`
    display: flex;
    width: 100%;
    margin: 10px 0px;
    padding: 10px 100px;
    border-radius: 40px;
    letter-spacing: 2px;
    justify-content: center;
    align-items: center;
    background-color: #7B7B7B;
    color: white;
    font-size: 18px;
    border: none;
    &:hover{
        cursor: pointer;
    }
`


function Login() {
  return (
        <LoginForm>
            <span>소셜 로그인</span>
            <Button style={{backgroundColor: "#57606f"}}>
                <div style={{width: 35, height:35, marginRight:10 ,borderRadius: 50, backgroundColor: "white"}}>
                    <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                        style={{width:25, marginTop: 5}}/>
                </div>

                GOOGLE
            </Button>
            <Button style={{backgroundColor: "#4cd137"}}>NAVER</Button>
            <Button style={{backgroundColor: "#f9ca24"}}>KAKAO</Button>
            <span>MYCLO가 처음이신가요?</span>
            <Button style={{backgroundColor: "#E1832C"}}>회원가입</Button>


        </LoginForm>
  );
}

export default Login;