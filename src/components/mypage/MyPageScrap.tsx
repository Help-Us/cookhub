import React from "react";

export default function MyPageScrap() {
  return (
    <section className="bg-white rounded-2xl pt-4 pb-4">
      <p className="font-bold text-xl text-center pt-2 pb-3 border-b-4 border-[#E0C3AE]">
        내가 스크랩한 레시피
      </p>

      <section className="flex flex-col items-center text-lg">
        <div className="flex space-x-12 pt-5 pb-5 border-b-2 border-[#E0C3AE]">
          <div>돈까스 김치 나베 라면</div>
          <button className="content-font-color">보러가기</button>
        </div>
        <div className="flex space-x-12 pt-5 pb-5 border-b-2 border-[#E0C3AE]">
          <div>돈까스 김치 나베 라면</div>
          <button className="content-font-color">보러가기</button>
        </div>
        <div className="flex space-x-12 pt-5 pb-5 border-b-2 border-[#E0C3AE]">
          <div>돈까스 김치 나베 라면</div>
          <button className="content-font-color">보러가기</button>
        </div>
      </section>
    </section>
  );
}
