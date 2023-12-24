import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faImage,
  faPlus,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ImageCropper from "../components/recipe/ImageCropper.js";
import { useUserInfo } from "../contexts/UserInfoContext.js";

function RecipeWrite() {
  const { userInfo } = useUserInfo();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // 파일 업로드
  const [recipeFile, setRecipeFile] = useState(null);

  // 파일 변경 핸들러
  const handleFileChange = (event) => {
    setRecipeFile(event.target.files[0]);
  };

  // 메뉴 리스트 추가 삭제 부분
  const nextID = useRef(1);
  const [inputItems, setInputItems] = useState([
    {
      id: 0,
      menuName: "",
      isProductUsed: "",
      productName: "",
      productBrand: "",
    },
  ]);

  // 추가
  function addMenu() {
    const menues = {
      // 새로운 인풋객체를 하나 만들고,
      id: nextID.current, // id 값은 변수로 넣어주고,
      menuName: "",
      isProductUsed: false,
      productName: "",
      productBrand: "", // 내용은 빈칸으로 만들자
    };

    setInputItems([...inputItems, menues]); // 기존 값에 새로운 인풋객체를 추가해준다.
    nextID.current += 1; // id값은 1씩 늘려준다.
  }

  // 삭제
  function deleteMenu(id) {
    // 인덱스 값을 받아서
    if (inputItems.length === 1) return;
    setInputItems((prevInputItems) =>
      prevInputItems.filter((item) => item.id !== id)
    ); // 인덱스 값과 같지 않은 애들만 남겨둔다
  }

  function handleChange(event, index, field) {
    if (index > inputItems.length) return; // 혹시 모르니 예외처리
    // 인풋배열을 copy 해주자
    const inputItemsCopy = [...inputItems];

    // 해당 인덱스를 가진 <input>의 내용을 변경해주자
    if (field === "isProductUsed") {
      inputItemsCopy[index][field] = event.target.checked;
    } else {
      inputItemsCopy[index][field] = event.target.value;
    } // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자
    setInputItems(inputItemsCopy); // 그걸 InputItems 에 저장해주자
  }

  const navigate = useNavigate();

  // 서버로 form 데이터 보내기
  const onSubmit = (recipeInfo) => {
    const formData = new FormData();

    Object.keys(recipeInfo).forEach((key) => {
      formData.append(key, recipeInfo[key]);
    });

    // 레시피 파일 추가
    if (recipeFile) {
      formData.append("recipeFile", recipeFile);
    }

    // 레시피 이미지 추가
    formData.append("recipeImg", imageBlob);
    const jsonMenuList = inputItems.map(({ id, ...inputItem }) => inputItem);
    formData.append("menues", JSON.stringify(jsonMenuList));
    //   FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }
    if (imageBlob === null) {
      window.alert("식단 이미지를 업로드해주세요.");
      return;
    }
    for (let value of inputItems) {
      if (value.menuName === "") {
        window.alert("메뉴를 작성해주세요.");
        return;
      }
    }
    console.log(formData);

    fetch(`${process.env.REACT_APP_DOMAIN}/posts/diet`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러 발생!");
      })
      .then((data) => {
        if (window.confirm("포스팅 하시겠습니까?")) {
          window.alert("포스팅 되었습니다.");
          navigate("/recipes/school");
        } else {
          window.alert("취소 되었습니다.");
        }
      })
      .catch((error) => {
        alert(error);
      });
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

  // 오늘 날짜 간편하게 받아오기 : Moment.js
  const moment = require("moment");

  return (
    <>
      <HeadDiv style={{ fontWeight: 600 }}>
        <FontAwesomeIcon
          icon={faPencil}
          style={{ fontSize: 40, margin: 20, color: "#3b7339" }}
        />
        내 식단 공유하기
      </HeadDiv>

      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <HeaderGrid>
          <HeaderItem>
            <RowDiv>
              <Title>작성자</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>{userInfo.nickname}</HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>급식일</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>
            <input
              {...register("date", {
                required: "급식일을 입력해주세요.",
                validate: {
                  dateValid: (value) =>
                    value <= moment().format("YYYY-MM-DD") ||
                    "급식일은 오늘 날짜와 같거나 과거여야 합니다.",
                },
              })}
              type={"date"}
              style={{ fontSize: 18, marginRight: 10 }}
            />
            <Em>{errors?.date?.message}</Em>
          </HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>구{"\u00a0\u00a0\u00a0"}분</Title>
              <DivisionLine style={{ height: 100 }} />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>
            <input
              {...register("institute", {
                required: "해당되는 기관에 체크해주세요.",
              })}
              type={"radio"}
              name={"institute"}
              value={"school"}
              style={{ width: 20, height: 20 }}
            />{" "}
            학교
            {watch("institute") === "school" && (
              <select
                {...register("whichSchool", {
                  required: "학교 급을 선택해주세요.",
                })}
                style={{ fontSize: 18, marginLeft: 10 }}
              >
                <option
                  value={""}
                  disabled
                  selected
                  style={{ display: "none" }}
                >
                  학교선택
                </option>
                <option value={"유치원"}>유치원</option>
                <option value={"초등학교"}>초등학교</option>
                <option value={"중학교"}>중학교</option>
                <option value={"고등학교"}>고등학교</option>
              </select>
            )}
            <Em>{errors?.whichSchool?.message}</Em>
          </HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>식{"\u00a0\u00a0\u00a0"}수</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>
            <Input
              {...register("peopleNum", {
                required: "식수를 입력해주세요.",
              })}
              type={"number"}
              name={"peopleNum"}
            />{" "}
            명<Em>{errors?.peopleNum?.message}</Em>
          </HeaderItem>
          <HeaderItem>
            <input
              {...register("institute")}
              type={"radio"}
              value={"산업체"}
              style={{ width: 20, height: 20 }}
              name={"institute"}
            />{" "}
            산업체
            <Em>{errors?.institute?.message}</Em>
          </HeaderItem>
          <HeaderItem>
            <RowDiv>
              <Title>식단가</Title>
              <DivisionLine />
            </RowDiv>
          </HeaderItem>
          <HeaderItem>
            <Input
              {...register("price", {
                required: "식단가를 입력해주세요.",
              })}
              type={"number"}
              name={"price"}
            />{" "}
            원<Em>{errors?.price?.message}</Em>
          </HeaderItem>
        </HeaderGrid>

        <ImageCropper onCrop={onCrop} aspectRatio={1.6}>
          <UploadImg>
            {image ? (
              <img
                src={image}
                alt="식단 이미지"
                style={{ width: 800, height: 500 }}
              />
            ) : (
              <>
                {" "}
                <FontAwesomeIcon icon={faImage} /> 클릭하여 식단 이미지 업로드
              </>
            )}
          </UploadImg>
        </ImageCropper>

        <BodyGrid>
          <BodyItem />
          <BodyItem>
            <Title>메뉴명</Title>
          </BodyItem>
          <BodyItem>
            <Title style={{ textAlign: "center", fontSize: 17 }}>
              공산품
              <br />
              사용여부
            </Title>
          </BodyItem>
          <BodyItem>
            <Title>제품명</Title>
          </BodyItem>
          <BodyItem>
            <Title>브랜드</Title>
          </BodyItem>
          <BodyItem />
        </BodyGrid>

        <RowDivisionLine />

        <BodyGrid>
          {inputItems.map((item, index) => (
            <>
              <BodyItem>
                <RowDiv>
                  <Title>메뉴 {index + 1}</Title>
                  <DivisionLine />
                </RowDiv>
              </BodyItem>
              <BodyItem>
                <Input
                  onChange={(e) => handleChange(e, index, "menuName")}
                  value={item.menuName}
                  style={{ width: 170 }}
                />
              </BodyItem>
              <BodyItem>
                <input
                  type={"checkbox"}
                  onChange={(e) => handleChange(e, index, "isProductUsed")}
                  checked={item.isProductUsed}
                  style={{ width: 20, height: 20 }}
                />
              </BodyItem>
              <BodyItem>
                <Input
                  onChange={(e) => handleChange(e, index, "productName")}
                  value={item.productName}
                  style={{ width: 170 }}
                />
              </BodyItem>
              <BodyItem>
                <RowDiv>
                  <Input
                    onChange={(e) => handleChange(e, index, "productBrand")}
                    value={item.productBrand}
                    style={{ width: 170 }}
                  />
                </RowDiv>
              </BodyItem>
              <BodyItem>
                <div onClick={() => deleteMenu(item.id)}>
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </BodyItem>
            </>
          ))}
          <BtnDiv onClick={addMenu}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
            메뉴 추가
          </BtnDiv>
        </BodyGrid>

        <FooterGrid>
          <FooterItem>
            <RowDiv>
              <Title>메뉴설명</Title>
              <DivisionLine />
            </RowDiv>
          </FooterItem>
          <FooterItem>
            <textarea
              {...register("explanation")}
              style={{ width: 680, height: 200, resize: "none", fontSize: 18 }}
              placeholder="식단의 레시피 및 설명을 작성해주세요."
            />
          </FooterItem>
          <FooterItem>
            <RowDiv>
              <Title>레시피 업로드</Title>
              <DivisionLine />
            </RowDiv>
          </FooterItem>
          <FooterItem>
            <input onChange={handleFileChange} type="file" />
          </FooterItem>
        </FooterGrid>

        <RowDivisionLine />

        <FormSubmitBtn type="submit">내 식단 공유하기</FormSubmitBtn>
      </Form>
    </>
  );
}

export default RecipeWrite;

// styled components

const Em = styled.p`
  color: red;
  font-size: 15px;
`;

const FormSubmitBtn = styled.button`
  display: flex;
  width: 100%;
  height: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: #f97f51;
  color: white;
  border: none;
  font-size: 20px;
  margin-top: 50px;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  font-size: 15px;
  background-color: #f97f51;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  margin: 20px 0px 50px 320px;
  &:hover {
    cursor: pointer;
  }
`;

const UploadImg = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0px 50px 0px;
  width: 800px;
  height: 500px;
  background-color: #dedede;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-weight: 600;
`;

const Input = styled.input`
  width: 70px;
  font-size: 18px;
`;

const DivisionLine = styled.div`
  height: 25px;
  border: solid #7b7b7b 1px;
  margin: 0px 20px;
`;
const RowDivisionLine = styled.div`
  width: 100%;
  border: solid #7b7b7b 1px;
  margin: 20px 0px;
`;

const Form = styled.form`
  width: 70%;
  height: auto;
  padding: 100px 100px;
  margin-inline: auto;
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
`;

const RowDiv = styled.div`
  display: inline-flex;
  color: #505050;
`;

const FooterItem = styled.div`
  width: auto;
  height: auto;
  /* border: solid 2px black; */
  &:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  &:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 30px auto;
  grid-template-rows: minmax(50px, auto);
  gap: 30px 10px;
  margin-bottom: 50px;
`;

const BodyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;
  /* border: solid 2px black; */
`;

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 0.5fr 1fr 1fr 0.2fr;
  /* grid-template-rows: 1fr; */
  gap: 10px;
  /* margin-bottom: 50px; */
`;

const HeaderItem = styled.div`
  /* display: flex;
    align-items: center; */
  width: auto;
  height: 50px;
  /* border: solid 2px black; */
  &:nth-child(5) {
    height: auto;
    grid-column: 1 / 2;
    grid-row: 2 / 4;
  }
  &:nth-child(5) {
    height: auto;
    grid-column: 1 / 2;
    grid-row: 2 / 4;
  }
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px 1fr);
  grid-auto-rows: minmax(50px, auto);
  gap: 10px;
  margin-bottom: 50px;
`;
