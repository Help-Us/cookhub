"use client";

import { useLoginStateStore } from "@/shared/zustand/loginStateStore";
import {
  getCurrentLoginUserInfo,
  removeCurrentLoginUser
} from "@/utils/supabase/checkLoginUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const { loginState, logout } = useLoginStateStore();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const logoutHandler = async () => {
    const currentLoginUser = await getCurrentLoginUserInfo();
    const { id } = currentLoginUser!;
    await removeCurrentLoginUser(id);
    logout();
    alert("로그아웃 되었습니다.");
    router.replace("/");
  };

  return (
    <nav>
      <div className="flex justify-between py-4 px-8 text-[color:var(--titleColor)] border-b border-solid border-[color:var(--titleColor)]">
        <Link href={"/category/All"}>카테고리별 검색</Link>
        <Link href={"/"} className="text-lg">
          COOKHUB
        </Link>
        <div>
          {isMounted && loginState ? (
            <>
              <Link href={"/mypage"} className="mr-5">
                마이페이지
              </Link>
              <button onClick={logoutHandler}>로그아웃</button>
            </>
          ) : (
            <Link href={"/login"}>로그인</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
