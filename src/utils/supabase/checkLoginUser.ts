import { supabase } from "@/api/supabase/supabase";

// auth 에서 유저의 정보를 가져옴
export const getCurrentLoginUserInfo = async () => {
  const {
    data: { user: currentLoginUserInfo }
  } = await supabase.auth.getUser();

  return currentLoginUserInfo;
};

// DB에서 데이터를 가져옴
export const getCurrentLoggedInUserList = async (): Promise<void | any[]> => {
  const { data: currentUserList, error: getCurrentUserError } = await supabase
    .from("loginUserList")
    .select("*");

  if (getCurrentUserError) {
    console.log("DB에서 유저 리스트를 가져오는 동안 문제가 발생했습니다.");
    return console.log("getCurrentUserError", getCurrentUserError);
  }

  return currentUserList;
};

// DB에 데이터를 추가함 (data: 객체 형태)
export const insertCurrentLoginUser = async (data) => {
  const { error: insertUserError } = await supabase
    .from("loginUserList")
    .insert(data);

  if (insertUserError) {
    console.log("DB에 유저 정보를 입력하는 동안 문제가 발생했습니다.");
    return console.log("insertUserError", insertUserError);
  }
};

// DB에서 유저의 정보를 삭제함
export const removeCurrentLoginUser = async (data) => {
  const { error: removeUserError } = await supabase
    .from("loginUserList")
    .delete()
    .eq("uid", data);

  if (removeUserError) {
    console.log("DB에서 유저 정보를 삭제하는 동안 문제가 발생했습니다.");
    return console.log("removeUserError", removeUserError);
  }
};