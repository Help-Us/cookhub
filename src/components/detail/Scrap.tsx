"use client";

import {
  cancelScrapRecipe,
  checkIsScrraped,
  scrapRecipe
} from "@/api/supabase/supabase";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Scrap = ({ recipeId }: { recipeId: string }) => {
  // 필요한거 유저아이디, 레시피아이디,

  const [currentUserInfo, setCurrentUserInfo] = useState<User | null>();
  const userId = currentUserInfo?.id;
  // if (!userId) return;

  useEffect(() => {
    const getUserInfo = async () => {
      const currentLoginUserInfo = await getCurrentLoginUserInfo();
      setCurrentUserInfo(currentLoginUserInfo);
    };

    getUserInfo();
  }, []);

  const handleScrapClick = async () => {
    const isScrappedRecipe = await checkIsScrraped(userId, recipeId);

    // 스크랩하지 않은 레시피일때
    if (!isScrappedRecipe) {
      try {
        await scrapRecipe(userId, recipeId);
      } catch (error) {
        console.log("스크랩 인서트 오류", error);
      }

      //스크랩한 레시피일때
    } else {
      try {
        await cancelScrapRecipe(userId, recipeId);
      } catch (error) {
        console.log("스크랩 취소 오류", error);
      }
    }
    console.log(userId, recipeId);
  };

  //스크랩 여부를 확인하려면?
  // 데이터베이스에 현재 유저아이디와 레시피아이디가 일치하는 행..?이있으면?
  // 스크랩 디비에서 현재 로그인 유저 아이디 row만 뽑아와서 현재 레시피 아이디가 있으면? 스크랩상태

  const check = async () => {
    const checkScrap = await checkIsScrraped(userId, recipeId);
    console.log(checkScrap);
  };

  return (
    <>
      <div
        onClick={handleScrapClick}
        className="bg-[color:var(--subColor7)] cursor-pointer text-[color:var(--subColor8)] h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]"
      >
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩하기
        </p>
        <IoBookmarkOutline size={18} />
      </div>
      <div onClick={check}> 스크랩 체크</div>
      <div className="bg-[color:var(--subColor4)] text-white h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩된 레시피
        </p>
        <IoBookmark size={18} />
      </div>
    </>
  );
};

export default Scrap;
