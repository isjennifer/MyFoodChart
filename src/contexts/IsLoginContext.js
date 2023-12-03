import React, { createContext, useContext, useState, useMemo } from "react";

export const IsLoginContext = createContext({ isLogin: false });

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin]);
  return (
    <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
  );
}

// 상태를 구독할 수 있는 커스텀 훅
export function useIsLoginState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error("Cannot find IsLoginProvider");
  }
  return context.isLogin;
}
