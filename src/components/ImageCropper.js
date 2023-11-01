
import styled from "styled-components"
import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrop } from '@fortawesome/free-solid-svg-icons'


const ImageCropper = ({ children, onCrop }) => {
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleChildrenClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const files = e.target.files;

    if (files.length === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === FileReader.DONE) {
            setImage(String(reader.result));
          }
    };
    reader.readAsDataURL(files[0]);
  };


  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };


  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>
        {children}
      </span>
      {image && (
        <ModalBox>
          <Modal>
          <div>
            <h1 style={{marginBottom:15}}><FontAwesomeIcon icon={faCrop} style={{marginRight:10}}/>이미지 자르기</h1>
            <div >
                <div>
                    <Cropper
                        ref={cropperRef}
                        aspectRatio={1.6}
                        src={image}
                        viewMode={1}
                        width={800}
                        height={500}
                        background={false}
                        responsive
                        autoCropArea={1}
                        checkOrientation={false}
                        guides
                    />
                </div>
            </div>
            <div style={{display:"flex", float:"right"}}>
                <Button onClick={getCropData} style={{marginRight:15}}>적용하기</Button>
                <Button onClick={() => setImage(null)}>취소</Button>
            </div>
          </div>
          </Modal>
        </ModalBox>
      )}
    </>
  );
};

export default ImageCropper;




const Button = styled.div`
    display: flex;
    width: 100px;
    height: 50px;
    border: solid 2px #505050;
    color: #505050;
    margin: 15px 0px 0px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &:hover{
        cursor: pointer;
    }
    
`

const ModalBox = styled.div`
    display: flex;
    position: fixed;
    z-index:999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    justify-content: center;
    align-items: center;
`

const Modal = styled.div`
    display: flex;
    position: absolute;
    z-index: 1000;
    width: 850px;
    height: 650px;
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`
