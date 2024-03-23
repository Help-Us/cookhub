"use client";

import { supabase } from "@/api/supabase/supabase";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "../styles/style.css";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoginUserInfo } from "@/utils/supabase/checkLoginUser";
import MyPageUpload from "./MyPageUpload";

const defaultImg = "https://ifh.cc/g/WDVwsQ.png"; // 비숑

export default function MyPageContents() {
  // 로그인 확인
  const [isLogin, setIsLogin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  // 이미지 URL
  const [avatarUrl, setAvatarUrl] = useState("");

  const [userInfo, setUserInfo] = useState({
    email: "",
    avatarUrl: "",
    nickname: ""
  });
  // 업로드된 파일 URL
  const [imgFile, setImgFile] = useState<File | null>(null);

  // 첫 렌더링
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLogin(true);
    try {
      const userFetchData = await getCurrentLoginUserInfo(); // 유저 정보를 가져와서 상태에 저장
      // console.log(userFetchData)
      // console.log(userFetchData?.user_metadata.nickname)

      // userData 객체에서 email 값을 가져와서 상태에 설정
      if (userFetchData && userFetchData.email) {
        setEmail(userFetchData.email);
      }

      if (userFetchData && userFetchData?.user_metadata) {
        setNickname(userFetchData.user_metadata.nickname);
        setAvatarUrl(userFetchData.user_metadata.avatar_img);
        setEmail(userFetchData.user_metadata.email);
      }

      let avatarUrl = "";

      const avatarUrlData = await supabase.storage
        .from("avatars")
        .download(`${userFetchData?.id}/avatar.jpg`); ////
      console.log("파일 다운로드", userFetchData?.id, avatarUrlData);
      if (avatarUrlData.error) {
        avatarUrl = "/defaultImg.png"; ////
      } else {
        avatarUrl = URL.createObjectURL(avatarUrlData?.data);
      }
      setAvatarUrl(avatarUrl);
    } catch (error) {
      console.error("유저 정보 가져오기 실패", error);
    } finally {
      setIsLogin(false);
    }
  };

  const {
    data: userData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentLoginUserInfo
  });

  // console.log(userData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // 이미지 미리보기
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files?.[0];

    if (selectFile) {
      setImgFile(selectFile);
      const imageUrl = URL.createObjectURL(selectFile);
      console.log(imageUrl);
      setAvatarUrl(imageUrl);
    } else {
      console.log("이미지를 선택해주세요!");
    }
  };

  const uploadProfile = async () => {
    try {
      // 유저 정보
      const userFetchData = await getCurrentLoginUserInfo();
      console.log(
        "업로드 유저 닉네임 정보 ",
        userFetchData?.user_metadata.nickname
      );
      const userFetchId = userFetchData?.id;
      const userFetchNickname = userFetchData?.user_metadata.nickname;

      if (!imgFile && nickname === userFetchData?.user_metadata.nickname) {
        console.log("변경된 사항이 없어욤ㅁ");
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
        console.log("data 이미지 파일 고르면", data);
        if (error) {
          console.error("아바타 업로드 실패ㅠㅠ", error);
          return;
        }
        // 새로운 아바타 URL 저장
        newAvatarImg = data?.path;
        console.log("newAvatarImg", newAvatarImg);
      }
      setAvatarUrl(newAvatarImg);

      const { error: nicknameError } = await supabase.auth.updateUser({
        data: {
          // avatar_img: newAvatarImg,
          nickname: nickname
        }
      });

      if (nicknameError) {
        console.error("닉네임 업데이트 실패~~~~~", nicknameError);
        return;
      }
      setIsEditing(false);

      fetchData();
    } catch (error) {
      console.error("프로필 업데이트 실패", error);
    }
  };

  const handleUploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      // 이미지 미리보기
      // onChangeImageHandler(e);
    }

    // 프로필 이미지 업데이트
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${userData?.id}/` + file?.name, file as File);
    //  유저의 email or uid로 폴더를 만들어서 이미지를 저장 (확인 O)
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  };

  const onChangeEditingHandler = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isLogin ? (
        <div></div>
      ) : (
        <div>
          <MyPageUpload
            isEditing={isEditing}
            onChangeEditingHandler={onChangeEditingHandler}
            avatarUrl={avatarUrl}
            nickname={nickname}
            email={email}
            uploadProfile={uploadProfile}
            onChangeImageHandler={onChangeImageHandler}
            // handleUploadImg={handleUploadImg}
            setNickname={setNickname}
          />
        </div>
      )}
    </div>
  );
}
