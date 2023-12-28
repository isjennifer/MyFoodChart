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
import ProfileEdit from "./pages/profile/ProfileEdit";
import ProfileMyPosts from "./pages/profile/ProfileMyPosts";
import ProfileMyComments from "./pages/profile/ProfileMyComments";
import PrivateRoute from "./routes/PrivateRoute";

export const RouterInfo = [
  {
    path: "/",
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
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/edit",
        element: <ProfileEdit />,
      },
      {
        path: "/profile/myposts",
        element: <ProfileMyPosts />,
      },
      {
        path: "/profile/mycomments",
        element: <ProfileMyComments />,
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
        element: <PrivateRoute component={RecipeDetail} />,
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
