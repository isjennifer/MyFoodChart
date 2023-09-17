import { Link } from "react-router-dom"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import background_img from "./img/background_img.jpg"

const Background = styled.div`
    position: relative;
    height: 100vh;
    background: url('${background_img}') no-repeat;
    background-size: cover;
    z-index: 1;
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 15%;
    width: 350px;
    height: 530px;
    padding: 30px;
    margin-inline: auto;
    justify-content: center;
    align-items: center;
    color: #505050;
    border-radius: 50px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    
`

const Button = styled.button`
    display: flex;
    width: 100%;
    margin: 10px 0px;
    padding: 10px 20px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    background-color: #7B7B7B;
    color: white;
    font-size: 18px;
    border: none;
    &:hover{
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;


    }
    
`

const Logo = styled.span`
    font-family: 'Sunflower', sans-serif;
    font-size: 40px;
    font-weight: bold;
    color: #E1832C;
    margin: 20px;

`


function Login() {
  return (
        <Background>
        <LoginForm>
            <Logo>모두의 식판</Logo>
            <span style={{margin:20}}>소셜 로그인</span>
            <Button style={{backgroundColor: "#57606f"}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                        style={{width:35, marginRight: 10}}/>

                GOOGLE
            </Button>
            <Button style={{backgroundColor: "#4cd137"}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJjAvpt6-Z981z6LFyIgBeYfp-kONUE3xtA&usqp=CAU"
                        style={{width:35, marginRight: 10}}
                    />
                NAVER
            </Button>
            <Button style={{backgroundColor: "#f9ca24"}}>
                <img src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png" 
                    style={{width:35, marginRight: 10}}
                />
                KAKAO
            </Button>
            <div style={{width: 350, height:1, backgroundColor:"#BEBEBE", margin:20}}></div>
            <span style={{fontSize: 16, margin:10}}>모두의 식판에 처음 오셨나요?</span>
            <Button style={{width:150, padding:10, backgroundColor: "#E1832C"}}>회원가입</Button>


        </LoginForm>
        </Background>
  );
}

export default Login;