import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageCropper from "../../components/recipe/ImageCropper";
import { useUserInfo } from "../../contexts/UserInfoContext";

function ProfileEdit() {
  const { userInfo, updateUserInfo } = useUserInfo();
  const [newUserName, setNewUserName] = useState(userInfo.nickname);

  // 닉네임 수정 기능
  const handleInputChange = (event) => {
    setNewUserName(event.target.value);
  };

  const userNameEditHandle = () => {
    if (newUserName !== "") {
      if (window.confirm("닉네임을 수정하시겠습니까?")) {
        fetch(`${process.env.REACT_APP_DOMAIN}/users/${userInfo.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: newUserName }),
        })
          .then(async (response) => {
            const res = await response.json();
            // 에러시 예외 발생
            if (!response.ok) {
              throw new Error(res.message);
            }
          })
          .then(() => {
            updateUserInfo({
              ...userInfo, // 기존 객체의 모든 속성을 복사
              nickname: newUserName, // 닉네임만 새로운 값으로 업데이트
            });
            window.alert("수정 되었습니다.");
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        window.alert("취소 되었습니다.");
      }
    } else {
      window.alert("수정할 닉네임을 입력해주세요.");
    }
  };

  // 회원 탈퇴기능
  const userDeleteHandle = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      fetch(`${process.env.REACT_APP_DOMAIN}/users/${userInfo.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("에러 발생!");
        })
        .then(() => {
          window.alert("탈퇴 되었습니다.");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      window.alert("취소 되었습니다.");
    }
  };

  // ImageCropper 구현
  const [imageBlob, setImageBlob] = useState(null);
  const [image, setImage] = useState(null);
  const onCrop = (croppedImage) => {
    setImage(croppedImage);
    // base64 -> blob url로 변환
    const byteString = atob(croppedImage.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/*",
    });
    setImageBlob(blob);
  };
  useEffect(() => {
    setImage(image);
  }, [image]);

  // 프로필 사진 수정 기능
  const userImgEditHandle = () => {
    if (image !== null) {
      if (window.confirm("프로필 사진을 수정하시겠습니까?")) {
        const formData = new FormData();
        formData.append("userImg", imageBlob); // imageBlob는 파일 객체여야 함
        fetch(`${process.env.REACT_APP_DOMAIN}/profile/updatephoto`, {
          method: "PATCH",
          credentials: "include",
          body: formData, // JSON.stringify() 사용하지 않음
          // Content-Type 헤더는 설정하지 않음
        })
          .then(async (response) => {
            const res = await response.json();
            if (!response.ok) {
              throw new Error(res.message);
            }
            updateUserInfo({
              ...userInfo, // 기존 객체의 모든 속성을 복사
              userImg: res.userImg, // 이미지 주소를 새로운 값으로 업데이트
            });
            window.alert("수정되었습니다.");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      window.alert("수정할 프로필 사진을 선택해주세요.");
    }
  };

  const getImageSource = () => {
    if (image) return image;
    if (userInfo.userImg)
      return `${process.env.REACT_APP_DOMAIN}/${userInfo.userImg}`;
    return null;
  };

  const imageSrc = getImageSource();

  return (
    <ProfileForm>
      <Title>개인정보수정</Title>
      <Contents>
        <Div />
        <ContentTitle>닉네임 수정</ContentTitle>
        {/* //추후 변경 필요 */}
        <Input value={newUserName} onChange={handleInputChange}></Input>
        <Button onClick={userNameEditHandle}>수정하기</Button>
      </Contents>
      <Contents style={{ height: 200 }}>
        <Div />
        <ContentTitle>프로필 사진 변경</ContentTitle>
        <ImageCropper onCrop={onCrop} aspectRatio={1}>
          <UploadImg>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="프로필 이미지"
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            ) : (
              <>
                {" "}
                <FontAwesomeIcon icon={faImage} />
              </>
            )}
          </UploadImg>
        </ImageCropper>
        <Button onClick={userImgEditHandle}>수정하기</Button>
      </Contents>
      <Contents>
        <Div />
        <ContentTitle>영양사 인증</ContentTitle>
        {/* //추후 변경 필요 */}
        <Input placeholder="영양사 면허번호를 입력해주세요."></Input>
        <Button onClick={() => window.alert("준비중인 기능입니다.")}>
          인증하기
        </Button>
      </Contents>
      <Contents>
        <Div />
        <ContentTitle>회원 탈퇴</ContentTitle>
        <Button onClick={userDeleteHandle}>탈퇴하기</Button>
      </Contents>
    </ProfileForm>
  );
}

export default ProfileEdit;

const UploadImg = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-right: 30px;
  background-color: #dedede;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin-right: 30px;
`;

const ContentTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
  margin-right: 30px;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: flex;
  width: 100px;
  height: 35px;
  padding: 10px 20px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #3b7339;
  color: white;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #fc8153;
  }
`;

const Div = styled.div`
  display: flex;
  width: 10px;
  height: 30px;
  background-color: grey;
  margin-right: 30px;
`;

const ProfileForm = styled.div`
  width: 800px;
  height: auto;
  padding: 50px;
  margin-inline: auto;
  margin-top: 100px;
  border-radius: 50px;
  border: solid 1px #2c3e50;
  font-size: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  /* border: solid 1px black; */
  background-color: whitesmoke;
  margin-bottom: 20px;
  padding: 30px;
`;
