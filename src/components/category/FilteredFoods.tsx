"use client";

import React, { useState } from "react";

const FilteredFoods = () => {
  const [orderByIndex, setOrderByIndex] = useState(-1);

  return (
    <>
      <div className="flex w-full justify-between text-sm items-center mb-4">
        <div className="">
          검색결과{" "}
          <span className="text-[color:var(--highlightColor1)] font-bold text-lg">
            13
          </span>
          건 조회
        </div>
        <div className={`flex gap-2 cursor-pointer  gap-4`}></div>
      </div>
      <div className="w-full grid grid-cols-4 gap-1">
        <div className="mb-8 cursor-pointer w-64 relative">
          {/* 추천, 인기 스티커 조건 추가 필 */}
          <div className="absolute text-sm top-36 right-16 mr-1 rounded-full bg-[color:var(--highlightColor2)] w-11 h-11 flex items-center justify-center leading-5 text-white">
            추천
          </div>
          <div className="absolute text-sm top-36 right-4 rounded-full bg-[color:var(--subColor6)] w-11 h-11 flex items-center justify-center leading-5 text-white">
            인기
          </div>
          <img
            className="w-64"
            src="https://img.hankyung.com/photo/202309/99.20417298.1.jpg"
          ></img>
          <div className="flex text-sm text-gray-600 gap-2 mt-8">
            <span>#파스타</span>
            <span>#오일파스타</span>
            <span>#새우오일파스타</span>
          </div>
          <div className="mt-1 text-xl font-bold">마라 삼계탕</div>
        </div>
      </div>
    </>
  );
};

export default FilteredFoods;
