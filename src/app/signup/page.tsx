"use client";

import "@/components/styles/style.css";

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

    try {
      const { error } = await supabase.auth.signUp({
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
        if (error.name === "AuthWeakPasswordError") {
          console.error(error.message);
          alert("숫자와 영문자를 각각 최소 1자 이상 사용하세요.");
        } else {
          console.error(error);
          alert("회원가입 오류가 발생했습니다.");
        }
      } else {
        alert("회원가입이 완료되었습니다.");
      }
    } catch (error) {
      console.error("try-catch error => ", error);
    } finally {
      setEmail("");
      setPassword("");
      setNickname("");
      router.replace("/login");
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
            className="input-style min-w-[600px]"
            type="text"
            placeholder="닉네임(최대 10자)"
            maxLength={10}
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            className="input-style min-w-[600px]"
            type="email"
            placeholder="아이디(이메일)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-style min-w-[600px]"
            type="password"
            placeholder="비밀번호(6자 이상, 숫자/영문자 최소 1자 이상)"
            minLength={6}
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
            onClick={() => router.replace("/login")}
          >
            로그인 화면으로 돌아가기
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
