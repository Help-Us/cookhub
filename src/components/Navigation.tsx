import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav>
      <div className="flex justify-between py-4 px-8 text-[color:var(--titleColor)] border-b border-solid border-[color:var(--titleColor)]">
        <Link href={"/category/All"}>카테고리별 검색</Link>
        <Link href={"/"} className="text-lg">
          COOKHUB
        </Link>
        <div>
          <Link href={"/mypage"} className="mr-5">
            마이페이지
          </Link>
          <Link href={"/login"}>로그인</Link>
        </div>
      </div>
    </nav>
  );
}
