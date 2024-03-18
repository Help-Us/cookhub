"use client";
import React, { useState, useEffect } from 'react';
import SearchBox from "@/components/layout/SearchBox";

interface Recipe {
  image: string;
  name: string;
  type: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // 레시피 데이터를 랜덤하게 섞는 함수
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6의 구조 분해 할당을 사용하여 요소를 교환
    }
  };

  const fetchInitialRecipes = async () => {
    try {
      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/7`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
      }));

      shuffleArray(recipesData); // 레시피 데이터 배열을 랜덤하게 섞음
      setRecipes(recipesData);
    } catch (error) {
      console.error("Failed to fetch initial recipes:", error);
    }
  };

  useEffect(() => {
    fetchInitialRecipes(); // 컴포넌트가 마운트될 때 초기 레시피를 불러옴
  }, []);

  const fetchRecipe = async (recipeName: string) => {
    try {
      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/100/RCP_NM="${recipeName}"`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
      }));

      shuffleArray(recipesData); // 검색 결과도 랜덤하게 섞음
      setRecipes(recipesData);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  return (
    <>
      <SearchBox onSearch={fetchRecipe} />
      <h1>추천 레시피</h1>
      {recipes.length > 0 && (
        recipes.map((recipe, index) => (
          <div key={index}>
            {recipe.image && <img src={recipe.image} alt="Recipe" />}
            <h3>{recipe.name}</h3>
            <p>{recipe.type}</p>
          </div>
        ))
      )}
    </>
  )
}
