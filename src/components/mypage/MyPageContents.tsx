"use client";

import {
  getImageURL,
  getSelectUserInfo,
  supabase,
  updateTargetUserNickname,
  uploadImage
} from "@/api/supabase/supabase";
import React, { useState, useRef, useEffect } from "react";
import MyPageScrap from "./MyPageScrap";
import Image from "next/image";
import "../styles/style.css";
import { UserDatabaseType } from "@/types";
// import defaultImg from "@/assets/defaultImg.jpg";
import { useQuery } from "@tanstack/react-query";

// 기본 이미지 URL 정의
const defaultImg = "https://ifh.cc/g/WDVwsQ.png"; // 비숑
// const defaultImg = "https://ibb.co/R34msc0"; // 종이

export default function MyPageContents() {
  const [userInfo, setUserInfo] = useState<UserDatabaseType[] | null>(null);
  const [nickname, setNickname] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(defaultImg); // 여기에 defaultImg를 넣어줘야할듯
  const [uploadFile, setUploadFile] = useState<File | null>(null); // 여기에 defaultImg를 넣어줘야할듯
  const [fileURL, setFileURL] = useState<string | null>(null); // 업로드된 파일 URL

  // 첫렌더링
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectUserInfo(); // 유저 정보를 가져와서 상태에 저장
        setUserInfo(data);
        // 사용자가 프로필 이미지가 있으면 설정, 없으면 기본 이미지 유지
        if (data?.[0].avatar) {
          setAvatar(data?.[0].avatar);
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
      }
    };
    fetchData();
  }, [userInfo]);

  const {
    data: userData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getSelectUserInfo
  });

  console.log(userData); // 전체 유저 정보

  // 이미지 미리보기
  const imgReader = () => {
    const reader = new FileReader();
    if (imgRef.current && imgRef.current.files) {
      reader.readAsDataURL(imgRef.current.files[0]);
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      setUploadFile(imgRef.current.files[0]);
    }
  };

  // 사용자가 입력한 값으로 editingText 상태 업데이트
  const onChangeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setNickname(e.target.value);
    // setUpdateNickname(e.target.value);
  };

  // 수정 완료 버튼 클릭 핸들러
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 닉네임 변경
    try {
      await updateTargetUserNickname(nickname, userData?.[0].email);
      // setUpdateNickname(nickname);
      setNickname(nickname);
      setIsEditing(false); // 수정 모드 종료
      // 이미지 변경
      if (uploadFile) {
        await uploadImage(uploadFile, userData?.[0].email);
      }
    } catch (error) {
      console.error("닉네임 변경 실패", error);
    }
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="section-base-color flex flex-col justify-center pr-10 pl-10 py-16 rounded-3xl shadow-xl border-line shadow-[#E0C3AE]">
      <h2 className="header-font-color text-center mb-20 text-3xl ">프로필</h2>

      <div className="flex justify-center gap-5 mb-10">
        <form onSubmit={onSubmitHandler} className="p-4 content-font-color">
          <div className="flex flex-col align-center mb-5">
            {/* 아바타 */}
            <Image
              // src={defaultImg}
              src={avatar || defaultImg}
              alt="프로필 사진"
              width={300}
              height={300}
            />
          </div>

          <div className="text-xl mt-3 mb-5">
            {isEditing ? (
              <>
                <p className="mb-5">Email: {userInfo?.[0].email}</p>
                <input
                  type="text"
                  id="nickname"
                  maxLength={10}
                  onChange={onChangeNicknameHandler}
                />
              </>
            ) : (
              <div className="text-xl mb-7">
                <p className="mb-5">Email: {userInfo?.[0].email}</p>
                <div>Nickname: {userInfo?.[0].nickname}</div>
                <div>{nickname}</div>
              </div>
            )}
          </div>

          <div>
            {/* <button className=" w-full px-3 py-2 mt-3 text-white bg-yellow-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
              프로필 사진 변경 완료
            </button> */}
            {isEditing ? (
              <div className="flex flex-col mt-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  onChange={imgReader}
                  // onChange={(e) => onChangeImgHandler(e.target.value) imgReader(); }
                />
                <button
                  type="submit" // 폼 제출
                  className="profile-btn w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  수정완료
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)} // 수정 종료
                  className="profile-btn w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="flex flex-col mt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)} // 수정 모드로 전환
                  className="profile-btn w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  수정하기
                </button>
                <button className="profile-btn w-full pr-28 pl-28 py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                  로그아웃
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
