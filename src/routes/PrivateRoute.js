import React from "react";
import { Navigate } from "react-router-dom";
import { useUserInfo } from "../contexts/UserInfoContext";

function PrivateRoute({ component: Component }) {
  const { userInfo } = useUserInfo();
  return userInfo.id ? (
    Component
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")} />
  );
}

export default PrivateRoute;
