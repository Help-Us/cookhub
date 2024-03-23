"use client";

import { checkIsScrapped } from "@/api/supabase/supabase";
import { QueryKeys } from "@/constants/QueryKeys";
import {
  useAddScrapMutation,
  useCancelScrapMutation
} from "@/hooks/mutateScrap";
import { useCheckIsScrappedQuery } from "@/hooks/useQueryScrap";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Scrap = ({ recipeId }: { recipeId: string }) => {
  // 필요한거 유저아이디, 레시피아이디,
  const addScrapMutation = useAddScrapMutation();
  const cancelScrapMutation = useCancelScrapMutation();

  const [currentUserInfo, setCurrentUserInfo] = useState<User | null>();
  const userId = currentUserInfo?.id;

  // 스크랩 여부 체크
  const { data: isScrapped } = useCheckIsScrappedQuery({ userId, recipeId });

  console.log("현재스크랩 상태 : ", isScrapped);

  useEffect(() => {
    const getUserInfo = async () => {
      const currentLoginUserInfo = await getCurrentLoginUserInfo();
      setCurrentUserInfo(currentLoginUserInfo);
    };

    getUserInfo();
  }, []);

  const handleScrapStatusToggle = async () => {
    if (!userId) {
      alert("로그인 정보가 유효하지 않습니다.");
      return;
    }

    // 스크랩하지 않은 레시피일때
    if (!isScrapped) {
      try {
        addScrapMutation.mutate({ userId, recipeId });
      } catch (error) {
        alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }

      //스크랩한 레시피일때
    } else {
      try {
        cancelScrapMutation.mutate({ userId, recipeId });
      } catch (error) {
        alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    console.log(userId, recipeId);
  };

  const check = async () => {
    const checkScrap = await checkIsScrapped({ userId, recipeId });
    console.log(checkScrap);
  };

  return (
    <>
      <div
        onClick={handleScrapStatusToggle}
        className={`${isScrapped ? "bg-[color:var(--subColor4)] text-white" : "bg-[color:var(--subColor7)] text-[color:var(--subColor8)]"} cursor-pointer  h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]`}
      >
        <p className="text-md mr-1 font-semibold flex items-center ">
          {!isScrapped ? "스크랩하기" : "스크랩된 레시피"}
        </p>
        {isScrapped ? (
          <IoBookmark size={18} />
        ) : (
          <IoBookmarkOutline size={18} />
        )}
      </div>
      <div onClick={check}> 스크랩 체크</div>
      <div className="h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]">
        <p className="text-md mr-1 font-semibold flex items-center ">
          스크랩된 레시피
        </p>
      </div>
    </>
  );
};

export default Scrap;
