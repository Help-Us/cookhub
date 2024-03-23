import { checkIsScrapped, filterRecipe } from "@/api/supabase/supabase";
import { QueryKeys } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";

export const useCheckIsScrappedQuery = ({
  userId,
  recipeId
}: {
  userId: string | undefined;
  recipeId: string;
}) => {
  return useQuery({
    queryKey: [QueryKeys.scrap],
    queryFn: () => checkIsScrapped({ userId, recipeId }),
    enabled: !!userId && !!recipeId // userId와 recipeId가 존재할때만 쿼리 실행
    // !! 연산자는 값을 불리언(boolean) 타입으로 강제 변환
  });
};

export const usefilterRecipeQuery = ({
  searchKeyword
}: {
  searchKeyword: string | null;
}) => {
  return useQuery({
    queryKey: [QueryKeys.scrap],
    queryFn: () => filterRecipe({ searchKeyword }),
    enabled: !!searchKeyword
  });
};
