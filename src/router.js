import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Community from "./pages/Community";
import Event from "./pages/Event";
import HowToUse from "./pages/HowToUse";
import RecipeSchool from "./pages/RecipeSchool";
import RecipeCompany from "./pages/RecipeCompany";
import RecipeWrite from "./pages/RecipeWrite";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeEdit from "./pages/RecipeEdit";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Profile from "./pages/Profile";

export const RouterInfo = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    element: (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    ),
    errorElement: (
      <div>
        이상한 주소로 이동했네요.
        http://recipesoup.koreacentral.cloudapp.azure.com/home 으로
        이동해주세요.
      </div>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        element: (
          <div>
            <Recipe />
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "/recipes/school",
            element: <RecipeSchool />,
          },
          {
            path: "/recipes/company",
            element: <RecipeCompany />,
          },
        ],
      },
      {
        path: "/recipes/write",
        element: <RecipeWrite />,
      },
      {
        path: "/recipes/detail/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeEdit />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/event",
        element: <Event />,
      },
      {
        path: "/how_to_use",
        element: <HowToUse />,
      },
    ],
  },
];
