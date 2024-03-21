"use client";

import { RecipeType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/Cookhub_Logo.png.png";

const FilteredFoods = ({
  filteredRecipes,
  selectedFood,
  selectedCalorieNumberLevel
}: {
  filteredRecipes: RecipeType[] | null;
  selectedFood: string;
  selectedCalorieNumberLevel: number;
}) => {
  // 카테고리 선택 취소
  //  const calorieNumberList = [200, 400, 700, 701];
  const categoryFilter = () => {
    if (!filteredRecipes) return null; // filteredRecipes가 undefined일 경우 null 반환

    const filterByCategoryRecipes = filteredRecipes.filter((item) => {
      // 카테고리를 선택했으면 필터조건추가, 아니면 true로 필터링 조건 무시(모든 아이템이 통과)
      const filterByFood = selectedFood ? item.RCP_TYPE === selectedFood : true;
      if (selectedCalorieNumberLevel) {
        if (selectedCalorieNumberLevel === 200) {
          const filterByCalories = item.INFO_CAR <= 200;
          return filterByCalories;
        } else if (selectedCalorieNumberLevel === 400) {
          const filterByCalories = item.INFO_CAR >= 201 && item.INFO_CAR <= 400;
          return filterByCalories;
        } else if (selectedCalorieNumberLevel === 700) {
          const filterByCalories = item.INFO_CAR >= 401 && item.INFO_CAR <= 700;
          return filterByCalories;
        } else if (selectedCalorieNumberLevel === 701) {
          const filterByCalories = item.INFO_CAR >= 701;
          return filterByCalories;
        }
      } else true;
      const filterByCalories = selectedCalorieNumberLevel
        ? item.INFO_CAR <= selectedCalorieNumberLevel
        : true;
      return filterByFood && filterByCalories;
    });
    console.log(filterByCategoryRecipes);
    return filterByCategoryRecipes;
  };

  const [recipeList, setRecipeList] = useState<RecipeType[] | null>(
    filteredRecipes
  );

  useEffect(() => {
    setRecipeList(categoryFilter());
  }, [selectedFood, selectedCalorieNumberLevel, filteredRecipes]);

  return (
    <>
      <div className="flex w-full justify-between text-sm items-center mb-2">
        <div className="">
          검색결과{" "}
          <span className="text-[color:var(--highlightColor1)] font-bold text-lg">
            {recipeList?.length}
          </span>
          건 조회
        </div>
        {/* <div className={`flex cursor-pointer  gap-4`}></div> */}
      </div>
      {recipeList?.length === 0 && (
        <div className="w-full mt-12 text-center">검색결과가 없습니다.</div>
      )}
      <div className="w-full grid grid-cols-4 gap-2">
        {/* --------------- 레시피 맵------------------- */}
        {recipeList?.map((item) => {
          return (
            <div className="mb-8 cursor-pointer w-64 relative">
              {/* 추천, 인기 스티커 조건 추가 필 */}
              {/* <div className="absolute text-sm top-36 right-16 mr-1 rounded-full bg-[color:var(--highlightColor2)] w-11 h-11 flex items-center justify-center leading-5 text-white">
                추천
              </div>
              <div className="absolute text-sm top-36 right-4 rounded-full bg-[color:var(--subColor6)] w-11 h-11 flex items-center justify-center leading-5 text-white">
                인기
              </div> */}
              {item.RCP_IMG_SMALL ? (
                <Image
                  width={256}
                  height={176}
                  alt="Recipe Thumbnail Image"
                  className="w-64 h-44 object-cover object-center"
                  src={item.RCP_IMG_SMALL ? item.RCP_IMG_SMALL : ""}
                />
              ) : (
                <Image
                  width={256}
                  height={176}
                  alt="Recipe Thumbnail Image"
                  className="w-64 h-44 object-cover object-center"
                  src={logoImage}
                />
              )}

              <div
                className={`mt-1 ${item.RCP_NAME.length >= 13 ? "text-md" : "text-lg"} font-bold mt-4`}
              >
                {item.RCP_NAME}
              </div>
              <div className="flex text-sm text-gray-600 gap-2 mt-1">
                {item.HASH_TAG && <span>#{item.HASH_TAG}</span>}
                <div
                  className={`ml-auto text-gray-900 text-xs mr-3 bg-[color:var(--subColor1)] border border-solid border-yellow-500 rounded-full flex justify-center items-center ${item.INFO_CAR.toString().length < 4 ? "w-14" : "w-[70px]"} h-5`}
                >
                  {item.INFO_CAR}kcal
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilteredFoods;
