"use client";

import FilteredFoods from "@/components/category/FilteredFoods";

import SearchBox from "@/components/layout/SearchBox";
import { RecipeType } from "@/types";
import React, { useEffect, useState } from "react";

const Category = ({
  filteredRecipes,
  searchKeyword
}: {
  filteredRecipes: RecipeType[] | null;
  searchKeyword: string | null;
}) => {
  const foodList = ["밥", "반찬", "국&찌개", "후식"];
  const calorieList = [
    "다이어트",
    "간단 한끼",
    "일반식",
    "푸짐하게",
    "오늘만 산다"
  ];
  const calorieNumberList = [100, 250, 350, 450, 500];

  const [selectedFood, setSelectedFood] = useState("");
  const [selectedCalorieLevel, setSelectedCalorieLevel] = useState("");
  const [selectedCalorieNumberLevel, setSelectedCalorieNumberLevel] =
    useState(0);

  const handleCalorieCategoryClick = (
    calorieLevel: string,
    calorieNumberLevel: number
  ) => {
    setSelectedCalorieLevel(calorieLevel);
    setSelectedCalorieNumberLevel(calorieNumberLevel);

    // 같은 카테고리 한번 더 클릭시 선택취소
    if (selectedCalorieLevel === calorieLevel) {
      setSelectedCalorieLevel("");
      setSelectedCalorieNumberLevel(0);
    }
  };

  const handleFoodCategoryClick = (foodType: string) => {
    setSelectedFood(foodType);
    if (selectedFood === foodType) {
      setSelectedFood("");
    }
  };

  return (
    <>
      <div className="w-[1048px] m-auto min-w-fit">
        <div className="flex flex-col justify-center w-full">
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
                    onClick={() => handleFoodCategoryClick(item)}
                    className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                      selectedFood === item
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
          <div className="flex p-2 items-center ">
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
                    onClick={() =>
                      handleCalorieCategoryClick(item, calorieNumberList[index])
                    }
                    className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                      selectedCalorieLevel === item
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
          <FilteredFoods
            filteredRecipes={filteredRecipes}
            selectedFood={selectedFood}
            selectedCalorieNumberLevel={selectedCalorieNumberLevel}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
