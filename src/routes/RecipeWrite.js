import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faImage} from '@fortawesome/free-solid-svg-icons'


function RecipeWrite () {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();

    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
           };
    };

    return(
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <HeadDiv style={{fontWeight:600}}>
            <FontAwesomeIcon icon={faPencil} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
            내 식단 공유하기
        </HeadDiv>

        <Form>
            <FormDiv>
                <RowDiv>
                    <Title>작성자</Title>
                    <DivisionLine />
                    작성자닉네임
                </RowDiv>
                <RowDiv>
                    <Title>급식일</Title>
                    <DivisionLine />
                    <Input/>년<Input/>월<Input/>일
                </RowDiv>
            </FormDiv>
            <FormDiv>
                <RowDiv>
                    <Title>구분</Title>
                    <DivisionLine style={{height:100}}/>
                    <ColDiv>
                        <RowDiv style={{paddingBottom:50}}>
                            <input type={"radio"} name={"institute"} style={{width:20, height:20, marginRight:10}} />학교
                            <select name={"school"} style={{fontSize: 18, marginLeft:10}}>
                                <option value={""} disabled selected style={{display:"none"}}>학교선택</option>
                                <option value={"kinder"} >유치원</option>
                                <option value={"elemen"} >초등학교</option>
                                <option value={"middle"} >중학교</option>
                                <option value={"high"} >고등학교</option>
                            </select>
                        </RowDiv>
                        <RowDiv>
                            <input type={"radio"} style={{width:20, height:20, marginRight:10}} name={"institute"}/>산업체
                        </RowDiv>
                    </ColDiv>
                </RowDiv>
                <ColDiv style={{paddingRight:215}}>
                    <RowDiv style={{paddingBottom:50}}>
                        <Title>식수</Title>
                        <DivisionLine />
                        <Input/>명
                    </RowDiv>
                    <RowDiv>
                        <Title>식단가</Title>
                        <DivisionLine />
                        <Input/>원
                    </RowDiv>
                </ColDiv>
            </FormDiv>
            <form>
                <label htmlFor="recipeImg">
                    <UploadImg>
                        {imgFile ? <img src={imgFile ? imgFile : ""} alt="프로필 이미지"/>
                            : <> <FontAwesomeIcon icon={faImage} /> 클릭하여 이미지 업로드 </>
                        }
                    </UploadImg>
                </label>
                <input type="file" accept="image/*" id="recipeImg" onChange={saveImgFile}
                        ref={imgRef} style={{display:"none"}}></input>
            </form>

            <FormDiv>
                <Title>구분</Title>
                <Title>메뉴명</Title>
                <Title>공산품 사용여부</Title>
                <Title>사용 제품명</Title>
                <Title>브랜드</Title>
            </FormDiv>
            <FormDiv>
                <Title>메뉴 1</Title>
                <Input style={{width:200}}/>
                <input type={"checkbox"} style={{width:20, height:20}}/>
                <Input style={{width:200}}/>
                <Input style={{width:200}}/>

            </FormDiv>
            <FormDiv>
                <Title>메뉴 2</Title>
            </FormDiv>
        </Form>

        </>
    );
}

export default RecipeWrite;



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


const Form = styled.form`
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
    align-items: center;
    color: #505050;

    

` 


const ColDiv = styled.div`
    display: flex;
    flex-direction: column;
    color: #505050;
    

    
    

` 