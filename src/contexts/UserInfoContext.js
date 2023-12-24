import React, { createContext, useContext, useState, useMemo } from "react";

// 초기 상태에 새로운 속성들 추가
export const initialState = {
  id: '',
  email:'',
  nickname: '',
  userImg: '',
  isNutritionist: false
};

export const UserInfoContext = createContext(initialState);

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(initialState);

  // 상태 업데이트 함수
  const updateUserInfo = (newUserInfo) => {
    setUserInfo(prevUserInfo => ({ ...prevUserInfo, ...newUserInfo }));
  };

  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ userInfo, updateUserInfo }), [userInfo]);
  
  return (
    <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>
  );
}

// 상태를 구독할 수 있는 커스텀 훅
export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("Cannot find UserInfoProvider");
  }
  return context;
}
