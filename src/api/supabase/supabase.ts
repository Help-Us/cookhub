import { RecipeType, UserDatabaseType, UserProfile } from "@/types";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 유저 정보 가져오기
export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();
  console.log(data);
  return data;
};

// 내가 넣은 유저 정보 fetch 가져오기
export const getSelectUserInfo = async () => {
  let { data, error } = await supabase.from("userData").select("*");
  if (error) {
    console.log("오류로 인해 정보를 받아오지 못 하고 있습니다.");
  }
  return data;
};

// 유저 정보 업데이트
export const updateUserInfo = async () => {
  const { data, error } = await supabase
    .from("userData")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) {
    console.log("유저 정보 새로 업데이트 실패", error);
  }
  return data;
};

// storage에서 이미지 다운
export const downloadImage = async (imagePath: string) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .download(imagePath);
  if (error) {
    console.log("이미지 다운로드 실패", error);
  }
  return data;
};

// storage에 이미지 업로드
export const uploadImage = async (file: File, imagePath: string) => {
  const { data, error } = await supabase.storage
    .from("avatars") // 사용할 스토리지 버킷 이름
    .upload(`${file.name}`, file); // 파일 경로 및 파일 객체 전달

  if (error) {
    console.log("이미지 업로드 실패", error);
  }
  console.log(data);
  return data;
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

export const scrapRecipe = async (
  userId: string | undefined,
  recipeId: string
) => {
  const { data, error } = await supabase
    .from("scrap")
    .insert([{ user_id: userId, recipe_id: recipeId }]);

  if (error) {
    console.log("스크랩 인서트 오류", error);
  }

  console.log("스크랩 추가");

  return data;
};

export const checkIsScrraped = async (
  userId: string | undefined,
  recipeId: string
) => {
  const { data: scrapId, error } = await supabase
    .from("scrap")
    .select("scrap_id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);
  //eq를 두번 사용하여 AND 로직 사용

  console.log(scrapId);

  if (error) {
    console.log("스크랩 체크 함수 에러", error);
  }

  // 유저정보를 모두 불러와서 거기서 find로 레시피아이디와 일치하는것이 있으면 true로 체크하는 방식
  // const check = data?.find((item) => item.recipe_id === Number(recipeId));
  // console.log(check);

  if (scrapId?.length !== 0) {
    return true;
  } else return false;
};

export const cancelScrapRecipe = async (
  userId: string | undefined,
  recipeId: string
) => {
  const { error } = await supabase
    .from("scrap")
    .delete()
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);

  if (error) {
    console.log("스크랩 취소 오류", error);
  }
  console.log("스크랩 취소");
};
