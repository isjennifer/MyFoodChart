
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";



function Profile() {

  return (
        <>
        <Container>
            <SideBar>
                <MyProfile>
                    <FontAwesomeIcon icon={faCircleUser} className="icon"/>
                    내 프로필
                </MyProfile>
                <MyLog>
                    <MyLogUl>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>개인정보수정</li>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>포인트 관리</li>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>내 게시글</li>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>내 댓글</li>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>좋아요한 글</li>
                        <li><FontAwesomeIcon icon={faCircleUser} className="icon"/>북마크한 글</li>
                    </MyLogUl>
                </MyLog>    
            </SideBar>
            <ProfileForm>

            </ProfileForm>
        </Container>
        </>
  );
}

export default Profile;



const DivisionLine = styled.div`
  width: 350px;
  border: solid #dedede 1px;
  margin: 30px;
`;


const MyLogUl =  styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`

const MyLog = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
    border: solid 1px #2c3e50;
    letter-spacing: 1px;
    
`

const MyProfile = styled.div`
    display: flex;
    height: 150px;
    border: solid 1px #2c3e50;
    justify-content: center;
    align-items: center;


`

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 20px;
  border: solid 1px #2c3e50;

`

const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 600px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  color: #505050;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 1000px;
    margin-inline: auto;
    margin-top: 100px;
    border: solid 1px black;

`

const Button = styled.button`
  display: flex;
  width: 95%;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #7b7b7b;
  color: white;
  font-size: 18px;
  border: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
