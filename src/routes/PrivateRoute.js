import React from "react";
import { Navigate } from "react-router-dom";
import { useUserInfo } from "../contexts/UserInfoContext";

function PrivateRoute({ component: Component }) {
  const { userInfo } = useUserInfo();
  if (!userInfo.id) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }
  return <Component />;
}

export default PrivateRoute;
