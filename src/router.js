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




export const RouterInfo = [
    {
        path: "/",
        element: <Home/>,
        label: 'home',
    },
    {
        path: "/login",
        element: <Login/>,
        label: 'login',
    },
    {
        path: "/recipe/*",
        element: <Recipe/>,
        label: 'recipe',
    },
    {
        path: "/community",
        element: <Community/>,
        label: 'community',
    },
    {
        path: "/event",
        element: <Event/>,
        label: 'event',
    },
    {
        path: "/how_to_use",
        element: <HowToUse/>,
        label: 'how_to_use',
    },
    {
        path: "/recipe_school",
        element: <RecipeSchool/>,
        label: 'recipe_school',
    },
    {
        path: "/recipe_company",
        element: <RecipeCompany/>,
        label: 'recipe_company',
    },
    {
        path: "/recipe_write",
        element: <RecipeWrite/>,
        label: 'recipe_write',
    },
    {
        path: "/recipe_detail/:id",
        element: <RecipeDetail/>,
        label: 'recipe_detail/:id',
    },
]