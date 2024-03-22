import MyPageContents from "../../components/mypage/MyPageContents";
import React from "react";

export default function MyPage() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex items-center justify-center">
        <MyPageContents />
      </div>
    </div>
  );
}
