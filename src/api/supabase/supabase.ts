import { RecipeType, UserDatabaseType, UserProfile } from "@/types";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 유저 정보 가져오기
export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();

  return data;
};

// 유저 세션 가져오기 - 웹 페이지에 머무르는 user
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log(data);
  if (error) {
    console.log("유저 세션 에러!");
  }
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
export const downloadImage = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .download(filePath);
  if (error) {
    console.log("이미지 다운로드 실패", error);
  }
  return data;
};

// 스토리지에 이미지 업로드 ㅠㅠ
export const uploadImage = async (filePath: string, image: File) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    console.error("이미지 업로드 오류", error.message);
  }
  return data;
};

// storage에 이미지 업로드
// export const uploadImage = async (file: File, filename: string) => {
//   try {
//     const { data, error } = await supabase.storage
//       .from("avatars") // 사용할 스토리지 버킷 이름
//       .upload(`${filename}`, file); // 파일 경로 및 파일 객체 전달
//     if (error) {
//       console.log("이미지 업로드 실패", error);
//     }
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("이미지 업로드 에러", error);
//   }
// };

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
