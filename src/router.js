import Login from "./routes/Login"
import Home from "./routes/Home"
import Recipe from "./routes/Recipe"
import Community from "./routes/Community"
import Event from "./routes/Event"
import HowToUse from "./routes/HowToUse"
import RecipeSchool from "./routes/RecipeSchool"
import RecipeCompany from "./routes/RecipeCompany"
import RecipeWrite from "./routes/RecipeWrite"
import RecipeDetail from "./routes/RecipeDetail"
import RecipeEdit from "./routes/RecipeEdit"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"





export const RouterInfo = [
    {
        path: "/home",
        element: <Home />
    },
    {
        element: (
            <div>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </div>
        ),
        errorElement: <div>이상한 주소로 이동했네요. <a href="http://localhost:3000/home">http://localhost:3000/home</a> 으로 이동해주세요.</div>,
        children: [
            {
                path: "/login",
                element: <Login/>,
            },
            {
                element: (
                    <div>
                    <Recipe/>
                    <Outlet/>
                    </div>
                ),
                children: [
                    {
                        path: "/recipes/school",
                        element: <RecipeSchool/>,
                    },
                    {
                        path: "/recipes/company",
                        element: <RecipeCompany/>,
                    },
                ]
            },
            {
                path: "/recipes/write",
                element: <RecipeWrite/>,
            },
            {
                path: "/recipes/detail/:id",
                element: <RecipeDetail/>,
            },
            {
                path: "/recipes/edit/:id",
                element: <RecipeEdit/>,
            },
            {
                path: "/community",
                element: <Community/>,
            },
            {
                path: "/event",
                element: <Event/>,
            },
            {
                path: "/how_to_use",
                element: <HowToUse/>,
            },
        ]
    }









]