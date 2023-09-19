import Login from "./routes/Login"
import Home from "./routes/Home"
import Recipe from "./routes/Recipe"
import Community from "./routes/Community"
import Event from "./routes/Event"
import HowToUse from "./routes/HowToUse"



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
        path: "/recipe",
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
]