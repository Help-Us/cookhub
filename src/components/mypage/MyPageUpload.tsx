"use client";

import { ProfileDataType } from "@/types";
import React from "react";
import MyPageComments from "./MyPageComments";
import { useRouter } from "next/navigation";
import { useLoginStateStore } from "@/shared/zustand/loginStateStore";
import {
  getCurrentLoginUserInfo,
  removeCurrentLoginUser
} from "@/utils/supabase/checkLoginUser";

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
  const router = useRouter();
  const { logout } = useLoginStateStore();

  const logoutHandler = async () => {
    const currentLoginUser = await getCurrentLoginUserInfo();
    const { id } = currentLoginUser!;
    await removeCurrentLoginUser(id);
    logout();
    alert("로그아웃 되었습니다.");
    router.replace("/");
  };
  return (
    <section className="section-base-color block w-[800px] h-[960px] justify-center flex-nowrap p-16 rounded-3xl shadow-xl border-line shadow-[color:var(--borderColor2)]">
      <h2 className="header-font-color text-center my-10 text-3xl">프로필</h2>

      <div className="flex justify-center gap-5 py-12">
        <div className="flex flex-col align-center">
          {isEditing ? (
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={onChangeImageHandler}
              className="cursor-pointer"
            />
          ) : (
            <img
              src={avatarUrl}
              alt="프로필 사진"
              className="rounded-full border-4 border-solid shadow-lg border-[color:var(--subColor3)] shadow-[color:var-(--contentColor)]"
            />
          )}
        </div>
        <div className="flex flex-col text-xl gap-5">
          <div className="flex flex-col gap-5 px-10">
            <h2 className="">E-mail : {email}</h2>
            {isEditing ? (
              <input
                type="text"
                value={nickname}
                maxLength={10}
                onChange={onChangeNicknameHandler}
              />
            ) : (
              <h2>Nickname : {nickname}</h2>
            )}
          </div>
          <div className="flex flex-col gap-2 px-10">
            {isEditing ? (
              <>
                <button
                  className="my-page-button-style profile-btn"
                  onClick={() => uploadProfile()}
                >
                  수정완료
                </button>
                <button
                  className="profile-btn my-page-button-style"
                  onClick={() => onChangeEditingHandler()}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  className="my-page-button-style profile-btn"
                  onClick={() => onChangeEditingHandler()}
                >
                  수정하기
                </button>
                <button
                  className="my-page-button-style profile-btn"
                  onClick={logoutHandler}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-12">
        <MyPageComments />
      </div>
    </section>
  );
}
