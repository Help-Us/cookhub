"use client";
import React, { useState, useEffect } from 'react';
import SearchBox from "@/components/layout/SearchBox";
import { Recipe } from '@/types';
import RecommendedRecipes from '@/components/mainpage/RecommendRecipes';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // 레시피 데이터 랜덤
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // 초기, 추천 레시피
  const fetchInitialRecipes = async () => {
    try {
      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/${apiKey}/COOKRCP01/json/1/1000`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
        how: recipe.RCP_WAY2,
      }));

      shuffleArray(recipesData); // 레시피 데이터 배열 랜덤하게
      const selectedRecipes = recipesData.slice(0, 6);

      setRecipes(selectedRecipes); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch initial recipes:", error);
    } finally {
      setIsLoading(false); // API 호출 완료 후 로딩 종료
    }
  };

  useEffect(() => {
    fetchInitialRecipes(); // 마운트될 때, 초기 레시피 불러옴
  }, []);

  // 검색 시,
  const fetchRecipe = async (recipeName: string) => {
    try {
      setIsLoading(true); // 검색 전 로딩 상태로 변경
      setSearched(true); // 검색이 수행되었음을 표시
      setSearchTerm(recipeName); // 검색된 키워드 상태 업데이트

      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/${apiKey}/COOKRCP01/json/1/1000/RCP_NM="${recipeName}"`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
        how: recipe.RCP_WAY2,
      }));

      shuffleArray(recipesData); // 검색 결과도 랜덤하게 섞음
      setRecipes(recipesData);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    } finally {
      setIsLoading(false); // 검색 완료 후 로딩 상태를 false로 변경
    }
  };

  return (
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ):(
        <div className="flex flex-col items-center justify-center min-h-screen">
          <SearchBox onSearch={fetchRecipe} />
          {searched && ( // 검색이 수행되었을 때만 검색된 키워드를 포함하는 문구를 보여줌
            <h2 className="text-2xl"><span className="text-red-500">{searchTerm}</span> 검색 결과</h2> // 검색된 키워드를 빨간색으로 표시
          )}
          {!searched && (
            <>
              <h1 className='text-brown text-2xl font-bold text-left py-5 bg-grey'>스트랩 TOP 레시피</h1>
              <p>데이터 들어 올 자리</p>
              <h1 className='text-brown text-2xl font-bold text-left'>추천 레시피</h1>
            </>
          )}
          <RecommendedRecipes recipes={recipes}/>
        </div>
      )}
    </>
  )
}
