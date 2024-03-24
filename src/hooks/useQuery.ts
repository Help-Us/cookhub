import {
  checkIsScrapped,
  fetchTopScrappedRecipes,
  filterRecipe
} from "@/api/supabase/supabase";
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
    queryKey: [QueryKeys.SCRAP],
    queryFn: () => checkIsScrapped({ userId, recipeId }),
    enabled: !!userId && !!recipeId // userId와 recipeId가 존재할때만 쿼리 실행
    // !! 연산자는 값을 불리언(boolean) 타입으로 강제 변환
  });
};

export const usefilterRecipeQuery = ({
  searchKeyword
}: {
  searchKeyword: string;
}) => {
  const {
    data: searchedRecipes,
    isError: isFilterError,
    isLoading: isFilterLoading
  } = useQuery({
    queryKey: [QueryKeys.FILTER_RECIPE],
    queryFn: () => filterRecipe({ searchKeyword }),
    enabled: !!searchKeyword
  });

  return { searchedRecipes, isFilterError, isFilterLoading };
};

export const useFetchTopScrappedRecipes = () => {
  const { data: topRecipes, isError: isFetchTopRecipesError } = useQuery({
    queryKey: [QueryKeys.FETCH_TOP_SCRAP],
    queryFn: () => fetchTopScrappedRecipes()
  });

  return { topRecipes, isFetchTopRecipesError };
};
