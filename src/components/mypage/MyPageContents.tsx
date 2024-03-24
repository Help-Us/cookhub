"use client";

import { supabase, updateUserInform } from "@/api/supabase/supabase";
import React, { useState, useEffect, ChangeEvent } from "react";
import "../styles/style.css";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import MyPageUpload from "./MyPageUpload";

export default function MyPageContents() {
  const defaultAvatarUrl = "https://ifh.cc/g/WDVwsQ.png"; // 비숑
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  // 이미지 URL
  const [avatarUrl, setAvatarUrl] = useState("");

  // 업로드된 파일 URL
  const [imgFile, setImgFile] = useState<File | null>(null);

  // 첫 렌더링
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userFetchData = await getCurrentLoginUserInfo();

      // 사용자의 프로필 이미지 URL
      const user_avatar =
        userFetchData?.user_metadata?.avatar_img || defaultAvatarUrl;
      // 가져온 프로필 이미지 URL을 avatarUrl 상태에 저장
      setAvatarUrl(user_avatar);

      // userData 객체에서 email 값을 가져와서 상태에 설정
      if (userFetchData && userFetchData.email) {
        setEmail(userFetchData.email);
      }

      if (userFetchData && userFetchData?.user_metadata) {
        const user_nickname = userFetchData.user_metadata.nickname;
        const user_avatar = userFetchData.user_metadata.avatar_img;
        setNickname(user_nickname);
        setAvatarUrl(user_avatar);
      }

      let avatarUrl = "";

      const avatarUrlData = await supabase.storage
        .from("avatars")
        .download(`${userFetchData?.id}/avatar.jpg`);

      if (avatarUrlData.error) {
        // 에러나면 디폴트 넣어줘
        avatarUrl = defaultAvatarUrl;
      } else {
        avatarUrl = URL.createObjectURL(avatarUrlData?.data);
      }
      setAvatarUrl(avatarUrl);

      const nickname = userFetchData?.user_metadata.nickname;
      updateUserInform(nickname, avatarUrl);
    } catch (error) {
      console.error("유저 정보 가져오기 실패", error);
      alert("유저 정보를 가져오는데 실패했습니다.");
    }
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentLoginUserInfo
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // 이미지 미리보기
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files?.[0];

    if (selectFile) {
      setImgFile(selectFile);
      const imageUrl = URL.createObjectURL(selectFile);
      setAvatarUrl(imageUrl);
    } else {
      console.log("이미지를 선택해주세요!");
      alert("이미지를 선택해주세요!");
    }
  };

  const uploadProfile = async () => {
    try {
      // 유저 정보
      const userFetchData = await getCurrentLoginUserInfo();
      const userFetchId = userFetchData?.id;

      if (!imgFile && nickname === userFetchData?.user_metadata.nickname) {
        return;
      }

      let newAvatarImg = avatarUrl;

      // 이미지 파일 고르고 아바타에 덮어쓰기
      if (imgFile) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${userFetchId}/avatar.jpg`, imgFile!, {
            upsert: true
          });
        if (error) {
          console.error("아바타 업로드 실패ㅠㅠ", error);
          return alert("아바타를 업로드하는 동안 오류가 발생했습니다.");
        }
        // 새로운 아바타 URL 저장
        newAvatarImg = data?.path;
      }
      setAvatarUrl(newAvatarImg);

      const { error: nicknameError } = await supabase.auth.updateUser({
        data: {
          uid: userFetchId,
          nickname: nickname
        }
      });

      if (nicknameError) {
        console.error("닉네임 업데이트 실패~~~~~", nicknameError);
        return alert("닉네임을 업데이트하는 동안 오류가 발생했습니다.");
      }

      const { error: nicknameChangeError } = await supabase
        .from("loginUserList")
        .update({ nickname: nickname })
        .eq("uid", userFetchId)
        .select();

      if (nicknameChangeError) {
        console.error("닉네임 DB 수정 에러 => ", nicknameChangeError);
        return alert("닉네임을 DB에 입력하는 동안 오류가 발생했습니다.");
      }

      setIsEditing(false);

      fetchData();
    } catch (error) {
      console.error("프로필 업데이트 실패", error);
    }
  };

  const onChangeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeEditingHandler = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <MyPageUpload
        isEditing={isEditing}
        onChangeEditingHandler={onChangeEditingHandler}
        avatarUrl={avatarUrl}
        nickname={nickname}
        email={email}
        uploadProfile={uploadProfile}
        onChangeImageHandler={onChangeImageHandler}
        onChangeNicknameHandler={onChangeNicknameHandler}
      />
    </div>
  );
}
