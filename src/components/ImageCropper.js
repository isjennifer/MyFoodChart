import React, { useState, useRef,forwardRef, useImperativeHandle  } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components"


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ImageCropper = forwardRef(({image, childref}) => {
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  const getCropData = (e) => {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    
  };

  useImperativeHandle(childref, () => ({
    cropData,
  }));

  return (
    <div>
      <div style={{ width: "100%" }}>
        <br />
        <br />
            <Cropper
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            src={image}
            ref={cropperRef}
            aspectRatio={1.5}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            />
      </div>
      <div>
            <button style={{ float: "left" }} onClick={getCropData}>
              Crop Image
            </button>
      </div>
    </div>
  );
}
)
export default ImageCropper;


const Modal = styled.div`
    display: flex;
    z-index: 1000;
    width: 800px;
    height: 1000px;
    background-color: #DEDEDE;
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
