"use client";

import { RecipeType } from "@/types";
import React, { useState } from "react";

const FilteredFoods = ({
  filteredRecipes
}: {
  filteredRecipes: RecipeType[] | null;
}) => {
  const [orderByIndex, setOrderByIndex] = useState(-1);

  console.log(filteredRecipes);

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
        {filteredRecipes?.map((item) => {
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
              <div className="flex text-sm text-gray-600 gap-2 mt-8">
                <span>{item.HASH_TAG ? `#${item.HASH_TAG}` : ""}</span>
              </div>
              <div className="mt-1 text-xl font-bold">{item.RCP_NAME}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilteredFoods;
