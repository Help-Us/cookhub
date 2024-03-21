"use client";

import { RecipeType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/Cookhub_Logo.png";
import { useRouter } from "next/navigation";

const FilteredFoods = ({
  filteredRecipes,
  selectedFood,
  selectedCalorieNumberLevel
}: {
  filteredRecipes: RecipeType[] | null;
  selectedFood: string;
  selectedCalorieNumberLevel: number;
}) => {
  const router = useRouter();
  //  const calorieNumberList = [200, 400, 700, 701];
  const categoryFilter = () => {
    if (!filteredRecipes) return null; // filteredRecipes가 undefined일 경우 null 반환

    const filterFoodType = (item: RecipeType, selectedFood: string) => {
      if (selectedFood === "특별식") {
        return item.RCP_TYPE === "일품" || item.RCP_TYPE === "기타";
      } else return item.RCP_TYPE === selectedFood;
    };

    const switchCaloriesLevel = (
      item: RecipeType,
      selectedCalorieNumberLevel: number
    ) => {
      switch (selectedCalorieNumberLevel) {
        case 200:
          return item.INFO_CAR <= 200;
        case 400:
          return item.INFO_CAR > 200 && item.INFO_CAR <= 400;
        case 700:
          return item.INFO_CAR > 400 && item.INFO_CAR <= 700;
        case 701:
          return item.INFO_CAR > 700;
      }
    };

    const filterByCategoryRecipes = filteredRecipes.filter((item) => {
      // 카테고리를 선택했으면 필터조건추가, 아니면 true로 필터링 조건 무시(모든 아이템이 통과)
      const filterByFood = selectedFood
        ? filterFoodType(item, selectedFood)
        : true;
      const filterByCalories = selectedCalorieNumberLevel
        ? switchCaloriesLevel(item, selectedCalorieNumberLevel)
        : true;
      return filterByFood && filterByCalories;
    });
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
        {recipeList && recipeList?.length >= 1000 ? (
          <div className="">
            현재{" "}
            <span className="text-[color:var(--highlightColor1)] font-bold text-lg">
              {recipeList?.length}
            </span>
            건의 레시피가 있습니다.
          </div>
        ) : (
          filteredRecipes && (
            <div className="">
              검색결과{" "}
              <span className="text-[color:var(--highlightColor1)] font-bold text-lg">
                {recipeList?.length}
              </span>
              건 조회
            </div>
          )
        )}
        {/* <div className={`flex cursor-pointer  gap-4`}></div> */}
      </div>
      {!filteredRecipes && (
        <span className="loading loading-spinner loading-lg mt-12"></span>
      )}
      {recipeList?.length === 0 && (
        <div className="w-full mt-12 text-center">검색결과가 없습니다.</div>
      )}
      <div className="w-full grid grid-cols-4 gap-2">
        {/* --------------- 레시피 맵------------------- */}
        {recipeList?.map((item) => {
          return (
            <div
              className="mb-8 cursor-pointer w-64 relative"
              onClick={() => router.push(`/detail/${item.RCP_ID}`)}
            >
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
