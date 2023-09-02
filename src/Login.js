
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

const ErrorMessage = styled.div`
    font-size: 13px;
    color: red;
    padding: 10px 0px 20px 0px;
`


const Button = styled.button`
    display: flex;
    width: 100%;
    margin: 10px 0px;
    padding: 20px 100px;
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


const InputBox = styled.input`
    display: flex;
    width: 350px;
    margin: 10px 0px 0px 0px;
    padding: 10px 20px;
    border-radius: 40px;
    background-color: white;
    border: 1px solid #7B7B7B;
`

function Login() {
    const { register, handleSubmit, formState } = useForm();
    const onValid = (data) => {
        console.log(data);
    }
    const EmailErrorExist = formState.errors.email && formState.errors.email.message;
    const PasswordErrorExist = formState.errors.password && formState.errors.password.message;

  return (
        <LoginForm>
            <form onSubmit={handleSubmit(onValid)}>
                <div>
                    <label for="email">EMAIL</label>
                    <InputBox {...register(
                        "email", 
                        {required: "이메일을 입력하세요",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[a-z]+\.[a-z]{2,3}/,
                            message: "올바른 이메일 형식이 아닙니다",
                            }
                        }
                        )} 
                    id="email" placeholder="이메일을 입력하세요" style={{ borderColor: EmailErrorExist ? "red" : "" }}/>
                    <ErrorMessage>{EmailErrorExist}</ErrorMessage>
                </div>
                <div>
                    <label for="password">PASSWORD</label>
                    <InputBox {...register(
                        "password", 
                        {required: "비밀번호를 입력하세요",
                        minLength: {
                            value: 8,
                            message: "8자 이상 입력하세요",
                            },
                        pattern:{
                            value: /(?=.*[a-z])(?=.*[0-9])/,
                            message: "최소 한개 이상의 소문자와 숫자를 포함해야합니다"
                            }, 
                        }
                        )} 
                    id="password" placeholder="비밀번호를 입력하세요"  style={{ borderColor: PasswordErrorExist ? "red" : "" }}/>
                    <ErrorMessage>{PasswordErrorExist}</ErrorMessage>
                </div>
                <Button>LOGIN</Button>
            </form>
        </LoginForm>
  );
}

export default Login;