"use client";

import React, { useState } from "react";

const CategoryBar = () => {
  const foodList = ["밥", "반찬", "국/찌개", "후식"];
  const calorieList = [
    "다이어트",
    "간단 한끼",
    "일반식",
    "푸짐하게",
    "오늘만 산다"
  ];
  const calorieNumberList = ["100", "250", "350", "450", "500"];

  const [selectedFoodIndex, setSelectedFoodIndex] = useState(-1); // 초기값은 선택되지 않음을 의미
  const [selectedCalorieIndex, setSelectedCalorieIndex] = useState(-1);

  return (
    <>
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
                onClick={() => setSelectedFoodIndex(index)}
                className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                  selectedFoodIndex === index
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
                onClick={() => setSelectedCalorieIndex(index)}
                className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                  selectedCalorieIndex === index
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
    </>
  );
};

export default CategoryBar;
