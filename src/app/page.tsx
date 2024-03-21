"use client";
import React, { useState, useEffect } from 'react';
import SearchBox from "@/components/layout/SearchBox";
import RecommendedRecipe from '@/components/mainpage/RecommendRecipe';
import { createClient } from '@supabase/supabase-js'

import type { Recipe } from '@/types';
import type { Database } from '@/types/database.type'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searched, setSearched] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');

  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "";
  const supabase = createClient<Database>(supabaseURL, supabaseKey);

  useEffect(() => {
    setIsLoading(true); // 컴포넌트가 마운트될 때 로딩 상태를 true로 설정
    fetchInitialRecipes(); // 마운트될 때, 초기 레시피 불러옴
  }, []);

  // 초기, 추천 레시피 목록
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
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <SearchBox />
          <div className='w-1200'>
              <h1 className='text-brown text-2xl text-left py-5'>스크랩 TOP 레시피</h1>
              <RecommendedRecipe recipes={recipes} searched={false}/>
              <h1 className='text-brown text-2xl text-left py-5'>추천 레시피</h1>
              <RecommendedRecipe recipes={recipes} searched={false}/>
            </div>
        </div>
      )}
    </>
  )  
}
