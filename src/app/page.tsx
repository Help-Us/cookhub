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

  const router = useRouter();

  const onSearch = (searchTerm: string) => {
    router.push(`/category/${searchTerm.trim() ? searchTerm : "All"}`);
  };

  useEffect(() => {
    setIsLoading(true); // 컴포넌트가 마운트될 때 로딩 상태를 true
    fetchTopScrappedRecipes(); 
    fetchInitialRecipes(); 
  }, []);

  // 스크랩 TOP 레시피 목록
  const fetchTopScrappedRecipes = async () => {
    try {
      const { data, error } = await supabase
        .rpc('fetch_top_scrapped_recipes')
        .select('RCP_ID, RCP_WAY, RCP_TYPE, RCP_IMG_BIG, RCP_NAME')

      if (error) throw error;

      const formattedData = data.map(recipe => ({
        id: recipe.RCP_ID,
        image: recipe.RCP_IMG_BIG,
        name: recipe.RCP_NAME,
        type: recipe.RCP_TYPE,
        how: recipe.RCP_WAY,
      }));

      setTopScrappedRecipes(formattedData);
    } catch (error) {
      console.error("error", error);
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

        const formattedData = recipesData.map(recipe => ({
            id: recipe.RCP_ID,
            image: recipe.RCP_IMG_BIG,
            name: recipe.RCP_NAME,
            type: recipe.RCP_TYPE,
            how: recipe.RCP_WAY,
            tip: recipe.RCP_TIP,
        }));

        const randomRecipes = formattedData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setRecipes(randomRecipes);
    } catch (error) {
        console.error("error", error);
    } finally {
        setIsLoading(false); 
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
              <h1 className='text-brown text-2xl text-left py-5'>스크랩 TOP3 레시피</h1>
              <ClippingRecipe recipes={topScrappedRecipes}/>
              <h1 className='text-brown text-2xl text-left py-5'>추천 레시피</h1>
              <RecommendedRecipe recipes={recipes}/>
            </div>
        </div>
      )}
    </>
  )  
}
