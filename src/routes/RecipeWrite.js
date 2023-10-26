import Navbar from "../components/Navbar.js"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faImage, faPlus,faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import Footer from "../components/Footer.js"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import ImageCropper from "../components/ImageCropper.js"


function RecipeWrite () {

// Navbar 모바일 반응형
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

// react-hook-form
const { register, handleSubmit, watch } = useForm();


// 이미지 업로드
    const [recipeImgURL, setRecipeImgURL] = useState("");
    const recipeImg = watch('recipeImg');
    useEffect(() => {
        if (recipeImg && recipeImg.length > 0) {
            const file = recipeImg[0];
            setRecipeImgURL(URL.createObjectURL(file));
        }
    },[recipeImg])

// 파일 업로드
    const [recipeFileURL, setRecipeFileURL] = useState("");
    const recipeFile = watch('recipeFile');
    useEffect(() => {
        if (recipeFile && recipeFile.length > 0) {
            const file = recipeFile[0];
            setRecipeFileURL(URL.createObjectURL(file));
        }
    },[recipeFile])


    

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

// 서버에서 데이터 가져오기
    const [userName, setUserName] = useState(null);
    
    useEffect(() => {
        fetch("http://localhost:3010/posts")
        .then((response) => response.json())
        .then((data) => setUserName(data))
    }, []);
 


// 서버로 form 데이터 보내기
    const navigate = useNavigate();
    const onSubmit = (data) => {
        data.recipeImg = recipeImgURL;
        data.recipeFile = recipeFileURL;
        data.menues = inputItems;
        fetch("http://localhost:3010/comments", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok === true) {
                return response.json();
                }
            throw new Error("에러 발생!");
        }).catch((error) => {
            alert(error);
        }).then((data) => {
            if(window.confirm("포스팅 하시겠습니까?")){
                console.log("포스팅 되었습니다.")
                console.log(data)
                navigate('/recipe')
                
            } else {
                console.log("취소 되었습니다.")
            };
        });

    }

    const [image, setImage] = useState(null);
    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };

    const childRef = useRef({});



    return(
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <HeadDiv style={{fontWeight:600}}>
            <FontAwesomeIcon icon={faPencil} style={{fontSize:40, margin:20, color: "#F97F51"}}/>
            내 식단 공유하기
        </HeadDiv>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormDiv>
            {/* 데이터가 비동기적으로 로드되는 경우: 데이터를 서버에서 비동기적으로 가져오는 경우, 
            데이터가 로드되기 전에 컴포넌트가 렌더링될 수 있습니다. 
            이 경우 recipeInfo 배열이 초기값인 null 또는 undefined일 수 있으므로 
            map 함수를 호출할 때 오류가 발생할 수 있습니다. 
            이 문제를 해결하기 위해서는 조건부 렌더링을 사용하여 데이터 로드 후에만 map 함수를 호출하도록 할 수 있습니다: */}

                <RowDiv>
                    <Title>작성자</Title>
                    <DivisionLine />
                    {userName?.map((data) => (<div key={data.name}>{data.name}</div>))}
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
                            { watch("institute") === "school" && (
                                <select {...register("whichSchool")} style={{fontSize: 18, marginLeft:10}}>
                                    <option value={""} disabled selected style={{display:"none"}}>학교선택</option>
                                    <option value={"유치원"} >유치원</option>
                                    <option value={"초등학교"} >초등학교</option>
                                    <option value={"중학교"} >중학교</option>
                                    <option value={"고등학교"} >고등학교</option>
                                </select>
                            )}
                        </RowDiv>
                        <RowDiv>
                            <input {...register("institute")} type={"radio"} value={"산업체"} style={{width:20, height:20, marginRight:10}} name={"institute"}/>산업체
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
            {/* <form>
                <label htmlFor="recipeImg">
                    <UploadImg>
                        {recipeImgURL ? <img src={recipeImgURL ? recipeImgURL : ""} alt="식단 이미지"/>
                            : <> <FontAwesomeIcon icon={faImage} /> 클릭하여 식단 이미지 업로드 </>
                        }
                    </UploadImg>
                </label>
                <input {...register("recipeImg")} type="file" accept="image/*" id="recipeImg"
                        style={{display:"none"}} onChange={onChange}/>
            </form> */}
            <label htmlFor="recipeImg">
                <UploadImg>
                    {childRef.current.cropData ? <img src={childRef.current.cropData  ? childRef.current.cropData  : ""} alt="식단 이미지"/>
                            : <> <FontAwesomeIcon icon={faImage} /> 클릭하여 식단 이미지 업로드 </>
                    }
                </UploadImg>
            </label>
            <input type="file" accept="image/*" id="recipeImg"
                    style={{display:"none"}} onChange={onChange}/>

            {image && <Modal><ImageCropper image={image} childref={childRef} /></Modal>}

            

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
                    <textarea {...register("explanation")} style={{width:720, height:200, resize:"none", fontSize:18}}/>
                </RowDiv>
            </FormDiv>
            <FormDiv style={{marginTop: 30}}>
                <RowDiv>
                    <Title>레시피 업로드</Title>
                    <DivisionLine />
                    <input {...register("recipeFile")}  type="file" />
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

const Modal = styled.div`
    display: flex;
    position: absolute;
    z-index: 1000;
    width: 650px;
    height: 500px;
    top: 75%;
    left: 27%;
    background-color: green;
    border-radius: 50px;

`


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