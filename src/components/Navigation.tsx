import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav>
      <Link href={"/"}>Home </Link>
      <Link href={"/login"}>Login </Link>
      <Link href={"/mypage"}>MyPage </Link>
      <Link href={"/category/All"}>카테고리</Link>
    </nav>
  );
}
