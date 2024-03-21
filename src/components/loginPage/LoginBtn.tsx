"use client";

import { usePathname, useRouter } from "next/navigation";

const LoginBtn = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="login-page-button-color login-page-button-style tracking-widest"
        >
          로그인
        </button>
        <button
          type="button"
          className="login-page-button-color login-page-button-style tracking-widest"
          onClick={() => router.push("/signup")}
        >
          회원가입
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="login-page-button-color login-page-button-style tracking-widest"
        >
          회원가입
        </button>

        <button
          type="button"
          className="login-page-button-color login-page-button-style tracking-widest"
        >
          비밀번호 찾기
        </button>
        <button
          type="button"
          className="login-page-button-color login-page-button-style tracking-widest"
          onClick={() => router.push("/login")}
        >
          로그인 화면으로 돌아가기
        </button>
      </div>
    );
  }
};

export default LoginBtn;
