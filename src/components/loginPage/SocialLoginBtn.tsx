"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import googleLogo from "@/assets/googleLogo.png";
import kakaoLogo from "@/assets/kakaoLogo.png";
import naverLogo from "@/assets/naverLogo.jpg";

const SocialLoginBtn = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export default SocialLoginBtn;
