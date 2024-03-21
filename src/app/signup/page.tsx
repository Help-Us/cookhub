"use client";

import "@/components/styles/style.css";
import PageTitle from "@/components/loginPage/PageTitle";
import UserInfoInputForm from "@/components/loginPage/UserInfoInputForm";
import LoginBtn from "@/components/loginPage/LoginBtn";
import SocialLoginBtn from "@/components/loginPage/SocialLoginBtn";

const SignupPage = () => {
  return (
    // 회원가입 페이지 Div
    <section className="flex justify-center items-center h-screen">
      {/* 회원가입 컴포넌트 */}
      <div className="flex flex-col gap-5 p-8 login-page-color border-4 border-solid rounded-[40px] shadow-2xl text-2xl">
        <PageTitle />
        {/* 입력창 */}
        <div className="flex flex-col gap-3">
          <input
            className="input-style"
            type="text"
            placeholder="닉네임"
            required
          />
          <UserInfoInputForm />
        </div>
        {/* 회원가입/비밀번호 찾기/되돌아가기 버튼 리스트 */}
        <LoginBtn />
        {/* 소셜 회원가입 */}
        <SocialLoginBtn />
      </div>
    </section>
  );
};

export default SignupPage;
