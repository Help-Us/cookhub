"use client";

import { getSelectUserInfo } from "@/api/supabase/supabase";
import React, { useState, useRef, useEffect } from "react";
import MyPageScrap from "./MyPageScrap";
import Image from "next/image";
import "../styles/style.css";
import { UserDatabaseType } from "@/types";

export default function MyPageContents() {
  const [userInfo, setUserInfo] = useState<UserDatabaseType[] | null>(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState<string>("");

  const imgRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(""); // 여기에 defaultImg를 넣어줘야할듯
  const [uploadFile, setUploadFile] = useState<File>(); // 여기에 defaultImg를 넣어줘야할듯

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectUserInfo(); // 유저 정보를 가져와서 상태에 저장
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다.", error);
        // 에러 처리 로직을 여기에 추가하시면 됩니다.
      }
    };
    fetchData();
  }, []);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <section className="section-base-color flex flex-col justify-center pr-10 pl-10 py-16 rounded-3xl shadow-xl border-line shadow-[#E0C3AE]">
      <h2 className="header-font-color text-center mb-20 text-3xl ">프로필</h2>

      <div className="flex justify-center gap-5 mb-10">
        <div className="flex flex-col align-center mb-5">
          {/* 아바타 */}
          <Image src={avatar} alt="프로필 사진" width={300} height={300} />
          {/* 파일선택 */}
          <input
            type="file"
            id="avatar"
            onChange={(e) => {
              setUploadFile(e.target.files?.[0]);
            }}
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // 수정 완료 후 수정 종료
            setIsEditing(false);
          }}
          className="p-4 content-font-color"
        >
          <div className="text-xl mt-3 mb-5">
            {isEditing ? (
              <input
                type="text"
                id="nickname"
                maxLength={10}
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
            ) : (
              <div className="text-xl mb-7">
                <p className="mb-5">Email: {userInfo[0].email}</p>
                <p>Nickname: {userInfo[0].nickname}</p>
              </div>
            )}
          </div>

          <div>
            {/* <button className=" w-full px-3 py-2 mt-3 text-white bg-yellow-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
              프로필 사진 변경 완료
            </button> */}
            {!isEditing ? (
              <div className="flex flex-col mt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)} // 수정 모드로 전환
                  className="profile-btn w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  수정하기
                </button>
                <button className="profile-btn w-full pr-28 pl-28 py-2.5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-3">
                <button
                  type="submit" // 폼 제출
                  className="w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  수정완료
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)} // 수정 종료
                  className="w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  취소
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <MyPageScrap />
    </section>
  );
}
