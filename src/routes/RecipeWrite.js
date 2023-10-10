import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faImage, faPlus,faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import Footer from "../components/Footer.js"
import { useForm } from "react-hook-form"


function RecipeWrite () {

// Navbar 모바일 반응형
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

// 이미지 업로드
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

// 메뉴 리스트 추가 삭제 부분
    const nextID = useRef(1);
    const [inputItems, setInputItems] = useState([{ id: 0, menuName: '', isProductUsed: '', productName: '', productBrand: '' }]);

    // 추가
    function addMenu() {
        const menues = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextID.current,		  // id 값은 변수로 넣어주고,
            menuName: '',
            isProductUsed: false, 
            productName: '', 
            productBrand: '', 		  // 내용은 빈칸으로 만들자
        };

        setInputItems([...inputItems, menues]); // 기존 값에 새로운 인풋객체를 추가해준다.
        nextID.current += 1; 		            // id값은 1씩 늘려준다.
    }

    // 삭제
    function deleteMenu(id) {    // 인덱스 값을 받아서
        setInputItems(prevInputItems => prevInputItems.filter(item => item.id !== id)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    }

    function handleChange (event, index, field) {
        if (index > inputItems.length) return; // 혹시 모르니 예외처리
        // 인풋배열을 copy 해주자
        const inputItemsCopy = [...inputItems];
  
        // 해당 인덱스를 가진 <input>의 내용을 변경해주자
          if (field === 'isProductUsed') {
            inputItemsCopy[index][field] = event.target.checked;
          } else {
            inputItemsCopy[index][field] = event.target.value;
          } ;// 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		                 // 그걸 InputItems 에 저장해주자
    }

// 폼 데이터 서버로 보내기
    // const [recipeInfo, setRecipeInfo] = useState({
    //     year : '',
    //     month :'',
    //     day : '',
    //     institute: '',
    //     school: '',
    //     peopleNum: '',
    //     price: '',
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
      
    //     fetch("API 주소", {
    //       method: "POST",
    //       body: new FormData(recipeInfo),
    //     })
    //       .then((response) => {
    //         if (response.ok === true) {
    //           return response.json();
    //         }
    //         throw new Error("에러 발생!");
    //       })
    //       .catch((error) => {
    //         alert(error);
    //       })
    //       .then((data) => {
    //         console.log(data);
    //       });
    //   };


// react-hook-form
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = (data) => console.log(data);




    return(
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <HeadDiv style={{fontWeight:600}}>
            <FontAwesomeIcon icon={faPencil} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
            내 식단 공유하기
        </HeadDiv>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormDiv>
                <RowDiv>
                    <Title>작성자</Title>
                    <DivisionLine />
                    작성자닉네임
                </RowDiv>
                <RowDiv>
                    <Title>급식일</Title>
                    <DivisionLine />
                    <input {...register("date")} type={"date"} style={{fontSize:18, marginRight:10}}/>
                </RowDiv>
            </FormDiv>
            <FormDiv>
                <RowDiv>
                    <Title>구분</Title>
                    <DivisionLine style={{height:100}}/>
                    <ColDiv>
                        <RowDiv style={{paddingBottom:50}}>
                            <input {...register("institute")} type={"radio"} name={"institute"} value={"school"} style={{width:20, height:20, marginRight:10}} />학교
                            {watch("institute") === "school" && (
                                <select {...register("whichSchool")} style={{fontSize: 18, marginLeft:10}}>
                                    <option value={""} disabled selected style={{display:"none"}}>학교선택</option>
                                    <option value={"kinder"} >유치원</option>
                                    <option value={"elemen"} >초등학교</option>
                                    <option value={"middle"} >중학교</option>
                                    <option value={"high"} >고등학교</option>
                                </select>
                            )}
                        </RowDiv>
                        <RowDiv>
                            <input {...register("institute")} type={"radio"} value={"company"} style={{width:20, height:20, marginRight:10}} name={"institute"}/>산업체
                        </RowDiv>
                    </ColDiv>
                </RowDiv>
                <ColDiv style={{paddingRight:95}}>
                    <RowDiv style={{paddingBottom:50}}>
                        <Title>식수</Title>
                        <DivisionLine />
                        <Input {...register("peopleNum")} type={"number"} name={"peopleNum"}/>명
                    </RowDiv>
                    <RowDiv>
                        <Title>식단가</Title>
                        <DivisionLine />
                        <Input {...register("price")} type={"number"} name={"price"}/>원
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

            <MenuTitleDiv>
                <MenuTitle style={{marginLeft:20}}>구분</MenuTitle>
                <MenuTitle style={{marginLeft:110}}>메뉴명</MenuTitle>
                <MenuTitle style={{marginLeft:85, textAlign:'center', fontSize:18}}>공산품<br/>사용</MenuTitle>
                <MenuTitle style={{marginLeft:85}}>사용 제품명</MenuTitle>
                <MenuTitle style={{marginLeft:135}}>브랜드</MenuTitle>
            </MenuTitleDiv>

            {inputItems.map((item,index) =>(
                <>
                <FormDiv key={index}>
                    <Title>메뉴 {index + 1}</Title>
                    <DivisionLine />
                    <Input onChange={e => handleChange(e, index, 'menuName')} value={item.menuName} style={{width:170}}/>
                    <input type={"checkbox"} onChange={e => handleChange(e, index, 'isProductUsed')} checked={item.isProductUsed} style={{width:20, height:20, marginInline:30}}/>
                    <Input onChange={e => handleChange(e, index, 'productName')} value={item.productName} style={{width:200}}/>
                    <Input onChange={e => handleChange(e, index, 'productBrand')} value={item.productBrand} style={{width:170}}/>
                    <div onClick={() => deleteMenu(item.id)}><FontAwesomeIcon icon={faSquareMinus} style={{cursor:"pointer"}}/></div>
                </FormDiv>
                </>
                )
            )}
            <Button onClick={addMenu}>
                <FontAwesomeIcon icon={faPlus} style={{marginRight:10}} />메뉴 추가
            </Button>
            <FormDiv>
                <RowDiv>
                    <Title>설명</Title>
                    <DivisionLine />
                    <textarea style={{width:720, height:200, resize:"none", fontSize:18}}/>
                </RowDiv>
            </FormDiv>
            <FormDiv style={{marginTop: 30}}>
                <RowDiv>
                    <Title>레시피 업로드</Title>
                    <DivisionLine />
                    <input type="file" />
                </RowDiv>
            </FormDiv>
            <RowDivisionLine />
        <FormSubmitBtn type="submit">내 식단 공유하기</FormSubmitBtn>

        </Form>
        <Footer/>
        </>
    );
}

export default RecipeWrite;




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