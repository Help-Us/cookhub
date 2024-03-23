import { downloadImage } from "@/api/supabase/supabase";
import { ProfileDataType } from "@/types";
import React, { useState } from "react";
import MyPageScrap from "./MyPageScrap";

export default function MyPageUpload({
  isEditing,
  nickname,
  email,
  avatarUrl,
  onChangeNicknameHandler,
  onChangeEditingHandler,
  uploadProfile,
  onChangeImageHandler
}: ProfileDataType) {
  return (
    <section className="section-base-color block w-[1000px] h-[1200px] justify-center flex-nowrap p-16 rounded-3xl shadow-xl border-line shadow-[#E0C3AE]">
      <h2 className="header-font-color text-center my-20 text-3xl">프로필</h2>

      <div className="flex justify-center gap-5 mb-10">
        <div className="flex justify-between">
          <div className="flex flex-col align-center mb-5">
            <img
              src={avatarUrl}
              alt="프로필 사진"
              className="rounded-full border-4 border-solid shadow-lg border-[#E6A4B4] shadow-[#B6856A]"
            />
          </div>
          <div>
            {isEditing && (
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={onChangeImageHandler}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="text-xl mb-7">
          <h2 className="mb-5">E-mail : {email}</h2>
          {isEditing ? (
            <input
              type="text"
              value={nickname}
              maxLength={10}
              onChange={onChangeNicknameHandler}
              className="mt-10 text-lg"
            />
          ) : (
            <h2 className="mt-10 text-lg">Nickname : {nickname}</h2>
          )}

          <div className="flex flex-col text-xl mt-3 mb-5 px-12">
            {isEditing ? (
              <div className="flex flex-col mt-3">
                <button
                  className="profile-btn w-[250px] py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => uploadProfile()}
                >
                  수정완료
                </button>
                <button
                  className="profile-btn w-[250px] py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => onChangeEditingHandler()}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="flex flex-col mt-3">
                <button
                  className="profile-btn w-[250px] py-2.5 mb-3 text-white rounded-md focus:outline-none  focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => onChangeEditingHandler()}
                >
                  수정하기
                </button>
                <button className="profile-btn w-[250px] py-2.5 mb-3 text-white rounded-md focus:outline-none focus:ring-pink-500 focus:ring-opacity-50">
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-40">
        <MyPageScrap />
      </div>
    </section>
  );
}
