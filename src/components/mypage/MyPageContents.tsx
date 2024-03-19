"use client";

import React, { useCallback, useState, useRef } from "react";

export default function MyPageContents() {
  // const [loading, setLoading] = useState(true);
  // or
  // const [uid, setUid] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [uploadFile, setUploadFile] = useState<File>();
  const [userSessionNickname, setUserSessionNickname] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <section>
      <form>
        {/* <div>
          <img alt="프로필 이미지" />
        </div> */}
        <div>
          <label>프로필 사진 업로드</label>
          {isEditing ? (
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={(e) => {
                setUploadFile(e.target.files?.[0]);
              }}
            />
          ) : (
            <>
              <img src={avatar} alt="프로필 이미지" />
            </>
          )}
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          {isEditing ? (
            <input
              type="text"
              maxLength={10}
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          ) : (
            <p>{nickname}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <p>namnam12@gmail.com</p>
        </div>

        {!isEditing ? (
          <div>
            <button>수정하기</button>
            <button>로그아웃</button>
          </div>
        ) : (
          <div>
            <button>수정완료</button>
            <button>취소</button>
          </div>
        )}
      </form>
    </section>
  );
}
