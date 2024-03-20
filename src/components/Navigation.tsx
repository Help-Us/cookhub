import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav>
      <Link href={"/login"}>Login</Link>
      <Link href={"/mypage"}>MyPage</Link>
    </nav>
  );
}
