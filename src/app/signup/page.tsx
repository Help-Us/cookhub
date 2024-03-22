"use client";

import "@/components/styles/style.css";

import Image from "next/image";
import googleLogo from "@/assets/googleLogo.png";
import kakaoLogo from "@/assets/kakaoLogo.png";
import naverLogo from "@/assets/naverLogo.jpg";
import defaultImage from "@/assets/images/Cookhub_Logo.png";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/shared/zustand/userInfoStore";
import { supabase } from "@/api/supabase/supabase";

const SignupPage = () => {
  const router = useRouter();
  const { email, password, nickname, setEmail, setPassword, setNickname } =
    useUserInfoStore();

  const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: signupUserInfo, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          avatar_img: defaultImage
        }
      }
    });

    if (error) {
      console.log(error);
      alert("회원가입 오류가 발생했습니다.");
    } else {
      //NOTE - 회원가입 결과 TEST
      console.log("signupUserInfo", signupUserInfo);
      setEmail("");
      setPassword("");
      setNickname("");
    }
  };
  return (
    // 회원가입 페이지 Div
    <section className="flex justify-center items-center h-screen">
      {/* 회원가입 컴포넌트 */}
      <form
        className="flex flex-col gap-5 p-8 login-page-color border-4 border-solid rounded-[40px] shadow-2xl text-2xl"
        onSubmit={signUpHandler}
      >
        <h2 className="p-4 text-center font-bold text-3xl">회원가입</h2>
        {/* 입력창 */}
        <div className="flex flex-col gap-3">
          <input
            className="input-style"
            type="text"
            placeholder="닉네임"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            className="input-style"
            type="email"
            placeholder="아이디(이메일)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-style"
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* 회원가입/비밀번호 찾기/되돌아가기 버튼 리스트 */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
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
            onClick={() => router.replace("/login")}
          >
            로그인 화면으로 돌아가기
          </button>
        </div>
        {/* 소셜 회원가입 */}
        <div className="flex justify-evenly gap-3 ">
          <button
            type="button"
            className=" flex gap-2 items-center social-login-button-style bg-gray-50"
          >
            <Image src={googleLogo} alt="구글 로고" width="40" height="40" />
            구글로 가입하기
          </button>
          <button
            type="button"
            className="flex gap-2 items-center social-login-button-style bg-yellow-300"
          >
            <Image src={kakaoLogo} alt="카카오 로고" width="40" height="40" />
            카카오로 가입하기
          </button>
          <button
            type="button"
            className="flex gap-2 items-center social-login-button-style bg-[#3ec800]"
          >
            <Image src={naverLogo} alt="네이버 로고" width="40" height="40" />
            네이버로 가입하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
