import { Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar.js"
import { useState } from "react";




function Recipe() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleProfile, setToggleProfile] = useState(false);

    return (
        <>
        <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile}/>
        <span>식단공유</span>
        </>
    );
};

export default Recipe;