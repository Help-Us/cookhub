import { RecipeType } from "@/types";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 마이페이지 --------------

// 유저 정보 업데이트
export const updateUserInform = async (nickname: string, avatar: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname, avatar }
  });
  if (error) {
    console.error("업데이트 에러 => ", error);
    return alert("업데이트를 다시 시도해주세요!");
  }
  return data;
};

// 유저 닉네임 변경(테이블용)
export const updateTableNickname = async (uid: string, newNickname: string) => {
  const { data, error } = await supabase
    .from("loginUserList")
    .update({ nickname: newNickname })
    .eq("uid", uid)
    .select();

  if (error) {
    console.error("닉네임 DB 변경 에러 => ", error);
    return alert("닉네임 DB 변경 에러");
  }
  return data;
};

// 스토리지에 프로필 이미지 업로드
export const uploadImage = async (filePath: any, image: any) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    console.error("파일 업데이트 에러 => ", error);
    return alert("파일 업데이트 에러..!");
  }
  return data;
};

// storage에서 이미지 다운
export const downloadImage = async (uid: string) => {
  const { data, error } = await supabase.storage.from("avatars").download(uid);
  if (error) {
    console.error("이미지 다운로드 에러 => ", error);
    return alert("이미지 다운로드에 실패했습니다.");
  }
  return data;
};

// 프로필 사진 public url 받아오기 ( userData 테이블에 넣어줄 url string)
export const imgPublicUrl = async (uid: string) => {
  try {
    const { data } = supabase.storage.from("avatars").getPublicUrl(`${uid}`);
    return data;
  } catch (error) {
    console.error("이미지 가져오기 에러 => ", error);
    return alert("이미지를 가져오는데 실패했습니다.");
  }
};

// 유저 프로필 사진 url auth에 넣어주기
export const updateUserProfile = async (url: string) => {
  const { error } = await supabase.auth.updateUser({
    data: { avatar_img: `${url}` }
  });
  if (error) {
    console.error("프로필 사진 입력 에러 => ", error);
    return alert("프로필 사진을 입력하는데 실패했습니다.");
  }
};

// 레시피 -------------------

// 검색어를 바탕으로 레시피 필터링
export const filterRecipe = async ({
  searchKeyword
}: {
  searchKeyword: string;
}) => {
  const { data: cookrcp, error }: PostgrestResponse<RecipeType> = await supabase
    .from("cookrcp")
    .select("*")
    .like(
      "RCP_NAME",
      `${searchKeyword === "All" ? `%` : `%${searchKeyword}%`}`
    );

  if (error) {
    console.error("레시피 불러오기 에러 => ", error);
    return alert("레시피를 불러오는 동안 오류가 발생했습니다.");
  }
  return cookrcp;
};

// 스크랩 추가
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
    console.error("스크랩 추가 에러 => ", error);
    return alert("스크랩을 추가하는 동안 오류가 발생했습니다.");
  }
};

// 스크랩 체크
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
    console.error("스크랩 체크 함수 오류 => ", error);
    return alert("스크랩 여부를 체크하는 동안 오류가 발생했습니다.");
  }
  return Boolean(scrapId?.length);
};

// 스크랩 취소
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
    console.error("스크랩 취소 오류 => ", error);
    return alert("스크랩을 취소하는 동안 오류가 발생했습니다.");
  }
};

// --- 댓글기능

export const addComment = async (
  user_id: string | undefined,
  post_id: string,
  content: string,
  nickname: string,
  avatar_img: string
) => {
  const { data, error } = await supabase
    .from("comments") //
    .insert([
      {
        user_id: user_id, // 댓글을 작성한 사용자 ID
        post_id: post_id, // 댓글이 속한 게시물 ID
        content: content, // 댓글 내용
        nickname: nickname, // 작성자 닉네임
        avatar_img: avatar_img // 작성자 프로필사진
      }
    ])
    .select();

  if (error) {
    console.error("댓글 추가 오류 => ", error);
    alert("댓글을 추가하는 동안 오류가 발생했습니다.");
    return null; // 오류 발생 시 null 반환
  }
  return data; // 성공 시 추가된 댓글의 데이터 반환
};

// --- 댓글 삭제 함수

export const deleteComment = async (comment_id: any, user_id: any) => {
  // 댓글의 user_id를 확인하기 위해 먼저 조회
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("comment_id", comment_id)
    .single(); // single()을 사용하여 단일 결과를 얻음

  if (commentError || !commentData) {
    console.error("댓글 조회 오류 => ", commentError);
    alert("댓글을 조회하는 동안 오류가 발생했습니다.");
    return false;
  }

  // 현재 로그인한 사용자가 댓글 작성자와 동일한지 확인
  if (commentData.user_id !== user_id) {
    console.error("댓글 작성자가 아님, 삭제 권한 없음");
    alert("댓글 작성자만 해당 댓글을 삭제할 수 있습니다.");
    return false;
  }

  // 사용자가 댓글 작성자와 동일할 경우 삭제 진행
  const { error } = await supabase
    .from("comments")
    .delete()
    .match({ comment_id: comment_id });

  if (error) {
    console.error("댓글 삭제 오류 => ", error);
    alert("댓글을 삭제하는 동안 오류가 발생했습니다.");
    return false;
  }
  return true;
};

// --- 댓글 수정 함수
export const updateComment = async (
  comment_id: any,
  user_id: any,
  newContent: any
) => {
  // 댓글의 user_id를 확인하기 위해 먼저 조회
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("comment_id", comment_id)
    .single(); // single()을 사용하여 단일 결과를 얻음

  if (commentError || !commentData) {
    console.error("댓글 조회 오류 => ", commentError);
    alert("댓글을 조회하는 동안 오류가 발생했습니다.");
    return false;
  }

  // 현재 로그인한 사용자가 댓글 작성자와 동일한지 확인
  if (commentData.user_id !== user_id) {
    console.error("댓글 작성자가 아님, 수정 권한 없음");
    alert("댓글 작성자만 해당 댓글을 수정할 수 있습니다.");
    return false;
  }

  // 사용자가 댓글 작성자와 동일할 경우, 댓글 내용 업데이트 진행
  const { error: updateError } = await supabase
    .from("comments")
    .update({ content: newContent, updated_at: new Date().toISOString() })
    .eq("comment_id", comment_id);

  if (updateError) {
    console.error("댓글 수정 오류 => ", updateError);
    alert("댓글을 수정하는 동안 오류가 발생했습니다.");
    return false;
  }
  return true;
};

export const fetchTopScrappedRecipes = async () => {
  const { data: topSrcappedRecipes, error } = await supabase
    .rpc("fetch_top_scrapped_recipes") // 이 부분은 나중에 SQL 함수를 만들어주어야 합니다.
    .select("RCP_ID, RCP_WAY, RCP_TYPE, RCP_IMG_BIG, RCP_NAME");

  if (error) {
    console.error("상위 스크랩 레시피 fetch 오류 => ", error);
    return alert("스크랩 상위 레시피를 가져오는 동안 오류가 발생했습니다.");
  }

  return topSrcappedRecipes;
};
