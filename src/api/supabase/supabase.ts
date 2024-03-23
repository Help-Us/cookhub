import { RecipeType, UserDatabaseType, UserProfile } from "@/types";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 유저 세션 가져오기 - 웹 페이지에 머무르는 user
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log(data);
  if (error) {
    console.log("유저 세션 에러!");
  }
  return data;
};

// 내가 넣은 유저 정보 fetch 가져오기 o
export const getSelectUserInfo = async () => {
  let { data, error } = await supabase.from("userData").select("*");
  if (error) {
    console.log("오류로 인해 정보를 받아오지 못 하고 있습니다.");
  }
  return data;
};

// 유저 정보 업데이트 x
export const updateUserInform = async (nickname: string, avatar: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname, avatar }
  });
  if (error) {
    console.error("업데이트를 다시 시도해주세요!");
  }
  return data;
};

// 타겟 유저 닉네임 값 변경
export const updateTargetUserNickname = async (
  newNickname: string,
  uid: string
) => {
  const { data, error } = await supabase
    .from("userData")
    .update({ nickname: newNickname })
    .eq("email", uid); // 현재 로그인한 유저의 id
  if (error) {
    console.log("닉네임 변경 실패", error);
  }
  console.log("updateTargetUser => ", data);
  return data;
};

// storage에서 이미지 다운
export const downloadImage = async (uid: string) => {
  const { data, error } = await supabase.storage.from("avatars").download(uid);
  if (error) {
    console.log("이미지 다운로드 실패", error);
  }
  return data;
};

// 스토리지에 프로필 이미지 업로드
export const uploadStorageProfileImg = async (uid: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${uid}`, file, {
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    console.error("이미지 업로드 오류", error.message);
  }
  return data;
};

// 프로필 사진 삭제
export const deleteStorageProfileImg = async (uid: string) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .remove([`${uid}`]);
  if (error) {
    console.error("이미지 삭제 오류", error.message);
  }
  return data;
};

// 테이블에 유저 프로필 사진 업로드
export const insertProfileImg = async (uid: string, url: string) => {
  const { data, error } = await supabase
    .from("userData")
    .update({
      avatar_img: url
    })
    .eq("id", uid);
  if (error) {
    console.error("프로필 이미지 업로드 오류", error.message);
  }
  return data;
};

// 프로필 사진 public url 받아오기 ( userData 테이블에 넣어줄 url string)
export const imgPublicUrl = async (uid: string) => {
  try {
    const { data } = supabase.storage.from("avatars").getPublicUrl(`${uid}`);
    return data;
  } catch (error) {
    console.error("이미지 url 가져오기 실패", error);
  }
};

// 유저 프로필 사진 url auth에 넣어주기
export const updateUserProfile = async (url: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { avatar_img: `${url}` }
  });
  console.error("프로필 사진 url 넣어주기 실패", error);
};

export const filterData = async (searchKeyword: string | null) => {
  const { data: cookrcp, error }: PostgrestResponse<RecipeType> = await supabase
    .from("cookrcp")
    .select("*")
    .like(
      "RCP_NAME",
      `${searchKeyword === "All" ? `%` : `%${searchKeyword}%`}`
    );

  if (error) {
    console.log("레시피를 불러오는 중 오류가 발생했습니다.", error);
  }

  return cookrcp;
};

export const addScrap = async ({
  userId,
  recipeId
}: {
  userId: string | undefined;
  recipeId: string;
}) => {
  const { error } = await supabase
    .from("scrap")
    .insert([{ user_id: userId, recipe_id: recipeId }]);

  if (error) {
    console.log("스크랩 추가 오류", error);
  }
};

export const checkIsScrapped = async ({
  userId,
  recipeId
}: {
  userId: string | undefined;
  recipeId: string;
}) => {
  // 유저 정보 없을 시 return
  if (!userId) return;

  const { data: scrapId, error } = await supabase
    .from("scrap")
    .select("scrap_id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);
  //eq를 두번 사용하여 AND 로직 사용

  if (error) {
    console.log("스크랩 체크 함수 오류", error);
  }

  return Boolean(scrapId?.length);
};

export const cancelScrap = async ({
  userId,
  recipeId
}: {
  userId: string | undefined;
  recipeId: string;
}) => {
  const { error } = await supabase
    .from("scrap")
    .delete()
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);

  if (error) {
    console.log("스크랩 취소 오류", error);
  }
};

// --- 댓글기능

export const addComment = async (
  user_id: string | undefined,
  post_id: string,
  content: string
) => {
  const { data, error } = await supabase
    .from("comments") //
    .insert([
      { 
        user_id: user_id, // 댓글을 작성한 사용자 ID
        post_id: post_id, // 댓글이 속한 게시물 ID
        content: content // 댓글 내용
      }
    ]);

  if (error) {
    console.log("댓글 추가 오류", error);
    return null; // 오류 발생 시 null 반환
  }

  console.log("댓글 추가 성공");
  console.log(user_id)
  return data; // 성공 시 추가된 댓글의 데이터 반환
};

// --- 댓글 삭제 함수

export const deleteComment = async (comment_id, user_id) => {
  // 댓글의 user_id를 확인하기 위해 먼저 조회
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("comment_id", comment_id)
    .single(); // single()을 사용하여 단일 결과를 얻음

  if (commentError || !commentData) {
    console.log("댓글 조회 오류", commentError);
    return false;
  }

  // 현재 로그인한 사용자가 댓글 작성자와 동일한지 확인
  if (commentData.user_id !== user_id) {
    console.log("댓글 작성자가 아님, 삭제 권한 없음");
    return false;
  }

  // 사용자가 댓글 작성자와 동일할 경우 삭제 진행
  const { error } = await supabase
    .from("comments")
    .delete()
    .match({ comment_id: comment_id });

  if (error) {
    console.log("댓글 삭제 오류", error);
    return false;
  }

  console.log("댓글 삭제 성공");
  return true;
};

// 댓글 수정 함수
export const updateComment = async (comment_id, user_id, newContent) => {
  // 댓글의 user_id를 확인하기 위해 먼저 조회
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("comment_id", comment_id)
    .single(); // single()을 사용하여 단일 결과를 얻음

  if (commentError || !commentData) {
    console.log("댓글 조회 오류", commentError);
    return false;
  }

  // 현재 로그인한 사용자가 댓글 작성자와 동일한지 확인
  if (commentData.user_id !== user_id) {
    console.log("댓글 작성자가 아님, 수정 권한 없음");
    return false;
  }

  // 사용자가 댓글 작성자와 동일할 경우, 댓글 내용 업데이트 진행
  const { error: updateError } = await supabase
    .from("comments")
    .update({ content: newContent })
    .eq("comment_id", comment_id);

  if (updateError) {
    console.log("댓글 수정 오류", updateError);
    return false;
  }

  console.log("댓글 수정 성공");
  return true;
};
