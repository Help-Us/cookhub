import { UserDatabaseType, UserProfile } from "@/types";
import { createClient } from "@supabase/supabase-js";

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

export const getAllUserData = async (): Promise<UserDatabaseType[] | null> => {
  try {
    const { data, error } = await supabase.from("userData").select("*");
    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
