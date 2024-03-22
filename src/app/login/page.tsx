"use client";

import "@/components/styles/style.css";

import Image from "next/image";
import googleLogo from "@/assets/googleLogo.png";
import kakaoLogo from "@/assets/kakaoLogo.png";
import naverLogo from "@/assets/naverLogo.jpg";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/shared/zustand/userInfoStore";
// import { useLoginStateStore } from "@/shared/zustand/loginStateStore";
import { supabase } from "@/api/supabase/supabase";
import {
  getCurrentLoggedInUserList,
  getCurrentLoginUserInfo,
  insertCurrentLoginUser
} from "@/utils/supabase/checkLoginUser";

const LoginPage = () => {
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useUserInfoStore();
  // const { loginState, login } = useLoginStateStore();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: loginUserInfo, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      console.log(error);
      alert("로그인 오류가 발생했습니다.");
    } else {
      // 1. 지금 로그인하려는 유저의 정보를 가져옴
      const currentLoginUserInfo = await getCurrentLoginUserInfo();
      console.log("currentLoginUserInfo", currentLoginUserInfo);
      // 2. 현재 로그인 상태인 유저 LIST를 DB로부터 가져옴
      const currentUserList = await getCurrentLoggedInUserList();
      console.log("currentUserList", currentUserList);

      const { id: uid, email } = currentLoginUserInfo || {};
      const { avatar_img, nickname } =
        currentLoginUserInfo?.user_metadata || {};
      console.log("{id, email, nickname, avatar_img }", {
        uid,
        email,
        nickname,
        avatar_img
      });

      const currentUserEmailList = currentUserList?.map((user) => user.email);

      // 3. 지금 로그인하려는 유저의 정보가 DB에 있는가?
      const isCurrentUserLoggedIn = currentUserEmailList?.includes(email);

      // 3-1. 로그인된 상태!!
      if (isCurrentUserLoggedIn) {
        console.error("Error: 이미 로그인된 유저입니다.");
        return alert("이미 로그인한 유저입니다.");
      }
      // 3-2. 로그인 안된 상태!! 로그인 가능!!
      else {
        // 새로운 유저의 정보 객체 생성
        const newLoginUser = {
          uid,
          email,
          nickname,
          avatar_img
        };
        // DB에 지금 로그인하는 유저의 정보를 입력
        await insertCurrentLoginUser(newLoginUser);
        setEmail("");
        setPassword("");
        // 로그인 처리 필요
        // login();
        alert("로그인 되었습니다.");
        // console.log("현재 로그인 상태", loginState);
        // getLocalStorageJSON();
        router.replace("/");
      }
    }
  };

  return (
    // 로그인 페이지 Div
    <section className="flex justify-center items-center h-screen">
      {/* 로그인 컴포넌트 */}
      <form
        className="flex flex-col gap-5 p-8 login-page-color border-4 border-solid rounded-[40px] shadow-2xl text-2xl"
        onSubmit={loginHandler}
      >
        <h2 className="p-4 text-center font-bold text-3xl">로그인</h2>
        {/* 입력창 */}
        <div className="flex flex-col gap-3">
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
        {/* 로그인/회원가입 버튼 */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="login-page-button-color login-page-button-style tracking-widest"
          >
            로그인
          </button>
          <button
            type="button"
            className="login-page-button-color login-page-button-style tracking-widest"
            onClick={() => router.replace("/signup")}
          >
            회원가입
          </button>
        </div>
        {/* 소셜 로그인 */}
        <div className="flex justify-evenly gap-3 ">
          <button
            type="button"
            className=" flex gap-2 items-center social-login-button-style bg-gray-50"
          >
            <Image src={googleLogo} alt="구글 로고" width="40" height="40" />
            구글 로그인
          </button>
          <button
            type="button"
            className="flex gap-2 items-center social-login-button-style bg-yellow-300"
          >
            <Image src={kakaoLogo} alt="카카오 로고" width="40" height="40" />
            카카오 로그인
          </button>
          <button
            type="button"
            className="flex gap-2 items-center social-login-button-style bg-[#3ec800]"
          >
            <Image src={naverLogo} alt="네이버 로고" width="40" height="40" />
            네이버 로그인
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
