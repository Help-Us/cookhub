"use client";

import {
  useAddScrapMutation,
  useCancelScrapMutation
} from "@/hooks/mutateScrap";
import { useCheckIsScrappedQuery } from "@/hooks/useQueryScrap";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import { User } from "@supabase/supabase-js";
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
  const { data: isScrapped, isLoading } = useCheckIsScrappedQuery({
    userId,
    recipeId
  });

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
  };

  return (
    <div
      onClick={handleScrapStatusToggle}
      className={`${isScrapped ? "" : " hover:bg-[color:var(--subColor4)] hover:text-white"} 
        transition duration-200 ease-in-out bg-[color:var(--subColor7)] text-[color:var(--subColor8)]
        cursor-pointer  h-16 w-full mx-auto flex justify-center items-center rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)] border border-solid border-[color:var(--highlightColor1)]`}
    >
      {isLoading ? (
        "스크랩 정보 로딩중"
      ) : (
        <>
          <p className="font-semibold mr-0.5">
            {!isScrapped ? "스크랩하기" : "스크랩된 레시피"}
          </p>
          {isScrapped ? (
            <IoBookmark className="mt-0.5" size={18} />
          ) : (
            <IoBookmarkOutline className="mt-0.5" size={18} />
          )}
        </>
      )}
    </div>
  );
};

export default Scrap;
