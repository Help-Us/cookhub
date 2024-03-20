"use client";
import CategoryBar from "@/components/category/CategoryBar";
import FilteredFoods from "@/components/category/FilteredFoods";

import SearchBox from "@/components/layout/SearchBox";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const categoryPage = () => {
  const params = useSearchParams();
  const searchKeyword = params.get("search");

  const foodList = ["밥", "반찬", "국/찌개", "후식"];
  const calorieList = [
    "다이어트",
    "간단 한끼",
    "일반식",
    "푸짐하게",
    "오늘만 산다"
  ];
  const calorieNumberList = ["100", "250", "350", "450", "500"];

  const [selectedFoodIndex, setSelectedFoodIndex] = useState(""); // 초기값은 선택되지 않음을 의미
  const [selectedCalorieIndex, setSelectedCalorieIndex] = useState("");

  //카테고리바에서는 state만 여기로 넘겨주면됨
  //db에서 키워드로 한번 가른 데이터 넘겨주고

  return (
    <>
      <div className="w-3/5 m-auto min-w-fit">
        <div className="flex flex-col justify-center w-3/4 m-auto">
          <div className="flex p-2 items-center mb-2 ">
            <div
              className={`flex items-center justify-center border border-solid border-[color:var(--highlightColor1)] w-28 h-8 text-md/[10px] rounded-xl bg-[color:var(--subColor1)]`}
            >
              요리 종류
            </div>
            <div className="bg-[color:var(--highlightColor1)] w-1 h-8 ml-4 mr-8"></div>
            <div className="flex items-center gap-6">
              {foodList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedFoodIndex(item)}
                    className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                      selectedFoodIndex === item
                        ? "text-[color:var(--highlightColor1)] "
                        : ""
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex p-2 items-center">
            <div
              className={`flex items-center justify-center border border-solid border-[color:var(--highlightColor1)] w-28 h-8 text-md/[10px] rounded-xl bg-[color:var(--subColor1)]`}
            >
              칼로리
            </div>
            <div className="bg-[color:var(--highlightColor1)] w-1 h-8 ml-4 mr-8"></div>
            {calorieList.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={() => setSelectedCalorieIndex(item)}
                    className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                      selectedCalorieIndex === item
                        ? "text-[color:var(--highlightColor1)] "
                        : ""
                    }`}
                  >
                    {item}
                    <br />
                    <span className="text-sm">
                      (~{calorieNumberList[index]}kcal)
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <div className="font-bold text-2xl mb-10">
            <span className="text-rose-500">{searchKeyword}</span> 검색결과
          </div>
          <FilteredFoods />
        </div>
      </div>
    </>
  );
};

export default categoryPage;
