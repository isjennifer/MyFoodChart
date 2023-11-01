import styled from "styled-components"



function RecipeWrite () {

// CSS GRID TEST를 위한 페이지입니다.


    return(
        <>
        <Form>
            <Header>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
                <HeaderItem/>
            </Header>
            <Body>
                <BodyItem />
                <BodyItem />
                <BodyItem />
                <BodyItem />
                <BodyItem />
                <BodyItem />
                <BodyItem />
            </Body>
            <Footer>
                <FooterItem/>
                <FooterItem/>
                <FooterItem/>
                <FooterItem/>
            </Footer>
        </Form>
        </>
    );
}

export default RecipeWrite;


const FooterItem = styled.div`
    width: auto;
    height: 50px;
    background-color: grey;
    border: solid 2px black;
    &:nth-child(2){
        grid-column: 2 / 4;
        grid-row: 1 / 2;
    }
    &:nth-child(3){
        grid-column: 1 / 3;
        grid-row: 2 / 3;
    }

`


const Footer = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 2fr;
    grid-template-rows: minmax(50px, auto);
    gap: 10px;
    margin-bottom: 50px;

` 


const BodyItem = styled.div`
    width: auto;
    height: 50px;
    background-color: grey;
    border: solid 2px black;
    &:nth-child(1){
        grid-column: 1 / 6;
        grid-row: 1 / 2;
    }
    &:nth-child(7){
        grid-column: 3 / 4;
        grid-row: 3 / 4;
    }

`

const Body = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 50px;

` 


const HeaderItem = styled.div`
    width: auto;
    height: 50px;
    background-color: grey;
    border: solid 2px black;
    &:nth-child(5){
        height: auto;
        grid-column: 1 / 2;
        grid-row: 2 / 4;
    }
`

const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1.5fr 3fr);
    grid-auto-rows: minmax(50px, auto);
    gap: 10px;
    margin-bottom: 50px;

`

const Form = styled.form`
  /* flex-direction: column; */
  /* position: relative; */
  width: 70%;
  height: auto;
  padding: 100px 100px;
  margin-inline: auto;
  /* justify-content: center;
  align-items: center; */
  color: #505050;
  border-radius: 50px;
  font-size: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;


const Em = styled.p`
    color: red;
    font-size: 15px;
`


const Modal = styled.div`
    display: flex;
    position: absolute;
    z-index: 1000;
    width: 650px;
    height: 500px;
    top: 75%;
    left: 27%;
    background-color: green;
    border-radius: 10px;

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