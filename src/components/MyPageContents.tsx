"use client";

import React, { useState } from "react";

const MyPageContents = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section>
      <form>
        <h2>프로필</h2>
        <div>
          <img alt="프로필 이미지" />
          <input type="file" accept="image/*" />
        </div>
        <div>
          <label>프로필 사진 업로드</label>
          <input type="file" accept="image/*" />
        </div>
        <div>
          <label>닉네임</label>
          <p>냠냠박사</p> {/* 예시로 일단 */}
        </div>
        <div>
          <label>이메일</label>
          <p>namnam12@gmail.com</p> {/* 예시로 일단 */}
        </div>
        {!isEditing ? (
          <div>
            <button>수정하기</button>
            <button>로그아웃</button>
          </div>
        ) : (
          <div>
            <button>수정완료</button>
            <button>로그아웃</button>
          </div>
        )}
        <div>
          <p>내가 스크랩한 레시피</p>
          <hr />
          <div>
            <img alt="스크랩한 레시피 이미지" />
            <p>스크랩한 레시피 제목</p>
          </div>
          <div>
            <img alt="스크랩한 레시피 이미지" />
            <p>스크랩한 레시피 제목</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MyPageContents;
