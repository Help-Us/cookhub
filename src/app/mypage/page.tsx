import MyPageContents from "../../components/mypage/MyPageContents";
import React from "react";

export default function MyPage() {
  return (
    <div>
      <div className="flex justify-center mt-20 gap-5 max-w-70">
        <MyPageContents />
      </div>
    </div>
  );
}
