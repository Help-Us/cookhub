"use client";

import FilteredFoods from "@/components/category/FilteredFoods";

import { RecipeType } from "@/types";
import React, { useEffect, useState } from "react";
import SearchBox from "../layout/SearchBox";
import { filterData } from "@/api/supabase/supabase";

const Category = ({
  filteredRecipes,
  searchKeyword
}: {
  filteredRecipes: RecipeType[] | null;
  searchKeyword: string | null;
}) => {
  const foodList = ["밥", "반찬", "국&찌개", "특별식", "후식"];
  const calorieList = ["다이어트", "일반식", "푸짐하게", "오늘만 산다"];
  const calorieNumberList = [200, 400, 700, 701];

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
      {/* 함수 실행 결과를 전달하는 것이 아니라 함수 자체를 전달 */}
      <SearchBox onSearch={(searchKeyword) => filterData(searchKeyword)} />
      <div className="w-[1048px] m-auto min-w-fit flex flex-col items-center">
        <div className="flex flex-col justify-center w-fit mt-8">
          <div className="flex p-2 items-center mb-2 ">
            {/* ------------------ 요리종류 카테고리바 --------------- */}
            <div
              className={`flex items-center justify-center border border-solid border-[color:var(--borderColor2)] w-28 h-8 text-md/[10px] rounded-xl bg-[color:var(--baseColor)]`}
            >
              요리 종류
            </div>
            <div className="bg-[color:var(--borderColor2)] w-1 h-8 ml-4 mr-8"></div>
            <div className="flex items-center gap-4">
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

          {/* ------------------ 칼로리 카테고리바 --------------- */}
          <div className="flex p-2 items-center ">
            <div
              className={`flex items-center justify-center border border-solid border-[color:var(--borderColor2)] w-28 h-8 text-md/[10px] rounded-xl bg-[color:var(--baseColor)]`}
            >
              칼로리
            </div>
            <div className="bg-[color:var(--borderColor2)] w-1 h-8 ml-4 mr-8"></div>
            <div className="flex items-center gap-4">
              {calorieList.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() =>
                        handleCalorieCategoryClick(
                          item,
                          calorieNumberList[index]
                        )
                      }
                      className={`text-md pl-4 pr-4 text-center cursor-pointer ${
                        selectedCalorieLevel === item
                          ? "text-[color:var(--highlightColor1)] "
                          : ""
                      }`}
                    >
                      {item}
                      <br />
                      {calorieNumberList[index] <= 700 ? (
                        <span className="text-sm">
                          (~{calorieNumberList[index]}kcal)
                        </span>
                      ) : (
                        <span className="text-sm">
                          ({calorieNumberList[index] - 1}kcal 이상)
                        </span>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center min-w-[1048px]">
          {searchKeyword === "All" ? (
            <div className="text-2xl mb-10 text-center">
              <span className="">전체 레시피</span>
              <br />
              {!selectedFood && !selectedCalorieLevel && (
                <div className="text-sm font-light text-center mt-3">
                  카테고리 탭을 활용해 원하는 레시피를 찾아보세요.
                </div>
              )}
            </div>
          ) : (
            <div className="font-bold text-2xl mb-10">
              <span className="text-rose-500">{searchKeyword}</span> 검색결과
            </div>
          )}

          {/* 레시피들 컴포넌트 */}
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
