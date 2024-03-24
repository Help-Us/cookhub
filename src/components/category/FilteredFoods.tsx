"use client";

import { RecipeType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoImage from "../../assets/images/Cookhub_Logo.png";
import { useRouter } from "next/navigation";
import {
  useFetchTopScrappedRecipes,
  usefilterRecipeQuery
} from "@/hooks/useQuery";

const FilteredFoods = ({
  selectedFood,
  selectedCalorieNumberLevel,
  searchKeyword
}: {
  selectedFood: string;
  selectedCalorieNumberLevel: number;
  searchKeyword: string;
}) => {
  const router = useRouter();
  const [recipeList, setRecipeList] = useState<RecipeType[]>();

  // 레시피 불러오기
  const { filteredRecipes, isFilterError, isFilterLoading } =
    usefilterRecipeQuery({ searchKeyword });

  const { topRecipes, isFetchTopRecipesError } = useFetchTopScrappedRecipes();

  useEffect(() => {
    setRecipeList(categoryFilter());
  }, [selectedFood, selectedCalorieNumberLevel, filteredRecipes]);

  if (isFilterError) {
    return alert(
      "레시피를 불러오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }

  if (isFetchTopRecipesError) {
    console.error(
      "상위 스크랩된 레시피를 불러오는 중 오류가 발생",
      isFetchTopRecipesError
    );
    return alert("상위 스크랩된 레시피를 불러오는 동안 오류가 발생했습니다.");
  }
  // 카테고리 필터링 함수
  const categoryFilter = () => {
    // 요리 종류 필터링
    const filterFoodType = (item: RecipeType, selectedFood: string) => {
      if (selectedFood === "특별식") {
        return item.RCP_TYPE === "일품" || item.RCP_TYPE === "기타";
      } else return item.RCP_TYPE === selectedFood;
    };

    // 칼로리 레벨 필터링
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
          return item.INFO_CAR >= 700;
      }
    };

    const filterByCategoryRecipes = filteredRecipes?.filter((item) => {
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

  return (
    <>
      {isFilterLoading && (
        <span className="loading loading-infinity loading-lg mt-12"></span>
      )}
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
      </div>

      {recipeList?.length === 0 && (
        <div className="w-full mt-12 text-center">검색결과가 없습니다.</div>
      )}
      <div className="w-full grid grid-cols-4 gap-2">
        {/* --------------- 레시피 맵------------------- */}
        {recipeList?.map((item) => {
          return (
            <div
              key={item.RCP_ID}
              className="mb-8 cursor-pointer w-64 relative"
              onClick={() => router.push(`/detail/${item.RCP_ID}`)}
            >
              {/* 탑 레시피 배열의 RCP_ID들 중에 item.RCP_ID가 있으면 true를 반환 */}
              {topRecipes?.some(
                (topRecipes) => topRecipes.RCP_ID === item.RCP_ID
              ) && (
                <div className="absolute text-sm top-36 right-6 rounded-full bg-[color:var(--highlightColor2)] w-11 h-11 flex items-center justify-center leading-5 text-white border-[color:var(--subColor7)] border border-solid">
                  인기
                </div>
              )}
              {item.RCP_IMG_SMALL || item.RCP_IMG_BIG ? (
                <Image
                  width={256}
                  height={176}
                  alt="Recipe Thumbnail Image"
                  className="w-64 h-44 object-cover object-center"
                  src={
                    item.RCP_IMG_SMALL ? item.RCP_IMG_SMALL : item.RCP_IMG_BIG
                  }
                  quality={100}
                  placeholder="blur"
                  blurDataURL="https://colorate.azurewebsites.net/SwatchColor/E2E2E2"
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
                className={`mt-3 ${item.RCP_NAME.length >= 13 ? "text-md" : "text-lg"} font-bold`}
              >
                {item.RCP_NAME}
              </div>
              <div className="flex mt-1 text-gray-900 gap-1">
                {item.HASH_TAG && (
                  <div
                    className={`w-fit px-2 h-5 text-xs  bg-[color:var(--subColor1)] border border-solid border-yellow-500 rounded-full flex justify-center items-center `}
                  >
                    #{item.HASH_TAG}
                  </div>
                )}
                <div
                  className={`w-fit px-2 h-5 text-gray-900 text-xs bg-[color:var(--subColor1)] border border-solid border-yellow-500 rounded-full flex justify-center items-center `}
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
