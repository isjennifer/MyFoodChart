import { Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar.js"
import { useState } from "react";




function HowToUse() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

    return (
        <>
         <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <span>이용방법</span>
        </>
    );
};

export default HowToUse;