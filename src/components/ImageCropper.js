
import styled from "styled-components"
import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


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
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <div className="container">
          <div className="backdrop" />
          <Modal>
          <div className="modal">
            <h3>이미지 편집하기</h3>
            <div className="content-wrapper">
              <div className="content">
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
            <div className="footer">
              <button onClick={() => setImage(null)}>취소</button>
              <button className="crop" onClick={getCropData}>
                적용하기
              </button>
            </div>
          </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ImageCropper;


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
