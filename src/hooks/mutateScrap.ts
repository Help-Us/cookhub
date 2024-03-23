import { addScrap, cancelScrap } from "@/api/supabase/supabase";
import { QueryKeys } from "@/constants/QueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddScrapMutation = () => {
  const queryClient = useQueryClient();
  const addScrapMutation = useMutation({
    // addScrapMutation을 호출하는 부분에서 addScrap 함수가 필요로하는 인자를 전달해주면 타입 에러가 나지 않는다.
    mutationFn: addScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.scrap]
      });
    }
  });

  return addScrapMutation;
};

export const useCancelScrapMutation = () => {
  const queryClient = useQueryClient();

  const cancelScrapMutation = useMutation({
    mutationFn: cancelScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.scrap]
      });
    }
  });

  return cancelScrapMutation;
};
