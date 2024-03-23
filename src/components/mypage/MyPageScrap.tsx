"use client";

import { supabase } from "@/api/supabase/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MyPageScrap() {
  const router = useRouter();
  const [userComments, setUserComments] = useState<any[]>([]); // 댓글 데이터를 저장할 상태

  useEffect(() => {
    // 페이지가 로드될 때
    const fetchUserAndComments = async () => {
      const userInfo = await getCurrentLoginUserInfo();
      if (userInfo) {
        fetchComments(userInfo.id); // 현재 로그인한 사용자의 ID를 사용하여 댓글 데이터 가져오기
      }
    };

    fetchUserAndComments();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const getCurrentLoginUserInfo = async () => {
    const {
      data: { user: currentLoginUserInfo }
    } = await supabase.auth.getUser();

    return currentLoginUserInfo;
  };

  const fetchComments = async (user_id: any) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*") // 모든 컬럼을 가져오기
      .eq("user_id", user_id) // user_id가 현재 로그인한 사용자의 ID와 일치하는 댓글만 가져오기
      .order("created_at", { ascending: false }); // created_at 기준으로 내림차순 정렬

    if (error) {
      console.log("코멘트 가져오기 오류:", error);
      return null;
    }
    console.log("코멘트 데이터:", data);
    setUserComments(data); // 데이터가 있을 경우 상태에 저장하기
  };

  const goToPost = (post_id: any) => {
    router.push(`/detail/${post_id}`);
  };

  return (
    <section className="bg-white rounded-2xl pt-4 pb-4">
      <p className="font-bold text-xl text-center pt-2 pb-3 border-b-4 border-[#E0C3AE]">
        내가 레시피
      </p>

      <section
        className={`flex flex-col items-center text-lg ${userComments.length > 3 ? "commentsContainer" : ""}`}
      >
        {userComments.map((comment, index) => (
          <div
            key={index}
            className="flex space-x-12 pt-5 pb-5 border-b-2 border-[#E0C3AE]"
          >
            <div>{comment.content}</div>
            <button
              onClick={() => goToPost(comment.post_id)}
              className="content-font-color"
            >
              보러가기
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}
