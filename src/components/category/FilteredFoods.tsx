"use client";

import { RecipeType } from "@/types";
import React, { useState } from "react";

const FilteredFoods = ({
  filteredRecipes,
  selectedFood,
  selectedCalorieNumberLevel
}: {
  filteredRecipes: RecipeType[] | null;
  selectedFood: string;
  selectedCalorieNumberLevel: number;
}) => {
  console.log(selectedFood);

  // 카테고리 선택 취소
  // const categoryFilter = (): RecipeType[] | undefined | null => {
  //   if (selectedFood) {
  //     const filteredByCategoryRecipes = filteredRecipes?.filter((item) => {
  //       return (item.RCP_TYPE = selectedFood);
  //     });
  //     return filteredByCategoryRecipes;
  //   } else return filteredRecipes;
  // };

  // const a = categoryFilter();

  return (
    <>
      <div className="flex w-full justify-between text-sm items-center mb-4">
        <div className="">
          검색결과{" "}
          <span className="text-[color:var(--highlightColor1)] font-bold text-lg">
            {filteredRecipes?.length}
          </span>
          건 조회
        </div>
        <div className={`flex gap-2 cursor-pointer  gap-4`}></div>
      </div>
      <div className="w-full grid grid-cols-4 gap-1">
        {/* --------------- 레시피 맵------------------- */}

        {filteredRecipes
          ?.filter((item) => item.RCP_TYPE === selectedFood)
          .map((item) => {
            return (
              <div className="mb-8 cursor-pointer w-64 relative">
                {/* 추천, 인기 스티커 조건 추가 필 */}
                <div className="absolute text-sm top-36 right-16 mr-1 rounded-full bg-[color:var(--highlightColor2)] w-11 h-11 flex items-center justify-center leading-5 text-white">
                  추천
                </div>
                <div className="absolute text-sm top-36 right-4 rounded-full bg-[color:var(--subColor6)] w-11 h-11 flex items-center justify-center leading-5 text-white">
                  인기
                </div>
                <img
                  className="w-64 h-44 object-cover"
                  src={item.RCP_IMG_SMALL ? item.RCP_IMG_SMALL : ""}
                ></img>

                <div className="mt-1 text-lg font-bold mt-4">
                  {item.RCP_NAME}
                </div>
                <div className="flex text-sm text-gray-600 gap-2 mt-1">
                  {item.HASH_TAG && <span>#{item.HASH_TAG}</span>}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FilteredFoods;
