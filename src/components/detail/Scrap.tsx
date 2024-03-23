"use client";

import {
  addScrap,
  cancelScrap,
  checkIsScrraped
} from "@/api/supabase/supabase";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Scrap = ({ recipeId }: { recipeId: string }) => {
  // 필요한거 유저아이디, 레시피아이디,

  const [currentUserInfo, setCurrentUserInfo] = useState<User | null>();
  const [isScrapped, setIsScrapped] = useState<boolean>(false); // 스크랩 여부 상태 추가
  const userId = currentUserInfo?.id;
  // if (!userId) return;

  useEffect(() => {
    const getUserInfo = async () => {
      const currentLoginUserInfo = await getCurrentLoginUserInfo();
      setCurrentUserInfo(currentLoginUserInfo);

      if (currentLoginUserInfo) {
        const isScrappedRecipe = await checkIsScrraped(
          // userId를 넣게되면 마운트될때 userId는 undefined이므로 함수 내에 있는 데이터인
          // currentLoginUserInfo의 id를 넣어주면 undefined가 나오지 않는다.
          currentLoginUserInfo.id,
          recipeId
        );
        setIsScrapped(isScrappedRecipe); // 스크랩 여부 업데이트
      }
    };

    getUserInfo();
  }, []);

  console.log(isScrapped);

  const handleScrapStatusToggle = async () => {
    const isScrappedRecipe = await checkIsScrraped(userId, recipeId);

    // 스크랩하지 않은 레시피일때
    if (!isScrappedRecipe) {
      try {
        await addScrap(userId, recipeId);
      } catch (error) {
        console.log("스크랩 인서트 오류", error);
      }

      //스크랩한 레시피일때
    } else {
      try {
        await cancelScrap(userId, recipeId);
      } catch (error) {
        console.log("스크랩 취소 오류", error);
      }
    }
    console.log(userId, recipeId);
  };

  const check = async () => {
    const checkScrap = await checkIsScrraped(userId, recipeId);
    console.log(checkScrap);
  };

  return (
    <>
      <div
        onClick={handleScrapStatusToggle}
        className="bg-[color:var(--subColor7)] cursor-pointer text-[color:var(--subColor8)] h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]"
      >
        <p className="text-md mr-1 font-semibold flex items-center ">
          {!isScrapped ? "스크랩하기" : "스크랩된 레시피"}
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
