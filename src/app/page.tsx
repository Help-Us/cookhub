"use client";
import React, { useState, useEffect } from 'react';
import SearchBox from "@/components/layout/SearchBox";
import RecommendedRecipe from '@/components/mainpage/RecommendRecipe';
import ClippingRecipe from '@/components/mainpage/ClippingRecipe'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";

import type { Recipe } from '@/types';
import type { Database } from '@/types/database.type'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [topScrappedRecipes, setTopScrappedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "";
  const supabase = createClient<Database>(supabaseURL, supabaseKey);

  const router = useRouter(); // useRouter 훅을 사용하기 위해 추가

  const onSearch = (searchTerm: string) => {
    router.push(`/category/${searchTerm.trim() ? searchTerm : "All"}`);
  };

  useEffect(() => {
    setIsLoading(true); // 컴포넌트가 마운트될 때 로딩 상태를 true로 설정
    fetchTopScrappedRecipes(); // 마운트될 때, 스크랩 TOP 레시피 불러옴
    fetchInitialRecipes(); // 마운트될 때, 추천 레시피 불러옴
  }, []);

  // 스크랩 TOP 레시피 목록을 가져오는 함수
  const fetchTopScrappedRecipes = async () => {
    try {
      setIsLoading(true);
      // 스크랩 테이블에서 최신 순으로 recipe_id를 가져옵니다.
      // 중복을 고려하여 더 많은 데이터를 가져옵니다.
      const { data: scrapData, error: scrapError } = await supabase
        .from('scrap')
        .select('recipe_id, created_at')
        .order('created_at', { ascending: false })
        .limit(10); // 예시로 10개를 가져옵니다. 상황에 따라 조정이 필요할 수 있습니다.
  
      if (scrapError) throw scrapError;
  
      // 중복 제거 후 최신순으로 3개의 고유 recipe_id를 선택합니다.
      const uniqueRecipeIds = Array.from(new Map(scrapData.map(item => [item.recipe_id, item])).values())
        .slice(0, 3)
        .map(item => item.recipe_id);
  
      // 가져온 recipe_id를 사용하여 cookrcp 테이블에서 해당 레시피 정보를 조회합니다.
      const { data: recipesData, error: recipesError } = await supabase
        .from('cookrcp')
        .select('RCP_ID, RCP_WAY, RCP_TYPE, RCP_IMG_BIG, RCP_NAME')
        .in('RCP_ID', uniqueRecipeIds);
  
      if (recipesError) throw recipesError;
  
      // 데이터 변환
      const formattedData = recipesData.map(recipe => ({
        id: recipe.RCP_ID,
        image: recipe.RCP_IMG_BIG,
        name: recipe.RCP_NAME,
        type: recipe.RCP_TYPE,
        how: recipe.RCP_WAY,
      }));
  
      setTopScrappedRecipes(formattedData); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch top scrapped recipes:", error);
    } finally {
      setIsLoading(false); // API 호출 완료 후 로딩 종료
    }
  };

  // 추천 레시피 목록
  const fetchInitialRecipes = async () => {
    try {
        setIsLoading(true);
        const { data: recipesData, error } = await supabase
            .from('cookrcp') // Supabase 테이블
            .select('RCP_ID, RCP_WAY, RCP_TYPE, RCP_IMG_BIG, RCP_NAME, RCP_TIP')

        if (error) throw error;

        // 데이터 변환
        const formattedData = recipesData.map(recipe => ({
            id: recipe.RCP_ID,
            image: recipe.RCP_IMG_BIG,
            name: recipe.RCP_NAME,
            type: recipe.RCP_TYPE,
            how: recipe.RCP_WAY,
            tip: recipe.RCP_TIP,
        }));

        const randomRecipes = formattedData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setRecipes(randomRecipes); // 상태 업데이트
    } catch (error) {
        console.error("Failed to fetch initial recipes:", error);
    } finally {
        setIsLoading(false); // API 호출 완료 후 로딩 종료
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <SearchBox onSearch={onSearch}/>
          <div className='w-1200'>
              <h1 className='text-brown text-2xl text-left py-5'>최근 주목받는 레시피</h1>
              <ClippingRecipe recipes={topScrappedRecipes}/>
              <h1 className='text-brown text-2xl text-left py-5'>추천 레시피</h1>
              <RecommendedRecipe recipes={recipes}/>
            </div>
        </div>
      )}
    </>
  )  
}
