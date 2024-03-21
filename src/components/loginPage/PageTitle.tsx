"use client";

import { usePathname } from "next/navigation";

const PageTitle = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <h2 className="p-4 text-center font-bold text-3xl">로그인</h2>;
  } else {
    return <h2 className="p-4 text-center font-bold text-3xl">회원가입</h2>;
  }
};

export default PageTitle;
