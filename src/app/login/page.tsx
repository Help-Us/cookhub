"use client";

import "@/components/styles/style.css";
import PageTitle from "@/components/loginPage/PageTitle";
import UserInfoInputForm from "@/components/loginPage/UserInfoInputForm";
import LoginBtn from "@/components/loginPage/LoginBtn";
import SocialLoginBtn from "@/components/loginPage/SocialLoginBtn";

const LoginPage = () => {
  return (
    // 로그인 페이지 Div
    <section className="flex justify-center items-center h-screen">
      {/* 로그인 컴포넌트 */}
      <div className="flex flex-col gap-5 p-8 login-page-color border-4 border-solid rounded-[40px] shadow-2xl text-2xl">
        <PageTitle />
        {/* 입력창 */}
        <div className="flex flex-col gap-3">
          <UserInfoInputForm />
        </div>
        {/* 로그인/회원가입 버튼 */}
        <LoginBtn />
        {/* 소셜 로그인 */}
        <SocialLoginBtn />
      </div>
    </section>
  );
};

export default LoginPage;
